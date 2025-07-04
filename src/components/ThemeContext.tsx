// src/components/ThemeContext.tsx

import react,{ createContext, useState, useContext } from 'react';

// Define the shape of our color palettes
export const colorThemes = {
  hero: ['#E6E0FF', '#D4F0F0'],       // Lavender & Teal (Default)
  showcase: ['#ffc3a0', '#ffafbd'],   // Peach & Pink
  parallax: ['#2193b0', '#6dd5ed'],     // Deep & Light Blue
};

// Export the type so other files can use it
export type ThemeName = keyof typeof colorThemes;

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a provider component
export const ThemeProvider = ({ children }: { children: react.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>('hero');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};