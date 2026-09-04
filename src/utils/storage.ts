import { StudentProfile, SubjectId, TestResult, SavedQuestionItem, Question } from '../types';
import { SUBJECT_METADATA } from '../data/oauQuestions';
import { classifyQuestionSubject, autoClassifyAndSortBank } from './questionClassifier';
import { 
  syncCandidateProfileToCloud, 
  syncTestResultToCloud, 
  deleteCandidateFromCloud,
  syncCustomQuestionToCloud,
  batchSyncCustomQuestionsToCloud,
  deleteCustomQuestionFromCloud
} from '../lib/cloudDb';

const STORAGE_KEYS = {
  ACTIVE_USER_ID: 'oau_cbt_active_user_id',
  PROFILES_REGISTRY: 'oau_cbt_profiles_registry',
  TEST_HISTORIES_BY_USER: 'oau_cbt_histories_by_user',
  REVISION_BANKS_BY_USER: 'oau_cbt_revisions_by_user',
  THEME: 'oau_cbt_theme',
  ACTIVE_EXAM_BACKUP: 'oau_cbt_active_exam_backup',
  ADMIN_PIN: 'oau_cbt_admin_access_pin',
  ADMIN_SESSION: 'oau_cbt_admin_session_auth',
  CUSTOM_QUESTION_BANK: 'oau_cbt_custom_questions',
};


// Default Administrator PIN (if not customized yet)
export const DEFAULT_ADMIN_PIN = '1962';

// Get current Admin PIN
export function getStoredAdminPin(): string {
  try {
    const pin = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN);
    return pin && pin.trim().length > 0 ? pin : DEFAULT_ADMIN_PIN;
  } catch {
    return DEFAULT_ADMIN_PIN;
  }
}

// Update Admin PIN
export function setStoredAdminPin(newPin: string): boolean {
  try {
    if (!newPin || newPin.trim().length < 4) return false;
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin.trim());
    return true;
  } catch (err) {
    console.error('Failed to set admin pin', err);
    return false;
  }
}

// Verify Admin PIN
export function verifyAdminPin(enteredPin: string): boolean {
  const currentPin = getStoredAdminPin();
  return enteredPin.trim() === currentPin.trim();
}

// Admin Session State
export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(authenticated: boolean): void {
  try {
    if (authenticated) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
  } catch (err) {
    console.error('Failed to set admin session', err);
  }
}

export function clearAdminSession(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  } catch (err) {
    console.error('Failed to clear admin session', err);
  }
}

// Normalize student names for reliable lookup
export function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

// Get all stored profiles
export function getAllStoredProfiles(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILES_REGISTRY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load profiles registry', err);
    return [];
  }
}

// Save list of profiles
export function saveAllProfiles(profiles: StudentProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILES_REGISTRY, JSON.stringify(profiles));
  } catch (err) {
    console.error('Failed to save profiles registry', err);
  }
}

// Get the currently active user profile (if logged in)
export function getActiveUser(): StudentProfile | null {
  try {
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID);
    if (!activeId) return null;

    const all = getAllStoredProfiles();
    const found = all.find((p) => p.id === activeId || normalizeName(p.fullName) === normalizeName(activeId));
    return found || null;
  } catch (err) {
    console.error('Failed to get active user', err);
    return null;
  }
}

// Set or switch active user
export function setActiveUser(profile: StudentProfile | null): void {
  try {
    if (profile) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, profile.id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID);
    }
  } catch (err) {
    console.error('Failed to set active user', err);
  }
}

// Find student by full name
export function findCandidateByName(fullName: string): StudentProfile | null {
  const norm = normalizeName(fullName);
  const all = getAllStoredProfiles();
  return all.find((p) => normalizeName(p.fullName) === norm) || null;
}

// Authenticate and Login existing candidate with Name and Password
export function loginCandidate(
  fullName: string, 
  password: string
): { success: boolean; profile?: StudentProfile; message?: string } {
  if (!fullName.trim()) {
    return { success: false, message: 'Please enter your candidate name.' };
  }
  if (!password.trim()) {
    return { success: false, message: 'Please enter your candidate password.' };
  }

  const existing = findCandidateByName(fullName);
  if (!existing) {
    return { 
      success: false, 
      message: 'Candidate account not found. Please check your name or create a new account.' 
    };
  }

  // If the profile already has a password set, verify it
  if (existing.password && existing.password.trim().length > 0) {
    if (existing.password.trim() !== password.trim()) {
      return { 
        success: false, 
        message: 'Incorrect candidate password. Please verify and try again.' 
      };
    }
  } else {
    // If the candidate was previously saved without a password, set this password now
    existing.password = password.trim();
    saveProfile(existing);
  }

  // Update last active date and set active user
  const today = new Date().toISOString().split('T')[0];
  const updated: StudentProfile = {
    ...existing,
    lastActiveDate: today,
  };
  saveProfile(updated);
  setActiveUser(updated);

  return { success: true, profile: updated };
}

// Register a new candidate with Name, Password, and Target details
export function registerCandidate(params: {
  fullName: string;
  password: string;
  targetCourse: string;
  targetFaculty?: string;
  jambScore?: number;
  subjectCombination?: SubjectId[];
}): { success: boolean; profile?: StudentProfile; message?: string } {
  if (!params.fullName.trim()) {
    return { success: false, message: 'Candidate full name is required.' };
  }
  if (!params.password || params.password.trim().length < 4) {
    return { success: false, message: 'Password must be at least 4 characters long.' };
  }

  const norm = normalizeName(params.fullName);
  const all = getAllStoredProfiles();
  const existing = all.find((p) => normalizeName(p.fullName) === norm);

  if (existing) {
    // Check if password matches
    if (existing.password && existing.password.trim() !== params.password.trim()) {
      return {
        success: false,
        message: 'An account with this name already exists. Please log in with your existing password or use a different name.'
      };
    }
    // Update existing
    const today = new Date().toISOString().split('T')[0];
    const updated: StudentProfile = {
      ...existing,
      password: params.password.trim(),
      targetCourse: params.targetCourse.trim() || existing.targetCourse,
      targetFaculty: params.targetFaculty || existing.targetFaculty,
      jambScore: params.jambScore ?? existing.jambScore,
      subjectCombination: params.subjectCombination || existing.subjectCombination,
      lastActiveDate: today,
    };
    saveProfile(updated);
    setActiveUser(updated);
    return { success: true, profile: updated };
  }

  const today = new Date().toISOString().split('T')[0];
  const newProfile: StudentProfile = {
    id: 'cand_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
    fullName: params.fullName.trim(),
    password: params.password.trim(),
    targetCourse: params.targetCourse.trim() || 'Medicine and Surgery (MBBS)',
    targetFaculty: params.targetFaculty || 'Faculty of Clinical Sciences',
    jambScore: params.jambScore ?? 280,
    subjectCombination: params.subjectCombination || ['biology', 'chemistry', 'physics', 'aptitude'],
    lastActiveDate: today,
    avatarSeed: 'cand_' + (all.length + 1),
  };

  all.unshift(newProfile);
  saveAllProfiles(all);
  setActiveUser(newProfile);
  // Sync to Cloud
  syncCandidateProfileToCloud(newProfile);

  return { success: true, profile: newProfile };
}

// Login or Register a student (Legacy & flexible helper)
export function loginOrRegisterStudent(params: {
  fullName: string;
  password?: string;
  targetCourse: string;
  targetFaculty?: string;
  jambScore?: number;
  subjectCombination?: SubjectId[];
}): StudentProfile {
  const norm = normalizeName(params.fullName);
  const all = getAllStoredProfiles();
  const existing = all.find((p) => normalizeName(p.fullName) === norm);

  const today = new Date().toISOString().split('T')[0];

  if (existing) {
    // Update existing student with any newly provided details
    const updated: StudentProfile = {
      ...existing,
      password: params.password?.trim() || existing.password,
      targetCourse: params.targetCourse.trim() || existing.targetCourse,
      targetFaculty: params.targetFaculty || existing.targetFaculty,
      jambScore: params.jambScore ?? existing.jambScore,
      subjectCombination: params.subjectCombination || existing.subjectCombination,
      lastActiveDate: today,
    };

    const newAll = all.map((p) => (p.id === existing.id ? updated : p));
    saveAllProfiles(newAll);
    setActiveUser(updated);
    // Sync to Cloud
    syncCandidateProfileToCloud(updated);
    return updated;
  }

  // Create new profile
  const newProfile: StudentProfile = {
    id: 'cand_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
    fullName: params.fullName.trim(),
    password: params.password?.trim() || '',
    targetCourse: params.targetCourse.trim() || 'Medicine and Surgery (MBBS)',
    targetFaculty: params.targetFaculty || 'Faculty of Clinical Sciences',
    jambScore: params.jambScore ?? 280,
    subjectCombination: params.subjectCombination || ['biology', 'chemistry', 'physics', 'aptitude'],
    lastActiveDate: today,
    avatarSeed: 'cand_' + (all.length + 1),
  };

  all.unshift(newProfile);
  saveAllProfiles(all);
  setActiveUser(newProfile);
  // Sync to Cloud
  syncCandidateProfileToCloud(newProfile);
  return newProfile;
}

// Update profile
export function saveProfile(updatedProfile: StudentProfile): void {
  try {
    const all = getAllStoredProfiles();
    const index = all.findIndex((p) => p.id === updatedProfile.id);
    if (index !== -1) {
      all[index] = updatedProfile;
    } else {
      all.unshift(updatedProfile);
    }
    saveAllProfiles(all);
    setActiveUser(updatedProfile);
    // Sync to Cloud
    syncCandidateProfileToCloud(updatedProfile);
  } catch (err) {
    console.error('Failed to update profile', err);
  }
}

// Log out active user
export function logoutUser(): void {
  setActiveUser(null);
}

// Get test history for a specific student
export function getStoredTestHistory(studentIdOrName?: string): TestResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_HISTORIES_BY_USER);
    const map: Record<string, TestResult[]> = raw ? JSON.parse(raw) : {};

    if (!studentIdOrName) {
      const active = getActiveUser();
      if (!active) return [];
      studentIdOrName = active.id;
    }

    // Lookup by id, or by normalized name as fallback
    if (map[studentIdOrName]) {
      return map[studentIdOrName];
    }

    const norm = normalizeName(studentIdOrName);
    for (const key of Object.keys(map)) {
      if (normalizeName(key) === norm) {
        return map[key];
      }
    }

    return [];
  } catch (err) {
    console.error('Failed to load test history', err);
    return [];
  }
}

// Get ALL test histories across all registered students (For Admin View)
export function getAllCandidatesActivity(): Array<{
  profile: StudentProfile;
  tests: TestResult[];
  averageScore: number;
  highestScore: number;
  lastTestDate: string | null;
}> {
  try {
    const profiles = getAllStoredProfiles();
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_HISTORIES_BY_USER);
    const map: Record<string, TestResult[]> = raw ? JSON.parse(raw) : {};

    return profiles.map((p) => {
      const tests = map[p.id] || [];
      const averageScore = tests.length > 0
        ? Math.round(tests.reduce((acc, t) => acc + (t.totalScore || 0), 0) / tests.length)
        : 0;
      const highestScore = tests.length > 0
        ? Math.max(...tests.map((t) => t.totalScore || 0))
        : 0;
      const lastTestDate = tests.length > 0 ? tests[0].date : null;

      return {
        profile: p,
        tests,
        averageScore,
        highestScore,
        lastTestDate,
      };
    });
  } catch (err) {
    console.error('Failed to get all candidates activity', err);
    return [];
  }
}

// Save a test result for the active student
export function saveTestResult(result: TestResult, studentIdOrName?: string): TestResult[] {
  try {
    const active = getActiveUser();
    const key = studentIdOrName || (active ? active.id : normalizeName(result.studentName));
    
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_HISTORIES_BY_USER);
    const map: Record<string, TestResult[]> = raw ? JSON.parse(raw) : {};

    const existingForUser = map[key] || [];
    const updatedForUser = [result, ...existingForUser];
    map[key] = updatedForUser;

    localStorage.setItem(STORAGE_KEYS.TEST_HISTORIES_BY_USER, JSON.stringify(map));

    // Sync to Cloud Firestore in background
    if (active) {
      syncTestResultToCloud(result, active.id);
    } else {
      syncTestResultToCloud(result, key);
    }

    return updatedForUser;
  } catch (err) {
    console.error('Failed to save test result', err);
    return [];
  }
}

// Clear test history for active student
export function clearTestHistory(studentIdOrName?: string): void {
  try {
    const active = getActiveUser();
    const key = studentIdOrName || (active ? active.id : null);
    if (!key) return;

    const raw = localStorage.getItem(STORAGE_KEYS.TEST_HISTORIES_BY_USER);
    if (!raw) return;

    const map: Record<string, TestResult[]> = JSON.parse(raw);
    delete map[key];
    localStorage.setItem(STORAGE_KEYS.TEST_HISTORIES_BY_USER, JSON.stringify(map));
  } catch (err) {
    console.error('Failed to clear test history', err);
  }
}

// Delete an entire candidate profile and their tests (Admin or Candidate action)
export function deleteCandidateProfile(candidateId: string): void {
  try {
    const profiles = getAllStoredProfiles().filter((p) => p.id !== candidateId);
    saveAllProfiles(profiles);

    const raw = localStorage.getItem(STORAGE_KEYS.TEST_HISTORIES_BY_USER);
    if (raw) {
      const map: Record<string, TestResult[]> = JSON.parse(raw);
      delete map[candidateId];
      localStorage.setItem(STORAGE_KEYS.TEST_HISTORIES_BY_USER, JSON.stringify(map));
    }

    const revRaw = localStorage.getItem(STORAGE_KEYS.REVISION_BANKS_BY_USER);
    if (revRaw) {
      const revMap: Record<string, SavedQuestionItem[]> = JSON.parse(revRaw);
      delete revMap[candidateId];
      localStorage.setItem(STORAGE_KEYS.REVISION_BANKS_BY_USER, JSON.stringify(revMap));
    }

    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID);
    if (activeId === candidateId) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID);
    }

    // Delete from Cloud Firestore asynchronously
    deleteCandidateFromCloud(candidateId);
  } catch (err) {
    console.error('Failed to delete candidate profile', err);
  }
}

// Revision bank per user
export function getStoredRevisionBank(studentIdOrName?: string): SavedQuestionItem[] {
  try {
    const active = getActiveUser();
    const key = studentIdOrName || (active ? active.id : 'default_bank');

    const raw = localStorage.getItem(STORAGE_KEYS.REVISION_BANKS_BY_USER);
    if (!raw) return [];
    const map: Record<string, SavedQuestionItem[]> = JSON.parse(raw);
    return map[key] || [];
  } catch (err) {
    console.error('Failed to load revision bank', err);
    return [];
  }
}

export function toggleSaveQuestion(item: SavedQuestionItem, studentIdOrName?: string): boolean {
  try {
    const active = getActiveUser();
    const key = studentIdOrName || (active ? active.id : 'default_bank');

    const raw = localStorage.getItem(STORAGE_KEYS.REVISION_BANKS_BY_USER);
    const map: Record<string, SavedQuestionItem[]> = raw ? JSON.parse(raw) : {};
    const current = map[key] || [];

    const exists = current.some((q) => q.question.id === item.question.id);
    let updated: SavedQuestionItem[];
    if (exists) {
      updated = current.filter((q) => q.question.id !== item.question.id);
    } else {
      updated = [item, ...current];
    }
    map[key] = updated;
    localStorage.setItem(STORAGE_KEYS.REVISION_BANKS_BY_USER, JSON.stringify(map));
    return !exists;
  } catch (err) {
    console.error('Failed to toggle saved question', err);
    return false;
  }
}

export function isQuestionSaved(questionId: string, studentIdOrName?: string): boolean {
  try {
    const current = getStoredRevisionBank(studentIdOrName);
    return current.some((q) => q.question.id === questionId);
  } catch {
    return false;
  }
}

// Aliases for seamless imports
export const getActiveProfile = getActiveUser;
export const logoutStudent = logoutUser;
export const clearStoredTestHistory = clearTestHistory;
export const getStoredProfile = getActiveUser;

// Theme helper
export function getStoredTheme(): 'light' | 'dark' {
  try {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (theme === 'dark' || theme === 'light') return theme;
    return 'light';
  } catch {
    return 'light';
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (err) {
    console.error('Failed to set theme', err);
  }
}

// Helper to check if a date string or timestamp falls in range
function isDateWithinRange(dateStr?: string, timestamp?: number, startStr?: string, endStr?: string): boolean {
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
}

// Export All Student Scores and Exam Attempts as CSV spreadsheet
export function exportStudentScoresCSV(startDate?: string, endDate?: string): void {
  try {
    const activities = getAllCandidatesActivity();
    
    // CSV Header row - tailored without Post-UTME avg / composite, scores over total questions
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
      'Correct Questions',
      'Total Questions',
      'Accuracy (%)',
      'Time Spent (mins)'
    ];

    const rows: string[][] = [];

    activities.forEach((item) => {
      const jamb = item.profile.jambScore || 0;
      const matchingTests = item.tests.filter((t) => isDateWithinRange(t.date, t.timestamp, startDate, endDate));

      if (matchingTests.length === 0) {
        // If filtering by date and no tests in range, still show candidate if no range, or skip if strict range
        if (!startDate && !endDate) {
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
    const dateTag = startDate && endDate ? `_${startDate}_to_${endDate}` : startDate ? `_from_${startDate}` : `_${timestamp}`;
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DLCF_CBT_Candidate_Scores${dateTag}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Failed to export student scores CSV', err);
    alert('Failed to generate CSV export file.');
  }
}

// -------------------------------------------------------------
// CUSTOM / UPLOADED PAST QUESTIONS STORAGE
// -------------------------------------------------------------

/**
 * Retrieve all custom questions saved in local storage
 */
export function getStoredCustomQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTION_BANK);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read custom questions from storage', err);
    return [];
  }
}

/**
 * Save a single custom question to local storage and sync to Cloud
 */
export function saveCustomQuestion(question: Question): Question[] {
  try {
    const existing = getStoredCustomQuestions();
    const cleanId = question.id || `custom_q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    // Auto-classify subject if aptitude or unclassified
    let finalSubId = question.subjectId;
    let finalSubName = question.subjectName;
    if (!finalSubId || finalSubId === 'aptitude') {
      const detected = classifyQuestionSubject(question.questionText, question.options, finalSubId);
      if (detected.subjectId) {
        finalSubId = detected.subjectId;
        finalSubName = SUBJECT_METADATA[finalSubId]?.name || finalSubName;
      }
    }

    const questionWithId: Question = { 
      ...question, 
      id: cleanId,
      subjectId: finalSubId,
      subjectName: finalSubName,
    };

    // Check if updating existing or inserting new
    const index = existing.findIndex((q) => q.id === cleanId);
    let updated: Question[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = questionWithId;
    } else {
      updated = [questionWithId, ...existing];
    }

    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTION_BANK, JSON.stringify(updated));

    // Sync to Cloud Firestore
    syncCustomQuestionToCloud(questionWithId);

    return updated;
  } catch (err) {
    console.error('Failed to save custom question', err);
    return getStoredCustomQuestions();
  }
}

/**
 * Batch upload / save multiple custom questions with automatic domain subject classification
 */
export function batchSaveCustomQuestions(newQuestions: Question[]): Question[] {
  try {
    const existing = getStoredCustomQuestions();
    const existingIds = new Set(existing.map((q) => q.id));

    const preparedQuestions: Question[] = newQuestions.map((q, idx) => {
      const cleanId = q.id && !existingIds.has(q.id) 
        ? q.id 
        : `custom_q_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`;

      // Auto-classify if currently default 'aptitude' or unclassified
      let subId = q.subjectId;
      let subName = q.subjectName;
      if (!subId || subId === 'aptitude') {
        const detected = classifyQuestionSubject(q.questionText, q.options, subId);
        if (detected.subjectId) {
          subId = detected.subjectId;
          subName = SUBJECT_METADATA[subId]?.name || subName;
        }
      }

      return { 
        ...q, 
        id: cleanId,
        subjectId: subId,
        subjectName: subName,
      };
    });

    const combined = [...preparedQuestions, ...existing];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTION_BANK, JSON.stringify(combined));

    // Batch sync to Cloud Firestore
    batchSyncCustomQuestionsToCloud(preparedQuestions);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('custom_questions_updated', { detail: { count: combined.length } }));
    }

    return combined;
  } catch (err) {
    console.error('Failed to batch save custom questions', err);
    return getStoredCustomQuestions();
  }
}

/**
 * Scan all custom questions in the bank, auto-classify and sort into subjects,
 * and sync updates to Cloud Firestore.
 */
export async function autoSortStoredQuestionBank(): Promise<{
  sorted: Question[];
  reclassifiedCount: number;
  stats: Record<SubjectId, number>;
}> {
  try {
    const current = getStoredCustomQuestions();
    const { sortedQuestions, changedQuestions, stats, reclassifiedCount } = autoClassifyAndSortBank(current);

    if (reclassifiedCount > 0) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTION_BANK, JSON.stringify(sortedQuestions));
      await batchSyncCustomQuestionsToCloud(changedQuestions);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('custom_questions_updated', { detail: { count: sortedQuestions.length } }));
      }
    }

    return {
      sorted: sortedQuestions,
      reclassifiedCount,
      stats,
    };
  } catch (err) {
    console.error('Failed to auto-sort question bank', err);
    const current = getStoredCustomQuestions();
    return {
      sorted: current,
      reclassifiedCount: 0,
      stats: {} as Record<SubjectId, number>,
    };
  }
}

/**
 * Delete a custom question from local storage & Cloud
 */
export function deleteStoredCustomQuestion(questionId: string): Question[] {
  try {
    const existing = getStoredCustomQuestions();
    const filtered = existing.filter((q) => q.id !== questionId);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTION_BANK, JSON.stringify(filtered));

    // Delete from Cloud
    deleteCustomQuestionFromCloud(questionId);

    return filtered;
  } catch (err) {
    console.error('Failed to delete custom question', err);
    return getStoredCustomQuestions();
  }
}

/**
 * Synchronize local custom questions with Cloud custom questions
 * Cloud Firestore is the authoritative master question bank.
 * Setting cloudQuestions directly ensures deleted junk questions are pruned locally
 * and subject reclassifications are applied immediately.
 */
export function mergeCustomQuestionsWithCloud(cloudQuestions: Question[]): Question[] {
  try {
    if (Array.isArray(cloudQuestions)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTION_BANK, JSON.stringify(cloudQuestions));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('custom_questions_updated', { detail: { count: cloudQuestions.length } }));
      }
      return cloudQuestions;
    }
    return getStoredCustomQuestions();
  } catch (err) {
    console.error('Failed to merge custom questions with cloud', err);
    return getStoredCustomQuestions();
  }
}

export const syncCustomQuestionsFromCloud = mergeCustomQuestionsWithCloud;

