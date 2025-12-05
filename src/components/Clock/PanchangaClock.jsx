import React, { useState, useEffect } from 'react';
import NakshatraRing from './NakshatraRing';
import RashiRing from './RashiRing';
import CelestialBodies from './CelestialBodies';
import PanchangaInfo from './PanchangaInfo';
import HousesRing from './HousesRing';
import KPSubLordRing from './KPSubLordRing';
import ControlPanel from './ControlPanel';
import DateNavigation from './DateNavigation';
import ClockSideButtons from './ClockSideButtons';
import MuhurtaTimeline from './MuhurtaTimeline';
import LocationPicker from './LocationPicker';
import EventTracker from './EventTracker';
import { getPanchangaData } from '../../services/astronomyService';
import { calculateAscendant, DEFAULT_LOCATION } from '../../services/houseCalculations';
import { useTheme } from '../../ThemeContext';


function PanchangaClock() {
  const { colors } = useTheme();

  // State for selected date and time
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State to store Panchanga data
  const [panchangaData, setPanchangaData] = useState(null);

  // State for Houses and KP Sub-Lords
  const [showHouses, setShowHouses] = useState(false);
  const [showKPSubLords, setShowKPSubLords] = useState(false);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [ascendant, setAscendant] = useState(null);

  // Calculate Panchanga for the selected date and time
  useEffect(() => {
    const calculatePanchanga = () => {
      try {
        const data = getPanchangaData(selectedDate);
        setPanchangaData(data);

        const asc = calculateAscendant(
          selectedDate, 
          location.latitude, 
          location.longitude,
          data.sun.longitude
        );
        setAscendant(asc);
      } catch (error) {
        console.error('Error calculating Panchanga:', error);
      }
    };

    calculatePanchanga();
  }, [selectedDate, location]);

  // Handle date/time change
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // Handle location change
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  // Go to previous day
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  // Go to next day
  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPreviousDay();
      } else if (e.key === 'ArrowRight') {
        goToNextDay();
      } else if (e.key === 'Home') {
        setSelectedDate(new Date());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDate]);

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Check if viewing current moment
  const isNow = () => {
    const now = new Date();
    const diff = Math.abs(selectedDate - now);
    return diff < 60000; // Within 1 minute
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: colors.background,
      transition: 'background 0.3s ease',
    }}>
      <div style={{
        textAlign: 'center',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          marginBottom: '30px',
          color: colors.primaryText,
          transition: 'color 0.3s ease',
        }}>
          🕐 Panchanga Clock
        </h1>

        {/* Clock Container with Side Buttons */}
        <div style={{
          position: 'relative',
          background: colors.cardBackground,
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'background 0.3s ease',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
          {/* Previous/Next Day Buttons on Sides */}
          <ClockSideButtons 
            onPreviousDay={goToPreviousDay}
            onNextDay={goToNextDay}
          />

          {/* Main Clock SVG */}
          <svg 
            width="600" 
            height="600" 
            viewBox="0 0 600 600"
            style={{
              background: colors.svgBackground,
              borderRadius: '50%',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
              transition: 'background 0.3s ease',
              maxWidth: '100%',
              height: 'auto',
            }}
          >
            <g transform="translate(300, 300)">

              <KPSubLordRing 
                showKPSubLords={showKPSubLords} 
                planets={panchangaData?.planets}
              />

              <NakshatraRing 
                currentMoonLongitude={panchangaData?.moon.longitude}
              />

              <RashiRing currentMoonLongitude={panchangaData?.moon.longitude} />

              <circle cx="0" cy="0" r="280" fill="none" stroke={colors.ringStroke} strokeWidth="2" />

              <HousesRing 
                ascendantDegree={ascendant?.degree} 
                showHouses={showHouses}
              />

              <circle 
                cx="0" 
                cy="0" 
                r="130" 
                fill={colors.innerCircle} 
                stroke={colors.innerCircleStroke} 
                strokeWidth="2" 
              />

              {panchangaData && panchangaData.planets && (
                <CelestialBodies planets={panchangaData.planets} />
              )}

              <g>
                <text
                  x="0"
                  y="-35"
                  textAnchor="middle"
                  fontSize="28"
                  fill={colors.primaryText}
                  fontWeight="bold"
                >
                  {formatTime(selectedDate)}
                </text>

                <text
                  x="0"
                  y="-15"
                  textAnchor="middle"
                  fontSize="10"
                  fill={colors.secondaryText}
                >
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </text>

                {!isNow() && (
                  <text
                    x="0"
                    y="-3"
                    textAnchor="middle"
                    fontSize="7"
                    fill={colors.accentText}
                    fontWeight="bold"
                  >
                    {selectedDate < new Date() ? '(Past)' : '(Future)'}
                  </text>
                )}

                <line
                  x1="-50"
                  y1="-5"
                  x2="50"
                  y2="-5"
                  stroke={colors.accentText}
                  strokeWidth="0.5"
                  opacity="0.5"
                />

                {panchangaData && (
                  <>
                    <text x="0" y="10" textAnchor="middle" fontSize="11" fill={colors.accentText} fontWeight="bold">
                      {panchangaData.moon.nakshatra}
                    </text>
                    <text x="0" y="25" textAnchor="middle" fontSize="9" fill={colors.secondaryText}>
                      {panchangaData.tithi.name}
                    </text>
                    <text x="0" y="38" textAnchor="middle" fontSize="8" fill={colors.tertiaryText}>
                      {panchangaData.vara.sanskrit}
                    </text>
                    <text x="0" y="56" textAnchor="middle" fontSize="18">
                      {panchangaData.moonPhase.phaseEmoji}
                    </text>
                    <text x="0" y="70" textAnchor="middle" fontSize="7" fill={colors.tertiaryText}>
                      {panchangaData.tithi.paksha} Paksha
                    </text>
                    <text x="0" y="82" textAnchor="middle" fontSize="7" fill={colors.tertiaryText}>
                      ☉ {panchangaData.sun.sign} • 🌙 {panchangaData.moon.sign}
                    </text>
                  </>
                )}
              </g>

            </g>
          </svg>
        </div>

        {/* Date and Time Navigation */}
        <DateNavigation 
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

        {/* Enhanced Location Picker */}
        <LocationPicker
          location={location}
          onLocationChange={handleLocationChange}
        />

        {/* Control Panel */}
        <ControlPanel
          showHouses={showHouses}
          setShowHouses={setShowHouses}
          showKPSubLords={showKPSubLords}
          setShowKPSubLords={setShowKPSubLords}
          location={location}
          setLocation={setLocation}
        />

        {/* Panchanga Details */}
        {panchangaData && (
          <PanchangaInfo panchangaData={panchangaData} />
        )}

        {/* EVENT TRACKER - POSITIONED HERE, JUST ABOVE MUHURTA TIMELINE */}
        {panchangaData && (
          <EventTracker 
            panchangaData={panchangaData} 
            selectedDate={selectedDate}
          />
        )}

        {/* Muhurta Timeline - AT THE BOTTOM */}
        <MuhurtaTimeline 
          selectedDate={selectedDate}
          location={location}
        />

        {/* Status text */}
        <p style={{ 
          marginTop: '20px', 
          marginBottom: '40px',
          color: colors.tertiaryText,
          fontSize: '14px',
          transition: 'color 0.3s ease',
        }}>
          Event Tracker with Full Planet Data! 🎉
        </p>
      </div>
    </div>
  );
}

export default PanchangaClock;
