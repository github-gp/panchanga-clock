/**
 * KP (Krishnamurti Paddhati) Sub-Lord system
 * Each Nakshatra divided into 9 sub-parts
 */

// Vimshottari Dasha periods (in years) - proportional to sub-lord size
const DASHA_PERIODS = {
  'Ketu': 7,
  'Venus': 20,
  'Sun': 6,
  'Moon': 10,
  'Mars': 7,
  'Rahu': 18,
  'Jupiter': 16,
  'Saturn': 19,
  'Mercury': 17
};

// Order of planets in Vimshottari system
const PLANET_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

// Total years in full cycle
const TOTAL_YEARS = Object.values(DASHA_PERIODS).reduce((a, b) => a + b, 0); // 120 years

/**
 * Calculate all KP sub-divisions for the entire zodiac
 */
export function generateKPSubLords() {
  const subLords = [];
  let currentDegree = 0;
  const nakshatraSpan = 360 / 27; // 13.333° per Nakshatra
  
  // For each Nakshatra
  for (let nakIndex = 0; nakIndex < 27; nakIndex++) {
    const nakshatraStart = nakIndex * nakshatraSpan;
    const nakshatraEnd = (nakIndex + 1) * nakshatraSpan;
    
    // Starting planet for this Nakshatra (cycles through 9 planets)
    const startingPlanetIndex = nakIndex % 9;
    
    // Divide this Nakshatra into 9 parts (sub-lords)
    for (let subIndex = 0; subIndex < 9; subIndex++) {
      const planetIndex = (startingPlanetIndex + subIndex) % 9;
      const planet = PLANET_ORDER[planetIndex];
      const proportion = DASHA_PERIODS[planet] / TOTAL_YEARS;
      
      const subSpan = nakshatraSpan * proportion;
      const subStart = currentDegree;
      const subEnd = currentDegree + subSpan;
      
      subLords.push({
        id: subLords.length + 1,
        nakshatra: Math.floor(currentDegree / nakshatraSpan) + 1,
        subLord: planet,
        startDegree: subStart,
        endDegree: subEnd,
        spanDegrees: subSpan
      });
      
      currentDegree = subEnd;
    }
  }
  
  return subLords;
}

/**
 * Get sub-lord for a specific degree
 */
export function getSubLordAtDegree(degree) {
  const normalizedDegree = ((degree % 360) + 360) % 360;
  const subLords = generateKPSubLords();
  
  return subLords.find(sub => 
    normalizedDegree >= sub.startDegree && 
    normalizedDegree < sub.endDegree
  );
}

/**
 * Colors for each planet (sub-lord)
 */
export const KP_COLORS = {
  'Ketu': '#8B4513',
  'Venus': '#FFB6C1',
  'Sun': '#FDB813',
  'Moon': '#C0C0C0',
  'Mars': '#DC143C',
  'Rahu': '#8B008B',
  'Jupiter': '#DAA520',
  'Saturn': '#4682B4',
  'Mercury': '#A9A9A9'
};
