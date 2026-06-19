"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search query");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });

      const data = await response.json();

      console.log("Search Result:", data);

      if (data.success) {
        setResults(data.results || []);
      } else {
        alert(data.error || "Search failed");
      }
    } catch (error) {
      console.error("Search Error:", error);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          Similar Mistake Search
        </h1>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search mistake..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="flex-1 p-3 rounded bg-slate-800 border border-slate-700"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-700 rounded p-5"
              >
                <p className="text-green-400 font-semibold mb-2">
                  Similarity: {(item.similarity * 100).toFixed(2)}%
                </p>

                <pre className="whitespace-pre-wrap text-slate-200">
                  {item.content}
                </pre>
              </div>
            ))}
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="text-slate-400 text-center mt-10">
            Search for a mistake to find similar past mistakes.
          </div>
        )}
      </div>
    </div>
  );
}