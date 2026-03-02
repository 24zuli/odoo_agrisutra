"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setToken, setUserId } from "../../lib/auth";
import { Loader2 } from "lucide-react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { API_BASE_URL } from "../../lib/constants";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("🔹 API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      if (!data.user.id) {
        throw new Error("Invalid response: Missing user data");
      }

      setToken(data.token);
      setUserId(data.user.id);

      console.log("✅ User ID stored:", data.user.id);

      router.push("/");
    } catch (err) {
      setError(
        (err as any).message || "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-[#F0FFF1] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username or Email"
            required
            className="w-full border rounded-large px-4 py-3 text-lg shadow-sm focus:ring-4 focus:ring-green-400"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              required
              className="w-full border rounded-large px-4 py-3 text-lg shadow-sm focus:ring-4 focus:ring-green-400 pr-10"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOutline size={20} />
              ) : (
                <IoEyeOffOutline size={20} />
              )}
            </span>
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 text-white bg-green-600 rounded-large shadow-md hover:bg-green-700 transition"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in"}
          </button>
        </form>

        {/* Forgot Password Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          <Link
            href="/forgot-password"
            className="text-green-600 hover:text-green-500"
          >
            Forgot Password?
          </Link>
        </p>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-green-600 hover:text-green-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
