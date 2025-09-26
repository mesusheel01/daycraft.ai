'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from './Button'
import {motion} from 'motion/react'
import { useState } from 'react'  

export const Landing = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  // const [todos, setTodos] = useState<string[]>([]);

  // Example AI response simulation
  const handleGenerate = () => {
    
  };

  const handleSignClick = (type: "signin" | "signup") => () => {
    router.push(`/${type}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">
      {/* Navbar */}
      <nav className="flex justify-between p-4 rounded-xl m-4 bg-blue-200/50 backdrop-blur-md shadow-md">
        <div className="mt-3">
          <Link href="/" className="m-10 text-xl p-2 text-purple-900">
            daycraft.<span className='font-bold text-blue-500'>ai</span>
          </Link>
        </div>
        <div className="flex space-x-4 mr-10">
          <Button text="Sign In" onClick={handleSignClick("signin")} />
          <Button text="Sign Up" onClick={handleSignClick("signup")} />
        </div>
      </nav>
      {/* hero section */}
      <div className='translate-y-20'>
        <div className="text-center px-4">
          {/* heading */}
          <h1 className="text-5xl text-black font-bold text-center mt-10">
            Plan you day with daycraft.<span className='font-bold text-blue-500'>ai</span>
          </h1>
          <p className="text-center text-gray-700 mt-4 text-lg">
            Your AI-powered scheduling assistant. Send a prompt, get your day crafted!<br/>
            Sign up today and take the first step towards a more organized and productive life.
          </p>
        </div>
        {/* prompt input section*/}
        <div className="mt-10 text-center w-2/3 h-32 p-4 mx-auto block rounded-lg border border-gray-300 shadow-sm">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full border-neutral-700"
          />
        </div>
      </div>
    </div>
)};