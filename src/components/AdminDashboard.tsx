import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Search, 
  Trash2, 
  ArrowLeft, 
  Award, 
  TrendingUp, 
  BarChart3, 
  Download, 
  Eye,
  RefreshCw,
  Lock,
  Unlock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Settings,
  Cloud,
  X,
  UploadCloud,
  BookOpen,
  ExternalLink,
  Copy,
  Moon,
  Sun,
  Clock,
  Database,
  FileSpreadsheet,
  Layers,
  Sparkles,
  HelpCircle,
  Calendar,
  Filter
} from 'lucide-react';
import { 
  getAllCandidatesActivity, 
  deleteCandidateProfile, 
  getStoredAdminPin,
  setStoredAdminPin,
  verifyAdminPin,
  clearAdminSession,
  exportStudentScoresCSV,
  getStoredCustomQuestions,
  mergeCustomQuestionsWithCloud,
  autoSortStoredQuestionBank
} from '../utils/storage';
import { 
  fetchAllCloudCandidatesActivity, 
  deleteCandidateFromCloud, 
  subscribeToCloudCandidates,
  fetchAllCloudCustomQuestions,
  subscribeToCloudCustomQuestions,
  CloudCandidateRecord
} from '../lib/cloudDb';
import { StudentProfile, TestResult } from '../types';
import { calculateOauAggregate } from '../data/facultyPresets';
import { getAllAvailableQuestions } from '../data/oauQuestions';
import { UploadPastQuestionsModal } from './UploadPastQuestionsModal';

interface AdminDashboardProps {
  onBackToApp: () => void;
  onSelectCandidateToInspect?: (profile: StudentProfile) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

type AdminTab = 'candidates' | 'questions' | 'analytics' | 'security';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToApp,
  onSelectCandidateToInspect,
  isDarkMode: propIsDarkMode,
  onToggleTheme: propOnToggleTheme,
}) => {
  // CRITICAL: Always start unauthenticated so every visit/re-entry requires entering the PIN
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState('');
  const [copiedUrlFeedback, setCopiedUrlFeedback] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Active Navigation Tab on Admin Portal Website
  const [activeTab, setActiveTab] = useState<AdminTab>('candidates');

  // Change PIN modal state
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [changePinMsg, setChangePinMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Candidate data & search (Merged Cloud & Local)
  const [candidateRecords, setCandidateRecords] = useState<CloudCandidateRecord[]>(() => getAllCandidatesActivity());
  const [isLoadingCloud, setIsLoadingCloud] = useState(false);
  const [cloudSynced, setCloudSynced] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacultyFilter, setSelectedFacultyFilter] = useState<string>('all');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [exportFeedback, setExportFeedback] = useState(false);
  
  // Date filter & Export Modal State
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportDatePreset, setExportDatePreset] = useState<'all' | 'today' | 'last_7_days' | 'last_30_days' | 'custom'>('all');
  const [exportStartDate, setExportStartDate] = useState<string>('');
  const [exportEndDate, setExportEndDate] = useState<string>('');
  
  // Delete Candidate Confirmation Modal State
  const [candidateToDelete, setCandidateToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeletingCandidate, setIsDeletingCandidate] = useState(false);

  // Upload past questions modal state
  const [isUploadQuestionsOpen, setIsUploadQuestionsOpen] = useState(false);
  const [customQuestionsCount, setCustomQuestionsCount] = useState<number>(() => getStoredCustomQuestions().length);

  // Local theme state if not passed from parent
  const [localDark, setLocalDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const isDark = propIsDarkMode !== undefined ? propIsDarkMode : localDark;
  const toggleTheme = () => {
    if (propOnToggleTheme) {
      propOnToggleTheme();
    } else {
      setLocalDark((prev) => {
        const next = !prev;
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return next;
      });
    }
  };

  // Clock timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cleanup session on unmount to guarantee lock on exit/departure
  useEffect(() => {
    return () => {
      clearAdminSession();
    };
  }, []);

  // Load from Central Firestore Database when authenticated
  const reloadData = async () => {
    setIsLoadingCloud(true);
    try {
      const cloudData = await fetchAllCloudCandidatesActivity();
      const localData = getAllCandidatesActivity();

      // Merge cloud records with local records by candidate ID
      const map = new Map<string, CloudCandidateRecord>();
      
      // Add local first
      localData.forEach((rec) => {
        map.set(rec.profile.id, rec);
      });

      // Add or update with cloud records (which have tests from all devices)
      cloudData.forEach((cloudRec) => {
        const local = map.get(cloudRec.profile.id);
        if (!local) {
          map.set(cloudRec.profile.id, cloudRec);
        } else {
          // Merge tests avoiding duplicate IDs
          const combinedTests = [...cloudRec.tests];
          local.tests.forEach((lt) => {
            if (!combinedTests.some((ct) => ct.id === lt.id || (ct.date === lt.date && ct.totalScore === lt.totalScore))) {
              combinedTests.push(lt);
            }
          });

          const avgScore = combinedTests.length > 0
            ? Math.round(combinedTests.reduce((acc, t) => acc + (t.totalScore || 0), 0) / combinedTests.length)
            : 0;
          const highest = combinedTests.length > 0
            ? Math.max(...combinedTests.map((t) => t.totalScore || 0))
            : 0;

          map.set(cloudRec.profile.id, {
            profile: cloudRec.profile,
            tests: combinedTests,
            averageScore: avgScore,
            highestScore: highest,
            lastTestDate: combinedTests.length > 0 ? combinedTests[0].date : null,
          });
        }
      });

      const mergedList = Array.from(map.values());
      setCandidateRecords(mergedList.length > 0 ? mergedList : localData);
      setCloudSynced(true);
    } catch (err) {
      console.error('Failed to sync cloud candidate activities', err);
      setCandidateRecords(getAllCandidatesActivity());
    } finally {
      setIsLoadingCloud(false);
    }
  };

  // Real-time synchronization of candidates across all mobile devices / tabs
  useEffect(() => {
    if (isAuthenticated) {
      reloadData();
      const unsub = subscribeToCloudCandidates((updatedCloudRecords) => {
        if (updatedCloudRecords) {
          const localData = getAllCandidatesActivity();
          const map = new Map<string, CloudCandidateRecord>();
          localData.forEach((r) => map.set(r.profile.id, r));
          updatedCloudRecords.forEach((cr) => map.set(cr.profile.id, cr));
          setCandidateRecords(Array.from(map.values()));
          setCloudSynced(true);
        }
      });
      return () => unsub();
    }
  }, [isAuthenticated]);

  // Sync custom questions from central Cloud DB and listen for updates
  const [isSyncingQuestions, setIsSyncingQuestions] = useState(false);
  const [isAutoSorting, setIsAutoSorting] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const handleSyncQuestionsFromCloud = async () => {
    setIsSyncingQuestions(true);
    try {
      const cloudQuestions = await fetchAllCloudCustomQuestions();
      if (cloudQuestions) {
        const merged = mergeCustomQuestionsWithCloud(cloudQuestions);
        setCustomQuestionsCount(merged.length);
        setSyncFeedback(`Successfully synchronized ${merged.length} verified questions from Firestore Cloud!`);
        setTimeout(() => setSyncFeedback(null), 4000);
      }
    } catch (err) {
      console.error('Failed to sync questions from cloud', err);
      setSyncFeedback('Unable to connect to Cloud Firestore. Please check your internet connection.');
      setTimeout(() => setSyncFeedback(null), 4000);
    } finally {
      setIsSyncingQuestions(false);
    }
  };

  const handleAutoSortQuestionBank = async () => {
    setIsAutoSorting(true);
    try {
      const result = await autoSortStoredQuestionBank();
      setCustomQuestionsCount(result.sorted.length);
      if (result.reclassifiedCount > 0) {
        setSyncFeedback(`Smart Auto-Sort Complete: ${result.reclassifiedCount} questions automatically sorted into their true subjects (Physics, Chemistry, Biology, Maths, etc.) and saved to Cloud!`);
      } else {
        setSyncFeedback(`All ${result.sorted.length} questions in the bank are already accurately classified by subject!`);
      }
      setTimeout(() => setSyncFeedback(null), 5000);
    } catch (err) {
      console.error('Failed to auto-sort question bank', err);
      setSyncFeedback('Unable to complete auto-sort. Please check your connection.');
      setTimeout(() => setSyncFeedback(null), 4000);
    } finally {
      setIsAutoSorting(false);
    }
  };

  useEffect(() => {
    fetchAllCloudCustomQuestions().then((cloudQuestions) => {
      if (cloudQuestions && cloudQuestions.length > 0) {
        const merged = mergeCustomQuestionsWithCloud(cloudQuestions);
        setCustomQuestionsCount(merged.length);
      }
    });

    const unsubQuestions = subscribeToCloudCustomQuestions((cloudQuestions) => {
      if (cloudQuestions) {
        const merged = mergeCustomQuestionsWithCloud(cloudQuestions);
        setCustomQuestionsCount(merged.length);
      }
    });

    const handleQuestionsUpdated = (e: any) => {
      if (e?.detail?.count !== undefined) {
        setCustomQuestionsCount(e.detail.count);
      } else {
        setCustomQuestionsCount(getStoredCustomQuestions().length);
      }
    };
    window.addEventListener('custom_questions_updated', handleQuestionsUpdated);

    return () => {
      unsubQuestions();
      window.removeEventListener('custom_questions_updated', handleQuestionsUpdated);
    };
  }, []);

  // Handle Login with PIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    if (!pinInput.trim()) {
      setPinError('Please enter the Administrator PIN code.');
      return;
    }

    if (verifyAdminPin(pinInput.trim())) {
      setIsAuthenticated(true);
      setPinInput('');
      setPinError('');
    } else {
      setPinError('Invalid Administrator PIN code. Please check and try again.');
    }
  };

  // Handle Keypad digit click
  const handleKeypadPress = (digit: string) => {
    if (pinInput.length < 16) {
      setPinInput((prev) => prev + digit);
      if (pinError) setPinError('');
    }
  };

  const handleKeypadBackspace = () => {
    setPinInput((prev) => prev.slice(0, -1));
  };

  const handleKeypadClear = () => {
    setPinInput('');
    if (pinError) setPinError('');
  };

  // Handle Logout / Lock Admin Console
  const handleLogoutAdmin = () => {
    clearAdminSession();
    setIsAuthenticated(false);
    setSelectedCandidateId(null);
    setPinInput('');
    setPinError('');
  };

  // Return safely to the Candidate CBT portal and lock the admin portal
  const handleReturnToStudentCBT = () => {
    handleLogoutAdmin();
    onBackToApp();
  };

  // Copy Direct Admin Website URL
  const handleCopyAdminUrl = () => {
    try {
      const url = window.location.origin + '/admin';
      navigator.clipboard.writeText(url);
      setCopiedUrlFeedback(true);
      setTimeout(() => setCopiedUrlFeedback(false), 2500);
    } catch {
      setCopiedUrlFeedback(true);
      setTimeout(() => setCopiedUrlFeedback(false), 2500);
    }
  };

  // Open Admin Website in a New Browser Tab/Window
  const handleOpenInNewWindow = () => {
    try {
      window.open('/admin', '_blank');
    } catch {
      window.open(window.location.href, '_blank');
    }
  };

  // Handle Changing PIN
  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePinMsg(null);

    if (!verifyAdminPin(oldPin)) {
      setChangePinMsg({ type: 'error', text: 'Current Admin PIN is incorrect.' });
      return;
    }

    if (newPin.trim().length < 4) {
      setChangePinMsg({ type: 'error', text: 'New PIN must be at least 4 digits or characters.' });
      return;
    }

    if (newPin !== confirmPin) {
      setChangePinMsg({ type: 'error', text: 'New PIN and Confirmation PIN do not match.' });
      return;
    }

    const ok = setStoredAdminPin(newPin.trim());
    if (ok) {
      setChangePinMsg({ type: 'success', text: 'Admin PIN updated successfully!' });
      setTimeout(() => {
        setIsChangePinOpen(false);
        setOldPin('');
        setNewPin('');
        setConfirmPin('');
        setChangePinMsg(null);
      }, 1400);
    } else {
      setChangePinMsg({ type: 'error', text: 'Failed to save new PIN.' });
    }
  };

  // Helper to calculate start & end dates from preset or custom input
  const getExportDateRange = (preset: 'all' | 'today' | 'last_7_days' | 'last_30_days' | 'custom', customStart: string, customEnd: string) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    if (preset === 'today') {
      return { start: todayStr, end: todayStr, label: 'Today' };
    }
    if (preset === 'last_7_days') {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      return { start: d.toISOString().split('T')[0], end: todayStr, label: 'Last 7 Days' };
    }
    if (preset === 'last_30_days') {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      return { start: d.toISOString().split('T')[0], end: todayStr, label: 'Last 30 Days' };
    }
    if (preset === 'custom') {
      const label = customStart && customEnd ? `${customStart} to ${customEnd}` : customStart ? `From ${customStart}` : customEnd ? `Until ${customEnd}` : 'Custom Range';
      return { start: customStart || undefined, end: customEnd || undefined, label };
    }
    return { start: undefined, end: undefined, label: 'All Time' };
  };

  // Check if a test date is in range
  const isTestInDateRange = (dateStr?: string, timestamp?: number, startStr?: string, endStr?: string): boolean => {
    if (!startStr && !endStr) return true;
    let dateObj: Date | null = null;
    if (timestamp && !isNaN(timestamp)) {
      dateObj = new Date(timestamp);
    } else if (dateStr && dateStr !== 'N/A' && dateStr !== 'Active') {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        dateObj = d;
      } else {
        const parts = dateStr.trim().split(/[\s,/-]+/);
        if (parts.length === 3) {
          const d2 = new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
          if (!isNaN(d2.getTime())) dateObj = d2;
        }
      }
    }

    if (!dateObj) return true;
    const checkTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()).getTime();

    if (startStr) {
      const [sy, sm, sd] = startStr.split('-').map(Number);
      const startTime = new Date(sy, sm - 1, sd).getTime();
      if (checkTime < startTime) return false;
    }

    if (endStr) {
      const [ey, em, ed] = endStr.split('-').map(Number);
      const endTime = new Date(ey, em - 1, ed).getTime();
      if (checkTime > endTime) return false;
    }

    return true;
  };

  // Count matching tests for export preview
  const getMatchingTestsCount = (preset: 'all' | 'today' | 'last_7_days' | 'last_30_days' | 'custom', customStart: string, customEnd: string) => {
    const { start, end } = getExportDateRange(preset, customStart, customEnd);
    let count = 0;
    candidateRecords.forEach((c) => {
      c.tests.forEach((t) => {
        if (isTestInDateRange(t.date, t.timestamp, start, end)) {
          count++;
        }
      });
    });
    return count;
  };

  // Download Master Scores Report (CSV) - score over total questions, without avg post-utme or composite
  const handleDownloadScores = (customStartOverride?: string, customEndOverride?: string) => {
    try {
      const { start, end } = (customStartOverride !== undefined || customEndOverride !== undefined)
        ? { start: customStartOverride, end: customEndOverride }
        : getExportDateRange(exportDatePreset, exportStartDate, exportEndDate);

      const headers = [
        'Candidate ID',
        'Full Name',
        'JAMB Score',
        'Target Faculty',
        'Target Course',
        'Registered Date',
        'Total Tests Taken',
        'Exam Title',
        'Exam Date',
        'Exam Mode',
        'Score (Correct/Total)',
        'Correct Answers',
        'Total Questions',
        'Exam Accuracy (%)',
        'Time Spent (mins)'
      ];

      const rows: string[][] = [];

      candidateRecords.forEach((item) => {
        const jamb = item.profile.jambScore || 0;
        const matchingTests = item.tests.filter((t) => isTestInDateRange(t.date, t.timestamp, start, end));

        if (matchingTests.length === 0) {
          if (!start && !end) {
            rows.push([
              `"${item.profile.id}"`,
              `"${item.profile.fullName.replace(/"/g, '""')}"`,
              `${jamb}`,
              `"${item.profile.targetFaculty || 'N/A'}"`,
              `"${item.profile.targetCourse.replace(/"/g, '""')}"`,
              `"${item.profile.lastActiveDate || 'N/A'}"`,
              `0`,
              `"No tests taken yet"`,
              `"N/A"`,
              `"N/A"`,
              `"N/A"`,
              `0`,
              `0`,
              `"N/A"`,
              `"N/A"`
            ]);
          }
        } else {
          matchingTests.forEach((t) => {
            const totalQ = t.totalQuestions || 40;
            const totalC = t.totalCorrect !== undefined ? t.totalCorrect : 0;
            const scoreDisplay = `${totalC}/${totalQ}`;

            rows.push([
              `"${item.profile.id}"`,
              `"${item.profile.fullName.replace(/"/g, '""')}"`,
              `${jamb}`,
              `"${item.profile.targetFaculty || 'N/A'}"`,
              `"${item.profile.targetCourse.replace(/"/g, '""')}"`,
              `"${item.profile.lastActiveDate || 'N/A'}"`,
              `${item.tests.length}`,
              `"${t.examTitle.replace(/"/g, '""')}"`,
              `"${t.date}"`,
              `"${t.examMode.replace(/_/g, ' ')}"`,
              `"${scoreDisplay}"`,
              `${totalC}`,
              `${totalQ}`,
              `${t.percentage}%`,
              `${Math.round((t.timeTakenSeconds || 0) / 60)}`
            ]);
          });
        }
      });

      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [
        headers.join(','),
        ...rows.map((r) => r.join(','))
      ].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().split('T')[0];
      const dateTag = start && end ? `_${start}_to_${end}` : start ? `_from_${start}` : `_${timestamp}`;
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `DLCF_CBT_Candidate_Scores${dateTag}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportFeedback(true);
      setTimeout(() => setExportFeedback(false), 3000);
      setIsExportModalOpen(false);
    } catch (err) {
      console.error('Error downloading scores', err);
      exportStudentScoresCSV();
    }
  };

  const handleDeleteCandidateClick = (candidateId: string, candidateName: string) => {
    setCandidateToDelete({ id: candidateId, name: candidateName });
  };

  const confirmDeleteCandidate = async () => {
    if (!candidateToDelete) return;
    const { id: candidateId } = candidateToDelete;

    setIsDeletingCandidate(true);
    try {
      // 1. Optimistically update local UI state immediately
      setCandidateRecords((prev) => prev.filter((r) => r.profile.id !== candidateId));
      if (selectedCandidateId === candidateId) {
        setSelectedCandidateId(null);
      }

      // 2. Delete from local storage (profiles registry, test history, revision banks)
      deleteCandidateProfile(candidateId);

      // 3. Delete from central Cloud Firestore database
      await deleteCandidateFromCloud(candidateId);

      // 4. Trigger clean reload from cloud to verify synchronization
      await reloadData();
    } catch (err) {
      console.error('Error deleting candidate:', err);
    } finally {
      setIsDeletingCandidate(false);
      setCandidateToDelete(null);
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: DEDICATED SEPARATE WEBSITE LOGIN GATEWAY (UNAUTHENTICATED)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white font-sans transition-colors">
        
        {/* Standalone Admin Site Header */}
        <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-md shadow-amber-500/20 text-white font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-extrabold text-white tracking-tight">
                  DLCF CBT Administration Portal
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                  /admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official Examination Directorate • Security Gateway
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenInNewWindow}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
              title="Open Admin Portal in a new browser tab/window"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              <span>Open in New Tab</span>
            </button>

            <button
              onClick={handleReturnToStudentCBT}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-indigo-200 border border-indigo-500/40 text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Candidate CBT App</span>
            </button>
          </div>
        </header>

        {/* Central Security Card */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
          <div className="max-w-md w-full bg-slate-950/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 animate-in zoom-in-95 backdrop-blur-xl">
            
            {/* Header / Lock badge */}
            <div className="text-center space-y-3">
              <div className="relative inline-block">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-black shadow-md">
                  ✓
                </div>
              </div>

              <div>
                <span className="px-3 py-0.5 rounded-full bg-indigo-950 text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-800">
                  Restricted Examiner Access
                </span>
                <h1 className="text-2xl font-black text-white mt-1.5">
                  Examiner PIN Verification
                </h1>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Enter your Administrator PIN to access the centralized candidate database, scores, uploaded questions, and real-time logs.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {pinError && (
              <div className="flex items-center space-x-2.5 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold animate-in shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{pinError}</span>
              </div>
            )}

            {/* PIN Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Administrator PIN Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    id="admin-security-pin-input"
                    type={showPin ? 'text' : 'password'}
                    maxLength={16}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (pinError) setPinError('');
                    }}
                    placeholder="••••"
                    autoFocus
                    className="w-full pl-10 pr-11 py-3 rounded-2xl text-center text-xl tracking-widest font-mono font-black bg-slate-900 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin((prev) => !prev)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 p-0.5"
                    title={showPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showPin ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* On-screen quick numeric keypad */}
              <div className="space-y-1.5 pt-1">
                <div className="grid grid-cols-3 gap-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                    <button
                      key={digit}
                      type="button"
                      onClick={() => handleKeypadPress(digit)}
                      className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 border border-slate-800 text-slate-200 font-mono font-bold text-base transition-colors cursor-pointer"
                    >
                      {digit}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleKeypadClear}
                    className="py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-rose-400 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => handleKeypadPress('0')}
                    className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-700 border border-slate-800 text-slate-200 font-mono font-bold text-base transition-colors cursor-pointer"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={handleKeypadBackspace}
                    className="py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-amber-400 font-bold text-xs transition-colors cursor-pointer"
                  >
                    ⌫
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="btn-admin-login-submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-600 hover:via-indigo-700 hover:to-purple-700 text-white font-black text-sm transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.98]"
              >
                <Unlock className="w-4 h-4" />
                <span>Verify PIN & Open Console</span>
              </button>
            </form>

            {/* Quick Helper Links */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs text-slate-400">
              <button
                type="button"
                onClick={handleCopyAdminUrl}
                className="hover:text-indigo-400 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedUrlFeedback ? 'URL Copied!' : 'Copy /admin Link'}</span>
              </button>

              <button
                type="button"
                onClick={handleReturnToStudentCBT}
                className="hover:text-slate-200 transition-colors cursor-pointer font-semibold"
              >
                Cancel & Return
              </button>
            </div>

          </div>
        </main>

        {/* Standalone Login Footer */}
        <footer className="w-full border-t border-slate-800 py-3.5 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Deeper Life Campus Fellowship (DLCF) • Central Examination Directorate</span>
            <span className="text-[11px] font-mono text-slate-600">Cloud Firestore Security Active • System Clock: {currentTime || 'Live'}</span>
          </div>
        </footer>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED STANDALONE ADMINISTRATOR WEBSITE
  // -------------------------------------------------------------
  const facultiesList = Array.from(new Set(candidateRecords.map((r) => r.profile.targetFaculty).filter(Boolean)));

  const filteredRecords = candidateRecords.filter((rec) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = (
      rec.profile.fullName.toLowerCase().includes(query) ||
      rec.profile.targetCourse.toLowerCase().includes(query) ||
      rec.profile.targetFaculty?.toLowerCase().includes(query) ||
      rec.profile.id.toLowerCase().includes(query)
    );

    const matchesFaculty = selectedFacultyFilter === 'all' || rec.profile.targetFaculty === selectedFacultyFilter;
    return matchesQuery && matchesFaculty;
  });

  const totalCandidates = candidateRecords.length;
  const allTests: TestResult[] = candidateRecords.flatMap((r) => r.tests);
  const totalTestsTaken = allTests.length;
  const overallAvgScore = totalTestsTaken > 0
    ? Math.round(allTests.reduce((acc, t) => acc + (t.totalScore || 0), 0) / totalTestsTaken)
    : 0;
  const peakScoreRecorded = totalTestsTaken > 0
    ? Math.max(...allTests.map((t) => t.totalScore || 0))
    : 0;

  const totalAvailableQuestions = getAllAvailableQuestions().length;

  const selectedRecord = candidateRecords.find((r) => r.profile.id === selectedCandidateId);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-purple-500 selection:text-white font-sans flex flex-col justify-between">
      
      {/* 1. STANDALONE ADMIN WEBSITE TOP HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-4 sm:px-8 py-3 transition-colors shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/25">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base sm:text-lg font-black text-white tracking-tight">
                  DLCF Post-UTME Administration Suite
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Authenticated</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 text-[10px] font-mono font-bold border border-purple-800">
                  /admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Examination Directorate • Central Cloud Synchronizer
              </p>
            </div>
          </div>

          {/* Quick Info & Actions Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Live Clock */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{currentTime || 'System Time'}</span>
            </div>

            {/* Direct URL / Copy button */}
            <button
              onClick={handleCopyAdminUrl}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-colors cursor-pointer"
              title="Copy direct link to this Admin website"
            >
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>{copiedUrlFeedback ? 'URL Copied!' : 'Copy /admin'}</span>
            </button>

            {/* Open in New Tab */}
            <button
              onClick={handleOpenInNewWindow}
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-colors cursor-pointer"
              title="Open Admin Portal in another standalone tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              <span>New Window</span>
            </button>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Cloud Sync Refresh */}
            <button
              onClick={reloadData}
              disabled={isLoadingCloud}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
              title="Sync latest records from Central Cloud DB"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCloud ? 'animate-spin text-indigo-400' : ''}`} />
              <span className="hidden sm:inline">Sync Cloud</span>
            </button>

            {/* Lock / Exit Admin Session */}
            <button
              onClick={handleLogoutAdmin}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/80 text-rose-300 text-xs font-bold transition-colors cursor-pointer"
              title="Lock Console and Logout"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>Lock Console</span>
            </button>

            {/* Return to Student CBT */}
            <button
              onClick={handleReturnToStudentCBT}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
              title="Return to Candidate CBT Portal"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Candidate CBT</span>
            </button>

          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto flex items-center space-x-2 mt-3 pt-3 border-t border-slate-800/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'candidates'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Candidates & Test Scores ({totalCandidates})</span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Question Bank & Uploads ({totalAvailableQuestions})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Reports & Score Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'security'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Security & PIN Vault</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WEBSITE CONTENT BODY */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6 flex-1">
        
        {/* KPI Metrics Dashboard Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-950/80 rounded-3xl p-5 border border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Registered Candidates</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {totalCandidates}
            </div>
            <div className="text-[11px] text-slate-500">
              Synced across cloud Firestore
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-3xl p-5 border border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Mock Tests Completed</span>
              <BarChart3 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">
              {totalTestsTaken}
            </div>
            <div className="text-[11px] text-slate-500">
              Exam sessions submitted
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-3xl p-5 border border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Active Question Bank</span>
              <BookOpen className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
              {totalAvailableQuestions}
            </div>
            <div className="text-[11px] text-slate-500">
              Built-in & custom past questions
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-3xl p-5 border border-slate-800 shadow-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
              <span>Exam Subject Bank</span>
              <Layers className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              11
            </div>
            <div className="text-[11px] text-slate-500">
              Subjects across 4 CBT Modes
            </div>
          </div>

        </div>

        {/* TAB 1: CANDIDATES & SCORES */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            
            {/* Action Bar: Search, Faculty Filter, CSV Export, Upload */}
            <div className="bg-slate-950/80 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search candidates by name, course, faculty, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                {/* Faculty filter & Export */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {facultiesList.length > 0 && (
                    <select
                      value={selectedFacultyFilter}
                      onChange={(e) => setSelectedFacultyFilter(e.target.value)}
                      className="px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">All Faculties ({candidateRecords.length})</option>
                      {facultiesList.map((fac) => (
                        <option key={fac} value={fac}>{fac}</option>
                      ))}
                    </select>
                  )}

                  <button
                    id="btn-upload-past-questions"
                    onClick={() => setIsUploadQuestionsOpen(true)}
                    className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-extrabold cursor-pointer shadow-md shadow-indigo-600/20"
                    title="Upload past questions into the question bank"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Questions</span>
                    {customQuestionsCount > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono">
                        +{customQuestionsCount}
                      </span>
                    )}
                  </button>

                  <button
                    id="btn-download-scores-csv"
                    onClick={() => setIsExportModalOpen(true)}
                    className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold cursor-pointer shadow-md shadow-emerald-600/20"
                    title="Download candidate scores spreadsheet with date filters"
                  >
                    <Download className="w-4 h-4" />
                    <span>{exportFeedback ? 'Exporting...' : 'Download Scores CSV'}</span>
                    <Calendar className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                  </button>
                </div>

              </div>

              <div className="text-xs font-bold text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span>Showing {filteredRecords.length} of {totalCandidates} registered candidates</span>
                {cloudSynced && (
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cloud Firestore Synced</span>
                  </span>
                )}
              </div>
            </div>

            {/* Candidates Table */}
            <div className="bg-slate-950/80 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
              {filteredRecords.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-slate-500 flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white">No Candidates Match Filters</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {searchQuery ? 'Try clearing your search query or faculty filter.' : 'Candidates will appear here automatically once registered.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4 sm:px-6">Candidate Profile</th>
                        <th className="py-3.5 px-4">Target Course / Faculty</th>
                        <th className="py-3.5 px-4 text-center">JAMB</th>
                        <th className="py-3.5 px-4 text-center">Exams Taken</th>
                        <th className="py-3.5 px-4 text-center">Latest Mode</th>
                        <th className="py-3.5 px-4 text-center">Latest Score</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-medium">
                      {filteredRecords.map((rec) => {
                        const latestTest = rec.tests.length > 0 ? rec.tests[rec.tests.length - 1] : null;
                        const totalQ = latestTest ? (latestTest.totalQuestions || 40) : 40;
                        const totalC = latestTest ? (latestTest.totalCorrect !== undefined ? latestTest.totalCorrect : 0) : 0;

                        return (
                          <tr 
                            key={rec.profile.id}
                            className="hover:bg-slate-900/60 transition-colors"
                          >
                            <td className="py-3.5 px-4 sm:px-6">
                              <div className="font-extrabold text-white">
                                {rec.profile.fullName}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                ID: {rec.profile.id} • Reg: {rec.profile.lastActiveDate || 'Active'}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-200 truncate max-w-[220px]">
                                {rec.profile.targetCourse}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate max-w-[220px]">
                                {rec.profile.targetFaculty || 'Faculty of Administration'}
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-300">
                              {rec.profile.jambScore}
                            </td>

                            <td className="py-3.5 px-4 text-center font-mono font-bold">
                              <span className={`px-2.5 py-1 rounded-full text-xs ${
                                rec.tests.length > 0
                                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                                  : 'bg-slate-900 text-slate-500'
                              }`}>
                                {rec.tests.length}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-center">
                              {latestTest ? (
                                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-bold">
                                  {latestTest.examMode.replace(/_/g, ' ')}
                                </span>
                              ) : (
                                <span className="text-slate-500 text-xs">No exams</span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 text-center font-mono font-bold">
                              {latestTest ? (
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                                  latestTest.percentage >= 70
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                    : latestTest.percentage >= 50
                                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                                }`}>
                                  {totalC}/{totalQ} ({latestTest.percentage}%)
                                </span>
                              ) : (
                                <span className="text-slate-500 text-xs">Pending</span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 text-right space-x-2">
                              <button
                                onClick={() => setSelectedCandidateId(rec.profile.id)}
                                className="p-2 rounded-xl bg-indigo-950/80 text-indigo-300 hover:bg-indigo-900 border border-indigo-800 transition-colors cursor-pointer"
                                title="Inspect Comprehensive Candidate Log"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDeleteCandidateClick(rec.profile.id, rec.profile.fullName)}
                                className="p-2 rounded-xl bg-rose-950/80 text-rose-300 hover:bg-rose-900 border border-rose-800 transition-colors cursor-pointer"
                                title={`Delete Candidate ${rec.profile.fullName}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Candidate Detailed Drawer */}
            {selectedRecord && (
              <div className="bg-slate-950/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 animate-in slide-in-from-bottom-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                      Candidate Examination Dossier
                    </span>
                    <h3 className="text-xl font-black text-white">
                      {selectedRecord.profile.fullName}&apos;s Performance History
                    </h3>
                    <p className="text-xs text-slate-400">
                      Target: {selectedRecord.profile.targetCourse} • {selectedRecord.profile.targetFaculty} • JAMB Score: {selectedRecord.profile.jambScore}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => handleDeleteCandidateClick(selectedRecord.profile.id, selectedRecord.profile.fullName)}
                      className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-rose-950/80 text-rose-300 hover:bg-rose-900 border border-rose-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Candidate</span>
                    </button>

                    <button
                      onClick={() => setSelectedCandidateId(null)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-xs font-bold text-slate-300 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                    >
                      Close Log
                    </button>
                  </div>
                </div>

                {selectedRecord.tests.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    This candidate has registered on the portal but has not taken any timed mock tests yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedRecord.tests.map((test, index) => (
                      <div
                        key={test.id || index}
                        className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="font-bold text-sm text-white">
                              {test.examTitle}
                            </div>
                            <div className="text-xs text-slate-400 font-mono">
                              Date: {test.date} • Mode: {test.examMode.replace(/_/g, ' ').toUpperCase()} • Time: {Math.round(test.timeTakenSeconds / 60)} mins
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <div className="text-lg font-black font-mono text-indigo-400">
                                {test.totalCorrect !== undefined ? test.totalCorrect : 0}/{test.totalQuestions || 40}
                              </div>
                              <div className="text-[10px] text-slate-400 font-bold">
                                {test.percentage}% Accuracy
                              </div>
                            </div>
                          </div>
                        </div>

                        {test.subjectBreakdowns && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
                            {test.subjectBreakdowns.map((b) => (
                              <div
                                key={b.subjectId}
                                className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                              >
                                <div className="text-[11px] font-bold text-slate-400 truncate">
                                  {b.subjectName}
                                </div>
                                <div className="font-mono font-extrabold text-white">
                                  {b.correct}/{b.totalQuestions} ({b.scorePercentage}%)
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* TAB 2: QUESTION BANK & UPLOADS */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div className="bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white">
                    OAU Post-UTME Central Question Bank
                  </h2>
                  <p className="text-xs text-slate-400">
                    Comprehensive bank spanning all 11 examination subjects with real OAU past papers and custom uploads.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center">
                  <button
                    onClick={handleAutoSortQuestionBank}
                    disabled={isAutoSorting}
                    className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-700/60 text-amber-300 hover:text-amber-200 text-xs font-bold cursor-pointer transition-all disabled:opacity-50"
                    title="Automatically analyze question topics, formulas, and terminology to sort and classify into correct subjects"
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-amber-400 ${isAutoSorting ? 'animate-spin' : ''}`} />
                    <span>{isAutoSorting ? 'Auto-Sorting...' : 'Smart Auto-Sort Bank'}</span>
                  </button>

                  <button
                    onClick={handleSyncQuestionsFromCloud}
                    disabled={isSyncingQuestions}
                    className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold cursor-pointer transition-all disabled:opacity-50"
                    title="Sync with central Firestore database to pull latest question updates and clear purged questions"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isSyncingQuestions ? 'animate-spin' : ''}`} />
                    <span>{isSyncingQuestions ? 'Syncing...' : 'Sync Database'}</span>
                  </button>

                  <button
                    onClick={() => setIsUploadQuestionsOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-extrabold cursor-pointer shadow-md shadow-indigo-600/20"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Past Questions</span>
                  </button>
                </div>
              </div>

              {syncFeedback && (
                <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-700/50 text-indigo-200 text-xs font-semibold flex items-center space-x-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{syncFeedback}</span>
                </div>
              )}

              {/* Bank Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-bold">Standard Past Questions</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">400</div>
                  <div className="text-[11px] text-slate-500">Built-in verified OAU past paper series</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-bold">Custom Uploaded Questions</div>
                  <div className="text-2xl font-black text-indigo-400 font-mono mt-1">{customQuestionsCount}</div>
                  <div className="text-[11px] text-slate-500">Synchronized via Firestore Cloud</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-bold">Total Available Questions</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{totalAvailableQuestions}</div>
                  <div className="text-[11px] text-slate-500">Active across all 4 CBT modes</div>
                </div>
              </div>

              {/* Subject Breakdown Card */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-300">
                  Syllabus Coverage by Subject
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                  {[
                    { id: 'aptitude', name: 'General Aptitude / English' },
                    { id: 'mathematics', name: 'Mathematics' },
                    { id: 'physics', name: 'Physics' },
                    { id: 'chemistry', name: 'Chemistry' },
                    { id: 'biology', name: 'Biology' },
                    { id: 'economics', name: 'Economics' },
                    { id: 'government', name: 'Government' },
                    { id: 'literature', name: 'Literature in English' },
                    { id: 'crk', name: 'Christian Religious Studies' },
                    { id: 'accounting', name: 'Financial Accounting' }
                  ].map((sub) => {
                    const count = getAllAvailableQuestions().filter((q) => q.subjectId === sub.id).length;
                    return (
                      <div key={sub.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="font-bold text-slate-300 truncate">{sub.name}</span>
                        <span className="font-mono font-black text-indigo-400">{count} Qs</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: REPORTS & ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white">
                    Candidate Performance & Score Reporting
                  </h2>
                  <p className="text-xs text-slate-400">
                    Export candidate results based on actual question volume in exam modes, with custom date range selection.
                  </p>
                </div>

                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold cursor-pointer shadow-md shadow-emerald-600/20 self-start sm:self-center"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Filtered Scores Report</span>
                  <Calendar className="w-3.5 h-3.5 ml-1 opacity-80" />
                </button>
              </div>

              {/* Performance Cards based on Questions Accuracy */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-bold">High Performing Attempts (&ge; 70% Accuracy)</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {candidateRecords.reduce((acc, c) => acc + c.tests.filter((t) => t.percentage >= 70).length, 0)}
                  </div>
                  <div className="text-[11px] text-slate-500">Exemplary score threshold across test sessions</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-bold">Moderate Attempts (50% - 69% Accuracy)</div>
                  <div className="text-2xl font-black text-blue-400 font-mono">
                    {candidateRecords.reduce((acc, c) => acc + c.tests.filter((t) => t.percentage >= 50 && t.percentage < 70).length, 0)}
                  </div>
                  <div className="text-[11px] text-slate-500">Solid comprehension & foundation</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-bold">Practice & Drill Attempts (&lt; 50% Accuracy)</div>
                  <div className="text-2xl font-black text-amber-400 font-mono">
                    {candidateRecords.reduce((acc, c) => acc + c.tests.filter((t) => t.percentage < 50).length, 0)}
                  </div>
                  <div className="text-[11px] text-slate-500">Recommended for intensive revision drills</div>
                </div>
              </div>

              {/* Date Filter & Export Tool Panel */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>Date Range Export Filter</span>
                    </h3>
                    <p className="text-xs text-slate-400">Select a time period to generate candidate performance records</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {getMatchingTestsCount(exportDatePreset, exportStartDate, exportEndDate)} test sessions found
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'all', label: 'All Time' },
                    { id: 'today', label: 'Today' },
                    { id: 'last_7_days', label: 'Last 7 Days' },
                    { id: 'last_30_days', label: 'Last 30 Days' },
                    { id: 'custom', label: 'Custom Range' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setExportDatePreset(preset.id as any)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                        exportDatePreset === preset.id
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/20'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {exportDatePreset === 'custom' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">From Date</label>
                      <input
                        type="date"
                        value={exportStartDate}
                        onChange={(e) => setExportStartDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">To Date</label>
                      <input
                        type="date"
                        value={exportEndDate}
                        onChange={(e) => setExportEndDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>CSV output contains candidate demographics, correct count, total questions in exam mode, and duration.</span>
                  </div>
                  <button
                    onClick={() => handleDownloadScores()}
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold cursor-pointer transition-all shadow-md shadow-emerald-600/20"
                  >
                    Download CSV ({getMatchingTestsCount(exportDatePreset, exportStartDate, exportEndDate)} tests)
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & PIN VAULT */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white">
                    Examiner Access Control & Security Policies
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage your coordinator password, cloud synchronization keys, and security settings.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Change PIN Box */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Administrator Access PIN
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Required whenever entering or re-entering the Admin website.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsChangePinOpen(true);
                      setChangePinMsg(null);
                    }}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Change Administrator PIN</span>
                  </button>
                </div>

                {/* Cloud DB Connection Status */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Cloud Database Synchronization
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Google Cloud Firestore Real-time Database
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Connected & Synchronizing live</span>
                  </div>
                </div>

              </div>

              {/* Security Advisory */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-bold text-slate-300">Security Recommendation</div>
                <p>Always click &ldquo;Lock Console&rdquo; before stepping away from this device. The system automatically clears memory credentials on departure to prevent unauthorized viewing of candidate records.</p>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* 3. STANDALONE ADMIN WEBSITE FOOTER */}
      <footer className="w-full border-t border-slate-800 bg-slate-950 py-4 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-indigo-400">Deeper Life Campus Fellowship (DLCF)</span>
            <span>•</span>
            <span className="font-semibold text-slate-300">Central Examination Administration Portal</span>
            <span>•</span>
            <span className="font-mono text-slate-500">/admin</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleReturnToStudentCBT}
              className="text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer"
            >
              ← Return to Candidate CBT App
            </button>
            <span>•</span>
            <button
              onClick={handleLogoutAdmin}
              className="text-rose-400 hover:text-rose-300 font-bold cursor-pointer"
            >
              Lock Console
            </button>
          </div>
        </div>
      </footer>

      {/* Set / Change PIN Modal */}
      {isChangePinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-800 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">
                    Set Administrator PIN
                  </h3>
                  <p className="text-xs text-slate-400">Update your examiner login code</p>
                </div>
              </div>
              <button
                onClick={() => setIsChangePinOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {changePinMsg && (
              <div className={`p-3 rounded-2xl flex items-center space-x-2 text-xs font-semibold ${
                changePinMsg.type === 'success'
                  ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                  : 'bg-rose-950/80 border border-rose-800 text-rose-300'
              }`}>
                {changePinMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{changePinMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Current Administrator PIN
                </label>
                <input
                  type="password"
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  placeholder="Enter current PIN"
                  className="w-full px-3.5 py-2.5 rounded-xl font-mono text-sm bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  New PIN (Minimum 4 digits or characters)
                </label>
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Enter new PIN"
                  className="w-full px-3.5 py-2.5 rounded-xl font-mono text-sm bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Confirm New PIN
                </label>
                <input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="Re-enter new PIN"
                  className="w-full px-3.5 py-2.5 rounded-xl font-mono text-sm bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsChangePinOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-save-admin-pin"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  Save New PIN
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Date Filter & Export CSV Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-800 shadow-2xl space-y-6 animate-in zoom-in-95 text-slate-100">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">
                    Export Candidate Scores
                  </h3>
                  <p className="text-xs text-slate-400">Download CSV filtered by date range</p>
                </div>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">
                Select Date Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'all', label: 'All Time' },
                  { id: 'today', label: 'Today' },
                  { id: 'last_7_days', label: 'Last 7 Days' },
                  { id: 'last_30_days', label: 'Last 30 Days' },
                  { id: 'custom', label: 'Custom Range' },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setExportDatePreset(preset.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                      exportDatePreset === preset.id
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {exportDatePreset === 'custom' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={exportStartDate}
                    onChange={(e) => setExportStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">End Date</label>
                  <input
                    type="date"
                    value={exportEndDate}
                    onChange={(e) => setExportEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/60 flex items-center justify-between text-xs">
              <span className="text-emerald-300 font-semibold">Matched Exam Records:</span>
              <span className="font-mono font-black text-white text-sm">
                {getMatchingTestsCount(exportDatePreset, exportStartDate, exportEndDate)} test sessions
              </span>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDownloadScores()}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV Spreadsheet</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Upload Past Questions Modal */}
      <UploadPastQuestionsModal
        isOpen={isUploadQuestionsOpen}
        onClose={() => setIsUploadQuestionsOpen(false)}
        onQuestionsUpdated={() => {
          setCustomQuestionsCount(getStoredCustomQuestions().length);
        }}
      />

      {/* Delete Candidate Confirmation Modal */}
      {candidateToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-800 shadow-2xl space-y-5 animate-in zoom-in-95 text-slate-100">
            
            <div className="flex items-center space-x-3 text-rose-400">
              <div className="w-11 h-11 rounded-2xl bg-rose-950/80 border border-rose-800 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h3 className="font-black text-lg text-white">
                  Delete Candidate Record
                </h3>
                <p className="text-xs text-rose-400 font-bold">
                  Irreversible Administrative Action
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete candidate <strong className="text-white font-extrabold">{candidateToDelete.name}</strong> and all their associated test logs, mock CBT scores, and saved question history?
            </p>

            <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-900/60 text-[11px] text-rose-300 font-medium">
              This record will be permanently purged from this device and removed from the central Cloud Firestore database.
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setCandidateToDelete(null)}
                disabled={isDeletingCandidate}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDeleteCandidate}
                disabled={isDeletingCandidate}
                id="btn-confirm-delete-candidate"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-extrabold transition-all shadow-md shadow-rose-600/20 cursor-pointer"
              >
                {isDeletingCandidate ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Delete Candidate</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
