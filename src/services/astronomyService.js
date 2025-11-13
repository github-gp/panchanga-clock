import * as Astronomy from 'astronomy-engine';

// Ayanamsa (precession correction) for Vedic/Sidereal zodiac
// This is the Lahiri Ayanamsa value - difference between Tropical and Sidereal
const AYANAMSA_BASE = 24.18; // As of 2000 CE
const AYANAMSA_RATE = 0.0000; // Degrees per year

/**
 * Calculate Ayanamsa (precession correction) for a given date
 * Converts Tropical longitude to Sidereal (Vedic) longitude
 */
export function getAyanamsa(date) {
  const year = date.getFullYear();
  const yearsSince2000 = year - 2000;
  const ayanamsa = AYANAMSA_BASE + (yearsSince2000 * AYANAMSA_RATE);
  return ayanamsa;
}

/**
 * Get Sun's position
 * Returns longitude in Sidereal (Vedic) zodiac (0-360°)
 */
export function getSunPosition(date) {
  try {
    const ecliptic = Astronomy.Ecliptic(Astronomy.GeoVector('Sun', date, false));
    const tropicalLongitude = ecliptic.elon;
    
    const ayanamsa = getAyanamsa(date);
    let siderealLongitude = tropicalLongitude - ayanamsa;
    
    if (siderealLongitude < 0) siderealLongitude += 360;
    if (siderealLongitude >= 360) siderealLongitude -= 360;
    
    console.log('Sun - Tropical:', tropicalLongitude, 'Sidereal:', siderealLongitude);
    
    return {
      longitude: siderealLongitude,
      sign: getRashiFromLongitude(siderealLongitude),
      nakshatra: getNakshatraFromLongitude(siderealLongitude)
    };
  } catch (error) {
    console.error('Error calculating Sun position:', error);
    return { longitude: 210, sign: 'Libra', nakshatra: 'Swati' };
  }
}
/**
 * Get Moon's position
 * Returns longitude in Sidereal (Vedic) zodiac (0-360°)
 */
export function getMoonPosition(date) {
  try {
    const ecliptic = Astronomy.Ecliptic(Astronomy.GeoVector('Moon', date, false));
    const tropicalLongitude = ecliptic.elon;
    
    const ayanamsa = getAyanamsa(date);
    let siderealLongitude = tropicalLongitude - ayanamsa;
    
    if (siderealLongitude < 0) siderealLongitude += 360;
    if (siderealLongitude >= 360) siderealLongitude -= 360;
    
    console.log('Moon - Tropical:', tropicalLongitude, 'Sidereal:', siderealLongitude);
    
    return {
      longitude: siderealLongitude,
      sign: getRashiFromLongitude(siderealLongitude),
      nakshatra: getNakshatraFromLongitude(siderealLongitude)
    };
  } catch (error) {
    console.error('Error calculating Moon position:', error);
    return { longitude: 135, sign: 'Leo', nakshatra: 'Purva Phalguni' };
  }
}

/**
 * Get positions of all planets
 */
export function getAllPlanetaryPositions(date) {
  const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
  const positions = {};
  
  try {
    // Get Sun and Moon (already have these functions)
    positions.Sun = getSunPosition(date);
    positions.Moon = getMoonPosition(date);
    
    // Get other planets
    planets.forEach(planet => {
      try {
        const ecliptic = Astronomy.Ecliptic(Astronomy.GeoVector(planet, date, false));
        const tropicalLongitude = ecliptic.elon;
        
        const ayanamsa = getAyanamsa(date);
        let siderealLongitude = tropicalLongitude - ayanamsa;
        
        if (siderealLongitude < 0) siderealLongitude += 360;
        if (siderealLongitude >= 360) siderealLongitude -= 360;
        
        positions[planet] = {
          longitude: siderealLongitude,
          sign: getRashiFromLongitude(siderealLongitude),
          nakshatra: getNakshatraFromLongitude(siderealLongitude)
        };
      } catch (error) {
        console.error(`Error calculating ${planet} position:`, error);
        positions[planet] = { longitude: 0, sign: 'Aries', nakshatra: 'Ashwini' };
      }
    });
    
    // Calculate Rahu (North Node) - Mean Node
    try {
      const moonNode = Astronomy.MoonNode(date);
      let rahuLongitude = moonNode.ra_equ - ayanamsa;
      
      if (rahuLongitude < 0) rahuLongitude += 360;
      if (rahuLongitude >= 360) rahuLongitude -= 360;
      
      positions.Rahu = {
        longitude: rahuLongitude,
        sign: getRashiFromLongitude(rahuLongitude),
        nakshatra: getNakshatraFromLongitude(rahuLongitude)
      };
      
      // Ketu is always 180° opposite to Rahu
      let ketuLongitude = rahuLongitude + 180;
      if (ketuLongitude >= 360) ketuLongitude -= 360;
      
      positions.Ketu = {
        longitude: ketuLongitude,
        sign: getRashiFromLongitude(ketuLongitude),
        nakshatra: getNakshatraFromLongitude(ketuLongitude)
      };
    } catch (error) {
      console.error('Error calculating Rahu/Ketu:', error);
      positions.Rahu = { longitude: 180, sign: 'Libra', nakshatra: 'Swati' };
      positions.Ketu = { longitude: 0, sign: 'Aries', nakshatra: 'Ashwini' };
    }
    
    return positions;
  } catch (error) {
    console.error('Error getting planetary positions:', error);
    return {};
  }
}


/**
 * Get Moon's phase and illumination
 */
export function getMoonPhase(date) {
  try {
    const moonPhase = Astronomy.MoonPhase(date);
    
    // moonPhase is 0-360 degrees
    // 0° = New Moon, 90° = First Quarter, 180° = Full Moon, 270° = Last Quarter
    
    // Calculate illumination percentage
    const illumination = Astronomy.Illumination('Moon', date);
    const illuminatedPercent = illumination.phase_fraction * 100;
    
    // Determine phase name and emoji
    let phaseName, phaseEmoji;
    
    if (moonPhase < 22.5 || moonPhase >= 337.5) {
      phaseName = 'New Moon';
      phaseEmoji = '🌑';
    } else if (moonPhase < 67.5) {
      phaseName = 'Waxing Crescent';
      phaseEmoji = '🌒';
    } else if (moonPhase < 112.5) {
      phaseName = 'First Quarter';
      phaseEmoji = '🌓';
    } else if (moonPhase < 157.5) {
      phaseName = 'Waxing Gibbous';
      phaseEmoji = '🌔';
    } else if (moonPhase < 202.5) {
      phaseName = 'Full Moon';
      phaseEmoji = '🌕';
    } else if (moonPhase < 247.5) {
      phaseName = 'Waning Gibbous';
      phaseEmoji = '🌖';
    } else if (moonPhase < 292.5) {
      phaseName = 'Last Quarter';
      phaseEmoji = '🌗';
    } else {
      phaseName = 'Waning Crescent';
      phaseEmoji = '🌘';
    }
    
    return {
      phase: moonPhase,
      phaseName,
      phaseEmoji,
      illumination: illuminatedPercent.toFixed(1)
    };
  } catch (error) {
    console.error('Error calculating Moon phase:', error);
    return {
      phase: 0,
      phaseName: 'New Moon',
      phaseEmoji: '🌑',
      illumination: 0
    };
  }
}

/**
 * Calculate Tithi (Lunar day) - 1 to 30
 * Based on Sun-Moon angular difference
 */
export function getTithi(date) {
  try {
    const sun = getSunPosition(date);
    const moon = getMoonPosition(date);
    
    // Calculate angular difference
    let difference = moon.longitude - sun.longitude;
    if (difference < 0) difference += 360;
    
    // Each Tithi is 12° (360° / 30 = 12°)
    const tithiNumber = Math.floor(difference / 12) + 1;
    
    // Determine if Shukla Paksha (waxing) or Krishna Paksha (waning)
    const paksha = tithiNumber <= 15 ? 'Shukla' : 'Krishna';
    
    // Tithi names
    const tithiNames = [
      'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
      'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
      'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'
    ];
    
    const tithiIndex = (tithiNumber - 1) % 15;
    const tithiName = tithiNames[tithiIndex];
    
    return {
      number: tithiNumber,
      name: tithiName,
      paksha: paksha,
      displayName: `${tithiName} (${paksha} Paksha)`
    };
  } catch (error) {
    console.error('Error calculating Tithi:', error);
    return {
      number: 1,
      name: 'Pratipada',
      paksha: 'Shukla',
      displayName: 'Pratipada (Shukla Paksha)'
    };
  }
}

/**
 * Get day of week (Vara)
 */
export function getVara(date) {
  const days = [
    { name: 'Sunday', sanskrit: 'Ravivara', lord: 'Sun' },
    { name: 'Monday', sanskrit: 'Somavara', lord: 'Moon' },
    { name: 'Tuesday', sanskrit: 'Mangalavara', lord: 'Mars' },
    { name: 'Wednesday', sanskrit: 'Budhavara', lord: 'Mercury' },
    { name: 'Thursday', sanskrit: 'Guruvara', lord: 'Jupiter' },
    { name: 'Friday', sanskrit: 'Shukravara', lord: 'Venus' },
    { name: 'Saturday', sanskrit: 'Shanivara', lord: 'Saturn' }
  ];
  
  return days[date.getDay()];
}

/**
 * Helper: Get Rashi (zodiac sign) from longitude
 */
function getRashiFromLongitude(longitude) {
  const rashiNames = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const rashiIndex = Math.floor(longitude / 30);
  return rashiNames[rashiIndex] || 'Aries';
}

/**
 * Helper: Get Nakshatra from longitude
 */
function getNakshatraFromLongitude(longitude) {
  const nakshatraNames = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];
  const nakshatraIndex = Math.floor(longitude / 13.333333);
  return nakshatraNames[nakshatraIndex] || 'Ashwini';
}
/**
 * Get complete Panchanga data
 */
export function getPanchangaData(date) {
  const sun = getSunPosition(date);
  const moon = getMoonPosition(date);
  const planets = getAllPlanetaryPositions(date);
  const moonPhase = getMoonPhase(date);
  const tithi = getTithi(date);
  const vara = getVara(date);
  
  return {
    sun,
    moon,
    planets,  // ADD THIS LINE
    moonPhase,
    tithi,
    vara,
    date: date
  };
}
