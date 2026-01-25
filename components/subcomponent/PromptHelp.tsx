'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface PromptForm {
    time: string;
    breaks: string;
    tasks: string;
    currentMood: string;
}

interface PromptHelpProps {
    onApply: (prompt: string) => void;
}

export default function PromptHelp({ onApply }: PromptHelpProps) {
    const [isHelpBoxOpen, setIsHelpBoxOpen] = useState(false)
    const [generatedPrompt, setGeneratedPrompt] = useState("")
    const [copied, setCopied] = useState(false)
    const [promptForm, setPromptForm] = useState<PromptForm>({
        time: "",
        breaks: "",
        tasks: "",
        currentMood: ""
    })

    const handleGeneratePrompt = (e: React.FormEvent) => {
        e.preventDefault()
        const d = new Date()
        const currentHour = d.getHours()
        const endHour = (currentHour + 12) % 24

        const timeRange = promptForm.time || `${currentHour}:00 to ${endHour}:00`
        const breaks = promptForm.breaks || "15min"
        const tasks = promptForm.tasks || "some productive tasks"
        const mood = promptForm.currentMood || "neutral"

        const promptText = `Generate a schedule for ${timeRange} where I will have few breaks of ${breaks}, in this duration I want to complete ${tasks} and I'm feeling ${mood} right now.`
        setGeneratedPrompt(promptText)
    }

    const resetForm = () => {
        setPromptForm({
            time: "",
            breaks: "",
            tasks: "",
            currentMood: ""
        })
        setGeneratedPrompt("")
    }

    const handleCopy = () => {
        if (!generatedPrompt) return
        navigator.clipboard.writeText(generatedPrompt)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        setTimeout(resetForm, 6000)
    }

    const handlePaste = () => {
        if (!generatedPrompt) return
        onApply(generatedPrompt)
        setIsHelpBoxOpen(false)
        setTimeout(resetForm, 6000)
    }

    return (
        <div className="relative z-50 flex flex-col items-end gap-3 mb-2">
            {isHelpBoxOpen ? (
                <div className="w-[300px] sm:w-[400px] p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex justify-between items-center mb-4 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                        <h3 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">Help me plan...</h3>
                        <button
                            onClick={() => setIsHelpBoxOpen(false)}
                            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors text-neutral-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    <form className="flex flex-col gap-3" onSubmit={handleGeneratePrompt}>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium px-1">Suitable Time</label>
                            <input
                                value={promptForm.time}
                                onChange={(e) => setPromptForm(prev => ({ ...prev, time: e.target.value }))}
                                className="w-full text-sm bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all"
                                placeholder="e.g : 7 AM - 6 PM (Default: Next 12h)"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium px-1">Breaks</label>
                                <input
                                    value={promptForm.breaks}
                                    onChange={(e) => setPromptForm(prev => ({ ...prev, breaks: e.target.value }))}
                                    className="w-full text-sm bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all"
                                    placeholder="e.g: 15min"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium px-1">Mood</label>
                                <input
                                    value={promptForm.currentMood}
                                    onChange={(e) => setPromptForm(prev => ({ ...prev, currentMood: e.target.value }))}
                                    className="w-full text-sm bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all"
                                    placeholder="e.g: Productive"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium px-1">Today's Targets</label>
                            <textarea
                                value={promptForm.tasks}
                                onChange={(e) => setPromptForm(prev => ({ ...prev, tasks: e.target.value }))}
                                className="w-full text-sm bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all h-20 resize-none"
                                placeholder="e.g: Read 20 pages, write blog post..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-1 w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-sm font-medium transition-all transform active:scale-95 shadow-lg shadow-purple-500/20"
                        >
                            Generate Prompt
                        </button>
                    </form>

                    {generatedPrompt && (
                        <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 animate-in fade-in duration-500">
                            <div className="bg-neutral-50 dark:bg-black p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 mb-3">
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 italic leading-relaxed">
                                    "{generatedPrompt}"
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="flex-1 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-medium transition-all active:scale-95 flex items-center justify-center min-h-[36px]"
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        {copied ? (
                                            <motion.div
                                                key="copied"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.5, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-2 text-green-600 dark:text-green-400"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                                Copied
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copy"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.5, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                                Copy
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                                <button
                                    onClick={handlePaste}
                                    className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-medium transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 5 5 5-5" /><path d="m11 7 5 5 5-5" /></svg>
                                    Paste to AI
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={() => setIsHelpBoxOpen(true)}
                    className="flex items-center gap-2 hover:bg-accent hover:border-purple-500/50 transition-all duration-300 px-4 py-2 rounded-2xl backdrop-blur-2xl shadow-lg bg-ring/10 border border-white/10 text-xs font-medium text-neutral-600 dark:text-neutral-400 group"
                >
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse group-hover:scale-125 transition-transform" />
                    Need help with writing prompt?
                </button>
            )}
        </div>
    )
}