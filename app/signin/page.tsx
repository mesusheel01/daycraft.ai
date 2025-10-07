'use client'
/**
 * Sign In Page with Theme Support
 * 
 * This page has been enhanced with theme support:
 * - Uses CSS variables for theme-aware styling (background, text colors, etc.)
 * - Includes the ThemeToggle component for switching between light and dark modes
 * - All UI elements adapt to the current theme
 * - Social login buttons maintain brand colors while adapting to the theme
 */
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("Sign In"); 
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/dashboard"
    });
    setMsg("Sign In");
    if (res?.error) {
      setError("Invalid username or password!");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {/* Theme toggle button positioned in the top-right corner */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      {/* Card with theme-aware styling using CSS variables */}
      <div className="border-1 shadow-lg backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md"
           style={{ backgroundColor: 'var(--card-background)', boxShadow: `0 10px 15px -3px var(--card-shadow)` }}>
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-semibold text-accent mb-1">DayCraft AI</h1>
          <p className="text-foreground/70 text-center text-sm">
            Your AI-powered scheduling assistant.<br />
            Send a prompt, get your day crafted!
          </p>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center text-foreground">Sign In</h2>
        {/* Form with theme-aware styling */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground/80">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 border-b block w-full px-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground/80">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 border-b block w-full px-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
              autoComplete="current-password"
            />
          </div>
          {/* Theme-aware button using CSS variables */}
          <button
            type="submit"
            onClick={() => setMsg("Signing In...")}
            className="w-full border-1  py-2 px-4 bg-btn-accent hover:bg-btn-accent-hover font-semibold rounded-md transition"

          >
            {msg}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        {/* Theme-aware divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-1" style={{ borderColor: 'var(--color-border)' }} />
          <span className="mx-2 text-xs" style={{ color: 'var(--color-secondary)' }}>or</span>
          <hr className="flex-1" style={{ borderColor: 'var(--color-border)' }} />
        </div>
        {/* Social login buttons with theme-aware styling */}
        <div className="flex flex-col gap-3">
          {/* GitHub login button - dark in both themes */}
          <button
            onClick={() => signIn("github", { redirect: true, callbackUrl: "/dashboard" })}
            className="w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-md flex items-center justify-center gap-2 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            Sign in with GitHub
          </button>
          {/* Google login button - theme-aware styling */}
          <button
            onClick={() => signIn("google", { redirect: true, callbackUrl: "/dashboard" })}
            className="w-full py-2 px-4 font-semibold rounded-md flex items-center justify-center gap-2 transition"
            style={{
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              borderColor: 'var(--color-border)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#4285F4" d="M24 9.5c3.54 0 6.73 1.23 9.24 3.25l6.93-6.93C36.18 2.34 30.39 0 24 0 14.64 0 6.4 5.64 2.44 13.86l8.06 6.27C12.44 13.13 17.73 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9.02h12.42c-.54 2.91-2.17 5.38-4.62 7.04l7.19 5.59C43.98 37.36 46.1 31.41 46.1 24.5z"/><path fill="#FBBC05" d="M10.5 28.14c-.62-1.85-.98-3.81-.98-5.84s.36-3.99.98-5.84l-8.06-6.27C.86 13.91 0 18.81 0 24s.86 10.09 2.44 14.81l8.06-6.27z"/><path fill="#EA4335" d="M24 48c6.39 0 12.18-2.11 16.72-5.74l-7.19-5.59c-2.01 1.35-4.59 2.15-7.53 2.15-6.27 0-11.56-3.63-14.5-8.87l-8.06 6.27C6.4 42.36 14.64 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;