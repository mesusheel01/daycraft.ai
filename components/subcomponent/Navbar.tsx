'use client'
import { Button } from "./Button"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/ThemeToggle"

export const Navbar = () => {
    const router = useRouter();

    const handleButtonClick = (path: string) => {
        router.push(`/${path}`);
      }
  return (
    <nav className='justify-between w-full h-24 bg-white dark:bg-gray-800 border-b shadow-lg rounded-2xl border-b-gray-200 dark:border-b-gray-700 flex items-center px-4 transition-colors duration-300'>
        {/* left section */}
        <div className='text-2xl mx-8 text-gray-900 dark:text-white transition-colors duration-300'>
            daycraft.<span className='text-purple-600 dark:text-purple-400'>ai</span>
        </div>
       {/* right section  */}
       <div className="mx-8 flex items-center gap-4 transition-colors duration-300">
          <ThemeToggle />
          <Button text='Sign In'  onClick={()=> handleButtonClick("signin")} />
          <Button text='Sign Up' onClick={()=> handleButtonClick("signup")} />
       </div>
    </nav>
  )
}
