import Signin from '@/app/signin/page'
import { Signup } from '@/app/signup/page'
import { Sign } from 'crypto'
import Link from 'next/link'
import React from 'react'

export const Landing = () => {
  return (
    <div>
        <nav className="navbar flex justify-between p-4 bg-gray-800 text-white">
            {/* right logo */}
            <div className="">
                <Link href="/" className="m-10 text-xl p-2 text-orange-200">daycraft.<span className='font-bold text-blue-500'>ai</span></Link>
            </div>
            {/* left links  */}
            <div className="flex space-x-4 mr-10">
                <Signin />
                <Signup />
            </div>
        </nav>
    </div>
  )
}
