import React from 'react'

export const Button = ({ text, onClick }: { text: string, onClick: () => void }) => {
  return (
    <button
      className={`px-4 py-3 m-2 transition-colors duration-300 rounded-xl 
        ${text === "Sign Up" 
          ? "bg-btn-accent border-transparent text-black hover:bg-btn-accent-hover" 
          : "shadow-lg border-b border-neutral-500 hover:bg-neutral-100"}`
      }
      onClick={onClick}
    >
      {text}
    </button>
  )
}
