import React from 'react';
// ⭐ NEW: Import theme hook
import { useTheme } from '../../ThemeContext';

function PanchangaInfo({ panchangaData }) {
  // ⭐ NEW: Get theme colors
  const { colors } = useTheme();

  if (!panchangaData) return null;

  const { sun, moon, moonPhase, tithi, vara } = panchangaData;

  return (
    <div style={{
      marginTop: '30px',
      padding: '25px',
      // ⭐ CHANGED: Use theme card background
      background: colors.cardBackground,
      borderRadius: '20px',
      maxWidth: '700px',
      margin: '30px auto 0',
      // ⭐ CHANGED: Use theme border
      border: `1px solid ${colors.buttonBorder}`,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
    }}>
      <h2 style={{
        fontSize: '22px',
        marginBottom: '25px',
        // ⭐ CHANGED: Use theme accent color
        color: colors.accentText,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: '1px',
        transition: 'color 0.3s ease',
      }}>
        📅 Panchanga Details
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        fontSize: '14px'
      }}>
        {/* Vara */}
        <div style={{
          padding: '18px',
          // ⭐ CHANGED: Use theme input background
          background: colors.inputBackground,
          borderRadius: '12px',
          // ⭐ CHANGED: Use theme border
          border: `1px solid ${colors.inputBorder}`,
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}>
          <div style={{ 
            // ⭐ CHANGED: Use theme accent color
            color: colors.accentText, 
            fontWeight: '600', 
            marginBottom: '8px', 
            fontSize: '13px',
            transition: 'color 0.3s ease',
          }}>
            📆 VARA
          </div>
          <div style={{ 
            // ⭐ CHANGED: Use theme primary text
            color: colors.primaryText, 
            fontSize: '17px', 
            fontWeight: '500',
            transition: 'color 0.3s ease',
          }}>
            {vara.sanskrit}
          </div>
          <div style={{ 
            // ⭐ CHANGED: Use theme tertiary text
            color: colors.tertiaryText, 
            fontSize: '12px', 
            marginTop: '5px',
            transition: 'color 0.3s ease',
          }}>
            {vara.name}
          </div>
        </div>

        {/* Tithi */}
        <div style={{
          padding: '18px',
          background: colors.inputBackground,
          borderRadius: '12px',
          border: `1px solid ${colors.inputBorder}`,
          transition: 'all 0.2s ease',
        }}>
          <div style={{ 
            color: colors.accentText, 
            fontWeight: '600', 
            marginBottom: '8px', 
            fontSize: '13px',
            transition: 'color 0.3s ease',
          }}>
            🌙 TITHI
          </div>
          <div style={{ 
            color: colors.primaryText, 
            fontSize: '17px', 
            fontWeight: '500',
            transition: 'color 0.3s ease',
          }}>
            {tithi.name}
          </div>
          <div style={{ 
            color: colors.tertiaryText, 
            fontSize: '12px', 
            marginTop: '5px',
            transition: 'color 0.3s ease',
          }}>
            {tithi.paksha} Paksha
          </div>
        </div>

        {/* Nakshatra */}
        <div style={{
          padding: '18px',
          background: colors.inputBackground,
          borderRadius: '12px',
          border: `1px solid ${colors.inputBorder}`,
          transition: 'all 0.2s ease',
        }}>
          <div style={{ 
            color: colors.accentText, 
            fontWeight: '600', 
            marginBottom: '8px', 
            fontSize: '13px',
            transition: 'color 0.3s ease',
          }}>
            ⭐ NAKSHATRA
          </div>
          <div style={{ 
            color: colors.primaryText, 
            fontSize: '17px', 
            fontWeight: '500',
            transition: 'color 0.3s ease',
          }}>
            {moon.nakshatra}
          </div>
          <div style={{ 
            color: colors.tertiaryText, 
            fontSize: '12px', 
            marginTop: '5px',
            transition: 'color 0.3s ease',
          }}>
            {moon.longitude.toFixed(1)}°
          </div>
        </div>

        {/* Moon Phase */}
        <div style={{
          padding: '18px',
          background: colors.inputBackground,
          borderRadius: '12px',
          border: `1px solid ${colors.inputBorder}`,
          transition: 'all 0.2s ease',
        }}>
          <div style={{ 
            color: colors.accentText, 
            fontWeight: '600', 
            marginBottom: '8px', 
            fontSize: '13px',
            transition: 'color 0.3s ease',
          }}>
            {moonPhase.phaseEmoji} MOON PHASE
          </div>
          <div style={{ 
            color: colors.primaryText, 
            fontSize: '17px', 
            fontWeight: '500',
            transition: 'color 0.3s ease',
          }}>
            {moonPhase.phaseName}
          </div>
          <div style={{ 
            color: colors.tertiaryText, 
            fontSize: '12px', 
            marginTop: '5px',
            transition: 'color 0.3s ease',
          }}>
            {moonPhase.illumination}% lit
          </div>
        </div>

        {/* Sun Position */}
        <div style={{
          padding: '18px',
          background: colors.inputBackground,
          borderRadius: '12px',
          border: `1px solid ${colors.inputBorder}`,
          transition: 'all 0.2s ease',
        }}>
          <div style={{ 
            color: colors.accentText, 
            fontWeight: '600', 
            marginBottom: '8px', 
            fontSize: '13px',
            transition: 'color 0.3s ease',
          }}>
            ☉ SUN RASHI
          </div>
          <div style={{ 
            color: colors.primaryText, 
            fontSize: '17px', 
            fontWeight: '500',
            transition: 'color 0.3s ease',
          }}>
            {sun.sign}
          </div>
          <div style={{ 
            color: colors.tertiaryText, 
            fontSize: '12px', 
            marginTop: '5px',
            transition: 'color 0.3s ease',
          }}>
            {sun.longitude.toFixed(1)}°
          </div>
        </div>

        {/* Moon Position */}
        <div style={{
          padding: '18px',
          background: colors.inputBackground,
          borderRadius: '12px',
          border: `1px solid ${colors.inputBorder}`,
          transition: 'all 0.2s ease',
        }}>
          <div style={{ 
            color: colors.accentText, 
            fontWeight: '600', 
            marginBottom: '8px', 
            fontSize: '13px',
            transition: 'color 0.3s ease',
          }}>
            🌙 MOON RASHI
          </div>
          <div style={{ 
            color: colors.primaryText, 
            fontSize: '17px', 
            fontWeight: '500',
            transition: 'color 0.3s ease',
          }}>
            {moon.sign}
          </div>
          <div style={{ 
            color: colors.tertiaryText, 
            fontSize: '12px', 
            marginTop: '5px',
            transition: 'color 0.3s ease',
          }}>
            {moon.longitude.toFixed(1)}°
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanchangaInfo;