'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/theme/ThemeProvider";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("Sign Up");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme()

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
        router.push("/signin");
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
    <div className="min-h-screen  flex items-center justify-center">
      <div className="border-1 border-neutral-500 dark:border-neutral-700 bg-gradient-to-b from-background via-card to-tertiary shadow-xl rounded-2xl m-6 p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-1">DayCraft AI</h1>
          <p className="text-tertiary text-center text-[12px] md:text-sm">
            Your AI-powered scheduling assistant.<br />
            Send a prompt, get your day crafted!
          </p>
        </div>
        <h2 className="text-lg md:text-xl -translate-y-5 font-semibold text-secondary-foreground text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-destructive-foreground font-medium ">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="John32"
              required-j-j
              className="mt-1 border-b text-sm block w-full px-2 text-destructive-foreground border-ring rounded shadow-sm "
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-destructive-foreground  font-medium ">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="love@someone.com"
              required
              className="mt-1 border-b text-sm block w-full px-2 text-destructive-foreground border-ring rounded  shadow-sm"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-destructive-foreground  font-medium ">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
              className="mt-1 border-b text-sm block w-full px-2 text-destructive-foreground border-ring rounded  shadow-sm"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            onClick={() => setMsg("Signing Up...")}
            className="w-full border-1 border-neutral-600 transition-colors duration-300  py-2 px-4 bg-popover hover:bg-accent-foreground font-semibold rounded-md "
          >
            {msg}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <div className="mt-6">
          <p className="text-neutral-700 dark:text-neutral-900 text-sm text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-purple-800 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        {
          error && <div className="text-red-500 text-sm text-center">{error}</div>
        }
      </div>
    </div>
  );
};

export default Signup;