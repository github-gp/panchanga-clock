import React from 'react';
import PanchangaClock from './components/Clock/PanchangaClock';
import ThemeToggle from './ThemeToggle';
// ⭐ NEW: Import ThemeProvider
import { ThemeProvider } from './ThemeContext';

/**
 * Main App Component
 * This is the root of your application
 */
function App() {
  return (
    // ⭐ NEW: Wrap everything with ThemeProvider
    // This makes theme available to all components
    <ThemeProvider>
      {/* Theme toggle button - floats in top-right */}
      <ThemeToggle />
      
      {/* Your main clock component */}
      <PanchangaClock />
    </ThemeProvider>
  );
}

export default App;
