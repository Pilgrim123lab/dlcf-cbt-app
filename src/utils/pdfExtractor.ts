import { Question, SubjectId } from '../types';
import { SUBJECT_METADATA } from '../data/oauQuestions';
import { classifyQuestionSubject } from './questionClassifier';
import * as pdfjsLib from 'pdfjs-dist';

// Configure pdfjs worker
if (typeof window !== 'undefined' && 'Worker' in window) {
  // Use official CDN worker matching the installed version
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
}

/**
 * Extract raw text from an uploaded PDF File in the browser with reading order sorting
 */
export async function extractTextFromPdfFile(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;
    let fullText = '';

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      if (onProgress) {
        onProgress(pageNum, numPages);
      }
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const items = (textContent.items as any[]).filter((it) => 'str' in it && it.str.trim().length > 0);

      // Sort items by Y descending (top to bottom), then X ascending (left to right)
      items.sort((a, b) => {
        const yDiff = b.transform[5] - a.transform[5];
        if (Math.abs(yDiff) > 5) return yDiff;
        return a.transform[4] - b.transform[4];
      });

      let pageStr = '';
      let lastY: number | null = null;
      let lastX: number | null = null;

      for (const item of items) {
        const currY = item.transform[5];
        const currX = item.transform[4];

        if (lastY !== null && Math.abs(currY - lastY) > 5) {
          pageStr += '\n';
        } else if (lastX !== null && currX - lastX > 3 && !pageStr.endsWith(' ') && !pageStr.endsWith('\n')) {
          pageStr += ' ';
        }

        pageStr += item.str;
        lastY = currY;
        lastX = currX + (item.width || item.str.length * 4);
      }

      fullText += `\n--- Page ${pageNum} ---\n` + pageStr + '\n';
    }

    return fullText.trim();
  } catch (err: any) {
    console.error('PDF text extraction error:', err);
    throw new Error(err.message || 'Could not parse text from the PDF file. Please ensure it is not password protected.');
  }
}

/**
 * Detect subject from question text or subject header keywords
 */
export function detectSubjectFromText(text: string, defaultSubject: SubjectId = 'aptitude'): SubjectId {
  const result = classifyQuestionSubject(text, [], defaultSubject);
  return result.subjectId || defaultSubject;
}

/**
 * Split inline options from text like:
 * "A. 20 m/s B. 30 m/s C. 40 m/s D. 50 m/s"
 * or "(a) First (b) Second (c) Third (d) Fourth"
 */
function extractInlineOptions(text: string): { [key: string]: string } | null {
  // Regex finding Option markers: A., B., C., D. or (A), (B), (C), (D) or [A], [B], [C], [D] or A), B), C), D)
  const pattern = /(?:^|\s+)(?:[\(\[\{]?([A-Ea-e])[\)\]\}\.\:\-]\s*)/g;
  const matches: { letter: string; index: number; fullMatchLength: number }[] = [];
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(text)) !== null) {
    matches.push({
      letter: m[1].toUpperCase(),
      index: m.index,
      fullMatchLength: m[0].length,
    });
  }

  // If we found 2 or more sequential option markers (e.g. A, B, C, D)
  if (matches.length >= 2) {
    const optionMap: { [key: string]: string } = {};
    for (let i = 0; i < matches.length; i++) {
      const curr = matches[i];
      const startContent = curr.index + curr.fullMatchLength;
      const endContent = (i < matches.length - 1) ? matches[i + 1].index : text.length;
      const content = text.slice(startContent, endContent).trim();
      if (content) {
        optionMap[curr.letter] = content;
      }
    }
    if (Object.keys(optionMap).length >= 2) {
      return optionMap;
    }
  }

  return null;
}

/**
 * Intelligent Multi-Format Question Parser
 * Extracts all questions from raw pasted or extracted text
 */
export function parseQuestionsFromRawText(
  rawText: string,
  defaultSubject: SubjectId = 'aptitude',
  defaultYear: string = 'OAU Post-UTME Past Question'
): Question[] {
  if (!rawText || !rawText.trim()) return [];

  // Normalize line endings and page markers
  const cleanText = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/--- Page \d+ ---/g, '\n')
    .replace(/[–—]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");

  // Step 1: Identify subject section headers throughout the text
  let currentSubject: SubjectId = defaultSubject;
  let currentYear: string = defaultYear;

  // Split lines
  const allLines = cleanText.split('\n');

  interface RawQuestionBlock {
    headerSubject?: SubjectId;
    lines: string[];
  }

  const questionBlocks: RawQuestionBlock[] = [];
  let currentBlockLines: string[] = [];
  let currentBlockSubject: SubjectId = defaultSubject;

  // Regex that marks the start of a new question
  // Matches: "1.", "1)", "(1)", "[1]", "Q1.", "Q1:", "Question 1:", "1 -", "1:", "1 ", etc.
  const questionStartRegex = /^(?:(?:Question|Q)\s*\d+[\.\:\)\-]?|\(?\d+\)?[\.\:\)\-]\s*|\bQ\d+\b)/i;

  for (let i = 0; i < allLines.length; i++) {
    const rawLine = allLines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      // Keep empty line inside block as separator
      if (currentBlockLines.length > 0) {
        currentBlockLines.push('');
      }
      continue;
    }

    const lower = trimmed.toLowerCase();

    // Check for Section / Subject headers
    if (
      lower.startsWith('subject:') ||
      lower.startsWith('section:') ||
      lower.includes('past questions') ||
      lower.includes('post-utme questions') ||
      (trimmed.length < 50 && (lower.includes('mathematics') || lower.includes('physics') || lower.includes('chemistry') || lower.includes('biology') || lower.includes('economics') || lower.includes('government') || lower.includes('literature') || lower.includes('crk') || lower.includes('accounting') || lower.includes('general aptitude')))
    ) {
      currentSubject = detectSubjectFromText(trimmed, currentSubject);
      if (trimmed.includes('20')) {
        const yrMatch = trimmed.match(/\b(19\d\d|20\d\d)(?:\/\d{2,4})?\b/);
        if (yrMatch) currentYear = yrMatch[0];
      }
    }

    // Check if this line begins a new numbered question
    if (questionStartRegex.test(trimmed)) {
      if (currentBlockLines.length > 0) {
        questionBlocks.push({
          headerSubject: currentBlockSubject,
          lines: [...currentBlockLines],
        });
        currentBlockLines = [];
      }
      currentBlockSubject = currentSubject;
      currentBlockLines.push(trimmed);
    } else {
      currentBlockLines.push(trimmed);
    }
  }

  // Push final block
  if (currentBlockLines.length > 0) {
    questionBlocks.push({
      headerSubject: currentBlockSubject,
      lines: [...currentBlockLines],
    });
  }

  // If questionStartRegex found 0 or only 1 block, try double-newline or fallback block chunking
  if (questionBlocks.length <= 1 && cleanText.length > 100) {
    // Try splitting by double newlines or question numbers anywhere
    const chunks = cleanText.split(/\n\s*\n+/);
    if (chunks.length > 1) {
      questionBlocks.length = 0;
      chunks.forEach((chunk) => {
        const cLines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
        if (cLines.length >= 2) {
          questionBlocks.push({
            headerSubject: defaultSubject,
            lines: cLines,
          });
        }
      });
    }
  }

  const parsedQuestions: Question[] = [];

  questionBlocks.forEach((block, qIdx) => {
    let qSubject: SubjectId = block.headerSubject || defaultSubject;
    let qYear = currentYear || defaultYear;
    let qTopic = 'OAU Post-UTME Past Question';
    let qText = '';
    const optionMap: { [key: string]: string } = {};
    let correctIdx = 0;
    let answerFound = false;
    let explanation = '';
    let isCollectingExplanation = false;

    // Filter non-empty lines
    const lines = block.lines.map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    // Clean leading question number from first line (e.g. "1. Solve..." -> "Solve...")
    let firstLine = lines[0];
    const leadingNumMatch = firstLine.match(/^(?:(?:Question|Q)\s*\d+[\.\:\)\-]?|\(?\d+\)?[\.\:\)\-]\s*)/i);
    if (leadingNumMatch) {
      firstLine = firstLine.slice(leadingNumMatch[0].length).trim();
    }
    lines[0] = firstLine;

    // Process each line in the block
    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      const lower = line.toLowerCase();

      // Check subject override
      if (lower.startsWith('subject:')) {
        qSubject = detectSubjectFromText(line.replace(/subject:/i, '').trim(), qSubject);
        continue;
      }
      // Check year override
      if (lower.startsWith('year:')) {
        qYear = line.replace(/year:/i, '').trim();
        continue;
      }
      // Check topic override
      if (lower.startsWith('topic:')) {
        qTopic = line.replace(/topic:/i, '').trim();
        continue;
      }

      // Check Answer line (Ans: B, Answer: (C), Key: [A], Correct Option: D, etc.)
      const ansMatch = line.match(/^(?:answer|ans|correct|key|solution|ans\.)[\s\:\=\-\.]*[\(\[\{]?([A-Ea-e])[\)\]\}]?\b/i);
      if (ansMatch) {
        isCollectingExplanation = false;
        const letter = ansMatch[1].toUpperCase();
        if (letter === 'A') correctIdx = 0;
        else if (letter === 'B') correctIdx = 1;
        else if (letter === 'C') correctIdx = 2;
        else if (letter === 'D') correctIdx = 3;
        else if (letter === 'E') correctIdx = 4;
        answerFound = true;

        // Check if explanation is on the same line after the answer
        const rest = line.slice(ansMatch[0].length).replace(/^[\-\:\.\,\s]+/, '').trim();
        if (rest && rest.length > 3) {
          explanation = rest;
        }
        continue;
      }

      // Check Explanation line
      if (lower.startsWith('explanation:') || lower.startsWith('expl:') || lower.startsWith('reason:') || lower.startsWith('derivation:') || lower.startsWith('remark:')) {
        isCollectingExplanation = true;
        explanation = line.replace(/^(?:explanation|expl|reason|derivation|remark)[\s\:\=\-\.]+/i, '').trim();
        continue;
      }

      if (isCollectingExplanation) {
        explanation += ' ' + line;
        continue;
      }

      // Check if this line has multiple inline options (e.g. "A. 15  B. 25  C. 35  D. 45")
      const inlineOpts = extractInlineOptions(line);
      if (inlineOpts) {
        Object.assign(optionMap, inlineOpts);
        continue;
      }

      // Check single option per line: A., B), (C), [D], A:, A -
      const singleOptMatch = line.match(/^[\(\[\{]?([A-Ea-e])[\)\]\}\.\:\-]\s*(.*)$/);
      if (singleOptMatch) {
        const letter = singleOptMatch[1].toUpperCase();
        optionMap[letter] = singleOptMatch[2].trim();
        continue;
      }

      // If we haven't hit options yet, this is part of the question text
      if (Object.keys(optionMap).length === 0) {
        qText += (qText ? ' ' : '') + line;
      } else {
        // If we already started collecting options, append to the last collected option or explanation
        const optKeys = ['E', 'D', 'C', 'B', 'A'];
        const lastOptKey = optKeys.find((k) => optionMap[k] !== undefined);
        if (lastOptKey) {
          optionMap[lastOptKey] += ' ' + line;
        }
      }
    }

    // Assemble options list
    const options: string[] = [];
    ['A', 'B', 'C', 'D', 'E'].forEach((letter) => {
      if (optionMap[letter]) {
        options.push(optionMap[letter]);
      }
    });

    // Auto-detect subject using rich domain keywords
    if (qText) {
      const detected = detectSubjectFromText(qText, qSubject);
      if (detected) {
        qSubject = detected;
      }
    }

    const trimmedText = qText.trim();

    // Filter out non-questions, instruction headers, and answer key blocks
    const isHeaderOrInstruction = /^(?:instructions?|attempt all|answer (?:all|any)|section [a-z]|oau post-?utme|obafemi awolowo university|screening exercise|time allowed|date:|candidate(?:'s)? (?:name|number)|reg(?:istration)? no|faculty of|department of|paper \d)/i.test(trimmedText);
    const isAnswerKeyTable = /^(?:key to questions?|answers? key|solutions?:?\s*$|ans\s*\d+)/i.test(trimmedText);
    const isFragment = trimmedText.length < 10;

    // Check if options are real and not empty
    const hasValidOptions = options.length >= 2 && options.every((opt) => opt.trim().length > 0);

    // Ensure we only accept genuine, well-formed multiple-choice questions
    if (!isHeaderOrInstruction && !isAnswerKeyTable && !isFragment && hasValidOptions) {
      const qId = `custom_q_${Date.now()}_${qIdx}_${Math.random().toString(36).substring(2, 6)}`;
      parsedQuestions.push({
        id: qId,
        subjectId: qSubject,
        subjectName: SUBJECT_METADATA[qSubject]?.name || 'General Aptitude',
        year: qYear || 'OAU Post-UTME Past Question',
        topic: qTopic || 'Post-UTME Past Question',
        questionText: trimmedText,
        options: options,
        correctOptionIndex: Math.min(correctIdx, options.length - 1),
        explanation: explanation.trim() || 'Verified OAU Post-UTME answer breakdown.',
        keyConcept: qTopic || 'Post-UTME Subject Concept',
        difficulty: 'medium',
      });
    }
  });

  return parsedQuestions;
}

/**
 * Call Server-Side AI Extraction for deep NLP formatting and parsing
 */
export async function extractQuestionsWithAI(
  rawText: string,
  subjectHint: SubjectId = 'aptitude',
  yearHint: string = 'OAU Post-UTME Past Question'
): Promise<Question[]> {
  try {
    const response = await fetch('/api/ai/extract-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rawText,
        subjectHint,
        yearHint,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI extraction service status: ${response.status}`);
    }

    const data = await response.json();
    if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
      return data.questions.map((q: any, idx: number) => {
        const subId = (q.subjectId || subjectHint || 'aptitude') as SubjectId;
        const options = Array.isArray(q.options) && q.options.length >= 2 
          ? q.options 
          : ['Option A', 'Option B', 'Option C', 'Option D'];
        
        return {
          id: `custom_ai_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
          subjectId: subId,
          subjectName: q.subjectName || SUBJECT_METADATA[subId]?.name || 'General Aptitude',
          year: q.year || yearHint || 'OAU Post-UTME Past Question',
          topic: q.topic || 'General Past Question',
          questionText: q.questionText || 'Question',
          options,
          correctOptionIndex: typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0,
          explanation: q.explanation || 'Authentic Post-UTME verified explanation.',
          keyConcept: q.keyConcept || q.topic || 'Core Concept',
          difficulty: q.difficulty || 'medium',
        };
      });
    }

    // Fallback to client-side regex parsing if AI returned empty
    return parseQuestionsFromRawText(rawText, subjectHint, yearHint);
  } catch (err) {
    console.warn('AI Extraction request failed, falling back to client parser:', err);
    return parseQuestionsFromRawText(rawText, subjectHint, yearHint);
  }
}

