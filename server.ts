import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Tutor Question Explanation
  app.post("/api/ai/explain", async (req: Request, res: Response) => {
    try {
      const { questionText, subject, options, selectedOption, correctOption, userExplanation } = req.body;
      
      const ai = getAI();
      if (!ai) {
        return res.status(200).json({
          fallback: true,
          explanation: userExplanation || "AI Tutor key is not configured, but our built-in verified DLCF tutorial breakdown is available below.",
          keyConcept: "Core OAU Post-UTME concept testing accuracy and speed.",
          examTip: "Read the instructions carefully and eliminate improbable options first."
        });
      }

      const prompt = `You are an expert Obafemi Awolowo University (OAU) Post-UTME academic tutor.
Your goal is to provide a crystal clear, high-yield academic explanation for this OAU Post-UTME CBT question.

Subject: ${subject}
Question: ${questionText}
Options:
${options.map((opt: string, idx: number) => `Option ${String.fromCharCode(65 + idx)}: ${opt}`).join("\n")}
Correct Option: Option ${String.fromCharCode(65 + correctOption)}
Student's Chosen Option: ${selectedOption !== null && selectedOption !== undefined ? `Option ${String.fromCharCode(65 + selectedOption)}` : "None (Unanswered)"}

Please respond in JSON format with the following fields:
1. "stepByStepSolution": A concise, clear step-by-step derivation or logical reasoning showing why the correct answer is right.
2. "whyDistractorsFail": Brief explanation of common traps or why incorrect options fail.
3. "keyConcept": The underlying syllabus topic/principle being tested.
4. "oauSpeedTip": A practical exam shortcut, mnemonic, or time-saving tip specific to OAU Post-UTME.
5. "inspirationalWord": A brief 1-sentence positive academic encouragement.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are an expert Nigerian University Post-UTME tutor specializing in Obafemi Awolowo University (OAU, Great Ife) exam patterns. Be accurate, rigorous, encouraging, and clear.",
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json(parsed);
    } catch (err: any) {
      console.error("AI Explanation error:", err);
      return res.status(200).json({
        fallback: true,
        error: "AI explanation temporary fallback active.",
        stepByStepSolution: "Refer to the verified OAU past question solution in the review section.",
        keyConcept: "Syllabus revision & mastery.",
        oauSpeedTip: "Practice time management: spend no more than 45 seconds per question."
      });
    }
  });

  // AI Personalized Study Recommendation & Motivation
  app.post("/api/ai/recommendations", async (req: Request, res: Response) => {
    try {
      const { studentName, score, totalQuestions, percentage, subjectBreakdown, targetCourse } = req.body;
      const ai = getAI();
      if (!ai) {
        return res.json({
          summary: `Well done, ${studentName || 'Student'}! You scored ${score}/${totalQuestions} (${percentage}%). Focus on your weakest subject to boost your aggregate.`,
          actionSteps: [
            "Review flagged and incorrectly answered questions in your Revision Bank.",
            "Practice time-bound speed drills for subjects below 70%.",
            "Maintain consistency with daily 15-minute question blitzes."
          ],
          verseOrMotto: "Excellence through consistent practice and revision."
        });
      }

      const prompt = `Student Name: ${studentName || "Scholar"}
Target OAU Course: ${targetCourse || "Degree Programme at Obafemi Awolowo University"}
Mock Score: ${score}/${totalQuestions} (${percentage}%)
Subject Scores: ${JSON.stringify(subjectBreakdown)}

Provide an encouraging, academically rigorous Post-UTME coaching advice for Obafemi Awolowo University (OAU, Great Ife) entrance exam.
Return JSON with:
1. "summary": A personalized analysis of their performance and admission competitiveness for OAU.
2. "strengths": What they did well.
3. "priorityAreas": Top 2-3 specific focus areas based on low subject percentages.
4. "actionPlan": 3 concrete daily study tactics before the official exam.
5. "fellowshipEncouragement": An inspiring academic motivation quote.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json(parsed);
    } catch (err: any) {
      console.error("AI Recommendation error:", err);
      return res.json({
        summary: "Excellent practice session. Consistency and error analysis are the keys to scoring high in OAU Post-UTME.",
        actionPlan: ["Revise wrong answers", "Master high-yield formulas", "Practice with time limit"],
        fellowshipEncouragement: "Excellence in character and learning!"
      });
    }
  });

  // AI Question Extraction from PDF / Raw Text
  app.post("/api/ai/extract-questions", async (req: Request, res: Response) => {
    try {
      const { rawText, subjectHint, yearHint } = req.body;
      if (!rawText || typeof rawText !== "string" || !rawText.trim()) {
        return res.status(400).json({ error: "Missing rawText" });
      }

      const ai = getAI();
      if (!ai) {
        return res.json({ fallback: true, questions: [] });
      }

      const prompt = `You are an expert Nigerian University examination parser for Obafemi Awolowo University (OAU) Post-UTME.
Extract all multiple-choice questions from the following text document into structured CBT questions.

Subject Hint: ${subjectHint || "auto-detect"}
Year Hint: ${yearHint || "OAU Post-UTME Past Question"}

Raw Text Content:
"""
${rawText.slice(0, 45000)}
"""

Output a strict JSON object with a key "questions" containing an array of question objects, where each object has:
- "subjectId": one of "mathematics", "physics", "chemistry", "biology", "aptitude", "economics", "government", "literature", "crk", "accounting"
- "subjectName": e.g. "Mathematics", "Physics", "General Aptitude", etc.
- "year": e.g. "2023/2024" or "OAU Post-UTME Past Question"
- "topic": concise syllabus topic name
- "questionText": clean question string without leading numbers or option letters
- "options": an array of 4 or 5 options (strings) without leading A., B., C., D. letters
- "correctOptionIndex": integer 0 for A, 1 for B, 2 for C, 3 for D, 4 for E. If answer key was provided in the text use it; otherwise deduce the correct answer.
- "explanation": concise step-by-step reason or formula derivation for why this answer is correct
- "keyConcept": syllabus principle tested
- "difficulty": "easy" | "medium" | "hard"

Respond ONLY with valid JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are a professional Nigerian University Post-UTME questions data extraction engine. Always output pure valid JSON with a 'questions' array.",
        }
      });

      const parsed = JSON.parse(response.text || '{"questions": []}');
      return res.json(parsed);
    } catch (err: any) {
      console.error("AI Question Extraction error:", err);
      return res.status(200).json({ fallback: true, error: err.message, questions: [] });
    }
  });

  // Vite Middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
