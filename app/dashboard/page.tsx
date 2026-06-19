"use client";
import ConfidenceTrendChart from "@/components/ui/ConfidenceTrendChart";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MistakesByTopicChart from "@/components/ui/MistakesByTopicChart";
import { useRouter } from "next/navigation";
export default function DashboardPage() {
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [analyses, setAnalyses] = useState<any[]>([]);
const router = useRouter();
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: mistakesData } = await supabase
      .from("mistakes")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    const { data: analysesData } = await supabase
      .from("analyses")
      .select("*")
      .eq("user_id", user.id);

    setMistakes(mistakesData || []);
    setAnalyses(analysesData || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const avgConfidence =
    analyses.length > 0
      ? (
          analyses.reduce(
            (sum, item) => sum + (item.confidence || 0),
            0
          ) / analyses.length
        ).toFixed(1)
      : "0";

  const uniqueTopics = new Set(
    mistakes.map((m) => m.topic)
  ).size;

  const lowConfidenceCount = analyses.filter(
    (a) => Number(a.confidence) < 70
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

       {/* Header */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

  <div>
    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
      MistakeMind AI
    </h1>

    <p className="text-slate-300 mt-3 text-lg">
      Learn faster by understanding your mistakes.
    </p>
  </div>

  <div className="flex flex-wrap gap-3 mt-4 md:mt-0">

    <Link
      href="/mistakes/new"
      className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl font-semibold text-white"
    >
      + Add Mistake
    </Link>

    <Link
      href="/search"
      className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold text-white"
    >
      🔍 Search Mistakes
    </Link>

    <Link
      href="/coach"
      className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold text-white"
    >
      🤖 AI Coach
    </Link>

    <Link
      href="/settings"
      className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold text-white"
    >
      Settings
    </Link>

    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold text-white"
    >
      Logout
    </button>

  </div>

</div>
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-10">

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <p className="text-slate-300 text-sm">
                Total Mistakes
              </p>
              <h2 className="text-4xl font-bold text-white mt-2">
                {mistakes.length}
              </h2>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <p className="text-slate-300 text-sm">
                AI Analyses
              </p>
              <h2 className="text-4xl font-bold text-white mt-2">
                {analyses.length}
              </h2>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <p className="text-slate-300 text-sm">
                Avg Confidence
              </p>
              <h2 className="text-4xl font-bold text-green-400 mt-2">
                {avgConfidence}%
              </h2>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <p className="text-slate-300 text-sm">
                Topics Covered
              </p>
              <h2 className="text-4xl font-bold text-cyan-400 mt-2">
                {uniqueTopics}
              </h2>
            </CardContent>
          </Card>

        </div>

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                🤖 AI Insights
              </h2>

              <ul className="space-y-3 text-slate-200">
                <li>• Total mistakes tracked: {mistakes.length}</li>
                <li>• AI analyses completed: {analyses.length}</li>
                <li>• Average confidence: {avgConfidence}%</li>
                <li>• Topics covered: {uniqueTopics}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                🎯 Learning Focus
              </h2>

              <div className="space-y-3 text-slate-200">
                <p>
                  Low Confidence Analyses:
                  <span className="text-red-400 ml-2 font-bold">
                    {lowConfidenceCount}
                  </span>
                </p>

                <p>
                  Continue solving problems from low-confidence topics.
                </p>

                <p>
                  Review root causes regularly to improve faster.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Recent Mistakes */}
        <Card className="bg-slate-900 border-slate-700 mb-10">
          <CardContent className="p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Recent Mistakes
              </h2>

              <Badge className="bg-cyan-600 text-white">
                {mistakes.length} Records
              </Badge>
            </div>

            {mistakes.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                No mistakes found.
              </div>
            ) : (
              <div className="space-y-4">

                {mistakes.slice(0, 10).map((mistake) => (
                  <Link
                    key={mistake.id}
                    href={`/mistakes/${mistake.id}`}
                  >
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-cyan-500 hover:bg-slate-700 transition cursor-pointer">

                      <div className="flex justify-between items-start">

                        <div>
                          <h3 className="font-bold text-lg text-white">
                            {mistake.problem_name}
                          </h3>

                          <p className="text-slate-300 mt-1">
                            {mistake.topic}
                          </p>
                        </div>

                        <Badge className="bg-cyan-600 text-white">
                          {mistake.topic}
                        </Badge>

                      </div>

                      {mistake.error_message && (
                        <div className="mt-4 text-red-400 text-sm">
                          {mistake.error_message}
                        </div>
                      )}

                    </div>
                  </Link>
                ))}

              </div>
            )}

          </CardContent>
        </Card>
{/* Charts */}
<Card className="bg-slate-900 border-slate-700 mb-10">
  <CardContent className="p-6">

    <h2 className="text-2xl font-bold text-white mb-6">
      📊 Mistakes by Topic
    </h2>

    <MistakesByTopicChart mistakes={mistakes} />

  </CardContent>
</Card>
  <div className="mb-10">
  <ConfidenceTrendChart analyses={analyses} />
</div>
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">

          <Link href="/mistakes/new">
            <Card className="bg-slate-900 border-slate-700 hover:border-cyan-500 transition cursor-pointer">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  ➕ Add New Mistake
                </h2>

                <p className="text-slate-300">
                  Save a coding mistake and get AI analysis.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/mistakes">
            <Card className="bg-slate-900 border-slate-700 hover:border-green-500 transition cursor-pointer">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  📚 Mistake Library
                </h2>

                <p className="text-slate-300">
                  Browse all saved mistakes.
                </p>
              </CardContent>
            </Card>
          </Link>

        </div>

      </div>
    </div>
  );
}