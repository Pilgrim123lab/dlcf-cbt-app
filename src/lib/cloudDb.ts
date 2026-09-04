import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  getDoc,
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';
import { StudentProfile, TestResult, Question } from '../types';

export interface CloudCandidateRecord {
  profile: StudentProfile;
  tests: TestResult[];
  averageScore: number;
  highestScore: number;
  lastTestDate: string | null;
  updatedAt?: any;
}

const CANDIDATES_COLLECTION = 'candidates';
const EXAM_RESULTS_COLLECTION = 'examResults';
const CUSTOM_QUESTIONS_COLLECTION = 'customQuestions';


/**
 * Save candidate profile to central Cloud Firestore
 */
export async function syncCandidateProfileToCloud(profile: StudentProfile): Promise<void> {
  try {
    const candidateRef = doc(db, CANDIDATES_COLLECTION, profile.id);
    await setDoc(candidateRef, {
      ...profile,
      syncedAt: serverTimestamp(),
    }, { merge: true });
  } catch (err) {
    console.warn('Cloud sync error for profile (will retry locally):', err);
  }
}

/**
 * Save a completed test result to central Cloud Firestore
 */
export async function syncTestResultToCloud(result: TestResult, candidateId: string): Promise<void> {
  try {
    const resultDocId = result.id || `res_${Date.now()}_${candidateId}`;
    const resultRef = doc(db, EXAM_RESULTS_COLLECTION, resultDocId);
    
    await setDoc(resultRef, {
      ...result,
      candidateId,
      syncedAt: serverTimestamp(),
    }, { merge: true });
  } catch (err) {
    console.warn('Cloud sync error for exam result:', err);
  }
}

/**
 * Fetch ALL candidates and their test results from central Cloud Firestore
 * Used by the Admin / Examiner Portal
 */
export async function fetchAllCloudCandidatesActivity(): Promise<CloudCandidateRecord[]> {
  try {
    // Fetch all candidates
    const candidatesSnapshot = await getDocs(collection(db, CANDIDATES_COLLECTION));
    const profiles: StudentProfile[] = [];
    candidatesSnapshot.forEach((docSnap) => {
      const data = docSnap.data() as StudentProfile;
      profiles.push({
        ...data,
        id: docSnap.id,
      });
    });

    // Fetch all exam results
    const resultsSnapshot = await getDocs(query(collection(db, EXAM_RESULTS_COLLECTION), orderBy('date', 'desc')));
    const resultsByCandidate: Record<string, TestResult[]> = {};

    resultsSnapshot.forEach((docSnap) => {
      const data = docSnap.data() as any;
      const cId = data.candidateId || data.studentId;
      if (cId) {
        if (!resultsByCandidate[cId]) {
          resultsByCandidate[cId] = [];
        }
        resultsByCandidate[cId].push({
          id: docSnap.id,
          studentName: data.studentName || 'Candidate',
          targetCourse: data.targetCourse || '',
          jambScore: data.jambScore,
          compositeAggregate: data.compositeAggregate,
          date: data.date || '',
          timestamp: data.timestamp || Date.now(),
          examTitle: data.examTitle || 'OAU Post-UTME Mock',
          examMode: data.examMode || 'standard_oau_mock',
          durationMinutes: data.durationMinutes || 40,
          timeTakenSeconds: data.timeTakenSeconds || 0,
          selectedSubjects: data.selectedSubjects || [],
          totalQuestions: data.totalQuestions || 40,
          totalAttempted: data.totalAttempted || 0,
          totalCorrect: data.totalCorrect || 0,
          totalScore: data.totalScore || 0,
          percentage: data.percentage || 0,
          subjectBreakdowns: data.subjectBreakdowns || [],
          questions: data.questions || [],
          answers: data.answers || data.userAnswers || {},
        });
      }
    });

    // Merge into candidate activity records
    return profiles.map((p) => {
      const tests = resultsByCandidate[p.id] || [];
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
    console.error('Failed to fetch candidates from cloud database:', err);
    return [];
  }
}

/**
 * Delete candidate from Central Cloud Database
 */
export async function deleteCandidateFromCloud(candidateId: string): Promise<boolean> {
  try {
    // Delete the candidate document from Firestore
    await deleteDoc(doc(db, CANDIDATES_COLLECTION, candidateId));
    
    // Also delete all matching exam results for this candidate
    const resultsSnapshot = await getDocs(collection(db, EXAM_RESULTS_COLLECTION));
    const deleteTasks: Promise<void>[] = [];
    
    resultsSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.candidateId === candidateId || data.studentId === candidateId) {
        deleteTasks.push(deleteDoc(docSnap.ref));
      }
    });

    if (deleteTasks.length > 0) {
      await Promise.all(deleteTasks);
    }
    
    return true;
  } catch (err) {
    console.error('Failed to delete candidate from cloud database:', err);
    return false;
  }
}

/**
 * Real-time listener for Admin Dashboard updates
 */
export function subscribeToCloudCandidates(
  onUpdate: (records: CloudCandidateRecord[]) => void
): () => void {
  const unsubscribeCandidates = onSnapshot(collection(db, CANDIDATES_COLLECTION), () => {
    fetchAllCloudCandidatesActivity().then(onUpdate);
  });

  return () => {
    unsubscribeCandidates();
  };
}

/**
 * Save a single custom past question to Cloud Firestore
 */
export async function syncCustomQuestionToCloud(question: Question): Promise<boolean> {
  try {
    const qDocId = question.id || `custom_q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const questionRef = doc(db, CUSTOM_QUESTIONS_COLLECTION, qDocId);
    await setDoc(questionRef, {
      ...question,
      id: qDocId,
      uploadedAt: serverTimestamp(),
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Failed to save custom question to cloud:', err);
    return false;
  }
}

/**
 * Batch upload multiple custom past questions to Cloud Firestore
 */
export async function batchSyncCustomQuestionsToCloud(questions: Question[]): Promise<boolean> {
  try {
    if (!questions || questions.length === 0) return true;

    // Chunk into slices of 400 to respect Firestore 500-op limit
    const CHUNK_SIZE = 400;
    for (let i = 0; i < questions.length; i += CHUNK_SIZE) {
      const chunk = questions.slice(i, i + CHUNK_SIZE);
      const batch = writeBatch(db);
      chunk.forEach((q) => {
        const qDocId = q.id || `custom_q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const qRef = doc(db, CUSTOM_QUESTIONS_COLLECTION, qDocId);
        batch.set(qRef, {
          ...q,
          id: qDocId,
          uploadedAt: serverTimestamp(),
        }, { merge: true });
      });
      await batch.commit();
    }
    return true;
  } catch (err) {
    console.error('Failed to batch save questions to cloud:', err);
    return false;
  }
}

/**
 * Fetch all custom uploaded questions from Cloud Firestore
 */
export async function fetchAllCloudCustomQuestions(): Promise<Question[]> {
  try {
    const questionsSnapshot = await getDocs(collection(db, CUSTOM_QUESTIONS_COLLECTION));
    const questions: Question[] = [];
    questionsSnapshot.forEach((docSnap) => {
      const data = docSnap.data() as Question;
      questions.push({
        ...data,
        id: docSnap.id,
      });
    });
    return questions;
  } catch (err) {
    console.warn('Failed to fetch custom questions from cloud:', err);
    return [];
  }
}

/**
 * Delete a custom question from Cloud Firestore
 */
export async function deleteCustomQuestionFromCloud(questionId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, CUSTOM_QUESTIONS_COLLECTION, questionId));
    return true;
  } catch (err) {
    console.error('Failed to delete custom question from cloud:', err);
    return false;
  }
}

/**
 * Real-time listener for custom question bank updates
 */
export function subscribeToCloudCustomQuestions(
  onUpdate: (questions: Question[]) => void
): () => void {
  const unsubscribe = onSnapshot(collection(db, CUSTOM_QUESTIONS_COLLECTION), () => {
    fetchAllCloudCustomQuestions().then(onUpdate);
  });

  return () => {
    unsubscribe();
  };
}

