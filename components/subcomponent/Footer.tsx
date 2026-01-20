import React from 'react'

const date = new Date();
const year = date.getFullYear();

export const Footer = () => {
  return (
    <div className='w-full mt-20 border-t border-border flex flex-col p-4 items-center justify-center text-tertiary text-wrap text-[10px] md:text-sm'>
      <p>© {year} DayCraft.ai. All rights reserved.</p>
      <p className='text-center'>Achieve your dreams through better planning and time management and the solution to this is daycraft.ai</p>
      <p>Created with <span className='text-purple-600'>❤️ Daycraft.ai</span></p>
    </div>
  )
}
