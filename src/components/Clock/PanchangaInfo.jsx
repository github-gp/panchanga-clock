import React from 'react';

function PanchangaInfo({ panchangaData }) {
  if (!panchangaData) return null;

  const { sun, moon, moonPhase, tithi, vara } = panchangaData;

  return (
    <div style={{
      marginTop: '30px',
      padding: '25px',
      background: 'linear-gradient(135deg, rgba(44, 62, 80, 0.3) 0%, rgba(26, 26, 46, 0.3) 100%)',
      borderRadius: '20px',
      maxWidth: '700px',
      margin: '30px auto 0',
      border: '1px solid rgba(212, 175, 55, 0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <h2 style={{
        fontSize: '22px',
        marginBottom: '25px',
        color: '#D4AF37',
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: '1px'
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
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(212, 175, 55, 0.15)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}>
          <div style={{ color: '#D4AF37', fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>
            📆 VARA
          </div>
          <div style={{ color: '#F0F0F0', fontSize: '17px', fontWeight: '500' }}>
            {vara.sanskrit}
          </div>
          <div style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
            {vara.name}
          </div>
        </div>

        {/* Tithi */}
        <div style={{
          padding: '18px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(212, 175, 55, 0.15)'
        }}>
          <div style={{ color: '#D4AF37', fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>
            🌙 TITHI
          </div>
          <div style={{ color: '#F0F0F0', fontSize: '17px', fontWeight: '500' }}>
            {tithi.name}
          </div>
          <div style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
            {tithi.paksha} Paksha
          </div>
        </div>

        {/* Nakshatra */}
        <div style={{
          padding: '18px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(212, 175, 55, 0.15)'
        }}>
          <div style={{ color: '#D4AF37', fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>
            ⭐ NAKSHATRA
          </div>
          <div style={{ color: '#F0F0F0', fontSize: '17px', fontWeight: '500' }}>
            {moon.nakshatra}
          </div>
          <div style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
            {moon.longitude.toFixed(1)}°
          </div>
        </div>

        {/* Moon Phase */}
        <div style={{
          padding: '18px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(212, 175, 55, 0.15)'
        }}>
          <div style={{ color: '#D4AF37', fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>
            {moonPhase.phaseEmoji} MOON PHASE
          </div>
          <div style={{ color: '#F0F0F0', fontSize: '17px', fontWeight: '500' }}>
            {moonPhase.phaseName}
          </div>
          <div style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
            {moonPhase.illumination}% lit
          </div>
        </div>

        {/* Sun Position */}
        <div style={{
          padding: '18px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(212, 175, 55, 0.15)'
        }}>
          <div style={{ color: '#D4AF37', fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>
            ☉ SUN RASHI
          </div>
          <div style={{ color: '#F0F0F0', fontSize: '17px', fontWeight: '500' }}>
            {sun.sign}
          </div>
          <div style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
            {sun.longitude.toFixed(1)}°
          </div>
        </div>

        {/* Moon Position */}
        <div style={{
          padding: '18px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(212, 175, 55, 0.15)'
        }}>
          <div style={{ color: '#D4AF37', fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>
            🌙 MOON RASHI
          </div>
          <div style={{ color: '#F0F0F0', fontSize: '17px', fontWeight: '500' }}>
            {moon.sign}
          </div>
          <div style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
            {moon.longitude.toFixed(1)}°
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanchangaInfo;