"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function CoachPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askCoach = async () => {
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAnswer(data.answer);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to get AI advice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-5xl font-bold text-cyan-400 mb-6">
          🤖 AI Coach
        </h1>

        <p className="text-slate-300 mb-6">
          Ask questions about your coding mistakes and learning patterns.
        </p>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Why do I keep making binary search mistakes?"
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white"
        />

        <button
          onClick={askCoach}
          disabled={loading}
          className="mt-4 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl font-semibold"
        >
          {loading ? "Thinking..." : "Ask AI Coach"}
        </button>

        {answer && (
          <div className="mt-8 bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              AI Advice
            </h2>

            <div className="prose prose-invert max-w-none text-slate-200">
              <ReactMarkdown>
                {answer}
              </ReactMarkdown>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}