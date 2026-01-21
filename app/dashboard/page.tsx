'use client';
import { Loader } from '@/components/subcomponent/Loader';
import { clearAllTodos, deleteTodosAndFetchNew, fetchAiRequest, getTodos, updateParticularTask, updateTodo } from '@/request-handler/requests';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useNight } from '@/store/nightStore';
import { FaBrain, FaCloudMoon, FaCloudSun } from 'react-icons/fa';
import { useTheme } from '@/theme/ThemeProvider';

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
  const { isNight } = useNight()
  const [aiResponse, setAiResponse] = useState<AiResponseItem[]>([]);
  const [openTip, setOpenTip] = useState<number | null>(null);
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme()
  const router = useRouter();
  const user = session?.user;

  const getTodoList = async () => {
    try {
      const res = await getTodos();
      const todos = Array.isArray(res) ? res : [];
      const sortedAsc = todos.sort((a, b) => Number(a.id) - Number(b.id));
      setAiResponse(sortedAsc);
      localStorage.setItem('cachedTodos', JSON.stringify(sortedAsc));
    } catch (error) {
      console.error('Error fetching todo list:', error);
      setError('Failed to load todos');
    }
  };



  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    // Load from cache first for instant feel
    const cached = localStorage.getItem('cachedTodos');
    if (cached) {
      try {
        setAiResponse(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse cached todos", e);
      }
    }
    getTodoList();
  }, []);
  console.log(user)
  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handlePromptClick = async (prompt: string) => {
    try {
      setLoading(true);
      let data;
      // Optimistic experience: keep old ones visible until new ones ready
      if (aiResponse.length > 0) {
        data = await deleteTodosAndFetchNew(prompt, isNight);
      } else {
        data = await fetchAiRequest(prompt, isNight);
      }
      setAiResponse(data);
      localStorage.setItem('cachedTodos', JSON.stringify(data));
      setPrompt('');
    } catch (error) {
      console.error('Fetch failed:', error);
      setError('Failed to fetch AI response');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async (id: number, completed: boolean) => {
    // Optimistic update
    const updated = aiResponse.map(item =>
      item.id === id ? { ...item, completed } : item
    );
    setAiResponse(updated);
    localStorage.setItem('cachedTodos', JSON.stringify(updated));

    try {
      await updateTodo(id, completed);
    } catch (error) {
      console.error('Error marking todo as completed:', error);
      // Fallback on error (optional: could revert state)
    }
  };

  const handleClearClick = () => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Optimistic update
    setAiResponse([]);
    localStorage.removeItem('cachedTodos');

    try {
      await clearAllTodos();
    } catch (error) {
      console.error('Error clearing todos:', error);
    }
  }

  const handleUpdateTask = (id: number) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const inputElement = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
    const newTask = inputElement.value;

    // Optimistic update
    const updated = aiResponse.map(item =>
      item.id === id ? { ...item, task: newTask } : item
    );
    setAiResponse(updated);
    localStorage.setItem('cachedTodos', JSON.stringify(updated));
    setEditTodo(null);

    try {
      await updateParticularTask(id, newTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }



  return (
    <div className="flex flex-col min-h-screen mb-24 items-center justify-between text-center px-4 py-6">
      <div className="flex flex-col items-center w-full max-w-[750px] gap-4 overflow-y-auto flex-1">
        {aiResponse.length > 0 ? (
          <>
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-sm flex gap-1 md:text-2xl font-semibold text-purple-600 mb-2">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                  transition={{ duration: 0.15 }}
                  onClick={toggleTheme}

                >
                  {theme === 'light' ? <FaCloudSun className="text-chart-4" size={20} /> : <FaCloudMoon size={20} className="text-chart-4" />}
                </motion.button>
                <p>Your Personalized Day Plan</p>
              </h2>
              <div>
                <button onClick={handleClearClick()} className="text-sm text-neutral-700 hover:text-neutral-600 transition-colors duration-300 dark:text-neutral-300 hover:dark:text-neutral-600 mr-4">Clear</button>
              </div>
            </div>
            {aiResponse.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.id * 0.05 }}
                className="bg-secondary shadow-sm border border-border rounded-lg p-3 text-left w-full"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleMarkCompleted(item.id, !item.completed)}
                        className="accent-purple-600 cursor-pointer w-4 h-4" />
                      <div>
                        <p className="text-xs text-neutral-500">{item.time}</p>
                        <h3 className="text-sm font-medium text-tertiary leading-tight">
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
            <div className="flex items-center justify-between gap-20">
              <h1 className="text-lg md:text-3xl font-semibold">
                Hi <span className="text-purple-500">{user?.name}✨</span>
              </h1>
              <button className='text-xs text-red-500 mt-4 hover:text-red-700 transition' onClick={() => signOut()}>Signout</button>
            </div>
            <p className="text-[12px] md:text-base text-neutral-600 max-w-[500px]">
              Tell me what you’d love to achieve today — I’ll plan your perfect day in seconds.
            </p>
            <p className="text-[10px] md:text-xs text-red-500">
              Tip: Include your mood or goals for a smarter and personalized plan.
            </p>
          </>
        )}
      </div>

      {/* Bottom AI Prompt Section */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[750px] bg-white/10 dark:bg-black/10 backdrop-blur-md border border-neutral-300/50 dark:border-white/10 rounded-2xl shadow-xl flex items-center gap-3 p-2 group transition-all duration-300 hover:border-purple-500/30">
        <textarea
          value={prompt}
          onChange={(e) => {
            setError('');
            setPrompt(e.target.value);
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

    </div>
  );
};

export default Dashboard;
