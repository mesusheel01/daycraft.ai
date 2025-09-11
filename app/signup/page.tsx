'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Signin from "../signin/page";
import Link from "next/link";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (res?.error) {
      setError("Invalid username or password!");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src="/favicon.ico" alt="DayCraft AI Logo" className="w-16 h-16 mb-2" />
          <h1 className="text-3xl font-bold text-indigo-700 mb-1">DayCraft AI</h1>
          <p className="text-gray-500 text-center text-sm">
            Your AI-powered scheduling assistant.<br />
            Send a prompt, get your day crafted!
          </p>
        </div>
        <h2 className="text-xl text-black font-semibold  mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 block w-full px-2 text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-2 text-gray-900 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full rounded-md px-2 text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
          >
            Sign Up 
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <div className="mt-6">
          <p className="text-gray-600 text-sm text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;