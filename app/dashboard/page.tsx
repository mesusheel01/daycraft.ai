'use client';
import { Loader } from '@/components/subcomponent/Loader';
import { deleteTodosAndFetchNew, fetchAiRequest, getTodos, updateParticularTask, updateTodo } from '@/request-handler/requests';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSession } from 'next-auth/react';

type AiResponseItem = {
  id: number;
  username: string;
  time: string;
  task: string;
  tips: string;
  completed: boolean;
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editTodo, setEditTodo] = useState<number | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<AiResponseItem[]>([]);
  const [openTip, setOpenTip] = useState<number | null>(null);
  const { data: session } = useSession();

  const handlePromptClick = async (prompt: string) => {
    try {
      setLoading(true);
      let data;
      if(aiResponse.length > 0){
         setAiResponse([]);
         data = await deleteTodosAndFetchNew(prompt);
      }else{
         data = await fetchAiRequest(prompt);
      }
      setAiResponse(data);
      setPrompt('');
    } catch (error) {
      console.error('Fetch failed:', error);
      setError('Failed to fetch AI response');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async (id: number, completed: boolean) => {
    try {
      await updateTodo(id, completed);
      getTodoList(); // refresh without reloading
    } catch (error) {
      console.error('Error marking todo as completed:', error);
    }
  };

  const handleUpdateTask = (id:number) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const inputElement = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
    const newTask = inputElement.value;
    try {
      const updateTask = await updateParticularTask(id, newTask);
      setEditTodo(null);
      window.location.reload()
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  const getTodoList = async () => {
    try {
      const res = await getTodos();
      const todos = Array.isArray(res) ? res : [];
      const sortedAsc = todos.sort((a, b) => Number(a.id) - Number(b.id));
      setAiResponse(sortedAsc);
    } catch (error) {
      console.error('Error fetching todo list:', error);
      setError('Failed to load todos');
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div className="flex flex-col min-h-screen mb-24 items-center justify-between text-center px-4 py-6">
      <div className="flex flex-col items-center w-full max-w-[750px] gap-4 overflow-y-auto flex-1">
        {aiResponse.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold text-purple-600 mb-2">
              🌞 Your Personalized Day Plan
            </h2>

            {aiResponse.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.id * 0.05 }}
                className="bg-white shadow-sm border border-neutral-200 rounded-lg p-3 text-left w-full"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleMarkCompleted(item.id, !item.completed)}
                        className="accent-purple-600 cursor-pointer w-4 h-4"
                      />
                      <div>
                        <p className="text-xs text-neutral-500">{item.time}</p>
                        <h3 className="text-sm font-medium text-neutral-800 leading-tight">
                          {item.task}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() =>
                          setEditTodo(editTodo === item.id ? null : item.id)
                        }
                        className="p-1 hover:bg-purple-100 rounded-md transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 text-purple-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931ZM19.5 7.125 16.862 4.487"
                          />
                        </svg>
                      </button>

                      {/* Tips Button */}
                      <button
                        onClick={() =>
                          setOpenTip(openTip === item.id ? null : item.id)
                        }
                        className="text-xs text-purple-600 hover:text-purple-800 transition"
                      >
                        {openTip === item.id ? 'Hide ↑' : 'Tips ↓'}
                      </button>
                    </div>
                  </div>

                  {/* Edit Todo Input */}
                  <AnimatePresence>
                    {editTodo === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-2 mt-1"
                      >
                        <input
                          type="text"
                          defaultValue={item.task}
                          className="border border-neutral-300 rounded-md px-2 py-1 text-sm w-full focus:outline-purple-500"
                        />
                        <button 
                        onClick={handleUpdateTask(item.id)}
                        className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition">
                          Save
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tips Section */}
                  <AnimatePresence>
                    {openTip === item.id && (
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
                </div>
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
              Tip: Include your mood or goals for a smarter and personalized plan.
            </p>
          </>
        )}
      </div>

      {/* Bottom AI Prompt Section */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[750px] bg-white border border-neutral-300 rounded-xl shadow-md flex items-center gap-2 p-2">
        <textarea
          value={prompt}
          onChange={(e) => {
            setError('');
            setPrompt(e.target.value);
          }}
          placeholder="Plan my day..."
          className="flex-1 resize-none bg-purple-50 py-2 px-3 h-[60px] rounded-md text-sm focus:outline-purple-800 text-neutral-700"
        />
        <button
          onClick={() => handlePromptClick(prompt)}
          className="h-[45px] w-[120px] bg-btn-accent hover:bg-btn-accent-hover font-medium rounded-md transition-all duration-300 flex items-center justify-center"
        >
          {loading ? <Loader /> : 'Craft My Day'}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
