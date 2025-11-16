import React from 'react';
import { useTheme } from '../../ThemeContext';

/**
 * ClockSideButtons Component
 * Previous/Next day buttons on the sides of the clock
 */
function ClockSideButtons({ onPreviousDay, onNextDay }) {
  const { colors } = useTheme();

  const buttonBaseStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '16px',
    background: colors.buttonBackground,
    color: colors.buttonText,
    border: `2px solid ${colors.buttonBorder}`,
    borderRadius: '50%',
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 10,
  };

  return (
    <>
      {/* Previous Day Button - Left Side */}
      <button
        onClick={onPreviousDay}
        style={{
          ...buttonBaseStyle,
          left: '-28px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = colors.buttonBackgroundActive;
          e.currentTarget.style.transform = 'translateY(-50%) translateX(-4px) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = colors.buttonBackground;
          e.currentTarget.style.transform = 'translateY(-50%) translateX(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        title="Previous Day (← arrow key)"
        aria-label="Go to previous day"
      >
        ◀
      </button>

      {/* Next Day Button - Right Side */}
      <button
        onClick={onNextDay}
        style={{
          ...buttonBaseStyle,
          right: '-28px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = colors.buttonBackgroundActive;
          e.currentTarget.style.transform = 'translateY(-50%) translateX(4px) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = colors.buttonBackground;
          e.currentTarget.style.transform = 'translateY(-50%) translateX(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        title="Next Day (→ arrow key)"
        aria-label="Go to next day"
      >
        ▶
      </button>
    </>
  );
}

export default ClockSideButtons;