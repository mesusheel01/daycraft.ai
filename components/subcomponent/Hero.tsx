'use client'
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { FaBrain } from 'react-icons/fa';
import { useNight } from '@/store/nightStore';


type AiResponseItem = {
  time: string;
  task: string;
  tips: string;
};
export const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<AiResponseItem[]>([]);
  const [tipBox, setTipBox] = useState(false);
  const { isNight, setIsNight } = useNight()


  const handlePromptClick = async (prompt: string) => {
    try {
      setLoading(true)
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, isNight }),

      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("AI Response Data:", data);
      setAiResponse(data);
      setPrompt("");
      // if the hit was for night.
      if (isNight === true) setIsNight()
    } catch (error) {
      console.error("Fetch failed:", error);
      setError("Failed to fetch AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col min-h-[400px] items-center gap-8 justify-center text-center space-y-6 mt-20'>
      {/* hero-text */}
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl'>
          Plan your day with DayCraft.<span className='text-popover-foreground'>ai</span>
        </h1>
        <div className='flex mx-3 gap-2 flex-col'>
          <p className='text-sm md:text-md lg:text-lg text-secondary-foreground'>
            Your AI-powered scheduling assistant. Send a prompt, get your day crafted!
          </p>
          <p className='text-xs md:text-sm lg:text-md text-tertiary'>
            Sign up today and take the first step towards a more organized and productive life
          </p>
        </div>
      </div>
      {/* demo video section */}
      <div className="relative aspect-video w-[330px] md:w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.youtube.com/embed/Al3UOokRSIM?autoplay=0&mute=0&loop=1&playlist=Al3UOokRSIM"
          title="DayCraft.ai Demo"
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div>

      {/* hero-AiButton */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[750px] bg-white/10 dark:bg-black/10 backdrop-blur-md border border-neutral-300/50 dark:border-white/10 rounded-2xl shadow-xl flex items-center gap-3 p-2 group transition-all duration-300 hover:border-purple-500/30">
        <textarea
          value={prompt}
          onChange={(e) => {
            setAiResponse([])
            setError("")
            setPrompt(e.target.value)
          }}
          placeholder="Plan my day..."
          className="flex-1 resize-none bg-secondary/50 dark:bg-neutral-900/50 backdrop-blur-sm py-3 px-4 h-[60px] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-foreground transition-all duration-300 placeholder:text-neutral-500"
        />
        <button
          onClick={() => handlePromptClick(prompt)}
          className="h-12 w-12 bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 flex items-center justify-center transition-all duration-300 rounded-xl hover:scale-105 active:scale-95 group-hover:shadow-purple-500/40"
        >
          {loading ? <Loader /> : <FaBrain size={20} className="drop-shadow-sm" />}
        </button>
      </div>


      {/* Render AI Response */}
      {aiResponse.length > 0 && (
        <div className='flex bg-background text-foreground border-1 rounded-xl p-1 flex-col text-[10px] sm:text-base gap-2 m-4 w-full h-auto max-w-4xl'>
          <h1 className='text-xs text-neutral-500'>This is just for demo purpose and you will see the actual appearance after logging in!</h1>
          {aiResponse.map((item, index) => (
            <div key={index} className='border p-3 justify-between flex gap-2 rounded-md '>
              <h3 className='font-semibold'>{item.time} - {item.task}</h3>
              <button onClick={() => setTipBox(!tipBox)}>{"->"}</button>
              {
                tipBox && <div className='border p-2 rounded-md bg-purple-100'>
                  <p className='text-sm text-neutral-700'>{item.tips}</p>
                </div>
              }
            </div>
          ))}
        </div>
      )}

      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};
