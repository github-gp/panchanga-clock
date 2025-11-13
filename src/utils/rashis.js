// 12 Rashis (Zodiac Signs) in Vedic Astrology
// Each Rashi covers 30 degrees (360° / 12 = 30°)

export const RASHIS = [
  {
    id: 1,
    name: 'Mesha',
    english: 'Aries',
    symbol: '♈',
    element: 'Fire',
    lord: 'Mars',
    color: '#FF6B6B',
    startDegree: 0,
    endDegree: 30
  },
  {
    id: 2,
    name: 'Vrishabha',
    english: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    lord: 'Venus',
    color: '#8BC34A',
    startDegree: 30,
    endDegree: 60
  },
  {
    id: 3,
    name: 'Mithuna',
    english: 'Gemini',
    symbol: '♊',
    element: 'Air',
    lord: 'Mercury',
    color: '#FFD93D',
    startDegree: 60,
    endDegree: 90
  },
  {
    id: 4,
    name: 'Karka',
    english: 'Cancer',
    symbol: '♋',
    element: 'Water',
    lord: 'Moon',
    color: '#90CAF9',
    startDegree: 90,
    endDegree: 120
  },
  {
    id: 5,
    name: 'Simha',
    english: 'Leo',
    symbol: '♌',
    element: 'Fire',
    lord: 'Sun',
    color: '#FFA726',
    startDegree: 120,
    endDegree: 150
  },
  {
    id: 6,
    name: 'Kanya',
    english: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    lord: 'Mercury',
    color: '#A5D6A7',
    startDegree: 150,
    endDegree: 180
  },
  {
    id: 7,
    name: 'Tula',
    english: 'Libra',
    symbol: '♎',
    element: 'Air',
    lord: 'Venus',
    color: '#FFE082',
    startDegree: 180,
    endDegree: 210
  },
  {
    id: 8,
    name: 'Vrischika',
    english: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    lord: 'Mars',
    color: '#81D4FA',
    startDegree: 210,
    endDegree: 240
  },
  {
    id: 9,
    name: 'Dhanu',
    english: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    lord: 'Jupiter',
    color: '#FF8A65',
    startDegree: 240,
    endDegree: 270
  },
  {
    id: 10,
    name: 'Makara',
    english: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    lord: 'Saturn',
    color: '#AED581',
    startDegree: 270,
    endDegree: 300
  },
  {
    id: 11,
    name: 'Kumbha',
    english: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    lord: 'Saturn',
    color: '#FFF59D',
    startDegree: 300,
    endDegree: 330
  },
  {
    id: 12,
    name: 'Meena',
    english: 'Pisces',
    symbol: '♓',
    element: 'Water',
    lord: 'Jupiter',
    color: '#B3E5FC',
    startDegree: 330,
    endDegree: 360
  }
];

// Helper function to get Rashi angle in radians
export const getRashiAngle = (index) => {
  // Each Rashi = 360° / 12 = 30°
  const degreesPerRashi = 360 / 12;
  const degrees = index * degreesPerRashi;
  // Convert to radians
  return (degrees * Math.PI) / 180;
};

// Helper function to get element color (for alternative styling)
export const getElementColor = (element) => {
  const elementColors = {
    'Fire': '#FF6B6B',      // Red/Orange
    'Earth': '#8BC34A',     // Green
    'Air': '#FFD93D',       // Yellow
    'Water': '#4FC3F7'      // Blue
  };
  return elementColors[element] || '#CCCCCC';
};

// Helper function to find Rashi by degree
export const getRashiByDegree = (degree) => {
  // Normalize degree to 0-360 range
  const normalizedDegree = ((degree % 360) + 360) % 360;
  
  return RASHIS.find(rashi => 
    normalizedDegree >= rashi.startDegree && 
    normalizedDegree < rashi.endDegree
  );
};

// Get current Moon's Rashi (placeholder - we'll add real calculation later)
export const getCurrentMoonRashi = () => {
  // For now, return a demo value
  // In Phase 4, we'll calculate this from actual Moon position
  const date = new Date();
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  // Moon moves through all 12 rashis in ~27 days
  const rashiIndex = Math.floor((dayOfYear % 27) / 2.25) % 12;
  return RASHIS[rashiIndex];
};
