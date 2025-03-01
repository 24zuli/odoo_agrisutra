"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get("email"),
      username: formData.get("username"),
      name: formData.get("name"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-[#F0FFF1] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Email"
              className="w-full border rounded-large px-4 py-3 text-lg shadow-sm focus:ring-4 focus:ring-green-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              required
              placeholder="Username"
              className="w-full border rounded-large px-4 py-3 text-lg shadow-sm focus:ring-4 focus:ring-green-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Full Name"
              className="w-full border rounded-large px-4 py-3 text-lg shadow-sm focus:ring-4 focus:ring-green-400"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              placeholder="Password"
              className="w-full border rounded-large px-4 py-3 text-lg shadow-sm focus:ring-4 focus:ring-green-400"
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
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 text-white bg-green-600 rounded-large shadow-md hover:bg-green-700 transition"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign up"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:text-green-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
