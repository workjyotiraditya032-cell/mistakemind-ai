import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: "Content is required",
        },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-embedding-001",
    });

    const result = await model.embedContent(content);

    console.log(
      "Embedding Length:",
      result.embedding.values.length
    );

    return NextResponse.json({
      success: true,
      embedding: result.embedding.values,
    });
  } catch (error: any) {
    console.error("Embedding Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}