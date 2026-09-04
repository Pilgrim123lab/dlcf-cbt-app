export type SubjectId = 
  | 'aptitude'
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'economics'
  | 'government'
  | 'literature'
  | 'crk'
  | 'accounting';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  shortName: string;
  iconName: string;
  category: 'compulsory' | 'science' | 'commercial' | 'arts';
  description: string;
  questionCountAvailable: number;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  subjectName: string;
  year?: number | string;
  topic: string;
  questionText: string;
  passage?: string; // For comprehension / extract
  options: string[];
  correctOptionIndex: number; // 0 for A, 1 for B, 2 for C, 3 for D, 4 for E
  explanation: string;
  keyConcept?: string;
  oauExamTip?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserAnswer {
  questionId: string;
  selectedOptionIndex: number | null;
  isFlagged: boolean;
  timeSpentSeconds: number;
}

export interface SubjectScoreBreakdown {
  subjectId: SubjectId;
  subjectName: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  scorePercentage: number;
  scaledScore: number; // e.g. out of 100
  timeSpentSeconds: number;
}

export interface TestResult {
  id: string;
  date: string;
  timestamp: number;
  examTitle: string;
  examMode: 'standard_oau_mock' | 'subject_drill' | 'speed_sprint' | 'untimed_practice';
  durationMinutes: number;
  timeTakenSeconds: number;
  selectedSubjects: SubjectId[];
  totalQuestions: number;
  totalAttempted: number;
  totalCorrect: number;
  totalScore: number; // Scaled to 400 (standard OAU Post-UTME)
  percentage: number;
  subjectBreakdowns: SubjectScoreBreakdown[];
  answers: Record<string, UserAnswer>;
  questions: Question[];
  studentName: string;
  targetCourse: string;
  jambScore?: number;
  compositeAggregate?: number; // OAU 50:50 composite score
}

export interface StudentProfile {
  id: string;
  fullName: string;
  password?: string;
  targetCourse: string;
  targetFaculty: string;
  jambScore: number;
  targetPostUtmeScore?: number;
  subjectCombination: SubjectId[];
  lastActiveDate: string;
  avatarSeed: string;
}

export interface SavedQuestionItem {
  question: Question;
  savedAt: string;
  userLastChoice: number | null;
  notes?: string;
}

export interface FacultyPreset {
  id: string;
  facultyName: string;
  courseExamples: string[];
  defaultSubjects: SubjectId[];
  averageCutOff: number;
  tip: string;
}
