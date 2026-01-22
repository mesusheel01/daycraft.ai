import Link from 'next/link';
import React from 'react'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";


const date = new Date();
const year = date.getFullYear();

export const Footer = () => {
  return (
    <div className='w-full mt-20 translate-y-20 flex flex-col p-4 items-center justify-end text-tertiary text-wrap text-[10px] md:text-sm'>
      <div>Created with <span className='text-purple-600'>❤️ Daycraft.ai {year}</span> |<span > <Link href={"https://whoissusheel.vercel.app"} aria-label='reach out' className='inline-flex items-center gap-1 text-tertiary' >Reach out <HiOutlineArrowNarrowRight /></Link></span></div>
    </div>
  )
}
