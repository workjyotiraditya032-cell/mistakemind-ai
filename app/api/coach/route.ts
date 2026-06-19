import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const { data: mistakes } = await supabase
      .from("mistakes")
      .select("*")
      .order("id", { ascending: false })
      .limit(10);

    const { data: analyses } = await supabase
      .from("analyses")
      .select("*")
      .order("id", { ascending: false })
      .limit(10);

    const mistakesContext =
      mistakes?.map(
        (m) => `
Problem Name: ${m.problem_name}
Topic: ${m.topic}
Error Message: ${m.error_message}
Wrong Code:
${m.wrong_code}
`
      ).join("\n-------------------\n") || "";

    const analysesContext =
      analyses?.map(
        (a) => `
Mistake Type: ${a.mistake_type}
Root Cause: ${a.root_cause}
Suggestion: ${a.suggestion}
Confidence: ${a.confidence}
`
      ).join("\n-------------------\n") || "";

    const prompt = `
You are an expert coding mentor and personal programming coach.

Student Question:
${question}

Recent Coding Mistakes:
${mistakesContext}

Recent AI Analyses:
${analysesContext}

Instructions:
- Never mention UUIDs, IDs, database records, or internal identifiers.
- Refer only to problem names and topics.
- Use simple student-friendly language.
- Give practical and actionable advice.
- Focus on learning patterns.
- Explain weaknesses clearly.

Provide your response in markdown format using:

## Common Mistake Patterns

## Weak Topics

## Improvement Advice

## Next Practice Plan
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are an experienced competitive programming mentor.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
      });

    return NextResponse.json({
      success: true,
      answer:
        completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("Coach Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}