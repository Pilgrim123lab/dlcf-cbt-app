import React, { useMemo } from 'react';
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  PlayCircle, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  BookOpen, 
  Trash2, 
  AlertCircle,
  Zap,
  Award,
  Sparkles,
  Calculator
} from 'lucide-react';
import { StudentProfile, TestResult, SubjectId } from '../types';
import { calculateOauAggregate, getAdmissionRating } from '../data/facultyPresets';
import { SUBJECT_METADATA } from '../data/oauQuestions';

interface StudentDashboardProps {
  profile: StudentProfile;
  testHistory: TestResult[];
  onStartNewMock: () => void;
  onSelectPastResult: (result: TestResult) => void;
  onClearHistory?: () => void;
  onOpenProfile?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  testHistory = [],
  onStartNewMock,
  onSelectPastResult,
  onClearHistory,
  onOpenProfile,
}) => {
  const history = Array.isArray(testHistory) ? testHistory : [];
  const totalTests = history.length;

  // Aggregate stats across all tests
  const { averageScore, highestScore, totalQuestionsAnswered, averageAccuracy } = useMemo(() => {
    if (history.length === 0) {
      return { averageScore: 0, highestScore: 0, totalQuestionsAnswered: 0, averageAccuracy: 0 };
    }

    const scores = history.map((t) => t.totalScore || 0);
    const sumScores = scores.reduce((a, b) => a + b, 0);
    const avgScore = Math.round(sumScores / history.length);
    const maxScore = Math.max(...scores);

    const sumAccuracy = history.reduce((acc, t) => acc + (t.percentage || 0), 0);
    const avgAcc = Math.round(sumAccuracy / history.length);

    const totalQ = history.reduce((acc, t) => acc + (t.totalAttempted || 0), 0);

    return {
      averageScore: avgScore,
      highestScore: maxScore,
      totalQuestionsAnswered: totalQ,
      averageAccuracy: avgAcc,
    };
  }, [history]);

  // Subject Performance Breakdown across tests
  const subjectBreakdowns = useMemo(() => {
    const map: Record<string, { totalQ: number; correctQ: number; tests: number }> = {};

    history.forEach((test) => {
      if (Array.isArray(test.subjectBreakdowns)) {
        test.subjectBreakdowns.forEach((sb) => {
          if (!map[sb.subjectId]) {
            map[sb.subjectId] = { totalQ: 0, correctQ: 0, tests: 0 };
          }
          map[sb.subjectId].totalQ += sb.totalQuestions || 0;
          map[sb.subjectId].correctQ += sb.correct || 0;
          map[sb.subjectId].tests += 1;
        });
      }
    });

    return Object.entries(map).map(([subId, data]) => {
      const percentage = data.totalQ > 0 ? Math.round((data.correctQ / data.totalQ) * 100) : 0;
      return {
        subjectId: subId as SubjectId,
        name: SUBJECT_METADATA[subId as SubjectId]?.name || subId,
        shortName: SUBJECT_METADATA[subId as SubjectId]?.shortName || subId,
        percentage,
        totalQuestionsAttempted: data.totalQ,
        testsCount: data.tests,
      };
    }).sort((a, b) => b.percentage - a.percentage);
  }, [history]);

  // Overall OAU Aggregate using profile's JAMB score + average mock score (or benchmark)
  const predictedPostUtme = averageScore > 0 ? averageScore : 280;
  const { jambPoints, postUtmePoints, totalAggregate } = calculateOauAggregate(
    profile.jambScore,
    predictedPostUtme
  );
  const admissionRating = getAdmissionRating(totalAggregate, profile.targetCourse);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-8">
      
      {/* 1. WELCOME & QUICK PROFILE BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 sm:p-8 shadow-xl overflow-hidden border border-blue-800/40">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-8 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full bg-white/10 text-blue-200 text-xs font-semibold border border-white/20">
                Candidate Activity History & Analytics
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {profile.fullName}'s Performance Hub 🎓
            </h1>

            <p className="text-xs sm:text-sm text-blue-200 max-w-xl leading-relaxed">
              Target Course: <strong className="text-white">{profile.targetCourse}</strong> • JAMB: <strong className="text-white">{profile.jambScore}</strong> • Faculty: <strong className="text-white">{profile.targetFaculty}</strong>
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartNewMock}
              className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-xs sm:text-sm font-extrabold btn-effect-primary cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Launch New CBT Exam</span>
            </button>

            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 btn-effect-secondary cursor-pointer"
              >
                Edit Target
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. CORE STATS METRIC TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1: Average Mock Score */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Average Mock Score</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 font-mono">
            {averageScore > 0 ? averageScore : '---'}
            <span className="text-xs font-normal text-slate-400 ml-1">/ 400</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Across {totalTests} completed mock {totalTests === 1 ? 'session' : 'sessions'}
          </div>
        </div>

        {/* Metric 2: Highest Score */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Peak Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {highestScore > 0 ? highestScore : '---'}
            <span className="text-xs font-normal text-slate-400 ml-1">/ 400</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Best simulation performance
          </div>
        </div>

        {/* Metric 3: Overall Accuracy */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Average Accuracy</span>
            <Target className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
            {averageAccuracy > 0 ? `${averageAccuracy}%` : '---'}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Precision across all attempts
          </div>
        </div>

        {/* Metric 4: Projected Aggregate */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-purple-100 dark:border-slate-800 shadow-xs space-y-2 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/20 dark:to-slate-900">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Projected OAU Aggregate</span>
            <Calculator className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-700 dark:text-purple-300 font-mono">
            {totalAggregate}%
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 truncate">
            {admissionRating.verdict}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Past Exam History & Subject Mastery */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Past Activities & Test History */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Past Exam Sessions & Activity Logs</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any past session to review questions, answers, and explanations
                </p>
              </div>

              {testHistory.length > 0 && onClearHistory && (
                <button
                  onClick={onClearHistory}
                  className="text-xs text-slate-400 hover:text-rose-600 flex items-center space-x-1 transition-colors self-start sm:self-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              )}
            </div>

            {testHistory.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {testHistory.map((test, index) => (
                  <div
                    key={test.id || index}
                    className="py-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-3 rounded-2xl transition-all cursor-pointer group"
                    onClick={() => onSelectPastResult(test)}
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                        {test.examTitle}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-slate-600 dark:text-slate-300">{test.date}</span>
                        <span>•</span>
                        <span className="capitalize">{test.examMode.replace(/_/g, ' ')}</span>
                        <span>•</span>
                        <span>{Math.round(test.timeTakenSeconds / 60)} mins</span>
                      </div>

                      {/* Subject breakdown mini pills */}
                      {test.subjectBreakdowns && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {test.subjectBreakdowns.map((sb) => (
                            <span
                              key={sb.subjectId}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono"
                            >
                              {sb.subjectName.split(' ')[0]}: {sb.correct}/{sb.totalQuestions}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="text-right">
                        <div className="text-lg sm:text-xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                          {test.totalCorrect !== undefined ? test.totalCorrect : test.totalScore}/{test.totalQuestions || 40}
                        </div>
                        <div className="text-xs text-slate-400">
                          {test.percentage}%
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  No Past Mock Sessions Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Start your first 4-subject OAU Post-UTME simulation or 15-minute drill to record your activity.
                </p>
                <button
                  onClick={onStartNewMock}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Start First Mock Now</span>
                </button>
              </div>
            )}

          </div>

          {/* Subject Mastery Radar List */}
          {subjectBreakdowns.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  Subject Proficiency & Strengths
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Calculated from your past test answers
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subjectBreakdowns.map((sb) => (
                  <div
                    key={sb.subjectId}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {sb.name}
                      </span>
                      <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                        {sb.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          sb.percentage >= 70
                            ? 'bg-emerald-500'
                            : sb.percentage >= 50
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${sb.percentage}%` }}
                      />
                    </div>

                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5">
                      <span>{sb.totalQuestionsAttempted} Questions attempted</span>
                      <span>{sb.testsCount} {sb.testsCount === 1 ? 'session' : 'sessions'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right 1 Col: OAU Composite Aggregate & Cut-Off Insights */}
        <div className="space-y-6">
          
          {/* OAU 50:50 Aggregate Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-extrabold uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                Admission Calculator
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                OAU Composite Formula
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200">
                <span>JAMB Component (50%)</span>
                <span className="font-mono font-black text-sm">
                  {jambPoints}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200">
                <span>Post-UTME Component (50%)</span>
                <span className="font-mono font-black text-sm">
                  {postUtmePoints}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-2 shadow-md">
                <div className="text-xs text-slate-300">
                  Total Calculated Aggregate:
                </div>
                <div className="text-3xl font-black font-mono text-white">
                  {totalAggregate}%
                </div>
                <div className="text-[11px] text-emerald-300 font-semibold leading-relaxed pt-1 border-t border-white/10">
                  {admissionRating.recommendation}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Launch Card */}
          <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <Zap className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-black text-white">
                Ready for another practice?
              </h4>
              <p className="text-xs text-indigo-100 leading-relaxed">
                Consistent timed CBT mock simulations dramatically improve question recognition and test stamina.
              </p>
            </div>

            <button
              onClick={onStartNewMock}
              className="w-full py-3 rounded-2xl bg-white text-indigo-900 hover:bg-indigo-50 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>Configure Exam Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
