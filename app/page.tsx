import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Hero Section */}
        <div className="text-center">

          <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-6">
            🚀 AI-Powered Coding Improvement Platform
          </div>

          <h1 className="text-7xl font-bold leading-tight mb-6">
            MistakeMind
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}AI
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            Track coding mistakes, discover learning patterns,
            get AI-powered feedback, and accelerate your DSA journey.
          </p>

        </div>
<div className="flex justify-center gap-4 mb-10">
  <Link href="/login">
    <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl font-semibold">
      Login
    </button>
  </Link>

  <Link href="/signup">
    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold">
      Sign Up
    </button>
  </Link>
</div>
        {/* Main Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          <Link href="/mistakes/new">
            <div className="group bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer h-full">

              <div className="text-5xl mb-4">📝</div>

              <h2 className="text-3xl font-bold mb-4">
                Add Mistake
              </h2>

              <p className="text-slate-400 leading-7">
                Save coding mistakes, analyze errors using AI,
                and build a personal knowledge base.
              </p>

            </div>
          </Link>

          <Link href="/dashboard">
            <div className="group bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer h-full">

              <div className="text-5xl mb-4">📊</div>

              <h2 className="text-3xl font-bold mb-4">
                Dashboard
              </h2>

              <p className="text-slate-400 leading-7">
                View statistics, AI confidence scores,
                and learning insights.
              </p>

            </div>
          </Link>

        </div>

        {/* Feature Pages */}
        <div className="grid md:grid-cols-4 gap-6 mt-20">

          <Link href="/analytics">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer h-full">

              <h3 className="text-xl font-semibold mb-3">
                🤖 AI Analysis
              </h3>

              <p className="text-slate-400">
                Detect root causes automatically.
              </p>

            </div>
          </Link>

          <Link href="/progress">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 cursor-pointer h-full">

              <h3 className="text-xl font-semibold mb-3">
                📈 Progress Tracking
              </h3>

              <p className="text-slate-400">
                Measure your improvement over time.
              </p>

            </div>
          </Link>

          <Link href="/learning">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer h-full">

              <h3 className="text-xl font-semibold mb-3">
                🎯 Personalized Learning
              </h3>

              <p className="text-slate-400">
                Focus on weak topics and recurring errors.
              </p>

            </div>
          </Link>

          <Link href="/mistakes">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer h-full">

              <h3 className="text-xl font-semibold mb-3">
                📚 Mistake Library
              </h3>

              <p className="text-slate-400">
                Browse all saved coding mistakes.
              </p>

            </div>
          </Link>

        </div>

        {/* Footer */}
        <div className="mt-24 text-center text-slate-500 border-t border-slate-800 pt-8">
          Built with Next.js • Supabase • Groq AI
        </div>

      </div>
    </main>
  );
}