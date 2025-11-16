import React, { useState } from 'react';
import { useTheme } from '../../ThemeContext';

/**
 * LocationPicker Component
 * Enhanced location selection with search, GPS, and favorites
 */

// Popular cities in India for quick access
const POPULAR_CITIES = [
  { name: 'Delhi', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata' },
  { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
  { name: 'Bangalore', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata' },
  { name: 'Kolkata', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata' },
  { name: 'Chennai', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata' },
  { name: 'Hyderabad', latitude: 17.3850, longitude: 78.4867, timezone: 'Asia/Kolkata' },
  { name: 'Pune', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata' },
  { name: 'Ahmedabad', latitude: 23.0225, longitude: 72.5714, timezone: 'Asia/Kolkata' },
  { name: 'Jaipur', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata' },
  { name: 'Varanasi', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata' },
];

function LocationPicker({ location, onLocationChange }) {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [customLat, setCustomLat] = useState('');
  const [customLng, setCustomLng] = useState('');

  // Filter cities based on search
  const filteredCities = POPULAR_CITIES.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle city selection
  const handleCitySelect = (city) => {
    onLocationChange(city);
    setIsExpanded(false);
    setSearchQuery('');
  };

  // Get current GPS location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          city: 'Current Location',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timezone: 'Asia/Kolkata' // Default
        };
        onLocationChange(newLocation);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please check permissions.');
        setIsGettingLocation(false);
      }
    );
  };

  // Handle custom coordinates
  const handleCustomLocation = () => {
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    
    if (isNaN(lat) || isNaN(lng)) {
      alert('Please enter valid coordinates');
      return;
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      alert('Invalid coordinates. Lat: -90 to 90, Lng: -180 to 180');
      return;
    }

    const newLocation = {
      city: 'Custom Location',
      latitude: lat,
      longitude: lng,
      timezone: 'Asia/Kolkata'
    };
    
    onLocationChange(newLocation);
    setCustomLat('');
    setCustomLng('');
    setIsExpanded(false);
  };

  return (
    <div style={{
      marginTop: '20px',
      padding: '20px',
      background: colors.cardBackground,
      borderRadius: '15px',
      maxWidth: '700px',
      margin: '20px auto',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    }}>
      {/* Header with Current Location */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '10px',
          borderRadius: '10px',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = colors.inputBackground;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <div>
          <div style={{
            fontSize: '13px',
            color: colors.tertiaryText,
            marginBottom: '4px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            📍 Location
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            color: colors.primaryText,
          }}>
            {location.city}
          </div>
          <div style={{
            fontSize: '12px',
            color: colors.secondaryText,
            marginTop: '2px',
          }}>
            {location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E
          </div>
        </div>
        <div style={{
          fontSize: '24px',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
        }}>
          ▼
        </div>
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: `1px solid ${colors.inputBorder}`,
        }}>
          {/* GPS Button */}
          <button
            onClick={handleGetCurrentLocation}
            disabled={isGettingLocation}
            style={{
              width: '100%',
              padding: '14px',
              background: colors.accentText,
              color: colors.svgBackground,
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isGettingLocation ? 'not-allowed' : 'pointer',
              marginBottom: '16px',
              transition: 'all 0.2s ease',
              opacity: isGettingLocation ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isGettingLocation) {
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isGettingLocation ? '🔄 Getting Location...' : '📡 Use Current GPS Location'}
          </button>

          {/* Search Box */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="🔍 Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '14px',
                background: colors.inputBackground,
                color: colors.inputText,
                border: `2px solid ${colors.inputBorder}`,
                borderRadius: '10px',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.accentText;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.buttonBackground}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.inputBorder;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* City List */}
          <div style={{
            maxHeight: '200px',
            overflowY: 'auto',
            marginBottom: '16px',
            border: `1px solid ${colors.inputBorder}`,
            borderRadius: '10px',
            background: colors.inputBackground,
          }}>
            {filteredCities.map((city, index) => (
              <div
                key={index}
                onClick={() => handleCitySelect(city)}
                style={{
                  padding: '12px 14px',
                  cursor: 'pointer',
                  borderBottom: index < filteredCities.length - 1 ? `1px solid ${colors.inputBorder}` : 'none',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.buttonBackground;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.primaryText,
                  marginBottom: '2px',
                }}>
                  {city.name}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: colors.tertiaryText,
                }}>
                  {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E
                </div>
              </div>
            ))}
            {filteredCities.length === 0 && (
              <div style={{
                padding: '20px',
                textAlign: 'center',
                color: colors.tertiaryText,
                fontSize: '13px',
              }}>
                No cities found
              </div>
            )}
          </div>

          {/* Custom Coordinates */}
          <div style={{
            padding: '16px',
            background: colors.inputBackground,
            borderRadius: '10px',
            border: `1px solid ${colors.inputBorder}`,
          }}>
            <div style={{
              fontSize: '13px',
              color: colors.tertiaryText,
              marginBottom: '10px',
              fontWeight: 500,
            }}>
              🎯 Enter Custom Coordinates
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '10px',
            }}>
              <input
                type="number"
                placeholder="Latitude"
                value={customLat}
                onChange={(e) => setCustomLat(e.target.value)}
                step="0.0001"
                style={{
                  padding: '10px',
                  fontSize: '13px',
                  background: colors.cardBackground,
                  color: colors.inputText,
                  border: `1px solid ${colors.inputBorder}`,
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                }}
              />
              <input
                type="number"
                placeholder="Longitude"
                value={customLng}
                onChange={(e) => setCustomLng(e.target.value)}
                step="0.0001"
                style={{
                  padding: '10px',
                  fontSize: '13px',
                  background: colors.cardBackground,
                  color: colors.inputText,
                  border: `1px solid ${colors.inputBorder}`,
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <button
              onClick={handleCustomLocation}
              style={{
                width: '100%',
                padding: '10px',
                background: colors.buttonBackground,
                color: colors.buttonText,
                border: `2px solid ${colors.buttonBorder}`,
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.buttonBackgroundActive;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.buttonBackground;
              }}
            >
              Set Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationPicker;