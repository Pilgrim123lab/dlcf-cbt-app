import React, { useState, useEffect } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  BookOpen, 
  Code2, 
  Sparkles,
  Layers,
  FileSpreadsheet,
  FileCheck2,
  Edit3,
  Loader2,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { Question, SubjectId } from '../types';
import { SUBJECT_METADATA } from '../data/oauQuestions';
import { 
  getStoredCustomQuestions, 
  saveCustomQuestion, 
  batchSaveCustomQuestions, 
  deleteStoredCustomQuestion,
  syncCustomQuestionsFromCloud,
  autoSortStoredQuestionBank
} from '../utils/storage';
import { fetchAllCloudCustomQuestions } from '../lib/cloudDb';
import { 
  extractTextFromPdfFile, 
  extractQuestionsWithAI, 
  parseQuestionsFromRawText 
} from '../utils/pdfExtractor';

interface UploadPastQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionsUpdated?: () => void;
}

const SAMPLE_JSON_TEMPLATE: Partial<Question>[] = [
  {
    subjectId: 'physics',
    subjectName: 'Physics',
    year: 'OAU Post-UTME 2023',
    topic: 'Electromagnetism',
    questionText: 'What is the SI unit of magnetic flux density?',
    options: ['Weber', 'Tesla', 'Henry', 'Farad'],
    correctOptionIndex: 1,
    explanation: 'The SI unit of magnetic flux density is Tesla (T), where 1 Tesla = 1 Weber per square meter.',
    keyConcept: 'Units of electromagnetic quantities',
    difficulty: 'medium'
  },
  {
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: 'OAU Post-UTME 2023',
    topic: 'Indices & Logarithms',
    questionText: 'Solve for x in the equation: 2^(2x + 1) = 128.',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 6'],
    correctOptionIndex: 1,
    explanation: '2^(2x + 1) = 2^7 => 2x + 1 = 7 => 2x = 6 => x = 3.',
    keyConcept: 'Exponential equations with matching bases',
    difficulty: 'easy'
  },
  {
    subjectId: 'aptitude',
    subjectName: 'General Aptitude & Reasoning',
    year: 'OAU Post-UTME 2023',
    topic: 'Logical Sequences',
    questionText: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
    options: ['95', '127', '125', '129'],
    correctOptionIndex: 1,
    explanation: 'Pattern is (Previous * 2) + 1. Therefore: (63 * 2) + 1 = 126 + 1 = 127.',
    keyConcept: 'Geometric sequence progressions',
    difficulty: 'easy'
  }
];

export const UploadPastQuestionsModal: React.FC<UploadPastQuestionsModalProps> = ({
  isOpen,
  onClose,
  onQuestionsUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'pdf_extract' | 'batch_upload' | 'manual_entry' | 'view_custom'>('pdf_extract');
  
  // Custom questions list from storage
  const [customQuestions, setCustomQuestions] = useState<Question[]>(() => getStoredCustomQuestions());
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [cloudSyncMsg, setCloudSyncMsg] = useState<string | null>(null);

  const handleSyncFromCloud = async () => {
    setIsSyncingCloud(true);
    try {
      const cloudQuestions = await fetchAllCloudCustomQuestions();
      if (cloudQuestions) {
        const updated = syncCustomQuestionsFromCloud(cloudQuestions);
        setCustomQuestions(updated);
        setCloudSyncMsg(`Cloud synchronized: ${updated.length} verified questions loaded.`);
        setTimeout(() => setCloudSyncMsg(null), 3500);
        if (onQuestionsUpdated) onQuestionsUpdated();
      }
    } catch (err) {
      console.error('Failed to sync from cloud', err);
      setCloudSyncMsg('Failed to synchronize with Cloud Firestore.');
      setTimeout(() => setCloudSyncMsg(null), 3500);
    } finally {
      setIsSyncingCloud(false);
    }
  };

  const [isAutoSorting, setIsAutoSorting] = useState(false);

  const handleAutoSort = async () => {
    setIsAutoSorting(true);
    try {
      const result = await autoSortStoredQuestionBank();
      setCustomQuestions(result.sorted);
      if (result.reclassifiedCount > 0) {
        setCloudSyncMsg(`Smart Auto-Sort: Reclassified ${result.reclassifiedCount} questions into exact subjects (Physics, Chemistry, Biology, Mathematics) and saved to Cloud!`);
      } else {
        setCloudSyncMsg(`All ${result.sorted.length} questions are already correctly classified by subject!`);
      }
      setTimeout(() => setCloudSyncMsg(null), 4000);
      if (onQuestionsUpdated) onQuestionsUpdated();
    } catch (err) {
      console.error('Failed to auto-sort', err);
      setCloudSyncMsg('Failed to auto-sort questions.');
      setTimeout(() => setCloudSyncMsg(null), 3000);
    } finally {
      setIsAutoSorting(false);
    }
  };

  // Sync automatically on modal open
  useEffect(() => {
    if (isOpen) {
      handleSyncFromCloud();
    }
  }, [isOpen]);

  // Listen to background sync updates
  useEffect(() => {
    const handleUpdate = () => {
      setCustomQuestions(getStoredCustomQuestions());
    };
    window.addEventListener('custom_questions_updated', handleUpdate);
    return () => window.removeEventListener('custom_questions_updated', handleUpdate);
  }, []);

  // PDF Extraction states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isExtractingPdf, setIsExtractingPdf] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState<string>('');
  const [extractedQuestions, setExtractedQuestions] = useState<Question[]>([]);
  const [pdfDefaultSubject, setPdfDefaultSubject] = useState<SubjectId>('aptitude');
  const [pdfExamYear, setPdfExamYear] = useState('OAU Post-UTME Past Question');
  const [pdfStatus, setPdfStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  // Batch JSON / Text upload states
  const [pastedContent, setPastedContent] = useState('');
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error'; message: string; count?: number } | null>(null);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  // Manual Form States
  const [subjectId, setSubjectId] = useState<SubjectId>('aptitude');
  const [questionText, setQuestionText] = useState('');
  const [year, setYear] = useState('OAU Post-UTME Past Question');
  const [topic, setTopic] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [optionE, setOptionE] = useState('');
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(0);
  const [explanation, setExplanation] = useState('');
  const [keyConcept, setKeyConcept] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Search in Manage Tab
  const [manageSearchQuery, setManageSearchQuery] = useState('');
  const [manageSubjectFilter, setManageSubjectFilter] = useState<string>('all');

  if (!isOpen) return null;

  const reloadCustomQuestions = () => {
    const updated = getStoredCustomQuestions();
    setCustomQuestions(updated);
    if (onQuestionsUpdated) onQuestionsUpdated();
  };

  // -------------------------------------------------------------
  // PDF PAST QUESTION EXTRACTION HANDLERS
  // -------------------------------------------------------------
  const handlePdfFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPdfStatus(null);
    setExtractedQuestions([]);
  };

  const handleStartPdfExtraction = async () => {
    if (!selectedFile) {
      setPdfStatus({ type: 'error', message: 'Please select a PDF or text file first.' });
      return;
    }

    setIsExtractingPdf(true);
    setPdfStatus(null);
    setExtractionProgress('Reading document content...');

    try {
      let rawText = '';

      if (selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf')) {
        setExtractionProgress('Parsing PDF document pages...');
        rawText = await extractTextFromPdfFile(selectedFile, (curr, total) => {
          setExtractionProgress(`Extracting page ${curr} of ${total}...`);
        });
      } else {
        // Read text / json / doc format as string
        rawText = await selectedFile.text();
      }

      if (!rawText.trim()) {
        throw new Error('No readable text found in the uploaded file.');
      }

      setExtractionProgress('Extracting questions, options, and answer keys...');
      
      // Attempt robust multi-format parser first for instantaneous, full-document parsing
      let questions = parseQuestionsFromRawText(rawText, pdfDefaultSubject, pdfExamYear);

      // If parser found fewer than 2 questions in a substantial text, attempt AI-assisted parsing
      if ((!questions || questions.length < 2) && rawText.length > 200) {
        setExtractionProgress('Refining with AI extraction model...');
        const aiQuestions = await extractQuestionsWithAI(rawText, pdfDefaultSubject, pdfExamYear);
        if (aiQuestions && aiQuestions.length > 0) {
          questions = aiQuestions;
        }
      }

      if (questions.length === 0) {
        setPdfStatus({
          type: 'error',
          message: 'Could not detect multiple-choice questions with options (A, B, C, D) in the document. Please check the document format or paste the text directly in the Text / Format tab.'
        });
      } else {
        setExtractedQuestions(questions);
        setPdfStatus({
          type: 'success',
          message: `Successfully extracted ${questions.length} past questions from document! Review and edit them below before importing into the question bank.`
        });
      }
    } catch (err: any) {
      console.error('PDF extraction failed:', err);
      setPdfStatus({
        type: 'error',
        message: `Extraction error: ${err.message || 'Failed to parse file'}`
      });
    } finally {
      setIsExtractingPdf(false);
      setExtractionProgress('');
    }
  };

  const handleSaveExtractedToQuestionBank = () => {
    if (extractedQuestions.length === 0) return;

    batchSaveCustomQuestions(extractedQuestions);
    reloadCustomQuestions();

    setPdfStatus({
      type: 'success',
      message: `Successfully added ${extractedQuestions.length} questions to the CBT Question Bank!`
    });

    // Reset preview
    setExtractedQuestions([]);
    setSelectedFile(null);
  };

  const handleRemoveExtractedItem = (index: number) => {
    setExtractedQuestions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateExtractedSubject = (index: number, newSub: SubjectId) => {
    setExtractedQuestions((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        subjectId: newSub,
        subjectName: SUBJECT_METADATA[newSub]?.name || copy[index].subjectName,
      };
      return copy;
    });
  };

  const handleSetAllExtractedSubject = (newSub: SubjectId) => {
    setExtractedQuestions((prev) =>
      prev.map((q) => ({
        ...q,
        subjectId: newSub,
        subjectName: SUBJECT_METADATA[newSub]?.name || q.subjectName,
      }))
    );
  };

  // -------------------------------------------------------------
  // BATCH JSON / TEXT HANDLERS
  // -------------------------------------------------------------
  const handleLoadSampleJSON = () => {
    setPastedContent(JSON.stringify(SAMPLE_JSON_TEMPLATE, null, 2));
    setUploadStatus(null);
  };

  const handleProcessBatchUpload = () => {
    setUploadStatus(null);
    const content = pastedContent.trim();
    if (!content) {
      setUploadStatus({ type: 'error', message: 'Please paste JSON data or structured questions first.' });
      return;
    }

    setIsProcessingBatch(true);
    try {
      let finalQuestions: Question[] = [];

      if (content.startsWith('[') || content.startsWith('{')) {
        const parsed = JSON.parse(content);
        const list = Array.isArray(parsed) ? parsed : [parsed];

        finalQuestions = list.map((item: any, idx: number) => {
          const subId = (item.subjectId || 'aptitude') as SubjectId;
          const options = Array.isArray(item.options) ? item.options : ['Option A', 'Option B', 'Option C', 'Option D'];
          return {
            id: item.id || `custom_json_${Date.now()}_${idx}`,
            subjectId: subId,
            subjectName: item.subjectName || SUBJECT_METADATA[subId]?.name || 'General Aptitude',
            year: item.year || 'OAU Post-UTME Past Question',
            topic: item.topic || 'General Past Question',
            questionText: item.questionText || item.question || 'Question text',
            options,
            correctOptionIndex: typeof item.correctOptionIndex === 'number' ? item.correctOptionIndex : 0,
            explanation: item.explanation || 'Authentic OAU past question solution.',
            keyConcept: item.keyConcept || item.topic || 'OAU Post-UTME Topic',
            oauExamTip: item.oauExamTip || '',
            difficulty: item.difficulty || 'medium',
          };
        });
      } else {
        finalQuestions = parseQuestionsFromRawText(content);
      }

      if (finalQuestions.length === 0) {
        setUploadStatus({
          type: 'error',
          message: 'No valid questions could be extracted. Check format or use the sample template.'
        });
        setIsProcessingBatch(false);
        return;
      }

      batchSaveCustomQuestions(finalQuestions);
      reloadCustomQuestions();

      setUploadStatus({
        type: 'success',
        message: `Successfully uploaded ${finalQuestions.length} past questions to the CBT question bank!`,
        count: finalQuestions.length,
      });
      setPastedContent('');
    } catch (err: any) {
      console.error('Batch question upload parse error', err);
      setUploadStatus({
        type: 'error',
        message: `Failed to parse data: ${err.message || 'Invalid format'}. Try using the sample template.`
      });
    } finally {
      setIsProcessingBatch(false);
    }
  };

  // -------------------------------------------------------------
  // MANUAL SINGLE FORM HANDLER
  // -------------------------------------------------------------
  const handleManualFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!questionText.trim()) {
      setFormError('Please enter the question text.');
      return;
    }

    const options = [optionA.trim(), optionB.trim(), optionC.trim(), optionD.trim()];
    if (optionE.trim()) options.push(optionE.trim());

    if (options.filter(Boolean).length < 2) {
      setFormError('Please provide at least 2 options for this question.');
      return;
    }

    const newQuestion: Question = {
      id: `custom_manual_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      subjectId,
      subjectName: SUBJECT_METADATA[subjectId]?.name || 'General Aptitude',
      year: year.trim() || 'OAU Post-UTME Past Question',
      topic: topic.trim() || 'General Past Question',
      questionText: questionText.trim(),
      options,
      correctOptionIndex,
      explanation: explanation.trim() || 'Authentic Post-UTME verified answer explanation.',
      keyConcept: keyConcept.trim() || topic.trim() || 'Post-UTME Subject Concept',
      difficulty,
    };

    saveCustomQuestion(newQuestion);
    reloadCustomQuestions();

    setFormSuccess('Question successfully saved and added to the CBT question bank!');
    
    setQuestionText('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setOptionE('');
    setCorrectOptionIndex(0);
    setExplanation('');
    setKeyConcept('');
  };

  // -------------------------------------------------------------
  // MANAGE TAB
  // -------------------------------------------------------------
  const handleDeleteCustomQuestion = (qId: string) => {
    deleteStoredCustomQuestion(qId);
    reloadCustomQuestions();
  };

  const filteredCustomQuestions = customQuestions.filter((q) => {
    if (manageSubjectFilter !== 'all' && q.subjectId !== manageSubjectFilter) {
      return false;
    }
    if (!manageSearchQuery.trim()) return true;
    const search = manageSearchQuery.toLowerCase();
    return (
      q.questionText.toLowerCase().includes(search) ||
      q.topic.toLowerCase().includes(search) ||
      (q.explanation && q.explanation.toLowerCase().includes(search))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 my-6 text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-extrabold uppercase tracking-wide">
                  Examiner Question Bank
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  {customQuestions.length} Custom Questions Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                Upload & Extract Past Questions
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold">
          
          <button
            type="button"
            onClick={() => setActiveTab('pdf_extract')}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'pdf_extract'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>PDF & Document Extractor</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('batch_upload')}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'batch_upload'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span>JSON / Text Format</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('manual_entry')}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'manual_entry'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-purple-500" />
            <span>Manual Builder</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('view_custom')}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'view_custom'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-500" />
            <span>Manage Bank ({customQuestions.length})</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: PDF PAST QUESTION EXTRACTOR                                        */}
        {/* ========================================================================= */}
        {activeTab === 'pdf_extract' && (
          <div className="space-y-5">
            
            {/* Guide banner */}
            <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 text-xs space-y-1.5">
              <div className="flex items-center space-x-2 text-indigo-900 dark:text-indigo-200 font-bold">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Automatic PDF Past Question Recognition & Extraction</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Upload official OAU Post-UTME past question PDFs or past papers. The system extracts every question, options (A to D/E), correct answers, and explanations, and automatically adds them into the CBT mock examination bank.
              </p>
            </div>

            {/* Config & Dropzone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Default Subject Hint */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Default Subject Target
                </label>
                <select
                  value={pdfDefaultSubject}
                  onChange={(e) => setPdfDefaultSubject(e.target.value as SubjectId)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-indigo-500 text-xs"
                >
                  {Object.entries(SUBJECT_METADATA).map(([key, meta]) => (
                    <option key={key} value={key}>
                      {meta.name} ({meta.shortName})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  AI will auto-detect subjects if the PDF contains mixed subjects.
                </span>
              </div>

              {/* Exam Year Label */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Exam Past Question Year
                </label>
                <input
                  type="text"
                  value={pdfExamYear}
                  onChange={(e) => setPdfExamYear(e.target.value)}
                  placeholder="e.g. OAU Post-UTME 2022/2023"
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-indigo-500 text-xs"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Tagged onto each extracted question.
                </span>
              </div>

              {/* File Upload Trigger */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Choose PDF / Document File
                </label>
                <label className="cursor-pointer flex items-center justify-center space-x-2 p-3 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-800 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  <UploadCloud className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="truncate">{selectedFile ? selectedFile.name : 'Select PDF File'}</span>
                  <input
                    type="file"
                    accept=".pdf,.txt,.json,.docx"
                    onChange={handlePdfFileSelect}
                    className="hidden"
                  />
                </label>
                {selectedFile && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 block font-medium">
                    File selected: {(selectedFile.size / 1024).toFixed(1)} KB
                  </span>
                )}
              </div>

            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-500">
                {isExtractingPdf && (
                  <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{extractionProgress || 'Processing document...'}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  id="btn-extract-pdf-questions"
                  onClick={handleStartPdfExtraction}
                  disabled={!selectedFile || isExtractingPdf}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-md shadow-indigo-500/25 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  {isExtractingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Extracting Questions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Extract Questions From PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Status notification */}
            {pdfStatus && (
              <div className={`p-4 rounded-2xl flex items-center space-x-3 text-xs font-semibold animate-in fade-in ${
                pdfStatus.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
              }`}>
                {pdfStatus.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span>{pdfStatus.message}</span>
              </div>
            )}

            {/* ========================================================= */}
            {/* EXTRACTED QUESTIONS PREVIEW & CONFIRMATION BOX             */}
            {/* ========================================================= */}
            {extractedQuestions.length > 0 && (
              <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800 animate-in fade-in">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                      <FileCheck2 className="w-4 h-4 text-emerald-500" />
                      <span>{extractedQuestions.length} Questions Ready for Import</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Review, adjust subjects or options if needed, then import into the central CBT bank.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      id="btn-import-all-extracted"
                      onClick={handleSaveExtractedToQuestionBank}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black shadow-md shadow-emerald-600/20 transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Import All into Question Bank</span>
                    </button>
                  </div>
                </div>

                {/* Bulk Subject Modifier */}
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-500 font-semibold">Change Subject for all extracted:</span>
                  <select
                    onChange={(e) => handleSetAllExtractedSubject(e.target.value as SubjectId)}
                    className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    <option value="">-- Apply Subject to All --</option>
                    {Object.entries(SUBJECT_METADATA).map(([key, meta]) => (
                      <option key={key} value={key}>
                        {meta.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Question Cards List */}
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {extractedQuestions.map((q, idx) => (
                    <div
                      key={q.id || idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs transition-all hover:border-indigo-300 dark:hover:border-indigo-800"
                    >
                      {/* Top bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          
                          <select
                            value={q.subjectId}
                            onChange={(e) => handleUpdateExtractedSubject(idx, e.target.value as SubjectId)}
                            className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-[11px] border border-indigo-200 dark:border-indigo-800"
                          >
                            {Object.entries(SUBJECT_METADATA).map(([key, meta]) => (
                              <option key={key} value={key}>
                                {meta.shortName}
                              </option>
                            ))}
                          </select>

                          <span className="text-[11px] text-slate-400 font-mono">
                            {q.topic || 'General Past Question'}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveExtractedItem(idx)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                          title="Remove this question"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Question prompt */}
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug">
                        {q.questionText}
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === q.correctOptionIndex;
                          return (
                            <div
                              key={oIdx}
                              className={`p-2 rounded-xl border text-xs flex items-center space-x-2 ${
                                isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500/20'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <span className={`w-5 h-5 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] shrink-0 ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}>
                                {['A', 'B', 'C', 'D', 'E'][oIdx]}
                              </span>
                              <span className="truncate">{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {q.explanation && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
                          <strong className="text-indigo-600 dark:text-indigo-400">Solution:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BATCH UPLOAD (JSON, FORMATTED TEXT)                                 */}
        {/* ========================================================================= */}
        {activeTab === 'batch_upload' && (
          <div className="space-y-4">
            
            {/* Action Bar & Templates */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs">
              <div className="flex items-center space-x-2 text-indigo-900 dark:text-indigo-200 font-semibold">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Upload past questions via JSON array or structured text format.</span>
              </div>

              <button
                type="button"
                onClick={handleLoadSampleJSON}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 transition-colors flex items-center space-x-1 shadow-2xs cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Load Sample Format</span>
              </button>
            </div>

            {/* Textarea Paste */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Paste JSON or Formatted Questions:
              </label>
              <textarea
                rows={8}
                value={pastedContent}
                onChange={(e) => setPastedContent(e.target.value)}
                placeholder='Paste your JSON array or structured questions here... e.g. [{"subjectId": "physics", "questionText": "...", "options": ["A", "B", "C", "D"], "correctOptionIndex": 0}]'
                className="w-full p-3.5 rounded-2xl font-mono text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
              />
            </div>

            {/* Status Feedback */}
            {uploadStatus && (
              <div className={`p-3.5 rounded-2xl flex items-center space-x-2.5 text-xs font-semibold ${
                uploadStatus.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
              }`}>
                {uploadStatus.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{uploadStatus.message}</span>
              </div>
            )}

            {/* Submit Batch Button */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                id="btn-process-batch-questions"
                onClick={handleProcessBatchUpload}
                disabled={isProcessingBatch}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-extrabold shadow-md shadow-indigo-600/20 transition-all flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{isProcessingBatch ? 'Processing Questions...' : 'Add Questions to Bank'}</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MANUAL QUESTION BUILDER                                            */}
        {/* ========================================================================= */}
        {activeTab === 'manual_entry' && (
          <form onSubmit={handleManualFormSubmit} className="space-y-4 text-xs">
            
            {formError && (
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-center space-x-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center space-x-2 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            {/* Subject, Year, Topic Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Category
                </label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value as SubjectId)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-indigo-500"
                >
                  {Object.entries(SUBJECT_METADATA).map(([key, meta]) => (
                    <option key={key} value={key}>
                      {meta.name} ({meta.shortName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Year / Exam Label
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. OAU Post-UTME 2023"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Topic / Sub-theme
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Calculus, Optics, Genetics"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Question Text */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Question Text *
              </label>
              <textarea
                rows={3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Type the past question prompt here..."
                required
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Options List with Correct Answer Picker */}
            <div className="space-y-2.5 pt-1">
              <label className="block font-bold text-slate-700 dark:text-slate-300">
                Options & Correct Answer Selection
              </label>

              <div className="space-y-2">
                {[
                  { label: 'A', value: optionA, set: setOptionA, index: 0 },
                  { label: 'B', value: optionB, set: setOptionB, index: 1 },
                  { label: 'C', value: optionC, set: setOptionC, index: 2 },
                  { label: 'D', value: optionD, set: setOptionD, index: 3 },
                  { label: 'E (Optional)', value: optionE, set: setOptionE, index: 4 },
                ].map((opt) => (
                  <div key={opt.index} className="flex items-center space-x-2">
                    <label className="flex items-center space-x-1.5 cursor-pointer shrink-0">
                      <input
                        type="radio"
                        name="correct_option_radio"
                        checked={correctOptionIndex === opt.index}
                        onChange={() => setCorrectOptionIndex(opt.index)}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] ${
                        correctOptionIndex === opt.index
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {opt.label.charAt(0)}
                      </span>
                    </label>

                    <input
                      type="text"
                      value={opt.value}
                      onChange={(e) => opt.set(e.target.value)}
                      placeholder={`Option ${opt.label} text`}
                      className="flex-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Solution / Explanation
                </label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explain why the selected option is correct..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Submit Form Button */}
            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                type="submit"
                id="btn-save-single-question"
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-600/20 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Save Question to System Bank</span>
              </button>
            </div>

          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MANAGE UPLOADED CUSTOM QUESTIONS                                   */}
        {/* ========================================================================= */}
        {activeTab === 'view_custom' && (
          <div className="space-y-4">

            {/* Cloud Sync Status & Action Bar */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Central Firestore Cloud Bank:
                </span>
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {customQuestions.length} Questions
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleAutoSort}
                  disabled={isAutoSorting}
                  className="flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  title="Automatically analyze question topics and formulas to sort and reclassify into correct subjects"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-amber-500 ${isAutoSorting ? 'animate-spin' : ''}`} />
                  <span>{isAutoSorting ? 'Sorting...' : 'Auto-Sort by Subject'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSyncFromCloud}
                  disabled={isSyncingCloud}
                  className="flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingCloud ? 'animate-spin' : ''}`} />
                  <span>{isSyncingCloud ? 'Syncing...' : 'Sync with Cloud'}</span>
                </button>
              </div>
            </div>

            {cloudSyncMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{cloudSyncMsg}</span>
              </div>
            )}
            
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search questions or topics in bank..."
                  value={manageSearchQuery}
                  onChange={(e) => setManageSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={manageSubjectFilter}
                onChange={(e) => setManageSubjectFilter(e.target.value)}
                className="w-full sm:w-auto p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Subjects ({customQuestions.length})</option>
                {Object.entries(SUBJECT_METADATA).map(([key, meta]) => {
                  const count = customQuestions.filter((q) => q.subjectId === key).length;
                  return (
                    <option key={key} value={key}>
                      {meta.name} ({count})
                    </option>
                  );
                })}
              </select>
            </div>

            {filteredCustomQuestions.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="font-bold text-slate-700 dark:text-slate-300">
                  {customQuestions.length === 0 ? 'No Custom Questions in Bank Yet' : 'No Matching Questions Found'}
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Use the "PDF & Document Extractor" tab to upload your past question papers.
                </p>
              </div>
            ) : (
              <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1">
                {filteredCustomQuestions.map((q, idx) => (
                  <div
                    key={q.id || idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-[10px] uppercase">
                          {q.subjectName || q.subjectId}
                        </span>
                        <span className="text-[11px] text-slate-400">{q.year}</span>
                        <span className="text-[11px] text-slate-500 font-medium">• {q.topic}</span>
                      </div>

                      <button
                        onClick={() => handleDeleteCustomQuestion(q.id)}
                        className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer"
                        title="Delete question from bank"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {q.questionText}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-1.5 rounded-lg border text-[11px] truncate ${
                            oIdx === q.correctOptionIndex
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 font-bold text-emerald-800 dark:text-emerald-300'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <span className="font-mono mr-1 font-bold">
                            {['A', 'B', 'C', 'D', 'E'][oIdx]}:
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>

                    {q.explanation && (
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
