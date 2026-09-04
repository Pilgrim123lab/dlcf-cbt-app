import React from 'react';
import { 
  GraduationCap, 
  Moon, 
  Sun, 
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  PlayCircle,
  Layers,
  FileCheck2,
  BarChart3,
  ShieldCheck,
  Home,
  ExternalLink
} from 'lucide-react';
import { StudentProfile } from '../types';

export type AppView = 'exam_setup' | 'active_exam' | 'result_review' | 'dashboard' | 'admin_portal';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  onOpenProfile: () => void;
  onOpenCoordinatorModal?: () => void;
  onLogout: () => void;
  profile: StudentProfile | null;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isExamInProgress: boolean;
  onGoToAdmin?: () => void;
}

const VIEW_TITLES: Record<AppView, { title: string; subtitle: string; icon: React.FC<any> }> = {
  exam_setup: {
    title: 'Exam Modes',
    subtitle: 'Post-UTME Practice & Mock Simulation',
    icon: PlayCircle,
  },
  active_exam: {
    title: 'CBT Exam in Progress',
    subtitle: 'Live timed simulation',
    icon: Layers,
  },
  result_review: {
    title: 'Test Result & Review',
    subtitle: 'Score breakdown and explanations',
    icon: FileCheck2,
  },
  dashboard: {
    title: 'Performance History',
    subtitle: 'Past scores and progress tracking',
    icon: BarChart3,
  },
  admin_portal: {
    title: 'Admin Portal',
    subtitle: 'Examiner login and candidate monitoring',
    icon: ShieldCheck,
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onGoBack,
  onGoForward,
  canGoBack,
  canGoForward,
  onOpenProfile,
  onOpenCoordinatorModal,
  onLogout,
  profile,
  isDarkMode,
  onToggleTheme,
  isExamInProgress,
  onGoToAdmin,
}) => {
  const currentViewInfo = VIEW_TITLES[currentView] || VIEW_TITLES.exam_setup;
  const CurrentIcon = currentViewInfo.icon;

  const handleHomeClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isExamInProgress) {
      if (window.confirm('An active exam is in progress. Return to Exam Modes?')) {
        onNavigate('exam_setup');
      }
    } else {
      onNavigate('exam_setup');
    }
  };

  const handleNavClick = (view: AppView, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isExamInProgress && view !== 'active_exam') {
      if (!window.confirm('An active exam is in progress. Are you sure you want to navigate away?')) {
        return;
      }
    }
    onNavigate(view);
  };

  const handleAdminLoginClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isExamInProgress) {
      if (!window.confirm('An active exam is in progress. Switch to Admin Portal?')) {
        return;
      }
    }
    if (onGoToAdmin) {
      onGoToAdmin();
    } else {
      onNavigate('admin_portal');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-indigo-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-200 shadow-xs">
      
      {/* Primary Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Left section: History Back/Forward Controls & Brand */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Back & Forward Navigation Controls */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 sm:p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              <button
                id="nav-btn-history-back"
                type="button"
                onClick={onGoBack}
                disabled={!canGoBack}
                className={`p-1.5 sm:p-2 rounded-lg transition-all flex items-center justify-center ${
                  canGoBack
                    ? 'text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 shadow-2xs btn-effect-secondary cursor-pointer'
                    : 'text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-40'
                }`}
                title={canGoBack ? 'Go back to previous page' : 'No previous page in history'}
                aria-label="Back"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>

              <button
                id="nav-btn-history-forward"
                type="button"
                onClick={onGoForward}
                disabled={!canGoForward}
                className={`p-1.5 sm:p-2 rounded-lg transition-all flex items-center justify-center ${
                  canGoForward
                    ? 'text-slate-800 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 shadow-2xs btn-effect-secondary cursor-pointer'
                    : 'text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-40'
                }`}
                title={canGoForward ? 'Go forward to next page' : 'No forward page in history'}
                aria-label="Forward"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Brand & Home Navigation */}
            <button 
              type="button"
              className="flex items-center space-x-2.5 cursor-pointer text-left select-none active:scale-[0.98] transition-transform" 
              onClick={handleHomeClick}
              title="Go to Home / Exam Modes"
            >
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 text-white shadow-sm shadow-indigo-500/20 ring-2 ring-white dark:ring-slate-800">
                <GraduationCap className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white border-2 border-white dark:border-slate-900">
                  ✓
                </span>
              </div>
              
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
                    DLCF OAU
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-bold tracking-wide uppercase rounded-md bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    Post-UTME
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  OAU Post UTME Examination Simulation
                </p>
              </div>
            </button>

          </div>

          {/* Center Navigation Tabs (Visible when Candidate is Active or for direct access) */}
          {profile && !isExamInProgress && (
            <nav className="hidden md:flex items-center space-x-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80">
              <button
                type="button"
                onClick={(e) => handleNavClick('exam_setup', e)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentView === 'exam_setup'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs ring-1 ring-indigo-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Exam Modes</span>
              </button>

              <button
                type="button"
                onClick={(e) => handleNavClick('dashboard', e)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs ring-1 ring-indigo-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>My Dashboard</span>
              </button>
            </nav>
          )}

          {/* Center Indicator (when exam is in progress) */}
          {isExamInProgress && (
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Exam Session Active</span>
            </div>
          )}

          {/* Right actions: Admin Login Button, Coordinator Helpdesk, Profile, Theme Toggle & Logout */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Admin Portal Button - (Hidden/Commented) */}
            {/*
            {!profile && (
              <div className="flex items-center">
                <button
                  id="header-btn-admin-login"
                  type="button"
                  onClick={handleAdminLoginClick}
                  className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-l-xl text-xs font-bold transition-all shadow-2xs btn-effect-secondary cursor-pointer ${
                    currentView === 'admin_portal'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-indigo-500/20'
                      : 'bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/80'
                  }`}
                  title="Go to Admin Portal Website (/admin)"
                >
                  <ShieldCheck className={`w-3.5 h-3.5 ${currentView === 'admin_portal' ? 'text-white' : 'text-amber-600 dark:text-amber-400'}`} />
                  <span>Admin Portal</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      window.open('/admin', '_blank');
                    } catch {
                      handleAdminLoginClick();
                    }
                  }}
                  className="px-1.5 py-1.5 rounded-r-xl bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-800/60 text-amber-800 dark:text-amber-300 border-y border-r border-amber-300 dark:border-amber-700/80 transition-colors cursor-pointer text-xs"
                  title="Open Admin Portal Website in a Separate New Window/Tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            */}

            {/* Coordinator Helpdesk Button */}
            {onOpenCoordinatorModal && (
              <button
                type="button"
                onClick={onOpenCoordinatorModal}
                id="header-helpdesk-btn"
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold btn-effect-secondary cursor-pointer"
                title="DLCF Coordinator Contact & Admissions Helpdesk"
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden sm:inline">Helpdesk</span>
              </button>
            )}

            {/* Candidate Badge & Profile Settings */}
            {profile && !isExamInProgress && (
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold btn-effect-secondary cursor-pointer"
                  title="View Profile & Target Course"
                >
                  <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="truncate max-w-[80px] sm:max-w-[120px]">{profile.fullName}</span>
                </button>

                <button
                  type="button"
                  onClick={onLogout}
                  id="btn-candidate-logout"
                  className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 btn-effect-secondary cursor-pointer"
                  title="Switch Candidate Account / Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              id="theme-toggle-btn"
              className="p-1.5 sm:p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 btn-effect-secondary cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

          </div>

        </div>
      </div>

      {/* Sub-Navigation Bar / Current Page Breadcrumb */}
      <div className="w-full bg-slate-50/90 dark:bg-slate-950/90 border-t border-slate-200/70 dark:border-slate-800/70 px-3 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          
          {/* Active Breadcrumb Path */}
          <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 font-medium">
            <button 
              type="button"
              onClick={handleHomeClick}
              className="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-bold transition-colors"
              title="Go to Home"
            >
              <Home className="w-3.5 h-3.5" />
              <span>DLCF CBT</span>
            </button>
            <span>/</span>
            <span className="flex items-center space-x-1 text-slate-900 dark:text-slate-100 font-bold">
              <CurrentIcon className="w-3.5 h-3.5 text-indigo-500" />
              <span>{currentViewInfo.title}</span>
            </span>
          </div>

          {/* Subtitle / context description */}
          <div className="text-[11px] text-slate-400 dark:text-slate-500 hidden md:block">
            {currentViewInfo.subtitle}
          </div>

        </div>
      </div>

    </header>
  );
};
