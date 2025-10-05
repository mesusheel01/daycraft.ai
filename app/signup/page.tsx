'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("Sign Up");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      console.log("inside try")
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });
      setMsg("Sign Up");
      console.log("after fetch", res)
      if (res.ok) {
        // Redirect to sign-in page after successful signup
        router.push("/dashboard");
      } else {
        const data = await res.json();
        console.log(data)
        setError(data.error || "Something went wrong!");
      }
    } catch (error) {
      setError("Something went wrong!");
    } 
  };

  return (
     <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/80 border-1 shadow-lg backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-semibold text-accent mb-1">DayCraft AI</h1>
          <p className="text-gray-500 text-center text-sm">
            Your AI-powered scheduling assistant.<br />
            Send a prompt, get your day crafted!
          </p>
        </div>
        <h2 className="text-xl text-black font-semibold  mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              required-j-j
              className="mt-1 border-b block w-full px-2 text-gray-900 rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 border-b block w-full px-2 text-gray-900 rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              autoComplete="email"
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
              className="mt-1 border-b block w-full px-2 text-gray-900 rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            onClick={() => setMsg("Signing Up...")}
            className="w-full border-1  py-2 px-4 bg-btn-accent hover:bg-btn-accent-hover font-semibold rounded-md transition"
          >
            {msg}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <div className="mt-6">
          <p className="text-gray-600 text-sm text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;