import React from 'react'

export const SignButton = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <button
      className={`px-5 py-2 m-1 md:m-2 text-[12px] md:text-sm font-medium transition-all duration-300 rounded-xl shadow-sm hover:shadow-md active:scale-95 
        ${text === "Sign Up"
          ? "bg-foreground text-background hover:bg-neutral-800 dark:hover:bg-neutral-200"
          : "bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-neutral-300/50 dark:border-white/10 hover:bg-secondary"}`
      }
      onClick={onClick}
    >
      {text}
    </button>

  )
}
