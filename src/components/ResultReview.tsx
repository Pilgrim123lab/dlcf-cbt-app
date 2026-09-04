import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  Printer, 
  RotateCcw, 
  BarChart3, 
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Award,
  ChevronLeft,
  Home,
  PlayCircle
} from 'lucide-react';
import { TestResult, StudentProfile, Question } from '../types';
import { SUBJECT_METADATA } from '../data/oauQuestions';
import { calculateOauAggregate, getAdmissionRating } from '../data/facultyPresets';

interface ResultReviewProps {
  result: TestResult;
  profile: StudentProfile;
  onRetakeExam: () => void;
  onGoToDashboard: () => void;
  onGoBackToExamModes?: () => void;
}

export const ResultReview: React.FC<ResultReviewProps> = ({
  result,
  profile,
  onRetakeExam,
  onGoToDashboard,
  onGoBackToExamModes,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'incorrect' | 'flagged' | 'correct'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const handleReturnHome = () => {
    if (onGoBackToExamModes) {
      onGoBackToExamModes();
    } else {
      onRetakeExam();
    }
  };

  // Trigger celebration confetti if score is high (>= 65% accuracy)
  useEffect(() => {
    if (result.percentage >= 65) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'],
        });
      } catch (err) {
        console.error('Confetti error', err);
      }
    }
  }, [result.percentage]);

  // Aggregate Calculation based on percentage score
  const jambScore = profile.jambScore || 280;
  const scaledPostUtmeScore = Math.round((result.percentage / 100) * 400);
  const { jambPoints, postUtmePoints, totalAggregate } = calculateOauAggregate(
    jambScore,
    scaledPostUtmeScore
  );
  const admissionRating = getAdmissionRating(totalAggregate, profile.targetCourse);

  // Filtered Questions
  const filteredQuestions = result.questions.filter((q) => {
    const ans = result.answers[q.id];
    const isCorrect = ans?.selectedOptionIndex === q.correctOptionIndex;
    const isFlagged = ans?.isFlagged;

    if (filterTab === 'incorrect') return !isCorrect;
    if (filterTab === 'correct') return isCorrect;
    if (filterTab === 'flagged') return isFlagged;
    return true;
  });

  // Format time
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}m ${remainder}s`;
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-6 sm:space-y-8">
      
      {/* TOP NAVIGATION BREADCRUMB & ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReturnHome}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            title="Return to Exam Modes"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Exam Modes</span>
          </button>
          
          <button
            onClick={onGoToDashboard}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            title="Open Candidate Activity Hub"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">My Activity Hub</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onRetakeExam}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>

          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Result</span>
          </button>
        </div>
      </div>
      
      {/* 1. SCORE HERO CARD */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 sm:p-10 shadow-2xl overflow-hidden border border-blue-800/40">
        
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Main Score Output */}
          <div className="lg:col-span-2 space-y-3">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-purple-200">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>OAU Post-UTME Official CBT Marking Result</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {result.totalCorrect !== undefined ? result.totalCorrect : result.totalScore}
              <span className="text-xl sm:text-2xl font-bold text-blue-200 ml-1">/ {result.totalQuestions || 40}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-blue-100 font-medium">
              <span className="bg-emerald-500/30 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/40 font-bold">
                {result.percentage}% Overall Accuracy
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/15">
                {result.totalCorrect} Correct of {result.totalQuestions} Questions
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/15 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-300" />
                Time: {formatTime(result.timeTakenSeconds)}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-blue-200/90 pt-1">
              Candidate: <strong className="text-white">{result.studentName}</strong> • Target: <strong className="text-white">{result.targetCourse}</strong>
            </p>
          </div>

          {/* OAU Composite Aggregate Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-blue-200 uppercase tracking-wider">
              <span>OAU Composite Aggregate</span>
              <span className="text-[10px] bg-purple-500/40 px-2 py-0.5 rounded text-purple-200">
                50:50 Formula
              </span>
            </div>

            <div className="text-3xl font-black text-white font-mono">
              {totalAggregate}%
            </div>

            <div className="space-y-1.5 text-xs text-blue-100">
              <div className="flex justify-between">
                <span>JAMB ({jambScore}/400):</span>
                <span className="font-mono font-bold">{jambPoints}%</span>
              </div>
              <div className="flex justify-between">
                <span>Post-UTME ({result.totalScore}/400):</span>
                <span className="font-mono font-bold">{postUtmePoints}%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/15">
              <div className="text-[11px] font-bold text-emerald-300">
                {admissionRating.verdict}
              </div>
              <div className="text-[10px] text-blue-200/80 mt-0.5">
                {admissionRating.recommendation}
              </div>
            </div>
          </div>

        </div>

        {/* Action buttons on card */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              id="retake-exam-btn"
              onClick={onRetakeExam}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold btn-effect-secondary cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Mock Exam</span>
            </button>
            
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold btn-effect-secondary cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Slip</span>
            </button>
          </div>

          <button
            onClick={onGoToDashboard}
            className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 text-white text-xs font-extrabold btn-effect-primary cursor-pointer"
          >
            <span>View Past Activities & Analytics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 2. SUBJECT-BY-SUBJECT BREAKDOWN CARDS */}
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-4 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Subject-by-Subject Performance Scorecard</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {result.subjectBreakdowns.map((sb) => {
            const isTop = sb.scorePercentage >= 70;
            const isWeak = sb.scorePercentage < 50;

            return (
              <div
                key={sb.subjectId}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                    {SUBJECT_METADATA[sb.subjectId]?.shortName || sb.subjectId}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isTop
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : isWeak
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {sb.scorePercentage}%
                  </span>
                </div>

                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {sb.subjectName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {sb.correct} of {sb.totalQuestions} Questions Correct
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isTop ? 'bg-emerald-500' : isWeak ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${sb.scorePercentage}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                  <span>Scaled: {sb.scaledScore}/100</span>
                  <span>Time: {formatTime(sb.timeSpentSeconds)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. QUESTION-BY-QUESTION REVIEW */}
      <div className="space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Question-by-Question Solution & Explanations</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review correct answers, explanations, and speed tips.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg btn-effect-secondary cursor-pointer transition-all ${
                filterTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All ({result.questions.length})
            </button>
            <button
              onClick={() => setFilterTab('incorrect')}
              className={`px-3 py-1.5 rounded-lg btn-effect-secondary cursor-pointer transition-all ${
                filterTab === 'incorrect'
                  ? 'bg-rose-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Incorrect ({result.questions.filter((q) => result.answers[q.id]?.selectedOptionIndex !== q.correctOptionIndex).length})
            </button>
            <button
              onClick={() => setFilterTab('flagged')}
              className={`px-3 py-1.5 rounded-lg btn-effect-secondary cursor-pointer transition-all ${
                filterTab === 'flagged'
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Flagged ({result.questions.filter((q) => result.answers[q.id]?.isFlagged).length})
            </button>
            <button
              onClick={() => setFilterTab('correct')}
              className={`px-3 py-1.5 rounded-lg btn-effect-secondary cursor-pointer transition-all ${
                filterTab === 'correct'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Correct ({result.totalCorrect})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const ans = result.answers[q.id];
            const isCorrect = ans?.selectedOptionIndex === q.correctOptionIndex;
            const isExpanded = expandedQuestionId === q.id || filterTab === 'incorrect';

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10'
                }`}
              >
                
                {/* Question Header Card Bar */}
                <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                  
                  <div className="flex items-start space-x-3">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold mt-0.5 shrink-0 ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                          {q.subjectName}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {q.topic}
                        </span>
                        {q.year && (
                          <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">
                            {q.year}
                          </span>
                        )}
                      </div>

                      <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed mt-1">
                        {q.questionText}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                </div>

                {/* Options List */}
                <div className="px-4 sm:px-5 pb-3 space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isCandidateChoice = ans?.selectedOptionIndex === optIdx;
                    const isTheCorrectChoice = q.correctOptionIndex === optIdx;

                    let cardStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300';
                    let badge = null;

                    if (isTheCorrectChoice) {
                      cardStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
                      badge = (
                        <span className="text-[10px] font-extrabold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded shadow-2xs">
                          ✓ Correct Answer
                        </span>
                      );
                    } else if (isCandidateChoice && !isTheCorrectChoice) {
                      cardStyle = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 line-through';
                      badge = (
                        <span className="text-[10px] font-extrabold uppercase bg-rose-600 text-white px-2 py-0.5 rounded no-underline inline-block shadow-2xs">
                          ✕ Your Answer
                        </span>
                      );
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm ${cardStyle}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs bg-black/5 dark:bg-white/10">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {badge}
                      </div>
                    );
                  })}
                </div>

                {/* Instant Mini Explanation Callout for Incorrect or Skipped Questions (Always visible for fast learning) */}
                {!isCorrect && (
                  <div className="mx-4 sm:mx-5 mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 font-extrabold text-rose-700 dark:text-rose-400">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Mini Explanation & Solution Breakdown</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                        Correct Option: {String.fromCharCode(65 + q.correctOptionIndex)}
                      </span>
                    </div>

                    <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                      {q.explanation || 'The correct option satisfies the standard Post-UTME syllabus requirement for this question.'}
                    </p>

                    {q.keyConcept && (
                      <div className="flex items-center space-x-1 text-[11px] text-indigo-700 dark:text-indigo-400 font-semibold pt-1 border-t border-rose-200/50 dark:border-rose-900/40">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Core Concept to Master: <strong>{q.keyConcept}</strong></span>
                      </div>
                    )}
                  </div>
                )}

                {/* Detailed Solution Explanation Box (When Expanded) */}
                {isExpanded && isCorrect && (
                  <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/70 dark:bg-slate-950/40 rounded-b-2xl">
                    
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="flex items-center space-x-1.5 font-bold text-indigo-700 dark:text-indigo-400">
                        <GraduationCap className="w-4 h-4" />
                        <span>Verified Solution & Rationale:</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-line">
                        {q.explanation}
                      </p>
                      {q.oauExamTip && (
                        <div className="mt-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-medium">
                          <strong>💡 OAU Speed Tip:</strong> {q.oauExamTip}
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* BOTTOM ACTION BANNER */}
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-800/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-white">Finished reviewing this exam?</h3>
            <p className="text-xs text-indigo-200">Return to Exam Modes to practice another subject or explore your full activity timeline.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleReturnHome}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Exam Modes</span>
            </button>

            <button
              onClick={onGoToDashboard}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <BarChart3 className="w-4 h-4" />
              <span>My Activity Hub</span>
            </button>

            <button
              onClick={onRetakeExam}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Mock Exam</span>
            </button>
          </div>
        </div>

      </div>

      {/* 4. PRINTABLE OFFICIAL RESULT SLIP MODAL */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white text-slate-900 p-8 shadow-2xl space-y-6 my-8 animate-in zoom-in-95">
            
            {/* Header with OAU header */}
            <div className="text-center pb-4 border-b-2 border-slate-900">
              <div className="font-serif font-black text-xl tracking-wide uppercase text-blue-900">
                Obafemi Awolowo University (OAU), Ile-Ife
              </div>
              <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Post-UTME Computer Based Testing Simulator
              </div>
              <div className="font-sans font-semibold text-[11px] text-indigo-700 mt-0.5">
                Official Candidate Mock Performance Statement
              </div>
              <div className="mt-3 inline-block px-4 py-1 rounded-full bg-slate-100 text-xs font-extrabold tracking-wider uppercase border border-slate-300">
                Post-UTME CBT Assessment Statement
              </div>
            </div>

            {/* Candidate Meta Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Candidate Name:</span>
                <span className="font-extrabold text-sm text-slate-900">{result.studentName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Target Course / Faculty:</span>
                <span className="font-bold text-slate-900">{result.targetCourse}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Exam Date & Session:</span>
                <span className="font-medium text-slate-800">{result.date} • {result.examTitle}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Time Spent:</span>
                <span className="font-medium text-slate-800">{formatTime(result.timeTakenSeconds)}</span>
              </div>
            </div>

            {/* Subject Scores Table */}
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-700">
                  <th className="py-2 px-3">Subject</th>
                  <th className="py-2 px-3 text-center">Attempted</th>
                  <th className="py-2 px-3 text-center">Score</th>
                  <th className="py-2 px-3 text-center">Percentage</th>
                  <th className="py-2 px-3 text-right">Scaled (/100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.subjectBreakdowns.map((sb) => (
                  <tr key={sb.subjectId}>
                    <td className="py-2 px-3 font-semibold">{sb.subjectName}</td>
                    <td className="py-2 px-3 text-center">{sb.attempted}/{sb.totalQuestions}</td>
                    <td className="py-2 px-3 text-center">{sb.correct}/{sb.totalQuestions}</td>
                    <td className="py-2 px-3 text-center font-bold">{sb.scorePercentage}%</td>
                    <td className="py-2 px-3 text-right font-mono font-bold">{sb.scaledScore}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-black text-slate-900 border-t-2 border-slate-900">
                  <td className="py-2.5 px-3">TOTAL POST-UTME SCORE</td>
                  <td className="py-2.5 px-3 text-center">{result.totalAttempted}/{result.totalQuestions}</td>
                  <td className="py-2.5 px-3 text-center">{result.totalCorrect}/{result.totalQuestions}</td>
                  <td className="py-2.5 px-3 text-center text-emerald-700">{result.percentage}%</td>
                  <td className="py-2.5 px-3 text-right text-base text-blue-900">{result.totalCorrect !== undefined ? result.totalCorrect : result.totalScore} / {result.totalQuestions || 40}</td>
                </tr>
              </tbody>
            </table>

            {/* Composite Aggregate Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>OAU Composite Admission Aggregate (JAMB 50% + Post-UTME 50%):</span>
                <span className="text-base text-purple-700">{totalAggregate}%</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Admission Standing: <strong>{admissionRating.verdict}</strong> ({admissionRating.recommendation})
              </p>
            </div>

            {/* Verification signature seal */}
            <div className="flex justify-between items-end pt-4 border-t border-slate-200 text-[10px] text-slate-500">
              <div>
                <div className="font-mono font-bold text-slate-800">REF: OAU-CBT-{result.timestamp}</div>
                <div>Authenticated OAU Post-UTME Simulation Engine</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-slate-800 text-xs">DLCF Academic Committee</div>
                <div>Post-UTME Preparation Directorate</div>
              </div>
            </div>

            {/* Print & Close Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold"
              >
                <Printer className="w-4 h-4" />
                <span>Print Statement</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
