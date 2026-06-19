"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function NewMistakePage() {
  const [problemName, setProblemName] = useState("");
  const [topic, setTopic] = useState("");
  const [wrongCode, setWrongCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

 const handleSubmit = async () => {
  try {
    setLoading(true);

    if (
      !problemName ||
      !topic ||
      !wrongCode ||
      !errorMessage
    ) {
      alert("Please fill all fields");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    // SAVE MISTAKE
    const { data: mistakeData, error: mistakeError } =
      await supabase
        .from("mistakes")
        .insert([
          {
            user_id: user.id,
            problem_name: problemName,
            topic,
            wrong_code: wrongCode,
            error_message: errorMessage,
          },
        ])
        .select()
        .single();

    console.log("Mistake Data:", mistakeData);
    console.log("Mistake Error:", mistakeError);

    if (mistakeError) {
      alert(mistakeError.message);
      return;
    }

    // ANALYZE
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problemName,
        topic,
        wrongCode,
        errorMessage,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Analysis failed");
      return;
    }

    setAnalysis(result);

    // SAVE ANALYSIS
    const { error: analysisError } =
      await supabase.from("analyses").insert([
        {
          user_id: user.id,
          mistake_id: mistakeData.id,
          mistake_type: result.mistake_type,
          root_cause: result.root_cause,
          suggestion: result.suggestion,
          confidence: result.confidence,
        },
      ]);

    console.log("Analysis Error:", analysisError);

    // EMBEDDING (OPTIONAL)
    try {
      const embeddingResponse = await fetch(
        "/api/embed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: `
${problemName}
${topic}
${wrongCode}
${errorMessage}
`,
          }),
        }
      );

      const embeddingResult =
        await embeddingResponse.json();

      console.log(
        "Embedding Result:",
        embeddingResult
      );

      if (
        embeddingResponse.ok &&
        embeddingResult.embedding
      ) {
        const { error: embeddingError } =
          await supabase
            .from("embeddings")
            .insert([
              {
                user_id: user.id,
                mistake_id: mistakeData.id,
                content: `
${problemName}
${topic}
${wrongCode}
${errorMessage}
`,
                embedding:
                  embeddingResult.embedding,
              },
            ]);

        console.log(
          "Embedding Error:",
          embeddingError
        );
      }
    } catch (embeddingErr) {
      console.log(
        "Embedding Failed:",
        embeddingErr
      );
    }

    alert(
      "Mistake saved and analyzed successfully!"
    );

    setProblemName("");
    setTopic("");
    setWrongCode("");
    setErrorMessage("");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-cyan-400">
            Add Coding Mistake
          </h1>

          <p className="text-slate-300 mt-3 text-lg">
            Store mistakes, analyze them with AI,
            and improve your coding skills.
          </p>
        </div>

        {/* Form */}
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-8 space-y-6">

            <div>
              <label className="block mb-2 text-slate-300">
                Problem Name
              </label>

              <Input
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="e.g. Binary Search"
                value={problemName}
                onChange={(e) =>
                  setProblemName(e.target.value)
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">
                Topic
              </label>

              <Input
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="e.g. Arrays"
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value)
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">
                Wrong Code
              </label>

              <Textarea
                rows={10}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Paste incorrect code..."
                value={wrongCode}
                onChange={(e) =>
                  setWrongCode(e.target.value)
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">
                Error Message
              </label>

              <Textarea
                rows={4}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Paste compiler/runtime error..."
                value={errorMessage}
                onChange={(e) =>
                  setErrorMessage(e.target.value)
                }
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-12 text-lg bg-cyan-600 hover:bg-cyan-700"
            >
              {loading
                ? "Analyzing with AI..."
                : "Save & Analyze"}
            </Button>

          </CardContent>
        </Card>

        {/* Analysis */}
        {analysis && (
          <Card className="bg-slate-900 border-slate-700 mt-8">
            <CardContent className="p-8">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  🤖 AI Analysis
                </h2>

                <Badge className="bg-green-600 text-white">
                  {analysis.confidence}%
                </Badge>
              </div>

              <div className="space-y-6">

                <div>
                  <p className="text-slate-400 text-sm">
                    Mistake Type
                  </p>

                  <p className="text-white font-semibold text-lg">
                    {analysis.mistake_type}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Root Cause
                  </p>

                  <p className="text-slate-200">
                    {analysis.root_cause}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Suggestion
                  </p>

                  <p className="text-cyan-400">
                    {analysis.suggestion}
                  </p>
                </div>

              </div>

            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}