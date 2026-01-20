import React from 'react'

export const Button = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <button
      className={`px-4 py-2 m-2 -translate-x-5 text-[12px] md:text-base font-sans transition-colors duration-300 rounded-xl 
        ${text === "Sign Up"
          ? "bg-secondary-foreground border-transparent text-primary-foreground hover:bg-primary"
          : "shadow-lg border-1 border-border hover:bg-secondary"}`
      }
      onClick={onClick}
    >
      {text}
    </button>
  )
}
