import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-embedding-001",
    });

    const result = await model.embedContent(query);

    const embedding = result.embedding.values;

    const { data, error } = await supabase.rpc(
      "match_embeddings",
      {
        query_embedding: embedding,
        match_threshold: 0.3,
        match_count: 5,
      }
    );

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      results: data,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}