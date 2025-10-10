'use client'
import React, { useState } from 'react'
import { Loader } from './Loader';
import { fetchAiRequest } from '@/request-handler/requests';

export const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [prompt, setPrompt] = useState("");
const [aiResponse, setAiResponse] = useState("");

  const handlePromptClick = async (prompt:string) => { 
    try {
      setLoading(true)
      const data = await fetchAiRequest(prompt);
      setAiResponse(data);
      setLoading(false)
    } catch (error) {
      setError("Failed to fetch AI response");
      setLoading(false)
      console.error("Error fetching AI response:", error);
    }
  }

  return (
    <div className='flex flex-col min-h-[400px] items-center gap-8 justify-center text-center space-y-6 mt-20'>
        {/* hero-text */}
        <div className='flex flex-col gap-3' >
            <h1 className='text-3xl md:text-4xl lg:text-5xl'>Plan your  day with DayCraft.<span className='text-purple-600'>ai</span></h1>
            <div className='flex flex-col '>
              <p className='text-sm md:text-md lg:text-lg text-neutral-600'>Your AI-powered scheduling assistant. Send a prompt, get your day crafted!</p>
              <p className='text-xs md:text-sm lg:text-md text-neutral-500'>Sign up today and take the first step towards a more organized and productive life</p>
            </div>
        </div>
        {/* hero-AiButton */}
          <div className='w-[400px] h-[80px] md:w-[600] md:h-[80px] lg:w-[800px] ;lg:h-[100px] p-1 border-1 gap-1 text-neutral-700 border-neutral-500 rounded-md shadow-md flex'>
            <textarea
            value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Plan my day...' className='w-full bg-purple-50 py-2 flex-wrap text-wrap px-3 h-[70px] rounded-md
             border hover:border-purple-800 focus:outline-purple-800'/>

            <button
            onClick={()=>handlePromptClick(prompt)}
            className='h-12 w-20 bg-btn-accent hover:bg-yellow-50 border-1 transition-colors duration-300 rounded-md translate-y-5 text-sm'>{
              loading ? <Loader />: "Craft My Day" }</button>
          </div>
          {
            aiResponse && <div>
              <p className='text-md text-neutral-600'>{aiResponse}</p>
            </div>
          }
      </div>
  )
}
