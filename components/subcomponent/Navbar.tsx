'use client'
import { useTheme } from "@/theme/ThemeProvider";
import { SignButton } from "./Button"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from 'motion/react'
import { FaCloudMoon, FaCloudSun } from "react-icons/fa";
import { useNight } from "@/store/nightStore";


export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const { setIsNight } = useNight()
  const router = useRouter();

  const handleButtonClick = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <nav className="h-20  bg-background border-b border-border  shadow-lg rounded-2xl flex items-center justify-between">
      {/* left section */}
      <div className='text-md  md:text-2xl font-sans flex gap-6 sm:gap-10 items-center mx-8 md:mx-20'>
        <AnimatePresence mode="wait" initial={false}>
          <motion.button
            key={theme}
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            transition={{ duration: 0.15 }}
            onClick={toggleTheme}

          >
            {theme === 'light' ? <FaCloudSun className="text-chart-4" size={20} /> : <FaCloudMoon size={20} className="text-chart-4" />}
          </motion.button>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false} >
          <motion.button
            key={theme}
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 90 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              toggleTheme()
              setIsNight()
            }}
            className="w-10 translate-x-2 md:w-14 inline-flex justify-center"
          >
            {theme === 'light' ? "Day" : "Night"}Craft.ai
          </motion.button>

        </AnimatePresence>
      </div>

      {/* right section */}
      <div className="mr-0 md:mr-15">
        <SignButton text='Sign In' onClick={() => handleButtonClick("signin")} />
        <SignButton text='Sign Up' onClick={() => handleButtonClick("signup")} />
      </div>
    </nav>
  );
};
