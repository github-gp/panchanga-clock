import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the theme
// Context allows us to share data (theme) across components without passing props
const ThemeContext = createContext();

// Custom hook to use theme in any component
// This makes it easy to access theme anywhere: const { theme, toggleTheme } = useTheme();
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Theme Provider Component
// Wrap your app with this to give all components access to theme
export const ThemeProvider = ({ children }) => {
  // State to track current theme: 'light' or 'dark'
  // Default to 'dark' since your current app has dark background
  const [theme, setTheme] = useState('dark');

  // Load saved theme from browser's localStorage when app starts
  // This remembers user's preference even after closing the browser
  useEffect(() => {
    const savedTheme = localStorage.getItem('panchanga-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []); // Empty array means this runs only once when component mounts

  // Function to switch between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Save to localStorage so it persists
    localStorage.setItem('panchanga-theme', newTheme);
  };

  // Define color schemes for both themes
  const themes = {
    dark: {
      // Background colors
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      cardBackground: 'rgba(255, 255, 255, 0.05)',
      
      // SVG/Clock colors
      svgBackground: 'linear-gradient(135deg, #2C3E50 0%, #1a1a2e 100%)',
      innerCircle: '#2C3E5080',
      innerCircleStroke: '#5A7BA880',
      
      // Text colors
      primaryText: '#f0f0f0',
      secondaryText: '#B0B0B0',
      tertiaryText: '#888888',
      accentText: '#D4AF37',
      
      // Ring colors
      ringStroke: '#6B5B4580',
      
      // Control panel
      buttonBackground: 'rgba(212, 175, 55, 0.2)',
      buttonBackgroundActive: 'rgba(212, 175, 55, 0.4)',
      buttonBorder: '#D4AF37',
      buttonText: '#D4AF37',
      
      // Input fields
      inputBackground: 'rgba(255, 255, 255, 0.1)',
      inputBorder: 'rgba(212, 175, 55, 0.3)',
      inputText: '#f0f0f0',
    },
light: {
  // Background colors
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  cardBackground: 'rgba(255, 255, 255, 0.9)',
  
  // SVG/Clock colors
  svgBackground: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  innerCircle: 'rgba(240, 240, 240, 0.6)',
  innerCircleStroke: 'rgba(100, 100, 100, 0.4)',
  
  // Text colors - HIGH CONTRAST
  primaryText: '#000000',           // Pure black for time & main text
  secondaryText: '#1a1a1a',         // Almost black for date & tithi
  tertiaryText: '#2c3e50',          // Dark blue-grey for vara & paksha
  accentText: '#b8860b',            // Dark gold for Nakshatra (DarkGoldenrod)
  
  // Ring colors
  ringStroke: 'rgba(100, 100, 100, 0.5)',
  
  // Control panel
  buttonBackground: 'rgba(212, 175, 55, 0.2)',
  buttonBackgroundActive: 'rgba(212, 175, 55, 0.4)',
  buttonBorder: '#b8860b',
  buttonText: '#856404',            // Very dark gold
  
  // Input fields
  inputBackground: 'rgba(0, 0, 0, 0.08)',
  inputBorder: 'rgba(184, 134, 11, 0.5)',
  inputText: '#000000',
}
  };

  // Current theme colors based on the selected theme
  const currentTheme = themes[theme];

  // Provide theme data and toggle function to all child components
  const value = {
    theme, // 'light' or 'dark'
    toggleTheme, // function to switch themes
    colors: currentTheme, // all color values for current theme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};