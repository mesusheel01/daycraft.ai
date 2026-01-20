'use client'
import { useTheme } from "@/theme/ThemeProvider";
import { Button } from "./Button"
import { useRouter } from "next/navigation"

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter();


  const handleButtonClick = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <nav className="h-24 text-foreground bg-background  border-b shadow-lg rounded-2xl flex items-center justify-between px-4">
      {/* left section */}
      <div className='text-2xl mx-8'>
        <button onClick={toggleTheme} className="border p-2 bg-black text-white dark:bg-white dark:text-black" >switch</button>
        daycraft.<span className='text-purple-600'>ai</span>
      </div>

      {/* right section */}
      <div className="mx-1 sm:mx-8 flex flex-row sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-0">
        <Button text='Sign In' onClick={() => handleButtonClick("signin")} />
        <Button text='Sign Up' onClick={() => handleButtonClick("signup")} />
      </div>
    </nav>
  );
};
