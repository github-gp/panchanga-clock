import React from 'react';
// ⭐ NEW: Import theme hook
import { useTheme } from '../../ThemeContext';

function ControlPanel({ 
  showHouses, 
  setShowHouses, 
  showKPSubLords, 
  setShowKPSubLords,
  location,
  setLocation 
}) {
  // ⭐ NEW: Get theme colors
  const { colors } = useTheme();

  return (
    <div style={{
      marginTop: '20px',
      padding: '20px',
      // ⭐ CHANGED: Use theme card background
      background: colors.cardBackground,
      borderRadius: '15px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      maxWidth: '600px',
      margin: '20px auto',
      // ⭐ NEW: Add smooth transition
      transition: 'background 0.3s ease',
    }}>
      <h3 style={{
        fontSize: '18px',
        // ⭐ CHANGED: Use theme accent color
        color: colors.accentText,
        marginBottom: '10px',
        textAlign: 'center',
        transition: 'color 0.3s ease',
      }}>
        ⚙️ Display Options
      </h3>
      
      {/* Toggle Buttons Row */}
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Houses Toggle */}
        <button
          onClick={() => setShowHouses(!showHouses)}
          style={{
            padding: '12px 24px',
            // ⭐ CHANGED: Use theme button colors
            background: showHouses 
              ? colors.buttonBackgroundActive 
              : colors.buttonBackground,
            color: colors.buttonText,
            border: `2px solid ${colors.buttonBorder}`,
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '150px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.buttonBackgroundActive;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = showHouses 
              ? colors.buttonBackgroundActive 
              : colors.buttonBackground;
          }}
        >
          {showHouses ? '✓' : '○'} Houses (Bhava)
        </button>
        
        {/* KP Sub-Lords Toggle */}
        <button
          onClick={() => setShowKPSubLords(!showKPSubLords)}
          style={{
            padding: '12px 24px',
            // ⭐ CHANGED: Use theme button colors
            background: showKPSubLords 
              ? colors.buttonBackgroundActive 
              : colors.buttonBackground,
            color: colors.buttonText,
            border: `2px solid ${colors.buttonBorder}`,
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '150px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.buttonBackgroundActive;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = showKPSubLords 
              ? colors.buttonBackgroundActive 
              : colors.buttonBackground;
          }}
        >
          {showKPSubLords ? '✓' : '○'} KP Sub-Lords
        </button>
      </div>
      
      {/* Location Info */}
      <div style={{
        textAlign: 'center',
        padding: '10px',
        // ⭐ CHANGED: Use theme input background
        background: colors.inputBackground,
        borderRadius: '8px',
        fontSize: '12px',
        // ⭐ CHANGED: Use theme secondary text
        color: colors.secondaryText,
        transition: 'all 0.3s ease',
      }}>
        📍 Location: {location.city} ({location.latitude.toFixed(2)}°N, {location.longitude.toFixed(2)}°E)
        <br />
        <span style={{ 
          fontSize: '10px', 
          // ⭐ CHANGED: Use theme tertiary text
          color: colors.tertiaryText
        }}>
          Ascendant calculated for current time and location
        </span>
      </div>
      
      {/* Legend */}
      {showHouses && (
        <div style={{
          fontSize: '11px',
          // ⭐ CHANGED: Use theme tertiary text
          color: colors.tertiaryText,
          textAlign: 'center',
          padding: '8px',
          // ⭐ CHANGED: Use theme button background
          background: colors.buttonBackground,
          borderRadius: '6px',
          transition: 'all 0.3s ease',
        }}>
          🏠 House 1 (ASC) = Lagna/Ascendant at Eastern Horizon
        </div>
      )}
      
      {showKPSubLords && (
        <div style={{
          fontSize: '11px',
          // ⭐ CHANGED: Use theme tertiary text
          color: colors.tertiaryText,
          textAlign: 'center',
          padding: '8px',
          // ⭐ CHANGED: Use theme button background
          background: colors.buttonBackground,
          borderRadius: '6px',
          transition: 'all 0.3s ease',
        }}>
          📊 KP: 249 divisions, each Nakshatra divided by 9 sub-lords
        </div>
      )}
    </div>
  );
}

export default ControlPanel;