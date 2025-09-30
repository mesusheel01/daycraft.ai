import React from 'react'

export const Hero = () => {
  return (
    <div className='flex flex-col min-h-[400px] items-center gap-8 justify-center text-center space-y-6 mt-20'>
        {/* hero-text */}
        <div className='flex flex-col gap-3' >
            <h1 className='text-3xl md:text-4xl lg:text-5xl'>Plan your  day with DayCraft.<span className='text-purple-600'>ai</span></h1>
            <div className='flex flex-col '>
              <p className='text-sm md:text-md lg:text-lg text-neutral-600'>Your AI-powered scheduling assistant. Send a prompt, get your day crafted!</p>
              <p className='text-xs md:text-sm lg:text-md text-neutral-500'>Sign up today and take the first step towards a more organized and productive life</p>
            </div>
        </div>
        {/* hero-AiButton */}
        <div className=''>
            <div className='w-[800px] h-[100px] p-6 items-end border-1 gap-1 text-neutral-700 border-neutral-500 rounded-md shadow-md flex'>
              <input type="text" placeholder='Plan my day...' className='w-full flex-wrap text-wrap p-3 h-[50px] rounded-l-md border hover:border-purple-800 focus:outline-purple-800'/>

              <button className='bg-btn-accent rounded-2xl h-[50px] p-2 text-sm rounded-r-md hover: transition'>Craft My Day</button>
        </div>
      </div>
  </div>
  )
}
