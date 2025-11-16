import React from 'react';
import { useTheme } from './ThemeContext';

/**
 * ThemeToggle Component
 * A beautiful button that switches between light and dark themes
 * Shows sun icon for light mode, moon icon for dark mode
 */
function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        // Position in top-right corner
        position: 'fixed',
        top: '20px',
        right: '20px',
        
        // Size and shape
        width: '50px',
        height: '50px',
        borderRadius: '50%', // Makes it circular
        
        // Colors
        background: colors.buttonBackground,
        border: `2px solid ${colors.buttonBorder}`,
        color: colors.buttonText,
        
        // Center the icon
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
        // Cursor and interaction
        cursor: 'pointer',
        
        // Shadow for depth
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        
        // Smooth transitions
        transition: 'all 0.3s ease',
        
        // Remove default button outline
        outline: 'none',
        
        // Make it appear above other elements
        zIndex: 1000,
      }}
      // Change appearance on hover
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.background = colors.buttonBackgroundActive;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = colors.buttonBackground;
      }}
      // Accessibility: describe what the button does
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Show sun icon for light mode, moon for dark mode */}
      <span style={{ fontSize: '24px' }}>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}

export default ThemeToggle;