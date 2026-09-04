import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Timer, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookmarkCheck, 
  Calculator, 
  FileText, 
  AlertTriangle, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Type,
  Maximize2,
  Minimize2,
  X,
  ShieldCheck
} from 'lucide-react';
import { Question, SubjectId, UserAnswer, TestResult, StudentProfile } from '../types';
import { SUBJECT_METADATA } from '../data/oauQuestions';
import { CBTCalculator } from './CBTCalculator';

interface CBTExamEngineProps {
  questions: Question[];
  selectedSubjects: SubjectId[];
  durationMinutes: number;
  examTitle: string;
  examMode: 'standard_oau_mock' | 'subject_drill' | 'speed_sprint' | 'untimed_practice';
  profile: StudentProfile;
  onSubmitExam: (result: TestResult) => void;
  onExitExam: () => void;
}

export const CBTExamEngine: React.FC<CBTExamEngineProps> = ({
  questions,
  selectedSubjects,
  durationMinutes,
  examTitle,
  examMode,
  profile,
  onSubmitExam,
  onExitExam,
}) => {

  const totalQuestions = questions.length;
  const isUntimed = examMode === 'untimed_practice';

  // Timer state (in seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    isUntimed ? 999999 : durationMinutes * 60
  );

  // Active question index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User answers map: questionId -> UserAnswer
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>(() => {
    const initial: Record<string, UserAnswer> = {};
    questions.forEach((q) => {
      initial[q.id] = {
        questionId: q.id,
        selectedOptionIndex: null,
        isFlagged: false,
        timeSpentSeconds: 0,
      };
    });
    return initial;
  });

  // UI helpers
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [scratchpadText, setScratchpadText] = useState('');
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];

  // Active subject filter / grouping
  const activeSubjectId = currentQuestion?.subjectId;

  // Group questions by subject
  const subjectQuestionIndices = useMemo(() => {
    const map: Record<SubjectId, number[]> = {} as any;
    selectedSubjects.forEach((sub) => {
      map[sub] = [];
    });
    questions.forEach((q, idx) => {
      if (map[q.subjectId]) {
        map[q.subjectId].push(idx);
      }
    });
    return map;
  }, [questions, selectedSubjects]);

  // Track time per question
  useEffect(() => {
    if (!currentQuestion) return;
    const interval = setInterval(() => {
      setAnswers((prev) => {
        const existing = prev[currentQuestion.id];
        if (!existing) return prev;
        return {
          ...prev,
          [currentQuestion.id]: {
            ...existing,
            timeSpentSeconds: existing.timeSpentSeconds + 1,
          },
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion]);

  // Main countdown timer
  useEffect(() => {
    if (isUntimed) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isUntimed]);

  // Select Option
  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOptionIndex: optionIndex,
      },
    }));
  };

  // Toggle Flag / Review
  const handleToggleFlag = () => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        isFlagged: !prev[currentQuestion.id].isFlagged,
      },
    }));
  };

  // Clear Answer
  const handleClearAnswer = () => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOptionIndex: null,
      },
    }));
  };

  // Navigation
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  };

  // Jump to first question of a subject tab
  const handleSelectSubjectTab = (subId: SubjectId) => {
    const indices = subjectQuestionIndices[subId];
    if (indices && indices.length > 0) {
      setCurrentIndex(indices[0]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in scratchpad
      if (document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'INPUT') {
        return;
      }

      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') handleSelectOption(0);
      else if (key === 'B' || key === '2') handleSelectOption(1);
      else if (key === 'C' || key === '3') handleSelectOption(2);
      else if (key === 'D' || key === '4') handleSelectOption(3);
      else if (key === 'E' || key === '5') handleSelectOption(4);
      else if (key === 'N' || e.key === 'ArrowRight') handleNext();
      else if (key === 'P' || e.key === 'ArrowLeft') handlePrev();
      else if (key === 'R') handleToggleFlag();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion]);

  // Compute stats for submission
  const stats = useMemo(() => {
    let answeredCount = 0;
    let flaggedCount = 0;
    Object.values(answers).forEach((ans: UserAnswer) => {
      if (ans.selectedOptionIndex !== null) answeredCount++;
      if (ans.isFlagged) flaggedCount++;
    });
    return {
      answered: answeredCount,
      unanswered: totalQuestions - answeredCount,
      flagged: flaggedCount,
    };
  }, [answers, totalQuestions]);

  // Submit test and grade
  const handleFinalSubmit = useCallback(() => {
    const timeTakenSeconds = (durationMinutes * 60) - secondsRemaining;
    
    // Subject Breakdown calculation
    const breakdowns = selectedSubjects.map((subId) => {
      const subQuestions = questions.filter((q) => q.subjectId === subId);
      const total = subQuestions.length;
      let correct = 0;
      let attempted = 0;
      let timeSpent = 0;

      subQuestions.forEach((q) => {
        const ans = answers[q.id];
        if (ans && ans.selectedOptionIndex !== null) {
          attempted++;
          if (ans.selectedOptionIndex === q.correctOptionIndex) {
            correct++;
          }
          timeSpent += ans.timeSpentSeconds;
        }
      });

      const percentage = total > 0 ? Number(((correct / total) * 100).toFixed(1)) : 0;
      // Scaled to 100 points per subject (so 4 subjects = 400 points total)
      const scaledScore = total > 0 ? Number(((correct / total) * 100).toFixed(1)) : 0;

      return {
        subjectId: subId,
        subjectName: SUBJECT_METADATA[subId]?.name || subId,
        totalQuestions: total,
        attempted,
        correct,
        scorePercentage: percentage,
        scaledScore,
        timeSpentSeconds: timeSpent,
      };
    });

    let totalCorrect = 0;
    let totalAttempted = 0;
    breakdowns.forEach((b) => {
      totalCorrect += b.correct;
      totalAttempted += b.attempted;
    });

    // Score is based on total questions in the selected exam mode
    const overallPercentage = totalQuestions > 0 ? Number(((totalCorrect / totalQuestions) * 100).toFixed(1)) : 0;

    const result: TestResult = {
      id: 'oau_res_' + Date.now(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: Date.now(),
      examTitle,
      examMode,
      durationMinutes,
      timeTakenSeconds: isUntimed ? 0 : Math.max(timeTakenSeconds, 1),
      selectedSubjects,
      totalQuestions,
      totalAttempted,
      totalCorrect,
      totalScore: totalCorrect, // Direct score out of total questions in exam mode
      percentage: overallPercentage,
      subjectBreakdowns: breakdowns,
      answers,
      questions,
      studentName: profile.fullName,
      targetCourse: profile.targetCourse,
      jambScore: profile.jambScore,
    };

    onSubmitExam(result);
  }, [answers, durationMinutes, examMode, examTitle, isUntimed, profile, questions, secondsRemaining, selectedSubjects, onSubmitExam, totalQuestions]);

  const handleAutoSubmit = () => {
    setIsConfirmSubmitOpen(false);
    handleFinalSubmit();
  };

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  const isTimeCritical = !isUntimed && secondsRemaining < 300; // Under 5 minutes

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      
      {/* 1. TOP EXAM CONTROL BAR */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Subject Navigation Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
            {selectedSubjects.map((subId) => {
              const meta = SUBJECT_METADATA[subId];
              const isActive = activeSubjectId === subId;
              const indices = subjectQuestionIndices[subId] || [];
              const answeredInSub = indices.filter(
                (idx) => answers[questions[idx]?.id]?.selectedOptionIndex !== null
              ).length;

              return (
                <button
                  key={subId}
                  onClick={() => handleSelectSubjectTab(subId)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-sm ring-2 ring-purple-400/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{meta.shortName}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-normal ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {answeredInSub}/{indices.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Controls: Timer, Calculator, Tools, Submit */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Live Countdown Timer */}
            {!isUntimed ? (
              <div
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-extrabold shadow-inner transition-colors ${
                  isTimeCritical
                    ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700 animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700'
                }`}
              >
                <Timer className={`w-4 h-4 ${isTimeCritical ? 'text-rose-600 animate-spin' : 'text-blue-600 dark:text-blue-400'}`} />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                <span>Untimed Practice</span>
              </div>
            )}

            {/* Calculator Toggle */}
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 btn-effect-secondary cursor-pointer"
              title="Open CBT Calculator"
            >
              <Calculator className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="hidden sm:inline">Calc</span>
            </button>

            {/* Scratchpad Toggle */}
            <button
              onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 btn-effect-secondary cursor-pointer"
              title="Toggle Rough Sheet Notes"
            >
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Scratchpad</span>
            </button>

            {/* Font Size Adjuster */}
            <button
              onClick={() => {
                if (fontSize === 'sm') setFontSize('base');
                else if (fontSize === 'base') setFontSize('lg');
                else setFontSize('sm');
              }}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold btn-effect-secondary cursor-pointer"
              title="Toggle Font Size (A-, A, A+)"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Submit Button */}
            <button
              id="cbt-submit-btn"
              onClick={() => setIsConfirmSubmitOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold btn-effect-primary btn-pulse-glow cursor-pointer transition-all"
            >
              Submit Exam
            </button>


          </div>

        </div>
      </div>

      {/* 2. MAIN EXAM STAGE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Question Presentation Panel (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[420px] flex flex-col justify-between">
              
              {/* Question Header & Meta */}
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <span className="flex items-center justify-center px-3 py-1 rounded-lg bg-blue-600 text-white font-extrabold text-xs">
                      Question {currentIndex + 1} of {totalQuestions}
                    </span>
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800">
                      {currentQuestion?.subjectName}
                    </span>
                    {currentQuestion?.year && (
                      <span className="hidden sm:inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {currentQuestion.year}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Mark for Review Button */}
                    <button
                      onClick={handleToggleFlag}
                      className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        currentAnswer?.isFlagged
                          ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-50 hover:text-amber-700'
                      }`}
                    >
                      {currentAnswer?.isFlagged ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>Flagged for Review</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Mark for Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Topic Indicator */}
                <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Topic: {currentQuestion?.topic}
                </div>

                {/* Passage / Context if applicable */}
                {currentQuestion?.passage && (
                  <div className="mb-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic font-serif leading-relaxed">
                    {currentQuestion.passage}
                  </div>
                )}

                {/* Question Text */}
                <div className={`font-semibold text-slate-900 dark:text-slate-100 leading-relaxed mb-6 whitespace-pre-line ${
                  fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                }`}>
                  {currentQuestion?.questionText}
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQuestion?.options.map((optionText, optIdx) => {
                    const optionLetter = String.fromCharCode(65 + optIdx);
                    const isSelected = currentAnswer?.selectedOptionIndex === optIdx;

                    return (
                      <label
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`flex items-center space-x-3.5 p-3.5 sm:p-4 rounded-xl border-2 btn-option-card cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'border-blue-600 bg-gradient-to-r from-blue-50/90 to-indigo-50/90 dark:from-blue-950/70 dark:to-indigo-950/70 dark:border-blue-500 shadow-md ring-2 ring-blue-500/30'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700'
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {optionLetter}
                        </div>

                        <div className={`text-slate-800 dark:text-slate-200 flex-1 ${
                          fontSize === 'sm' ? 'text-xs sm:text-sm' : fontSize === 'lg' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                        }`}>
                          {optionText}
                        </div>
                      </label>
                    );
                  })}
                </div>

              </div>

              {/* Bottom Nav Actions */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                    currentIndex === 0
                      ? 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                      : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 btn-effect-secondary cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous (P)</span>
                </button>

                {currentAnswer?.selectedOptionIndex !== null && (
                  <button
                    onClick={handleClearAnswer}
                    className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold cursor-pointer active:scale-95"
                  >
                    Clear Choice
                  </button>
                )}

                <button
                  onClick={handleNext}
                  disabled={currentIndex === totalQuestions - 1}
                  className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    currentIndex === totalQuestions - 1
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white btn-effect-primary cursor-pointer'
                  }`}
                >
                  <span>Next (N)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

            </div>

            {/* Keyboard shortcuts reminder */}
            <div className="hidden sm:flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 px-2 font-mono">
              <span>Hotkeys: [A-E] Pick option • [N] Next • [P] Prev • [R] Review</span>
              <span>DLCF OAU CBT Engine</span>
            </div>

          </div>

          {/* Question Palette Grid (1 Col) */}
          <div className="space-y-4">
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Question Palette
                </h3>
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  {stats.answered}/{totalQuestions} Answered
                </span>
              </div>

              {/* Palette Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400 mb-4 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
                  <span>Answered ({stats.answered})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
                  <span>Flagged ({stats.flagged})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700 inline-block" />
                  <span>Unanswered ({stats.unanswered})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded ring-2 ring-purple-600 bg-white dark:bg-slate-900 inline-block" />
                  <span>Current</span>
                </div>
              </div>

              {/* Palette Grid */}
              <div className="grid grid-cols-5 gap-1.5 max-h-[280px] overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const ans = answers[q.id];
                  const isCurrent = currentIndex === idx;
                  const isAnswered = ans?.selectedOptionIndex !== null;
                  const isFlagged = ans?.isFlagged;

                  let btnBg = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200';
                  if (isFlagged) {
                    btnBg = 'bg-amber-400 dark:bg-amber-500 text-slate-950 font-black';
                  } else if (isAnswered) {
                    btnBg = 'bg-emerald-500 text-white font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-8 rounded-lg text-xs font-mono font-bold transition-all relative ${btnBg} ${
                        isCurrent
                          ? 'ring-3 ring-purple-600 ring-offset-2 dark:ring-offset-slate-900 scale-105 z-10'
                          : ''
                      }`}
                    >
                      {idx + 1}
                      {isFlagged && isAnswered && (
                        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-slate-950" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Final Submit Trigger */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setIsConfirmSubmitOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  Submit & Mark Exam
                </button>
              </div>

            </div>

            {/* Scratchpad Collapsible Drawer */}
            {isScratchpadOpen && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-blue-200 dark:border-slate-800 shadow-sm animate-in fade-in">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Scratchpad / Rough Work</span>
                  </div>
                  <button
                    onClick={() => setIsScratchpadOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  value={scratchpadText}
                  onChange={(e) => setScratchpadText(e.target.value)}
                  placeholder="Type working, rough formulas, notes here..."
                  className="w-full h-32 p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono resize-none focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}

          </div>

        </div>
      </div>

      {/* 3. CONFIRM SUBMISSION MODAL */}
      {isConfirmSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl animate-in zoom-in-95">
            
            <div className="flex items-center space-x-3 text-indigo-700 dark:text-indigo-400 mb-4">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  Ready to Submit OAU Post-UTME?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your exam will be graded automatically upon submission.
                </p>
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="grid grid-cols-3 gap-2.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center my-4">
              <div>
                <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {stats.answered}
                </div>
                <div className="text-[11px] font-medium text-slate-500">Answered</div>
              </div>
              <div>
                <div className={`text-xl font-extrabold ${stats.unanswered > 0 ? 'text-rose-600' : 'text-slate-600'}`}>
                  {stats.unanswered}
                </div>
                <div className="text-[11px] font-medium text-slate-500">Unanswered</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-amber-500">
                  {stats.flagged}
                </div>
                <div className="text-[11px] font-medium text-slate-500">Flagged</div>
              </div>
            </div>

            {stats.unanswered > 0 && (
              <div className="flex items-start space-x-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs mb-4">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <span>
                  You have <strong>{stats.unanswered} unanswered question(s)</strong>. Are you sure you want to conclude the exam now?
                </span>
              </div>
            )}

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setIsConfirmSubmitOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Return to Exam
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-500/25"
              >
                Yes, Submit Now
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. SCIENTIFIC CBT CALCULATOR MODAL */}
      <CBTCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

    </div>
  );
};
