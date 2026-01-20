'use client'
import { useTheme } from "@/theme/ThemeProvider";
import { Button } from "./Button"
import { useRouter } from "next/navigation"
import { motion } from 'motion/react'
import { Moon, Sun } from "geist-icons";


export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter();


  const handleButtonClick = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <nav className="h-20  bg-background border-b border-border  shadow-lg rounded-2xl flex items-center justify-between">
      {/* left section */}
      <div className='text-lg  md:text-2xl font-sans flex items-center mx-8 md:mx-20'>
        <motion.button
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          transition={{ duration: 0.15 }}
          onClick={toggleTheme}

        >
          {theme === 'light' ? <Sun className="text-chart-4" size={15} /> : <Moon size={15} className="text-chart-4" />}
        </motion.button>
        <button onClick={toggleTheme}>
          &nbsp;{theme === 'light' ? "Day" : " Night"}
        </button>
        Craft.<span className=''>ai</span>
      </div>

      {/* right section */}
      <div className="mr-0 md:mr-10">
        <Button text='Sign In' onClick={() => handleButtonClick("signin")} />
        <Button text='Sign Up' onClick={() => handleButtonClick("signup")} />
      </div>
    </nav>
  );
};
