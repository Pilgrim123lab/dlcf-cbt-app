import React, { useState, useEffect, useCallback } from 'react';
import { FileCheck2 } from 'lucide-react';
import { Header, AppView } from './components/Header';
import { StudentLogin } from './components/StudentLogin';
import { ExamSetupModal } from './components/ExamSetupModal';
import { CBTExamEngine } from './components/CBTExamEngine';
import { ResultReview } from './components/ResultReview';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CoordinatorContactModal } from './components/CoordinatorContactModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { 
  StudentProfile, 
  TestResult, 
  SubjectId, 
  Question 
} from './types';
import { 
  getActiveProfile, 
  saveProfile, 
  getStoredTestHistory, 
  saveTestResult, 
  clearStoredTestHistory,
  logoutStudent,
  getStoredTheme, 
  setStoredTheme,
  mergeCustomQuestionsWithCloud
} from './utils/storage';
import { 
  fetchAllCloudCustomQuestions, 
  subscribeToCloudCustomQuestions 
} from './lib/cloudDb';
import { generateMockExam, getQuestionsForSubject, OAU_QUESTION_BANK } from './data/oauQuestions';

// Check if current browser URL corresponds to the separate admin page route
const isPathAdminRoute = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path.startsWith('/admin') ||
    path.includes('/admin') ||
    hash.includes('admin') ||
    search.includes('page=admin') ||
    search.includes('admin=true') ||
    search.includes('route=admin')
  );
};

export function App() {
  // Theme state ('light' | 'dark')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = getStoredTheme();
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
      return true;
    } else {
      document.documentElement.classList.remove('dark');
      return false;
    }
  });

  // Dedicated Route state: 'student' (the primary CBT app) vs 'admin' (the separate Admin / Examiner page)
  const [currentRoute, setCurrentRoute] = useState<'student' | 'admin'>(() => 
    isPathAdminRoute() ? 'admin' : 'student'
  );

  // Active logged-in Candidate Profile (Requires authentication on first visit to link)
  const [profile, setProfile] = useState<StudentProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    const isSessionAuth = sessionStorage.getItem('oau_cbt_session_authenticated') === 'true';
    return isSessionAuth ? getActiveProfile() : null;
  });

  // Student sub-view navigation history stack state
  const [viewHistory, setViewHistory] = useState<AppView[]>(['exam_setup']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Derived current student view
  const currentView: AppView = viewHistory[historyIndex] || 'exam_setup';
  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < viewHistory.length - 1;

  // Test History state for the current active student
  const [testHistory, setTestHistory] = useState<TestResult[]>(() => {
    const active = getActiveProfile();
    return active ? getStoredTestHistory(active.id) : [];
  });

  // Active Exam state
  const [activeExamConfig, setActiveExamConfig] = useState<{
    questions: Question[];
    selectedSubjects: SubjectId[];
    durationMinutes: number;
    examTitle: string;
    examMode: 'standard_oau_mock' | 'subject_drill' | 'speed_sprint' | 'untimed_practice';
  } | null>(null);

  // Current / Active Result being reviewed
  const [activeResult, setActiveResult] = useState<TestResult | null>(() => {
    const active = getActiveProfile();
    const history = active ? getStoredTestHistory(active.id) : [];
    return history.length > 0 ? history[0] : null;
  });

  // Modals state
  const [isCoordinatorModalOpen, setIsCoordinatorModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Synchronize theme with DOM
  useEffect(() => {
    setStoredTheme(isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Synchronize URL route with browser history (popstate / back / forward button)
  useEffect(() => {
    const handlePopState = () => {
      const isAdmin = isPathAdminRoute();
      setCurrentRoute(isAdmin ? 'admin' : 'student');
      if (isAdmin) {
        document.title = 'DLCF CBT - Administrator & Examiner Portal';
      } else {
        document.title = 'OAU Post UTME Examination Simulation';
      }
    };

    // Initial page title configuration based on route
    if (isPathAdminRoute()) {
      document.title = 'DLCF CBT - Administrator & Examiner Portal';
    } else {
      document.title = 'OAU Post UTME Examination Simulation';
    }

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Real-time synchronization of Custom Past Questions from Cloud Firestore for all candidates
  useEffect(() => {
    // Initial fetch from Cloud Firestore
    fetchAllCloudCustomQuestions().then((questions) => {
      if (questions && questions.length > 0) {
        mergeCustomQuestionsWithCloud(questions);
      }
    });

    // Subscribe to real-time custom question updates pushed by examiners
    const unsubscribe = subscribeToCloudCustomQuestions((questions) => {
      if (questions && questions.length > 0) {
        mergeCustomQuestionsWithCloud(questions);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Navigate to dedicated Admin Route (/admin)
  const navigateToAdmin = useCallback(() => {
    if (currentView === 'active_exam') {
      if (!window.confirm('An active exam is in progress. Are you sure you want to navigate to the separate Admin Portal?')) {
        return;
      }
    }

    try {
      if (typeof window !== 'undefined' && window.location.pathname !== '/admin') {
        window.history.pushState({ route: 'admin' }, '', '/admin');
      }
    } catch {
      // Ignore if iframe restricts history rewrite
    }
    setCurrentRoute('admin');
    document.title = 'DLCF CBT - Administrator & Examiner Portal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Return from Admin page to the Student CBT Portal (/)
  const navigateToStudentPortal = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.history.pushState({ route: 'student' }, '', '/');
      }
    } catch {
      // Ignore if iframe restricts history rewrite
    }
    setCurrentRoute('student');
    document.title = 'OAU Post UTME Examination Simulation';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Safe student view navigation handler
  const navigateTo = useCallback((newView: AppView) => {
    if (newView === 'admin_portal') {
      navigateToAdmin();
      return;
    }

    if (currentView === newView) return;
    
    // Only warn if an actual active exam configuration is running
    if (currentView === 'active_exam' && activeExamConfig && newView !== 'active_exam') {
      if (!window.confirm('An active exam is in progress. Are you sure you want to navigate to another page?')) {
        return;
      }
    }

    setViewHistory((prev) => {
      const nextHistory = prev.slice(0, historyIndex + 1);
      return [...nextHistory, newView];
    });
    setHistoryIndex((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, historyIndex, activeExamConfig, navigateToAdmin]);

  // Go Back in Student History
  const handleGoBack = useCallback(() => {
    if (historyIndex > 0) {
      if (currentView === 'active_exam' && activeExamConfig) {
        if (!window.confirm('An active exam is in progress. Are you sure you want to go back?')) {
          return;
        }
      }

      const targetView = viewHistory[historyIndex - 1];
      // If the target view is active_exam but no active exam session exists, route to exam_setup
      if (targetView === 'active_exam' && !activeExamConfig) {
        setViewHistory(['exam_setup', 'result_review']);
        setHistoryIndex(0);
      } else {
        setHistoryIndex((prev) => prev - 1);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If at root of history but on a sub-page, return to exam modes
      if (currentView !== 'exam_setup') {
        navigateTo('exam_setup');
      }
    }
  }, [historyIndex, currentView, activeExamConfig, viewHistory, navigateTo]);

  // Go Forward in Student History
  const handleGoForward = useCallback(() => {
    if (historyIndex < viewHistory.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [historyIndex, viewHistory.length]);

  // Fallback recovery: Prevent stuck empty state if active_exam has no config
  useEffect(() => {
    if (currentView === 'active_exam' && !activeExamConfig) {
      setViewHistory(['exam_setup']);
      setHistoryIndex(0);
    }
  }, [currentView, activeExamConfig]);

  // Keyboard navigation support: Alt+Left / Alt+Right
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentRoute === 'admin') return;
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handleGoBack();
      } else if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        handleGoForward();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGoBack, handleGoForward, currentRoute]);

  // When candidate logs in or registers
  const handleLoginSuccess = (loggedInProfile: StudentProfile) => {
    try {
      sessionStorage.setItem('oau_cbt_session_authenticated', 'true');
    } catch {
      // Ignore if sessionStorage is blocked
    }
    setProfile(loggedInProfile);
    const history = getStoredTestHistory(loggedInProfile.id);
    setTestHistory(history);
    if (history.length > 0) {
      setActiveResult(history[0]);
    }
    setViewHistory(['exam_setup']);
    setHistoryIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Candidate switches account / logs out
  const handleLogout = () => {
    try {
      sessionStorage.removeItem('oau_cbt_session_authenticated');
    } catch {
      // Ignore if sessionStorage is blocked
    }
    logoutStudent();
    setProfile(null);
    setTestHistory([]);
    setActiveExamConfig(null);
    setActiveResult(null);
    setViewHistory(['exam_setup']);
    setHistoryIndex(0);
  };

  // Update profile
  const handleSaveProfile = (updated: StudentProfile) => {
    setProfile(updated);
    saveProfile(updated);
  };

  // Clear past history for active candidate
  const handleClearHistory = () => {
    if (!profile) return;
    if (window.confirm('Are you sure you want to clear your past mock exam history?')) {
      clearStoredTestHistory(profile.id);
      setTestHistory([]);
      setActiveResult(null);
    }
  };

  // Launch a new exam session
  const handleStartExam = (config: {
    selectedSubjects: SubjectId[];
    examMode: 'standard_oau_mock' | 'subject_drill' | 'speed_sprint' | 'untimed_practice';
    questionsPerSubject: number;
    durationMinutes: number;
    examTitle: string;
  }) => {
    let generatedQuestions: Question[] = [];

    if (config.examMode === 'subject_drill' && config.selectedSubjects.length === 1) {
      generatedQuestions = getQuestionsForSubject(config.selectedSubjects[0], config.questionsPerSubject);
    } else {
      generatedQuestions = generateMockExam(config.selectedSubjects, config.questionsPerSubject);
    }

    if (generatedQuestions.length === 0) {
      generatedQuestions = OAU_QUESTION_BANK.slice(0, 40);
    }

    setActiveExamConfig({
      questions: generatedQuestions,
      selectedSubjects: config.selectedSubjects,
      durationMinutes: config.durationMinutes,
      examTitle: config.examTitle,
      examMode: config.examMode,
    });

    navigateTo('active_exam');
  };

  // Handle Exam Finished & Graded
  const handleSubmitExam = (result: TestResult) => {
    const studentId = profile?.id;
    const updatedHistory = saveTestResult(result, studentId);
    setTestHistory(updatedHistory);
    setActiveResult(result);
    setActiveExamConfig(null);

    // Replace 'active_exam' with 'result_review' in viewHistory so clicking Back cleanly takes student to exam modes
    setViewHistory((prev) => {
      const filtered = prev.filter((v) => v !== 'active_exam');
      const base = filtered.length > 0 ? filtered : ['exam_setup'];
      return [...base, 'result_review'];
    });
    setHistoryIndex((prev) => {
      return prev > 0 ? prev : 1;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel/Exit active exam
  const handleExitExam = () => {
    setActiveExamConfig(null);
    setViewHistory((prev) => {
      const filtered = prev.filter((v) => v !== 'active_exam');
      return filtered.length > 0 ? filtered : ['exam_setup'];
    });
    setHistoryIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // ROUTE 1: SEPARATE DEDICATED ADMIN SITE / PAGE (/admin)
  // =========================================================================
  if (currentRoute === 'admin') {
    return (
      <AdminDashboard
        onBackToApp={navigateToStudentPortal}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  // =========================================================================
  // ROUTE 2: STUDENT CBT PORTAL (UNAUTHENTICATED & AUTHENTICATED SESSIONS)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 font-sans flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      
      {/* 1. Global Navigation Bar at the top with Back & Forward controls */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenCoordinatorModal={() => setIsCoordinatorModalOpen(true)}
        onLogout={handleLogout}
        profile={profile}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        isExamInProgress={currentView === 'active_exam' && activeExamConfig !== null}
        onGoToAdmin={navigateToAdmin}
      />

      {/* 2. Main Screen Routing */}
      <main className="flex-1 flex flex-col">
        
        {/* Unauthenticated State: Candidate Registration / Selection */}
        {!profile ? (
          <div className="flex-1 flex flex-col justify-center">
            <StudentLogin
              onLoginSuccess={handleLoginSuccess}
              onOpenAdminPortal={navigateToAdmin}
              onOpenCoordinatorContact={() => setIsCoordinatorModalOpen(true)}
              isDarkMode={isDarkMode}
              onToggleTheme={handleToggleTheme}
            />
          </div>
        ) : (
          <>
            {/* VIEW 1: 4 Exam Modes & Subject Selection */}
            {currentView === 'exam_setup' && (
              <ExamSetupModal
                profile={profile}
                pastTestsCount={testHistory.length}
                onViewPastActivities={() => navigateTo('dashboard')}
                onStartExam={handleStartExam}
              />
            )}

            {/* VIEW 2: Active CBT Exam Engine */}
            {currentView === 'active_exam' && activeExamConfig && (
              <CBTExamEngine
                questions={activeExamConfig.questions}
                selectedSubjects={activeExamConfig.selectedSubjects}
                durationMinutes={activeExamConfig.durationMinutes}
                examTitle={activeExamConfig.examTitle}
                examMode={activeExamConfig.examMode}
                profile={profile}
                onSubmitExam={handleSubmitExam}
                onExitExam={handleExitExam}
              />
            )}

            {/* VIEW 3: Instant Marking Result & Question Review */}
            {currentView === 'result_review' && (
              activeResult ? (
                <ResultReview
                  result={activeResult}
                  profile={profile}
                  onRetakeExam={() => navigateTo('exam_setup')}
                  onGoToDashboard={() => navigateTo('dashboard')}
                  onGoBackToExamModes={() => navigateTo('exam_setup')}
                />
              ) : (
                <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No Test Result Selected</h3>
                  <p className="text-xs text-slate-500">Take a mock exam or choose a completed test from your performance history to view comprehensive question reviews.</p>
                  <button 
                    onClick={() => navigateTo('exam_setup')} 
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer shadow-md"
                  >
                    Go to Exam Modes
                  </button>
                </div>
              )
            )}

            {/* VIEW 4: Candidate Past Activities & Performance Dashboard */}
            {currentView === 'dashboard' && (
              <StudentDashboard
                profile={profile}
                testHistory={testHistory}
                onStartNewMock={() => navigateTo('exam_setup')}
                onSelectPastResult={(res) => {
                  setActiveResult(res);
                  navigateTo('result_review');
                }}
                onOpenProfile={() => setIsProfileModalOpen(true)}
                onClearHistory={handleClearHistory}
              />
            )}
          </>
        )}

      </main>

      {/* 3. Single Unified Global Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-4 sm:py-5 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-blue-900 dark:text-blue-400">
              Deeper Life Campus Fellowship (DLCF)
            </span>
            <span>•</span>
            <span className="font-semibold text-purple-700 dark:text-purple-300">
              OAU Post UTME Examination Simulation
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Admin link commented out as requested
            {!profile && (
              <>
                <button
                  onClick={navigateToAdmin}
                  className="text-amber-700 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
                >
                  Admin / Examiner Portal (/admin)
                </button>
                <span>•</span>
              </>
            )}
            */}
            <button
              onClick={() => setIsCoordinatorModalOpen(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
            >
              Coordinator Contact & Helpdesk
            </button>
            {profile && (
              <>
                <span>•</span>
                <span className="text-slate-600 dark:text-slate-300">
                  Candidate: <strong>{profile.fullName}</strong>
                </span>
              </>
            )}
          </div>
        </div>
      </footer>

      {/* 4. Global Modals */}
      
      {/* Coordinator Contact & Admissions Helpdesk Modal */}
      <CoordinatorContactModal
        isOpen={isCoordinatorModalOpen}
        onClose={() => setIsCoordinatorModalOpen(false)}
      />

      {/* Candidate Profile Settings Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

    </div>
  );
}

export default App;
