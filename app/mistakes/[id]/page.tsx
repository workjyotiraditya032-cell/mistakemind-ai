"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MistakeDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [mistake, setMistake] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: mistakeData } = await supabase
      .from("mistakes")
      .select("*")
      .eq("id", id)
      .single();

    setMistake(mistakeData);

    if (mistakeData) {
      const { data: analysisData } = await supabase
        .from("analyses")
        .select("*")
        .eq("mistake_id", mistakeData.id)
        .single();

      setAnalysis(analysisData);
    }
  }

  if (!mistake) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-cyan-400 text-xl font-semibold">
          Loading Mistake...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-cyan-400">
            Mistake Details
          </h1>

          <p className="text-slate-400 mt-2">
            Review the mistake and AI-generated insights.
          </p>
        </div>

        {/* Problem Info */}
        <Card className="bg-slate-900 border border-slate-700 shadow-xl mb-6">
          <CardContent className="p-6">

            <h2 className="text-3xl font-bold text-white">
              {mistake.problem_name}
            </h2>

            <div className="mt-4">
              <Badge className="bg-cyan-600 text-white">
                {mistake.topic}
              </Badge>
            </div>

          </CardContent>
        </Card>

        {/* Wrong Code */}
        <Card className="bg-slate-900 border border-slate-700 shadow-xl mb-6">
          <CardContent className="p-6">

            <h3 className="text-xl font-bold text-white mb-4">
              Wrong Code
            </h3>

            <pre className="bg-slate-800 text-slate-100 p-5 rounded-xl overflow-auto text-sm border border-slate-700">
              {mistake.wrong_code}
            </pre>

          </CardContent>
        </Card>

        {/* Error Message */}
        <Card className="bg-slate-900 border border-slate-700 shadow-xl mb-6">
          <CardContent className="p-6">

            <h3 className="text-xl font-bold text-white mb-4">
              Error Message
            </h3>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-red-300 font-medium">
                {mistake.error_message || "No error message provided"}
              </p>
            </div>

          </CardContent>
        </Card>

        {/* AI Analysis */}
        {analysis && (
          <Card className="bg-slate-900 border border-slate-700 shadow-xl">
            <CardContent className="p-6">

              <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                🤖 AI Analysis
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-slate-800 rounded-xl p-5">
                  <p className="text-slate-400 text-sm mb-2">
                    Mistake Type
                  </p>

                  <p className="text-white font-semibold text-lg">
                    {analysis.mistake_type}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-5">
                  <p className="text-slate-400 text-sm mb-2">
                    Confidence
                  </p>

                  <p className="text-green-400 font-bold text-2xl">
                    {analysis.confidence}%
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-5 md:col-span-2">
                  <p className="text-slate-400 text-sm mb-2">
                    Root Cause
                  </p>

                  <p className="text-slate-200 leading-relaxed">
                    {analysis.root_cause}
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-5 md:col-span-2">
                  <p className="text-cyan-300 text-sm mb-2">
                    Suggested Fix
                  </p>

                  <p className="text-white leading-relaxed">
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