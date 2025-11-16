// Responsive Design Utilities
// Helper functions for making the app mobile-friendly

import { BREAKPOINTS, FONT_SIZES } from './typography';

/**
 * Detect current screen size
 */
export const getScreenSize = () => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Get responsive value based on screen size
 * Usage: getResponsiveValue({ mobile: '16px', tablet: '20px', desktop: '24px' })
 */
export const getResponsiveValue = (values) => {
  const screenSize = getScreenSize();
  return values[screenSize] || values.desktop || values.mobile;
};

/**
 * Media query strings for CSS-in-JS
 */
export const mediaQueries = {
  mobile: `@media (max-width: ${BREAKPOINTS.tablet})`,
  tablet: `@media (min-width: ${BREAKPOINTS.tablet}) and (max-width: ${BREAKPOINTS.desktop})`,
  desktop: `@media (min-width: ${BREAKPOINTS.desktop})`,
  
  // Specific use cases
  smallScreen: `@media (max-width: 640px)`,
  mediumScreen: `@media (min-width: 641px) and (max-width: 1023px)`,
  largeScreen: `@media (min-width: 1024px)`,
};

/**
 * Responsive styles for clock container
 */
export const getClockContainerStyles = (colors) => {
  const screenSize = getScreenSize();
  
  const baseStyles = {
    background: colors.cardBackground,
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    margin: '0 auto',
  };
  
  if (screenSize === 'mobile') {
    return {
      ...baseStyles,
      padding: '20px',
      maxWidth: '100%',
    };
  }
  
  if (screenSize === 'tablet') {
    return {
      ...baseStyles,
      padding: '30px',
      maxWidth: '600px',
    };
  }
  
  return {
    ...baseStyles,
    padding: '40px',
    maxWidth: '700px',
  };
};

/**
 * Responsive SVG dimensions
 */
export const getSVGDimensions = () => {
  const screenSize = getScreenSize();
  
  if (screenSize === 'mobile') {
    return {
      width: '100%',
      height: '100%',
      viewBox: '0 0 600 600',
      maxWidth: '350px',
      maxHeight: '350px',
    };
  }
  
  if (screenSize === 'tablet') {
    return {
      width: '100%',
      height: '100%',
      viewBox: '0 0 600 600',
      maxWidth: '500px',
      maxHeight: '500px',
    };
  }
  
  return {
    width: '100%',
    height: '100%',
    viewBox: '0 0 600 600',
    maxWidth: '600px',
    maxHeight: '600px',
  };
};

/**
 * Responsive font sizes for clock center
 */
export const getClockFontSizes = () => {
  const screenSize = getScreenSize();
  
  if (screenSize === 'mobile') {
    return {
      time: '28px',
      date: '9px',
      nakshatra: '10px',
      tithi: '8px',
      vara: '7px',
      paksha: '6px',
    };
  }
  
  if (screenSize === 'tablet') {
    return {
      time: '32px',
      date: '10px',
      nakshatra: '11px',
      tithi: '9px',
      vara: '8px',
      paksha: '7px',
    };
  }
  
  return {
    time: '36px',
    date: '11px',
    nakshatra: '13px',
    tithi: '10px',
    vara: '9px',
    paksha: '8px',
  };
};

/**
 * Responsive padding for main container
 */
export const getContainerPadding = () => {
  const screenSize = getScreenSize();
  
  if (screenSize === 'mobile') {
    return '16px 12px';
  }
  
  if (screenSize === 'tablet') {
    return '20px 16px';
  }
  
  return '24px 20px';
};

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  return getScreenSize() === 'mobile';
};

/**
 * Check if device is tablet
 */
export const isTablet = () => {
  return getScreenSize() === 'tablet';
};

/**
 * Check if device is desktop
 */
export const isDesktop = () => {
  return getScreenSize() === 'desktop';
};

/**
 * Get touch-friendly button size
 */
export const getTouchButtonSize = () => {
  const screenSize = getScreenSize();
  
  if (screenSize === 'mobile') {
    return {
      padding: '14px 20px',
      fontSize: '14px',
      minWidth: '120px',
      minHeight: '44px', // Apple's recommended touch target
    };
  }
  
  return {
    padding: '12px 24px',
    fontSize: '14px',
    minWidth: '150px',
    minHeight: '40px',
  };
};

/**
 * Responsive grid columns
 */
export const getGridColumns = (itemsCount) => {
  const screenSize = getScreenSize();
  
  if (screenSize === 'mobile') {
    return itemsCount <= 2 ? itemsCount : 2; // Max 2 columns on mobile
  }
  
  if (screenSize === 'tablet') {
    return Math.min(itemsCount, 3); // Max 3 columns on tablet
  }
  
  return Math.min(itemsCount, 4); // Max 4 columns on desktop
};

/**
 * Hook to get current screen size (for React components)
 * Usage: const screenSize = useScreenSize();
 */
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = React.useState(getScreenSize());
  
  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return screenSize;
};

/**
 * Get orientation (portrait/landscape)
 */
export const getOrientation = () => {
  if (typeof window === 'undefined') return 'portrait';
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

/**
 * Responsive spacing multiplier
 * Returns a multiplier based on screen size
 */
export const getSpacingMultiplier = () => {
  const screenSize = getScreenSize();
  
  if (screenSize === 'mobile') return 0.75;
  if (screenSize === 'tablet') return 0.875;
  return 1;
};

/**
 * Calculate responsive value with multiplier
 */
export const scaleValue = (baseValue) => {
  const multiplier = getSpacingMultiplier();
  const numericValue = parseInt(baseValue);
  const unit = baseValue.replace(numericValue, '');
  
  return `${Math.round(numericValue * multiplier)}${unit}`;
};

export default {
  getScreenSize,
  getResponsiveValue,
  getClockContainerStyles,
  getSVGDimensions,
  getClockFontSizes,
  getContainerPadding,
  isMobile,
  isTablet,
  isDesktop,
  getTouchButtonSize,
  getGridColumns,
  useScreenSize,
  getOrientation,
  getSpacingMultiplier,
  scaleValue,
  mediaQueries
};