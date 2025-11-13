import React from 'react';

function ControlPanel({ 
  showHouses, 
  setShowHouses, 
  showKPSubLords, 
  setShowKPSubLords,
  location,
  setLocation 
}) {
  return (
    <div style={{
      marginTop: '20px',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '15px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      maxWidth: '600px',
      margin: '20px auto'
    }}>
      <h3 style={{
        fontSize: '18px',
        color: '#D4AF37',
        marginBottom: '10px',
        textAlign: 'center'
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
            background: showHouses ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
            color: showHouses ? '#000' : '#FFF',
            border: `2px solid ${showHouses ? '#FFD700' : '#666'}`,
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '150px'
          }}
        >
          {showHouses ? '✓' : '○'} Houses (Bhava)
        </button>
        
        {/* KP Sub-Lords Toggle */}
        <button
          onClick={() => setShowKPSubLords(!showKPSubLords)}
          style={{
            padding: '12px 24px',
            background: showKPSubLords ? '#4682B4' : 'rgba(255, 255, 255, 0.1)',
            color: '#FFF',
            border: `2px solid ${showKPSubLords ? '#4682B4' : '#666'}`,
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '150px'
          }}
        >
          {showKPSubLords ? '✓' : '○'} KP Sub-Lords
        </button>
      </div>
      
      {/* Location Info */}
      <div style={{
        textAlign: 'center',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#CCC'
      }}>
        📍 Location: {location.city} ({location.latitude.toFixed(2)}°N, {location.longitude.toFixed(2)}°E)
        <br />
        <span style={{ fontSize: '10px', opacity: 0.7 }}>
          Ascendant calculated for current time and location
        </span>
      </div>
      
      {/* Legend */}
      {showHouses && (
        <div style={{
          fontSize: '11px',
          color: '#999',
          textAlign: 'center',
          padding: '8px',
          background: 'rgba(255, 215, 0, 0.1)',
          borderRadius: '6px'
        }}>
          🏠 House 1 (ASC) = Lagna/Ascendant at Eastern Horizon
        </div>
      )}
      
      {showKPSubLords && (
        <div style={{
          fontSize: '11px',
          color: '#999',
          textAlign: 'center',
          padding: '8px',
          background: 'rgba(70, 130, 180, 0.1)',
          borderRadius: '6px'
        }}>
          📊 KP: 249 divisions, each Nakshatra divided by 9 sub-lords
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
