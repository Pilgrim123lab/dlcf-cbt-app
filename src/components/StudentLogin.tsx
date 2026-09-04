import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  User, 
  Layers, 
  ChevronRight, 
  ChevronDown, 
  History, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Phone, 
  Trash2, 
  ExternalLink,
  Lock,
  Eye,
  KeyRound,
  AlertCircle,
  UserPlus,
  LogIn
} from 'lucide-react';
import { StudentProfile, SubjectId } from '../types';
import { FACULTY_PRESETS } from '../data/facultyPresets';
import { SUBJECT_METADATA } from '../data/oauQuestions';
import { 
  getAllStoredProfiles, 
  loginCandidate,
  registerCandidate,
  findCandidateByName,
  getStoredTestHistory,
  deleteCandidateProfile,
  verifyAdminPin
} from '../utils/storage';

interface StudentLoginProps {
  onLoginSuccess: (profile: StudentProfile) => void;
  onOpenAdminPortal?: () => void;
  onOpenCoordinatorContact?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  savedProfiles?: StudentProfile[];
}

type PortalMode = 'candidate_login' | 'candidate_register' | 'admin_login';

export const StudentLogin: React.FC<StudentLoginProps> = ({ 
  onLoginSuccess, 
  onOpenAdminPortal,
  onOpenCoordinatorContact,
  savedProfiles: propSavedProfiles
}) => {
  // Main Portal Selection Mode on the First Page
  const [portalMode, setPortalMode] = useState<PortalMode>('candidate_login');

  // Candidate Sign In state
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Candidate Registration state (Step 1: Credentials, Step 2: Course & Combination)
  const [regStep, setRegStep] = useState<1 | 2>(1);
  const [regFullName, setRegFullName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');

  // Registration Step 2 fields
  const [targetCourse, setTargetCourse] = useState('Medicine and Surgery (MBBS)');
  const [selectedFacultyId, setSelectedFacultyId] = useState('clinical_sciences');
  const [jambScore, setJambScore] = useState<number>(280);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>([
    'biology',
    'chemistry',
    'physics',
    'aptitude',
  ]);

  // Admin Quick PIN Login State
  const [adminPin, setAdminPin] = useState('');
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [adminPinError, setAdminPinError] = useState('');

  // Collapsible state for faculty directory
  const [isFacultyListOpen, setIsFacultyListOpen] = useState(false);
  const [facultySearchQuery, setFacultySearchQuery] = useState('');

  // Saved profiles list
  const [savedProfiles, setSavedProfiles] = useState<StudentProfile[]>(() => {
    if (propSavedProfiles && Array.isArray(propSavedProfiles)) {
      return propSavedProfiles;
    }
    return getAllStoredProfiles() || [];
  });

  // Saved profile deletion confirmation modal
  const [profileToDelete, setProfileToDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (propSavedProfiles && Array.isArray(propSavedProfiles)) {
      setSavedProfiles(propSavedProfiles);
    } else {
      setSavedProfiles(getAllStoredProfiles() || []);
    }
  }, [propSavedProfiles]);

  const confirmDeleteProfile = () => {
    if (!profileToDelete) return;
    deleteCandidateProfile(profileToDelete.id);
    const updated = getAllStoredProfiles() || [];
    setSavedProfiles(updated);
    setProfileToDelete(null);
  };

  // Active selected faculty object
  const currentFaculty = FACULTY_PRESETS.find((p) => p.id === selectedFacultyId) || FACULTY_PRESETS[0];

  // Filter faculties if user searches inside the collapsible tray
  const filteredFaculties = FACULTY_PRESETS.filter((preset) => {
    if (!facultySearchQuery.trim()) return true;
    const q = facultySearchQuery.toLowerCase();
    return (
      preset.facultyName.toLowerCase().includes(q) ||
      preset.courseExamples.some((c) => c.toLowerCase().includes(q))
    );
  });

  // Handle Candidate Login with Name & Password
  const handleCandidateLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginName.trim()) {
      setLoginError('Please enter your candidate name.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter your candidate password.');
      return;
    }

    const result = loginCandidate(loginName.trim(), loginPassword.trim());
    if (result.success && result.profile) {
      onLoginSuccess(result.profile);
    } else {
      setLoginError(result.message || 'Login failed. Please check your credentials.');
    }
  };

  // Handle Candidate Registration Step 1 -> Step 2
  const handleProceedRegStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regFullName.trim()) {
      setRegError('Please enter your full name.');
      return;
    }
    if (!regPassword || regPassword.trim().length < 4) {
      setRegError('Password must be at least 4 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please re-enter.');
      return;
    }

    // Check if user already exists
    const existing = findCandidateByName(regFullName.trim());
    if (existing) {
      // Pre-fill their existing faculty/course
      setTargetCourse(existing.targetCourse || 'Medicine and Surgery (MBBS)');
      setJambScore(existing.jambScore || 280);
      if (existing.subjectCombination && existing.subjectCombination.length > 0) {
        setSelectedSubjects(existing.subjectCombination);
      }
      const matchPreset = FACULTY_PRESETS.find((f) => f.facultyName === existing.targetFaculty);
      if (matchPreset) {
        setSelectedFacultyId(matchPreset.id);
      }
    }

    setRegStep(2);
  };

  // Complete Registration
  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regFullName.trim()) return;

    const currentPreset = FACULTY_PRESETS.find((p) => p.id === selectedFacultyId);

    const result = registerCandidate({
      fullName: regFullName.trim(),
      password: regPassword.trim(),
      targetCourse: targetCourse.trim() || 'General Studies',
      targetFaculty: currentPreset?.facultyName || 'Faculty of Clinical Sciences',
      jambScore: Number(jambScore) || 280,
      subjectCombination: selectedSubjects,
    });

    if (result.success && result.profile) {
      onLoginSuccess(result.profile);
    } else {
      setRegError(result.message || 'Registration failed. Please check details.');
      setRegStep(1);
    }
  };

  // Quick select a saved profile: loads the name and prompts for password
  const handleSelectSavedProfile = (p: StudentProfile) => {
    setPortalMode('candidate_login');
    setLoginName(p.fullName);
    setLoginPassword('');
    setLoginError('');
    // Focus password input
    setTimeout(() => {
      const pwdInput = document.getElementById('candidate-login-password');
      if (pwdInput) pwdInput.focus();
    }, 100);
  };

  // Handle Admin Quick Login
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminPinError('');

    if (!adminPin.trim()) {
      setAdminPinError('Please enter the Administrator PIN.');
      return;
    }

    if (verifyAdminPin(adminPin.trim())) {
      if (onOpenAdminPortal) {
        onOpenAdminPortal();
      }
    } else {
      setAdminPinError('Invalid Administrator PIN. Please verify and try again.');
    }
  };

  // Handle Faculty selection
  const handleSelectFacultyPreset = (presetId: string) => {
    setSelectedFacultyId(presetId);
    const preset = FACULTY_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedSubjects(preset.defaultSubjects || ['biology', 'chemistry', 'physics', 'aptitude']);
      if (preset.courseExamples && preset.courseExamples.length > 0) {
        setTargetCourse(preset.courseExamples[0]);
      }
    }
    setIsFacultyListOpen(false);
  };

  const handleSelectCourse = (courseName: string, presetId: string) => {
    setTargetCourse(courseName);
    setSelectedFacultyId(presetId);
    const preset = FACULTY_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedSubjects(preset.defaultSubjects || ['biology', 'chemistry', 'physics', 'aptitude']);
    }
  };

  const hasSavedProfiles = (savedProfiles || []).length > 0;

  return (
    <div className="w-full py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* Top Branding Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/25 mb-1 ring-4 ring-white dark:ring-slate-800">
            <GraduationCap className="w-9 h-9" />
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            OAU Post UTME Examination Simulation
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Obafemi Awolowo University, Ile-Ife. 4-Subject Computer-Based Testing Simulation with automated composite aggregate scoring.
          </p>
        </div>

        {/* PRIMARY FIRST PAGE DECISION GATEWAY TABS (Candidate vs Admin) */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/80 dark:border-slate-700/80 shadow-inner">
            
            <button
              type="button"
              id="tab-btn-candidate-login"
              onClick={() => {
                setPortalMode('candidate_login');
                setLoginError('');
              }}
              className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                portalMode === 'candidate_login'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-md ring-1 ring-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Candidate Sign In</span>
            </button>

            <button
              type="button"
              id="tab-btn-candidate-register"
              onClick={() => {
                setPortalMode('candidate_register');
                setRegStep(1);
                setRegError('');
              }}
              className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                portalMode === 'candidate_register'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-md ring-1 ring-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
            {/*
            <button
              type="button"
              id="tab-btn-admin-portal"
              onClick={() => {
                setPortalMode('admin_login');
                setAdminPinError('');
              }}
              className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                portalMode === 'admin_login'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-500/30'
                  : 'text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Examiner / Admin</span>
            </button>
            */}

          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE 1: CANDIDATE SIGN IN (NAME + SELF-CHOSEN PASSWORD) */}
        {/* ------------------------------------------------------------- */}
        {portalMode === 'candidate_login' && (
          <div className="max-w-xl mx-auto w-full animate-in fade-in duration-200">
            
            {/* Candidate Sign In Form */}
            <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 ring-1 ring-blue-500/10">
              
              <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800/80 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Candidate Authentication</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                  Sign In to Candidate Exam Desk
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Enter the Candidate Name and Password you set for yourself to access your personal activities, scores, and mock exams.
                </p>
              </div>

              {/* Login Error Notification */}
              {loginError && (
                <div className="flex items-center space-x-2.5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold animate-in shake">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleCandidateLoginSubmit} className="space-y-4">
                
                {/* Candidate Name Input */}
                <div>
                  <label htmlFor="candidate-login-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Candidate Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-4 top-3.5 text-indigo-500" />
                    <input
                      id="candidate-login-name"
                      type="text"
                      required
                      autoFocus
                      placeholder="e.g. Bamidele Olanrewaju"
                      value={loginName}
                      onChange={(e) => {
                        setLoginName(e.target.value);
                        if (loginError) setLoginError('');
                      }}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base font-semibold transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Candidate Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="candidate-login-password" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Candidate Password <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Your self-chosen PIN/password
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-4 top-3.5 text-indigo-500" />
                    <input
                      id="candidate-login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (loginError) setLoginError('');
                      }}
                      className="w-full pl-12 pr-11 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base font-semibold transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                      title={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-candidate-login-submit"
                  disabled={!loginName.trim() || !loginPassword.trim()}
                  className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm sm:text-base btn-effect-primary cursor-pointer active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20 mt-2"
                >
                  <span>Sign In & Open Personal Activities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setPortalMode('candidate_register');
                    setRegStep(1);
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold cursor-pointer"
                >
                  Don&apos;t have an account? Create one here
                </button>

                <div className="flex items-center space-x-1 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Secure Private Session</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 2: CANDIDATE REGISTRATION (CREATE ACCOUNT WITH PASSWORD) */}
        {/* ------------------------------------------------------------- */}
        {portalMode === 'candidate_register' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 ring-1 ring-blue-500/10 animate-in fade-in duration-200">
            
            {/* Step 1 vs Step 2 Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Candidate Account Setup
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-xs font-medium text-slate-500">
                    Step {regStep} of 2
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                  {regStep === 1 ? 'Create Your Candidate Profile & Password' : `Welcome, ${regFullName}`}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {regStep === 1 
                    ? 'Set your name and a password that you will use to log in anytime.' 
                    : 'Configure your target OAU degree program, faculty, and 4-subject combination.'}
                </p>
              </div>

              {regStep === 2 && (
                <button
                  type="button"
                  onClick={() => setRegStep(1)}
                  className="self-start sm:self-center text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 btn-effect-secondary cursor-pointer"
                >
                  ← Edit Credentials
                </button>
              )}
            </div>

            {/* Error Message */}
            {regError && (
              <div className="flex items-center space-x-2.5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                <span>{regError}</span>
              </div>
            )}

            {/* REGISTRATION STEP 1: NAME AND PASSWORD */}
            {regStep === 1 ? (
              <form onSubmit={handleProceedRegStep1} className="space-y-5">
                
                <div>
                  <label htmlFor="reg-fullname-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Candidate Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-4 top-3.5 text-indigo-500" />
                    <input
                      id="reg-fullname-input"
                      type="text"
                      required
                      autoFocus
                      placeholder="e.g. Bamidele Olanrewaju"
                      value={regFullName}
                      onChange={(e) => {
                        setRegFullName(e.target.value);
                        if (regError) setRegError('');
                      }}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base font-semibold transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reg-password-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Set Candidate Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-5 h-5 absolute left-4 top-3.5 text-indigo-500" />
                      <input
                        id="reg-password-input"
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        placeholder="At least 4 characters"
                        value={regPassword}
                        onChange={(e) => {
                          setRegPassword(e.target.value);
                          if (regError) setRegError('');
                        }}
                        className="w-full pl-12 pr-11 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base font-semibold transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword((prev) => !prev)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                        title={showRegPassword ? 'Hide password' : 'Show password'}
                      >
                        {showRegPassword ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="reg-confirm-password-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-5 h-5 absolute left-4 top-3.5 text-indigo-500" />
                      <input
                        id="reg-confirm-password-input"
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        placeholder="Re-type password"
                        value={regConfirmPassword}
                        onChange={(e) => {
                          setRegConfirmPassword(e.target.value);
                          if (regError) setRegError('');
                        }}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base font-semibold transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-reg-continue-step2"
                  disabled={!regFullName.trim() || !regPassword.trim()}
                  className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm sm:text-base btn-effect-primary cursor-pointer active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20"
                >
                  <span>Continue to Target Course Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setPortalMode('candidate_login')}
                    className="text-xs font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Already created an account? Switch to Candidate Sign In
                  </button>
                </div>

              </form>
            ) : (
              /* REGISTRATION STEP 2: COURSE, FACULTY, JAMB SCORE & COMBINATIONS */
              <form onSubmit={handleCompleteRegistration} className="space-y-6">
                
                {/* 1. Collapsible Faculty Directory */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-4 space-y-3 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        Target OAU Faculty & Field
                      </label>
                      <p className="text-xs text-slate-500">
                        Currently Selected: <strong className="text-indigo-600 dark:text-indigo-400">{currentFaculty.facultyName}</strong> (Cut-off: ~{currentFaculty.averageCutOff}%)
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFacultyListOpen(!isFacultyListOpen)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 btn-effect-secondary cursor-pointer"
                    >
                      <span>{isFacultyListOpen ? 'Collapse Faculties' : 'Browse / Change Faculty'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFacultyListOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Collapsible Progressive Drawer */}
                  {isFacultyListOpen && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in-50 duration-200">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search faculties (e.g. Technology, Health Sciences, Pharmacy, Law, Administration)..."
                          value={facultySearchQuery}
                          onChange={(e) => setFacultySearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
                        {filteredFaculties.map((preset) => {
                          const isSelected = selectedFacultyId === preset.id;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => handleSelectFacultyPreset(preset.id)}
                              className={`p-2.5 rounded-xl border text-left btn-option-card cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-indigo-950/60 border-indigo-600 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/40 shadow-sm'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-xs truncate">
                                  {preset.facultyName.replace('Faculty of ', '')}
                                </span>
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                Cut-off: ~{preset.averageCutOff}%
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Specific Degree / Department Input */}
                <div className="space-y-2">
                  <label htmlFor="reg-candidate-course-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Target Degree Program / Department
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      id="reg-candidate-course-input"
                      type="text"
                      required
                      placeholder="e.g. Medicine and Surgery (MBBS), Computer Science and Engineering, Law"
                      value={targetCourse}
                      onChange={(e) => setTargetCourse(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  {/* Course Examples Pills */}
                  {selectedFacultyId && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-400 mr-1">Suggested:</span>
                      {currentFaculty.courseExamples.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleSelectCourse(c, selectedFacultyId)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border btn-effect-secondary cursor-pointer transition-all ${
                            targetCourse === c
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent font-bold shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. 4-Subject Combination Overview */}
                <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-950 dark:text-indigo-200">
                    <span className="flex items-center space-x-1.5">
                      <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>4-Subject Combination Configured (Includes Aptitude Test)</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                      OAU Standard
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {selectedSubjects.map((sId) => (
                      <div
                        key={sId}
                        className={`px-3 py-2 rounded-xl border text-center font-bold text-xs shadow-2xs ${
                          sId === 'aptitude'
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-900 border-indigo-100 dark:border-slate-800 text-indigo-900 dark:text-indigo-200'
                        }`}
                      >
                        {SUBJECT_METADATA[sId]?.shortName || sId}
                        {sId === 'aptitude' && ' (Compulsory)'}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. JAMB UTME Score Input */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-candidate-jamb-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    JAMB UTME Score (For 50:50 Aggregate Calculation)
                  </label>
                  <div className="relative">
                    <input
                      id="reg-candidate-jamb-input"
                      type="number"
                      min="160"
                      max="400"
                      value={jambScore}
                      onChange={(e) => setJambScore(Number(e.target.value))}
                      required
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-mono font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="e.g. 280"
                    />
                    <div className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-400">
                      / 400
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    JAMB contributes 50% points: ({jambScore || 0} / 400 × 50 = {((Number(jambScore || 0)/400)*50).toFixed(1)}% aggregate points).
                  </p>
                </div>

                {/* Submit & Open Candidate Portal */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="btn-complete-candidate-registration"
                    className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-extrabold text-sm sm:text-base btn-effect-primary cursor-pointer active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20"
                  >
                    <span>Complete Account & Open {regFullName}&apos;s Exam Modes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 3: EXAMINER / ADMINISTRATOR PORTAL LOGIN */}
        {/* ------------------------------------------------------------- */}
        {portalMode === 'admin_login' && (
          <div className="max-w-md mx-auto w-full bg-slate-950 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-200">
            
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-amber-500/25">
                <ShieldCheck className="w-7 h-7" />
              </div>
              
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                  Examiner Directorate
                </span>
                <h2 className="text-xl font-black text-white mt-1">
                  Administrator PIN Access
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your Administrator PIN to open candidate rosters, cloud analytics, and question bank uploaders.
                </p>
              </div>
            </div>

            {/* Admin Error Notification */}
            {adminPinError && (
              <div className="flex items-center space-x-2.5 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold animate-in shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{adminPinError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="first-page-admin-pin-input" className="block text-xs font-bold text-slate-300 mb-1.5">
                  Administrator PIN Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    id="first-page-admin-pin-input"
                    type={showAdminPin ? 'text' : 'password'}
                    maxLength={16}
                    value={adminPin}
                    onChange={(e) => {
                      setAdminPin(e.target.value);
                      if (adminPinError) setAdminPinError('');
                    }}
                    placeholder="••••"
                    autoFocus
                    className="w-full pl-10 pr-11 py-3 rounded-2xl text-center text-xl tracking-widest font-mono font-black bg-slate-900 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPin((prev) => !prev)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer"
                    title={showAdminPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showAdminPin ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="btn-first-page-admin-submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify PIN & Open Admin Suite</span>
              </button>
            </form>

            {/*
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => {
                  try {
                    window.open('/admin', '_blank');
                  } catch {
                    if (onOpenAdminPortal) onOpenAdminPortal();
                  }
                }}
                className="hover:text-amber-300 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Standalone Tab (/admin)</span>
              </button>

              <button
                type="button"
                onClick={() => setPortalMode('candidate_login')}
                className="hover:text-slate-200 transition-colors cursor-pointer font-semibold"
              >
                Back to Candidate
              </button>
            </div>
            */}

          </div>
        )}

        {/* Footer Helpdesk & Admissions Hotline */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onOpenCoordinatorContact && (
            <button
              type="button"
              onClick={onOpenCoordinatorContact}
              id="btn-login-helpdesk"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all shadow-xs btn-effect-secondary cursor-pointer"
            >
              <Phone className="w-4 h-4 text-indigo-500" />
              <span>DLCF Admissions Coordinator Helpdesk</span>
            </button>
          )}
        </div>

        {/* Delete Profile Confirmation Modal */}
        {profileToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150 text-left">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-in zoom-in-95 text-slate-900 dark:text-slate-100">
              <div className="flex items-center space-x-3 text-rose-600 dark:text-rose-400">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-slate-100">
                    Remove Saved Account
                  </h3>
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-bold">
                    Local Device Removal
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Are you sure you want to remove <strong className="text-slate-900 dark:text-white font-extrabold">{profileToDelete.name}</strong> from saved accounts on this device?
              </p>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProfileToDelete(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDeleteProfile}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition-all shadow-md shadow-rose-600/20 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Account</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
