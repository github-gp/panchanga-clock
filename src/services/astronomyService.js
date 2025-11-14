import * as Astronomy from 'astronomy-engine';

// Ayanamsa (precession correction) for Vedic/Sidereal zodiac
const AYANAMSA_BASE = 24.18;
const AYANAMSA_RATE = 0.0;

export function getAyanamsa(date) {
  const year = date.getFullYear();
  const yearsSince2000 = year - 2000;
  const ayanamsa = AYANAMSA_BASE + (yearsSince2000 * AYANAMSA_RATE);
  return ayanamsa;
}

export function getSunPosition(date) {
  try {
    const ecliptic = Astronomy.Ecliptic(Astronomy.GeoVector('Sun', date, false));
    const tropicalLongitude = ecliptic.elon;
    
    const ayanamsa = getAyanamsa(date);
    let siderealLongitude = tropicalLongitude - ayanamsa;
    
    if (siderealLongitude < 0) siderealLongitude += 360;
    if (siderealLongitude >= 360) siderealLongitude -= 360;
    
    console.log('Sun - Tropical:', tropicalLongitude.toFixed(2), 'Sidereal:', siderealLongitude.toFixed(2));
    
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

export function getMoonPosition(date) {
  try {
    const ecliptic = Astronomy.Ecliptic(Astronomy.GeoVector('Moon', date, false));
    const tropicalLongitude = ecliptic.elon;
    
    const ayanamsa = getAyanamsa(date);
    let siderealLongitude = tropicalLongitude - ayanamsa;
    
    if (siderealLongitude < 0) siderealLongitude += 360;
    if (siderealLongitude >= 360) siderealLongitude -= 360;
    
    console.log('Moon - Tropical:', tropicalLongitude.toFixed(2), 'Sidereal:', siderealLongitude.toFixed(2));
    
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

function getRashiFromLongitude(longitude) {
  const rashiNames = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const rashiIndex = Math.floor(longitude / 30);
  return rashiNames[rashiIndex] || 'Aries';
}

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
 * Get positions of all planets including Rahu and Ketu
 */
export function getAllPlanetaryPositions(date) {
  const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
  const positions = {};
  
  try {
    // Get Sun and Moon
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
    
    // Calculate Rahu (North Node) and Ketu (South Node) - FIXED
    try {
      const ayanamsa = getAyanamsa(date);
      
      // FIXED: Manual Julian Date calculation
      const msPerDay = 86400000; // milliseconds per day
      const J2000 = new Date('2000-01-01T12:00:00Z');
      const jd = 2451545.0 + (date.getTime() - J2000.getTime()) / msPerDay;
      const T = (jd - 2451545.0) / 36525.0;
      
      console.log('Rahu Debug (FIXED):');
      console.log('  Date:', date.toString());
      console.log('  JD:', jd.toFixed(2));
      console.log('  T (centuries):', T.toFixed(4));
      
      // Mean longitude of ascending node (Rahu)
      // Using Simon et al. 1994 formula for accuracy
      let Omega = 125.04455501 
        - 1934.13626197 * T 
        + 0.00207833 * T * T 
        + T * T * T / 467441.0
        - T * T * T * T / 60616000.0;
      
      // Normalize to 0-360
      Omega = ((Omega % 360) + 360) % 360;
      
      // Apply ayanamsa to get sidereal position
      let rahuLongitude = Omega - ayanamsa;
      
      if (rahuLongitude < 0) rahuLongitude += 360;
      if (rahuLongitude >= 360) rahuLongitude -= 360;
      
      console.log('  Omega (tropical):', Omega.toFixed(2), '°');
      console.log('  Ayanamsa:', ayanamsa.toFixed(2), '°');
      console.log('  Rahu (sidereal):', rahuLongitude.toFixed(2), '°');
      
      positions.Rahu = {
        longitude: rahuLongitude,
        sign: getRashiFromLongitude(rahuLongitude),
        nakshatra: getNakshatraFromLongitude(rahuLongitude)
      };
      
      // Ketu is exactly 180° opposite to Rahu
      let ketuLongitude = rahuLongitude + 180;
      if (ketuLongitude >= 360) ketuLongitude -= 360;
      
      positions.Ketu = {
        longitude: ketuLongitude,
        sign: getRashiFromLongitude(ketuLongitude),
        nakshatra: getNakshatraFromLongitude(ketuLongitude)
      };
      
      console.log('  Ketu (sidereal):', ketuLongitude.toFixed(2), '°');
      console.log('  Rahu in:', positions.Rahu.sign);
      console.log('  Ketu in:', positions.Ketu.sign);
      
    } catch (error) {
      console.error('Error calculating Rahu/Ketu:', error);
      // Fallback values
      positions.Rahu = { 
        longitude: 320.336, 
        sign: 'Aquarius', 
        nakshatra: 'Purva Bhadrapada' 
      };
      positions.Ketu = { 
        longitude: 140.336, 
        sign: 'Leo', 
        nakshatra: 'Purva Phalguni' 
      };
    }
    
    return positions;
  } catch (error) {
    console.error('Error getting planetary positions:', error);
    return {};
  }
}

/**
 * Calculate Moon phase
 */
export function getMoonPhase(date) {
  try {
    const illumination = Astronomy.Illumination('Moon', date);
    const phase = illumination.phase_fraction * 100;
    
    let phaseName = '';
    let phaseEmoji = '';
    
    if (phase < 6.25) {
      phaseName = 'New Moon';
      phaseEmoji = '🌑';
    } else if (phase < 18.75) {
      phaseName = 'Waxing Crescent';
      phaseEmoji = '🌒';
    } else if (phase < 31.25) {
      phaseName = 'First Quarter';
      phaseEmoji = '🌓';
    } else if (phase < 43.75) {
      phaseName = 'Waxing Gibbous';
      phaseEmoji = '🌔';
    } else if (phase < 56.25) {
      phaseName = 'Full Moon';
      phaseEmoji = '🌕';
    } else if (phase < 68.75) {
      phaseName = 'Waning Gibbous';
      phaseEmoji = '🌖';
    } else if (phase < 81.25) {
      phaseName = 'Last Quarter';
      phaseEmoji = '🌗';
    } else if (phase < 93.75) {
      phaseName = 'Waning Crescent';
      phaseEmoji = '🌘';
    } else {
      phaseName = 'New Moon';
      phaseEmoji = '🌑';
    }
    
    return {
      illumination: phase.toFixed(0),
      phaseName,
      phaseEmoji
    };
  } catch (error) {
    console.error('Error calculating moon phase:', error);
    return { illumination: '50', phaseName: 'Unknown', phaseEmoji: '🌕' };
  }
}

/**
 * Calculate Tithi (Lunar day)
 */
export function getTithi(date) {
  try {
    const sun = getSunPosition(date);
    const moon = getMoonPosition(date);
    
    let elongation = moon.longitude - sun.longitude;
    if (elongation < 0) elongation += 360;
    
    const tithiNumber = Math.floor(elongation / 12) + 1;
    
    const tithiNames = [
      'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
      'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
      'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
    ];
    
    const paksha = tithiNumber <= 15 ? 'Shukla' : 'Krishna';
    const tithiIndex = tithiNumber <= 15 ? tithiNumber - 1 : tithiNumber - 16;
    
    return {
      number: tithiNumber,
      name: tithiNames[tithiIndex] || tithiNames[0],
      paksha
    };
  } catch (error) {
    console.error('Error calculating Tithi:', error);
    return { number: 1, name: 'Pratipada', paksha: 'Shukla' };
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
    planets,
    moonPhase,
    tithi,
    vara,
    date: date
  };
}