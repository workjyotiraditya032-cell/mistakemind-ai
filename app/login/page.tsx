"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">

        {/* Logo */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-cyan-400">
            MistakeMind AI
          </h1>

          <p className="text-slate-300 mt-3">
            Login to continue your learning journey
          </p>

        </div>

        {/* Email */}
        <div className="mb-4">

          <label className="block text-slate-200 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Password */}
        <div className="mb-3">

          <label className="block text-slate-200 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-6">
          <Link
            href="/forgot-password"
            className="text-cyan-400 hover:text-cyan-300 text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <div className="text-center mt-6">

          <p className="text-slate-300">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}