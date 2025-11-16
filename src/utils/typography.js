// Typography System for Panchanga Clock
// This file defines all font sizes, weights, and spacing for consistency

/**
 * Font Sizes
 * Based on a modular scale for visual harmony
 */
export const FONT_SIZES = {
  // Hero/Display text
  display: {
    desktop: '32px',
    mobile: '24px'
  },
  
  // Time display (main clock)
  time: {
    desktop: '36px',
    tablet: '32px',
    mobile: '28px'
  },
  
  // Date display
  date: {
    desktop: '11px',
    mobile: '10px'
  },
  
  // Panchanga elements in center
  nakshatra: {
    desktop: '13px',
    mobile: '11px'
  },
  tithi: {
    desktop: '10px',
    mobile: '9px'
  },
  vara: {
    desktop: '9px',
    mobile: '8px'
  },
  paksha: {
    desktop: '8px',
    mobile: '7px'
  },
  
  // Ring text
  ringText: {
    nakshatra: '8px',
    rashi: {
      symbol: '24px',
      english: '11px',
      sanskrit: '9px'
    }
  },
  
  // UI Elements
  heading: {
    h1: '28px',
    h2: '22px',
    h3: '18px'
  },
  
  body: {
    large: '17px',
    regular: '14px',
    small: '12px',
    tiny: '10px'
  },
  
  button: {
    large: '16px',
    regular: '14px',
    small: '12px'
  }
};

/**
 * Font Weights
 * Semantic names for different weights
 */
export const FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800
};

/**
 * Line Heights
 * For better readability
 */
export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2
};

/**
 * Letter Spacing
 * For different text styles
 */
export const LETTER_SPACING = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
};

/**
 * Spacing Scale
 * Consistent spacing throughout the app
 */
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
  '6xl': '64px'
};

/**
 * Border Radius
 * For consistent rounded corners
 */
export const BORDER_RADIUS = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  full: '9999px',  // Perfect circle
  circle: '50%'     // Alternative circle
};

/**
 * Breakpoints
 * For responsive design
 */
export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
};

/**
 * Font Families
 * Available font options
 */
export const FONT_FAMILIES = {
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  mono: '"Courier New", Courier, monospace',
  
  // Modern web fonts (if you add them)
  inter: '"Inter", sans-serif',
  playfair: '"Playfair Display", serif',
  roboto: '"Roboto", sans-serif',
  opensans: '"Open Sans", sans-serif',
  
  // For Sanskrit/Devanagari (if needed)
  noto: '"Noto Sans Devanagari", sans-serif'
};

/**
 * Shadows
 * For depth and elevation
 */
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
  xl: '0 12px 24px rgba(0, 0, 0, 0.2)',
  '2xl': '0 20px 40px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
};

/**
 * Responsive Helper
 * Get font size based on screen width
 */
export const getResponsiveFontSize = (sizes, screenWidth) => {
  if (screenWidth < 768) {
    return sizes.mobile || sizes.desktop;
  } else if (screenWidth < 1024) {
    return sizes.tablet || sizes.desktop;
  }
  return sizes.desktop;
};

/**
 * Typography Helper
 * Create consistent text styles
 */
export const createTextStyle = ({
  size = FONT_SIZES.body.regular,
  weight = FONT_WEIGHTS.regular,
  lineHeight = LINE_HEIGHTS.normal,
  letterSpacing = LETTER_SPACING.normal,
  fontFamily = FONT_FAMILIES.system
} = {}) => ({
  fontSize: size,
  fontWeight: weight,
  lineHeight: lineHeight,
  letterSpacing: letterSpacing,
  fontFamily: fontFamily
});

/**
 * Heading Styles
 * Pre-configured heading styles
 */
export const HEADING_STYLES = {
  h1: createTextStyle({
    size: FONT_SIZES.heading.h1,
    weight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.tight
  }),
  h2: createTextStyle({
    size: FONT_SIZES.heading.h2,
    weight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.normal
  }),
  h3: createTextStyle({
    size: FONT_SIZES.heading.h3,
    weight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.normal,
    letterSpacing: LETTER_SPACING.wide
  })
};

/**
 * Body Text Styles
 * Pre-configured body text styles
 */
export const BODY_STYLES = {
  large: createTextStyle({
    size: FONT_SIZES.body.large,
    weight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.relaxed
  }),
  regular: createTextStyle({
    size: FONT_SIZES.body.regular,
    weight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal
  }),
  small: createTextStyle({
    size: FONT_SIZES.body.small,
    weight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal
  }),
  tiny: createTextStyle({
    size: FONT_SIZES.body.tiny,
    weight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.tight
  })
};

/**
 * Responsive Container Styles
 * For consistent container sizing
 */
export const CONTAINER_STYLES = {
  full: {
    maxWidth: '100%',
    padding: SPACING.lg
  },
  narrow: {
    maxWidth: '600px',
    padding: SPACING.lg,
    margin: '0 auto'
  },
  standard: {
    maxWidth: '1200px',
    padding: SPACING.xl,
    margin: '0 auto'
  },
  wide: {
    maxWidth: '1400px',
    padding: SPACING['2xl'],
    margin: '0 auto'
  }
};