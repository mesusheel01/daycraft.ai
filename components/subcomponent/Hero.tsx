'use client'
import React, { useState } from 'react';
import { Loader } from './Loader';

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

  const handlePromptClick = async (prompt: string) => {
    try {
      setLoading(true)
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("AI Response Data:", data);
      setAiResponse(data);
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
      <div className='flex flex-col gap-3'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl'>
          Plan your day with DayCraft.<span className='text-purple-600'>ai</span>
        </h1>
        <div className='flex flex-col'>
          <p className='text-sm md:text-md lg:text-lg text-neutral-600'>
            Your AI-powered scheduling assistant. Send a prompt, get your day crafted!
          </p>
          <p className='text-xs md:text-sm lg:text-md text-neutral-500'>
            Sign up today and take the first step towards a more organized and productive life
          </p>
        </div>
      </div>
      {/* demo video section */}
      <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.youtube.com/embed/Dfx44idFQPc?autoplay=1&mute=1&loop=1&playlist=Dfx44idFQPc"
          title="DayCraft.ai Demo"
          className="w-full h-full"
          allowFullScreen
      ></iframe>
      </div>

      {/* hero-AiButton */}
      <div className='w-[400px] h-[80px] md:w-[600px] md:h-[80px] lg:w-[800px] lg:h-[100px] p-1 border-1 gap-1 text-neutral-700 border-neutral-500 rounded-md shadow-md flex'>
        <textarea
          value={prompt}
          onChange={(e) => {
            setAiResponse([])
            setError("")
            setPrompt(e.target.value)}
          }
          placeholder='Plan my day...'
          className='w-full bg-purple-50 py-2 px-3 h-[70px] rounded-md border hover:border-purple-800 focus:outline-purple-800'
        />
        <button
          onClick={() => handlePromptClick(prompt)}
          className='h-12 w-28 bg-btn-accent hover:bg-yellow-50 border-1 transition-colors duration-300 rounded-md translate-y-5 text-sm'
        >
          {loading ? <Loader /> : "Craft My Day"}
        </button>
      </div>

      {/* Render AI Response */}
      {aiResponse.length > 0 && (
        <div className='flex bg-purple-50 border-1 rounded-xl p-1 flex-col gap-2 mt-4 w-full h-auto max-w-4xl'>
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
