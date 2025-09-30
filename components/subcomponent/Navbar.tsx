'use client'
import { Button } from "./Button"
import { useRouter } from "next/navigation"

export const Navbar = () => {
    const router = useRouter();

    const handleButtonClick = (path: string) => {
        router.push(`/${path}`);
      }
  return (
    <nav className='justify-between w-full h-24 bg-white border-b shadow-lg rounded-2xl border-b-gray-200 flex items-center px-4'>
        {/* left section */}
        <div className='text-2xl mx-8 '>
            daycraft.<span className='text-purple-600'>ai</span>
        </div>
       {/* right section  */}
       <div className="mx-8">
          <Button text='Sign In' onClick={()=> handleButtonClick("signin")} />
          <Button text='Sign Up' onClick={()=> handleButtonClick("signup")} />
       </div>
    </nav>
  )
}
