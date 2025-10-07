'use client';

/**
 * Theme Provider Implementation
 * 
 * This module implements a complete light/dark theme system for the DayCraft AI application:
 * 
 * Key features:
 * - Uses React Context API to provide theme state throughout the application
 * - Supports light and dark themes with CSS variables defined in globals.css
 * - Persists user theme preference in localStorage
 * - Respects system color scheme preference on first visit
 * - Provides a useTheme() hook for easy access to theme state and toggle function
 * - Sets data-theme attribute on the HTML element for CSS variable switching
 * - Adds/removes the 'dark' class for Tailwind dark mode compatibility
 * 
 * Usage:
 * 1. Wrap your application with <ThemeProvider> in layout.tsx
 * 2. Use the useTheme() hook in components to access theme state and toggle function
 * 3. Use the <ThemeToggle> component to provide a UI control for theme switching
 * 4. Style components using CSS variables (var(--background), var(--foreground), etc.)
 *    or Tailwind dark mode utilities (dark:bg-gray-800, etc.)
 */

import { createContext, useContext, useEffect, useState } from 'react';

// Define theme types
type Theme = 'light' | 'dark';

// Create theme context with default values
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme state with user preference or system preference
  const [theme, setTheme] = useState<Theme>('light');
  
  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Effect to initialize theme from localStorage or system preference
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);
  
  // Effect to handle theme changes and persist to localStorage
  useEffect(() => {
    // Update data-theme attribute on document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Add or remove the 'dark' class from the document for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}