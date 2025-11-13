/**
 * Calculate Ascendant (Lagna) based on Sun position
 * For accurate birth charts, use Swiss Ephemeris
 * This uses Sun position as a proxy for simplified demonstration
 */
export function calculateAscendant(date, latitude, longitude, sunLongitude) {
  // If we have the actual sun longitude from astronomyService, use it
  // This ensures consistency with the chart
  
  if (sunLongitude !== undefined) {
    // Use the actual Sun position as reference
    // Ascendant rises approximately 30 degrees every 2 hours
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalHours = hours + minutes / 60;
    
    // Simple approximation: 
    // Ascendant moves ~15° per hour (360° in 24 hours)
    // Starting from Sun position, offset by time of day
    
    // At noon (12:00), Ascendant ≈ Sun + 90°
    // At midnight (00:00), Ascendant ≈ Sun - 90°
    // Linear interpolation
    
    const hoursFromNoon = totalHours - 12;
    const timeOffset = hoursFromNoon * 15; // 15° per hour
    
    // Adjust for latitude (simplified)
    const latitudeAdjustment = latitude * 0.3;
    
    let ascendantDegree = (sunLongitude + 90 + timeOffset + latitudeAdjustment) % 360;
    
    if (ascendantDegree < 0) ascendantDegree += 360;
    
    return {
      degree: ascendantDegree,
      sign: getRashiFromDegree(ascendantDegree),
      house1Start: ascendantDegree
    };
  }
  
  // Fallback: use time-based calculation
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalHours = hours + minutes / 60;
  
  // Approximate: Earth rotates 360° in 24 hours = 15° per hour
  const localSiderealTime = (totalHours * 15 + longitude) % 360;
  
  // Adjust for latitude
  const ascendantDegree = (localSiderealTime + (latitude * 0.5)) % 360;
  
  return {
    degree: ascendantDegree,
    sign: getRashiFromDegree(ascendantDegree),
    house1Start: ascendantDegree
  };
}

/**
 * Calculate all 12 house cusps (starting points)
 * Using Equal House system (each house = 30°)
 */
export function calculateHouseCusps(ascendantDegree) {
  const houses = [];
  
  for (let i = 0; i < 12; i++) {
    const cuspDegree = (ascendantDegree + (i * 30)) % 360;
    houses.push({
      houseNumber: i + 1,
      cuspDegree: cuspDegree,
      sign: getRashiFromDegree(cuspDegree),
      startDegree: cuspDegree,
      endDegree: (cuspDegree + 30) % 360
    });
  }
  
  return houses;
}

/**
 * Get Rashi (sign) from degree
 */
function getRashiFromDegree(degree) {
  const rashis = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const index = Math.floor(degree / 30);
  return rashis[index];
}

/**
 * Default location - can be updated by user
 */
export const DEFAULT_LOCATION = {
  latitude: 28.6139,   // Delhi, India
  longitude: 77.2090,
  city: 'Delhi'
};
