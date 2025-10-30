import React from 'react'

const date = new Date();
const year = date.getFullYear();

export const Footer = () => {
  return (
    <div className='w-full mt-52 mb-8 border-t flex flex-col items-center justify-center text-neutral-500 text-sm'>
      <p>© {year} DayCraft.ai. All rights reserved.</p>   
      <p>Achieve your dreams through better planning and time management and the solution to this is daycraft.ai</p>
      <p>Created with <span className='text-purple-600'>❤️ Daycraft.ai</span></p>
    </div>
  )
}
