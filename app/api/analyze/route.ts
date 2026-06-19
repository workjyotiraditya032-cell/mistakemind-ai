import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { problemName, topic, wrongCode, errorMessage } = body;

    const prompt = `
You are an expert Data Structures and Algorithms mentor.

Analyze the coding mistake below.

Problem:
${problemName}

Topic:
${topic}

Wrong Code:
${wrongCode}

Error:
${errorMessage}

IMPORTANT:
Return ONLY raw JSON.
Do NOT use markdown.
Do NOT use \`\`\`json.
Do NOT use explanations outside JSON.

Return exactly in this format:

{
  "mistake_type": "",
  "root_cause": "",
  "suggestion": "",
  "confidence": 0-100
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const response =
      completion.choices[0]?.message?.content || "{}";

    // Remove markdown if model still returns it
    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedData;

    try {
      parsedData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Model Response:", response);

      return NextResponse.json(
        {
          error: "Invalid JSON returned by model",
          rawResponse: response,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Analyze Route Error:", error);

    return NextResponse.json(
      {
        error: "Analysis failed",
      },
      { status: 500 }
    );
  }
}