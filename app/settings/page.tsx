"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function changePassword() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Password updated successfully!");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <h1 className="text-5xl font-bold text-cyan-400 mb-8">
          Settings
        </h1>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-white mb-4">
            Change Password
          </h2>

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder:text-slate-400 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={changePassword}
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 mt-6">

          <h2 className="text-2xl font-bold text-white mb-4">
            Account
          </h2>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}