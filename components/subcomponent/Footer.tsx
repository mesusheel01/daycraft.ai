import React from 'react'

const date = new Date();
const year = date.getFullYear();

export const Footer = () => {
  return (
    <div className='w-full mt-20 flex flex-col p-4 items-center justify-center text-tertiary text-wrap text-[10px] md:text-sm'>
      <p>Created with <span className='text-purple-600'>❤️ Daycraft.ai {year}</span></p>
    </div>
  )
}
