"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function MistakesPage() {
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMistakes();
  }, []);

 async function fetchMistakes() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "/login";
    return;
  }

  const { data } = await supabase
    .from("mistakes")
    .select("*")
    .eq("user_id", user.id)
    .order("id", { ascending: false });

  setMistakes(data || []);
}

  async function deleteMistake(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mistake?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("mistakes")
      .delete()
      .eq("id", id);

    fetchMistakes();
  }

  const filteredMistakes = mistakes.filter(
    (mistake) =>
      mistake.problem_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      mistake.topic
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-cyan-400 mb-3">
            📚 Mistake Library
          </h1>

          <p className="text-slate-200 text-lg">
            Browse, search, and manage all your coding mistakes.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            placeholder="🔍 Search by problem name or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 h-12"
          />
        </div>

        {/* Stats */}
        <div className="mb-8">
          <Badge className="bg-cyan-600 text-white text-sm px-4 py-2">
            {filteredMistakes.length} Mistakes Found
          </Badge>
        </div>

        {/* Mistakes List */}
        <div className="space-y-5">

          {filteredMistakes.length === 0 ? (
            <Card className="bg-slate-900 border-slate-700 shadow-lg">
              <CardContent className="p-12 text-center">
                <p className="text-slate-300 text-lg">
                  No mistakes found.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMistakes.map((mistake) => (
              <Card
                key={mistake.id}
                className="bg-slate-900 border-slate-700 shadow-lg hover:border-cyan-500 transition-all duration-300"
              >
                <CardContent className="p-6">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    {/* Left Side */}
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {mistake.problem_name}
                      </h2>

                      <p className="text-cyan-300 mt-2">
                        Topic: {mistake.topic}
                      </p>

                      {mistake.error_message && (
                        <p className="text-red-400 mt-3 text-sm">
                          {mistake.error_message}
                        </p>
                      )}

                      <div className="mt-3">
                        <Badge className="bg-slate-700 text-white">
                          {mistake.topic}
                        </Badge>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex gap-3">

                      <Link
                        href={`/mistakes/${mistake.id}`}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg font-medium transition"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => deleteMistake(mistake.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </CardContent>
              </Card>
            ))
          )}

        </div>
      </div>
    </div>
  );
}