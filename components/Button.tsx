import React from 'react'

export const Button = ({text,onClick}:{
    text:string,
    onClick: ()=>void
}) => {

  return (
    <button className={`px-4 py-2 m-2 border-transparent transition-colors duration-300 focus:border-purple-900 rounded-xl ${text==="Sign Up"?"bg-blue-600 text-white hover:bg-blue-800 ":"shadow-md hover:bg-blue-100 text-blue-600" }`} onClick={onClick}>
        {text}
    </button>
)
}
