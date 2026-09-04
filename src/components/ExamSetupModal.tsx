import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Layers, 
  Timer, 
  History, 
  Zap, 
  BookOpen, 
  ShieldCheck, 
  GraduationCap,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SUBJECT_METADATA } from '../data/oauQuestions';
import { SubjectId, StudentProfile } from '../types';

interface ExamSetupModalProps {
  profile: StudentProfile;
  pastTestsCount?: number;
  onViewPastActivities?: () => void;
  onStartExam: (config: {
    selectedSubjects: SubjectId[];
    examMode: 'standard_oau_mock' | 'subject_drill' | 'speed_sprint' | 'untimed_practice';
    questionsPerSubject: number;
    durationMinutes: number;
    examTitle: string;
  }) => void;
}

export const ExamSetupModal: React.FC<ExamSetupModalProps> = ({ 
  profile, 
  pastTestsCount = 0,
  onViewPastActivities,
  onStartExam 
}) => {
  // Inherit and remember subjects configured from first page (registration/login)
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>(
    profile.subjectCombination && profile.subjectCombination.length > 0
      ? profile.subjectCombination
      : ['biology', 'chemistry', 'physics', 'aptitude']
  );
  const [examMode, setExamMode] = useState<'standard_oau_mock' | 'subject_drill' | 'speed_sprint' | 'untimed_practice'>('standard_oau_mock');
  const [singleSubject, setSingleSubject] = useState<SubjectId>(
    selectedSubjects[0] || 'aptitude'
  );

  // Toggle elective subject (Aptitude Test is strictly compulsory for OAU)
  const handleToggleSubject = (subId: SubjectId) => {
    if (subId === 'aptitude') return; // Aptitude is compulsory for OAU Post-UTME

    if (selectedSubjects.includes(subId)) {
      if (selectedSubjects.length > 2) {
        setSelectedSubjects(selectedSubjects.filter((id) => id !== subId));
      }
    } else {
      if (selectedSubjects.length < 4) {
        setSelectedSubjects([...selectedSubjects, subId]);
      } else {
        const nonAptitude = selectedSubjects.filter((id) => id !== 'aptitude');
        setSelectedSubjects(['aptitude', nonAptitude[0], nonAptitude[1], subId]);
      }
    }
  };

  const handleLaunch = () => {
    let finalSubjects: SubjectId[] = [];
    let qPerSubject = 5;
    let duration = 40;
    let title = 'OAU Post-UTME 4-Subject CBT Mock';

    if (examMode === 'standard_oau_mock') {
      finalSubjects = selectedSubjects;
      qPerSubject = 10;
      duration = 40;
      title = `OAU Post-UTME Mock (${finalSubjects.map((s) => SUBJECT_METADATA[s]?.shortName || s).join(' • ')})`;
    } else if (examMode === 'speed_sprint') {
      finalSubjects = selectedSubjects;
      qPerSubject = 5;
      duration = 15;
      title = 'OAU 15-Minute Rapid Speed Blitz';
    } else if (examMode === 'subject_drill') {
      finalSubjects = [singleSubject];
      qPerSubject = 20;
      duration = 20;
      title = `${SUBJECT_METADATA[singleSubject]?.name || singleSubject} Specialized Drill`;
    } else if (examMode === 'untimed_practice') {
      finalSubjects = selectedSubjects;
      qPerSubject = 10;
      duration = 0; // 0 indicates untimed
      title = 'Untimed Deep Study Practice Session';
    }

    onStartExam({
      selectedSubjects: finalSubjects,
      examMode,
      questionsPerSubject: qPerSubject,
      durationMinutes: duration,
      examTitle: title,
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-6">
      
      {/* 1. CANDIDATE PROFILE & REMEMBERED FACULTY BANNER */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-800/40">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-0.5 rounded-full bg-white/10 text-blue-200 text-xs font-semibold border border-white/15">
              Candidate Settings Remembered
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Welcome, {profile.fullName} 🎓
          </h2>
          <div className="text-xs sm:text-sm text-blue-200 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Faculty: <strong className="text-white">{profile.targetFaculty}</strong></span>
            <span>•</span>
            <span>Course: <strong className="text-white">{profile.targetCourse}</strong></span>
            <span>•</span>
            <span>JAMB: <strong className="text-white">{profile.jambScore}</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {pastTestsCount > 0 && onViewPastActivities && (
            <button
              onClick={onViewPastActivities}
              id="btn-view-past-activity"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all active:scale-95"
            >
              <History className="w-4 h-4 text-purple-300" />
              <span>Past Activities ({pastTestsCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. THE 4 EXAM MODES SELECTION */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
            Select 1 of the 4 Exam Modes
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Choose your preferred CBT simulation mode for your test session.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Mode 1: Standard OAU Post-UTME Mock */}
          <div
            id="mode-standard-mock"
            onClick={() => setExamMode('standard_oau_mock')}
            className={`p-5 rounded-3xl border btn-option-card transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              examMode === 'standard_oau_mock'
                ? 'bg-gradient-to-br from-blue-50 to-indigo-50/80 dark:from-blue-950/60 dark:to-indigo-950/60 border-blue-600 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                {examMode === 'standard_oau_mock' && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                1. Standard OAU CBT Mock
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Full 4-subject exam including General Aptitude Test under standard OAU test conditions.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>40 Minutes</span>
              </span>
              <span>4 Subjects</span>
            </div>
          </div>

          {/* Mode 2: Speed Sprint */}
          <div
            id="mode-speed-sprint"
            onClick={() => setExamMode('speed_sprint')}
            className={`p-5 rounded-3xl border btn-option-card transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              examMode === 'speed_sprint'
                ? 'bg-gradient-to-br from-amber-50 to-orange-50/80 dark:from-amber-950/60 dark:to-orange-950/60 border-amber-500 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                {examMode === 'speed_sprint' && (
                  <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                )}
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                2. 15-Min Speed Blitz
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Rapid lightning simulation designed to build reflexive answering speed and quick time management.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>15 Minutes</span>
              </span>
              <span>Fast Pace</span>
            </div>
          </div>

          {/* Mode 3: Subject Drill */}
          <div
            id="mode-subject-drill"
            onClick={() => setExamMode('subject_drill')}
            className={`p-5 rounded-3xl border btn-option-card transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              examMode === 'subject_drill'
                ? 'bg-gradient-to-br from-purple-50 to-indigo-50/80 dark:from-purple-950/60 dark:to-indigo-950/60 border-purple-600 ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/10'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                {examMode === 'subject_drill' && (
                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                )}
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                3. Single Subject Drill
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Focus intensively on one specific subject (e.g. Aptitude Test, Physics, or Math) to master weak topics.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-purple-500" />
                <span>15 Minutes</span>
              </span>
              <span>1 Subject</span>
            </div>
          </div>

          {/* Mode 4: Untimed Practice */}
          <div
            id="mode-untimed-practice"
            onClick={() => setExamMode('untimed_practice')}
            className={`p-5 rounded-3xl border btn-option-card transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              examMode === 'untimed_practice'
                ? 'bg-gradient-to-br from-emerald-50 to-teal-50/80 dark:from-emerald-950/60 dark:to-teal-950/60 border-emerald-600 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                {examMode === 'untimed_practice' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                )}
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                4. Untimed Study Practice
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Zero timer stress. Review questions thoroughly at your own relaxed pace and read in-depth explanations.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>No Countdown</span>
              </span>
              <span>All Subjects</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. REMEMBERED SUBJECT COMBINATION & LAUNCH */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 ring-1 ring-blue-500/10">
        
        {examMode === 'subject_drill' ? (
          /* Single Subject Selector for Subject Drill mode */
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
              Choose Subject to Drill:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(Object.keys(SUBJECT_METADATA) as SubjectId[]).map((subId) => {
                const isSelected = singleSubject === subId;
                return (
                  <button
                    key={subId}
                    type="button"
                    onClick={() => setSingleSubject(subId)}
                    className={`p-3 rounded-2xl border text-left font-bold text-xs btn-option-card cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-md'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{SUBJECT_METADATA[subId]?.name || subId}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* 4-Subject Combination remembered from Registration */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Your 4-Subject Combination for {profile.targetCourse}:
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  (General Aptitude is compulsory for OAU Post-UTME)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {selectedSubjects.length} / 4 Configured
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(Object.keys(SUBJECT_METADATA) as SubjectId[]).map((subId) => {
                const isSelected = selectedSubjects.includes(subId);
                const isAptitude = subId === 'aptitude';

                return (
                  <button
                    key={subId}
                    type="button"
                    onClick={() => handleToggleSubject(subId)}
                    className={`p-3.5 rounded-2xl border text-left font-bold text-xs btn-option-card cursor-pointer transition-all flex flex-col justify-between space-y-1.5 ${
                      isSelected
                        ? isAptitude
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-transparent shadow-md'
                          : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-transparent shadow-md'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{SUBJECT_METADATA[subId]?.name || subId}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 ml-1 shrink-0" />}
                    </div>
                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                      {isAptitude ? '★ Compulsory OAU' : SUBJECT_METADATA[subId]?.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Launch Button */}
        <button
          onClick={handleLaunch}
          id="btn-launch-cbt-exam"
          className="w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-extrabold text-base btn-effect-primary cursor-pointer active:scale-[0.98] transition-all"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Start CBT Exam Session Now</span>
        </button>

      </div>

    </div>
  );
};
