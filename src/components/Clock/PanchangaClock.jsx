import React, { useState, useEffect } from 'react';
import NakshatraRing from './NakshatraRing';
import RashiRing from './RashiRing';
import CelestialBodies from './CelestialBodies';
import PanchangaInfo from './PanchangaInfo';
import HousesRing from './HousesRing';
import KPSubLordRing from './KPSubLordRing';
import ControlPanel from './ControlPanel';
import { getPanchangaData } from '../../services/astronomyService';
import { calculateAscendant, calculateHouseCusps, DEFAULT_LOCATION } from '../../services/houseCalculations';

function PanchangaClock() {
  // State to store current time
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // State to store Panchanga data
  const [panchangaData, setPanchangaData] = useState(null);
  
  // State for Houses and KP Sub-Lords
  const [showHouses, setShowHouses] = useState(false);
  const [showKPSubLords, setShowKPSubLords] = useState(false);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [ascendant, setAscendant] = useState(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate Panchanga data and Ascendant when time changes
  useEffect(() => {
    const calculatePanchanga = () => {
      try {
        const data = getPanchangaData(currentTime);
        setPanchangaData(data);
        
        // Calculate ascendant
        // Calculate ascendant using Sun position for consistency
    const asc = calculateAscendant(
        currentTime, 
        location.latitude, 
        location.longitude,
        data.sun.longitude  // Pass Sun position
        );
      setAscendant(asc);
      } catch (error) {
        console.error('Error calculating Panchanga:', error);
      }
    };

    calculatePanchanga();

    // Recalculate every minute
    const panchangaTimer = setInterval(calculatePanchanga, 60000);

    return () => clearInterval(panchangaTimer);
  }, [currentTime, location]); // Add location dependency

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          marginBottom: '20px',
          color: '#f0f0f0'
        }}>
          🕐 Panchanga Clock
        </h1>
        
        {/* Main Clock SVG */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <svg 
            width="600" 
            height="600" 
            viewBox="0 0 600 600"
            style={{
              background: 'linear-gradient(135deg, #2C3E50 0%, #1a1a2e 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)'
            }}
          >
            <g transform="translate(300, 300)">
              
              {/* KP Sub-Lords Ring - Outermost */}
              <KPSubLordRing 
                 showKPSubLords={showKPSubLords} 
                planets={panchangaData?.planets}
              />
              
              {/* Nakshatra Ring - Outer */}
              <NakshatraRing 
              currentMoonLongitude={panchangaData?.moon.longitude}
              planets={panchangaData?.planets}
               />
              
              {/* Rashi Ring - Middle */}
              <RashiRing currentMoonLongitude={panchangaData?.moon.longitude} />
              
              {/* Decorative circles */}
              <circle cx="0" cy="0" r="280" fill="none" stroke="#6B5B4580" strokeWidth="2" />
              {/* Removed r=260 circle - it was cutting through Nakshatra sections */}
              
              {/* Houses Ring - on planet orbit */}
              <HousesRing 
                ascendantDegree={ascendant?.degree} 
                showHouses={showHouses}
              />
              
              {/* Inner sky circle - bigger for Panchanga info */}
              <circle cx="0" cy="0" r="130" fill="#2C3E5080" stroke="#5A7BA880" strokeWidth="2" />
              
              {/* Sun, Moon, and all planets */}   
              {panchangaData && panchangaData.planets && (
                <CelestialBodies planets={panchangaData.planets} />
              )}

              {/* Center area with time and mini Panchanga */}
              <g>
                {/* Time - larger */}
                <text
                  x="0"
                  y="-35"
                  textAnchor="middle"
                  fontSize="28"
                  fill="#F0F0F0"
                  fontWeight="bold"
                >
                  {formatTime(currentTime)}
                </text>

                {/* Date - below time */}
                <text
                  x="0"
                  y="-15"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#B0B0B0"
                >
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </text>

                {/* Divider line */}
                <line
                  x1="-50"
                  y1="-5"
                  x2="50"
                  y2="-5"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  opacity="0.5"
                />

                {/* Panchanga Info - Compact */}
                {panchangaData && (
                  <>
                    {/* Nakshatra */}
                    <text x="0" y="10" textAnchor="middle" fontSize="11" fill="#D4AF37" fontWeight="bold">
                      {panchangaData.moon.nakshatra}
                    </text>

                    {/* Tithi */}
                    <text x="0" y="25" textAnchor="middle" fontSize="9" fill="#CCCCCC">
                      {panchangaData.tithi.name}
                    </text>

                    {/* Vara (Day) */}
                    <text x="0" y="38" textAnchor="middle" fontSize="8" fill="#999999">
                      {panchangaData.vara.sanskrit}
                    </text>

                    {/* Moon Phase */}
                    <text x="0" y="56" textAnchor="middle" fontSize="18">
                      {panchangaData.moonPhase.phaseEmoji}
                    </text>

                    {/* Paksha */}
                    <text x="0" y="70" textAnchor="middle" fontSize="7" fill="#888888">
                      {panchangaData.tithi.paksha} Paksha
                    </text>

                    {/* Rashi info - compact */}
                    <text x="0" y="82" textAnchor="middle" fontSize="7" fill="#888888">
                      ☉ {panchangaData.sun.sign} • 🌙 {panchangaData.moon.sign}
                    </text>
                  </>
                )}
              </g>

            </g>
          </svg>
        </div>

        {/* Control Panel */}
        <ControlPanel
          showHouses={showHouses}
          setShowHouses={setShowHouses}
          showKPSubLords={showKPSubLords}
          setShowKPSubLords={setShowKPSubLords}
          location={location}
          setLocation={setLocation}
        />

        {/* Optional: Keep bottom panel for detailed info or remove it */}
        {/* Comment out if you want info only in center and control panel */}
        {panchangaData && (
          <PanchangaInfo panchangaData={panchangaData} />
        )}

        {/* Status text */}
        <p style={{ 
          marginTop: '20px', 
          color: '#888',
          fontSize: '14px'
        }}>
          Phase 6: Houses & KP Sub-Lords with Toggle Controls ✅
        </p>
      </div>
    </div>
  );
}

export default PanchangaClock;