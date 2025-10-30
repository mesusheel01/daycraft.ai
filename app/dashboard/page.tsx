'use client'

import { Loader } from '@/components/subcomponent/Loader';
import { fetchAiRequest } from '@/request-handler/requests';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type AiResponseItem = {
  username: string;
  time: string;
  task: string;
  tips: string;
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<AiResponseItem[]>([]);
  const [openTip, setOpenTip] = useState<number | null>(null);

  const handlePromptClick = async (prompt: string) => {
    try {
      setLoading(true);
      const data = await fetchAiRequest(prompt);
      setAiResponse(data);
    } catch (error) {
      console.error('Fetch failed:', error);
      setError('Failed to fetch AI response');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = (index: number) => {
    // to be implemented later
  };

  return (
    <div className="flex flex-col min-h-screen mb-24 items-center justify-between text-center px-4 py-6">
      {/* Main Section */}
      <div className="flex flex-col items-center w-full max-w-[750px] gap-4 overflow-y-auto flex-1">
        {aiResponse.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold text-purple-600 mb-2">
              🌞 Your Personalized Day Plan
            </h2>

            {aiResponse.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white shadow-sm border border-neutral-200 rounded-lg p-3 text-left w-full"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onClick={() => handleMarkCompleted(index)}
                      className="accent-purple-600 cursor-pointer w-4 h-4"
                    />
                    <div>
                      <p className="text-xs text-neutral-500">{item.time}</p>
                      <h3 className="text-sm font-medium text-neutral-800 leading-tight">
                        {item.task}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setOpenTip(openTip === index ? null : index)
                    }
                    className="text-xs text-purple-600 hover:text-purple-800 transition"
                  >
                    {openTip === index ? 'Hide ↑' : 'Tips ↓'}
                  </button>
                </div>

                <AnimatePresence>
                  {openTip === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-2 border-t border-purple-100 pt-2 bg-purple-50 rounded-md px-2 py-1"
                    >
                      <p className="text-xs text-neutral-700 leading-snug">
                        💡 {item.tips}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold">
              Hi <span className="text-purple-500">Susheel✨</span>
            </h1>
            <p className="text-base text-neutral-600 max-w-[500px]">
              Tell me what you’d love to achieve today — I’ll plan your perfect day in seconds.
            </p>
            <p className="text-xs text-red-500">
              Tip: Include your mood or goals for a smarter plan.
            </p>
          </>
        )}
      </div>

      {/* Bottom AI Prompt Section */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[750px] bg-white border border-neutral-300 rounded-xl shadow-md flex items-center gap-2 p-2">
        <textarea
          value={prompt}
          onChange={(e) => {
            setAiResponse([]);
            setError('');
            setPrompt(e.target.value);
          }}
          placeholder="Plan my day..."
          className="flex-1 resize-none bg-purple-50 py-2 px-3 h-[60px] rounded-md text-sm focus:outline-purple-800 text-neutral-700"
        />
        <button
          onClick={() => handlePromptClick(prompt)}
          className="h-[45px] w-[120px] bg-btn-accent text-white font-medium rounded-md transition-all duration-300 flex items-center justify-center"
        >
          {loading ? <Loader /> : 'Craft My Day'}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
