// 27 Nakshatras - Lunar Mansions in Vedic Astrology
// Each Nakshatra covers 13.333 degrees (360° / 27 = 13.333°)

export const NAKSHATRAS = [
  { 
    id: 1, 
    name: 'Ashwini', 
    devanagari: 'अश्विनी',
    symbol: '🐎',
    color: '#FF6B6B',
    startDegree: 0
  },
  { 
    id: 2, 
    name: 'Bharani', 
    devanagari: 'भरणी',
    symbol: '🌺',
    color: '#FF8E53',
    startDegree: 13.333
  },
  { 
    id: 3, 
    name: 'Krittika', 
    devanagari: 'कृत्तिका',
    symbol: '🔥',
    color: '#FFA07A',
    startDegree: 26.666
  },
  { 
    id: 4, 
    name: 'Rohini', 
    devanagari: 'रोहिणी',
    symbol: '🐄',
    color: '#FFB6C1',
    startDegree: 40
  },
  { 
    id: 5, 
    name: 'Mrigashira', 
    devanagari: 'मृगशिरा',
    symbol: '🦌',
    color: '#DDA0DD',
    startDegree: 53.333
  },
  { 
    id: 6, 
    name: 'Ardra', 
    devanagari: 'आर्द्रा',
    symbol: '💎',
    color: '#9370DB',
    startDegree: 66.666
  },
  { 
    id: 7, 
    name: 'Punarvasu', 
    devanagari: 'पुनर्वसु',
    symbol: '🏹',
    color: '#87CEEB',
    startDegree: 80
  },
  { 
    id: 8, 
    name: 'Pushya', 
    devanagari: 'पुष्य',
    symbol: '🌼',
    color: '#4682B4',
    startDegree: 93.333
  },
  { 
    id: 9, 
    name: 'Ashlesha', 
    devanagari: 'आश्लेषा',
    symbol: '🐍',
    color: '#5F9EA0',
    startDegree: 106.666
  },
  { 
    id: 10, 
    name: 'Magha', 
    devanagari: 'मघा',
    symbol: '👑',
    color: '#FFD700',
    startDegree: 120
  },
  { 
    id: 11, 
    name: 'Purva Phalguni', 
    devanagari: 'पूर्वा फाल्गुनी',
    symbol: '🛏️',
    color: '#F0E68C',
    startDegree: 133.333
  },
  { 
    id: 12, 
    name: 'Uttara Phalguni', 
    devanagari: 'उत्तरा फाल्गुनी',
    symbol: '🌳',
    color: '#BDB76B',
    startDegree: 146.666
  },
  { 
    id: 13, 
    name: 'Hasta', 
    devanagari: 'हस्त',
    symbol: '✋',
    color: '#90EE90',
    startDegree: 160
  },
  { 
    id: 14, 
    name: 'Chitra', 
    devanagari: 'चित्रा',
    symbol: '💍',
    color: '#98FB98',
    startDegree: 173.333
  },
  { 
    id: 15, 
    name: 'Swati', 
    devanagari: 'स्वाति',
    symbol: '🌿',
    color: '#00FA9A',
    startDegree: 186.666
  },
  { 
    id: 16, 
    name: 'Vishakha', 
    devanagari: 'विशाखा',
    symbol: '⚡',
    color: '#3CB371',
    startDegree: 200
  },
  { 
    id: 17, 
    name: 'Anuradha', 
    devanagari: 'अनुराधा',
    symbol: '🏵️',
    color: '#2E8B57',
    startDegree: 213.333
  },
  { 
    id: 18, 
    name: 'Jyeshtha', 
    devanagari: 'ज्येष्ठा',
    symbol: '☂️',
    color: '#FF7F50',
    startDegree: 226.666
  },
  { 
    id: 19, 
    name: 'Mula', 
    devanagari: 'मूल',
    symbol: '🌱',
    color: '#CD853F',
    startDegree: 240
  },
  { 
    id: 20, 
    name: 'Purva Ashadha', 
    devanagari: 'पूर्वाषाढ़ा',
    symbol: '🪶',
    color: '#D2691E',
    startDegree: 253.333
  },
  { 
    id: 21, 
    name: 'Uttara Ashadha', 
    devanagari: 'उत्तराषाढ़ा',
    symbol: '⚔️',
    color: '#8B4513',
    startDegree: 266.666
  },
  { 
    id: 22, 
    name: 'Shravana', 
    devanagari: 'श्रवण',
    symbol: '👂',
    color: '#4169E1',
    startDegree: 280
  },
  { 
    id: 23, 
    name: 'Dhanishta', 
    devanagari: 'धनिष्ठा',
    symbol: '🥁',
    color: '#6495ED',
    startDegree: 293.333
  },
  { 
    id: 24, 
    name: 'Shatabhisha', 
    devanagari: 'शतभिषा',
    symbol: '⭕',
    color: '#00BFFF',
    startDegree: 306.666
  },
  { 
    id: 25, 
    name: 'Purva Bhadrapada', 
    devanagari: 'पूर्वाभाद्रपदा',
    symbol: '⚰️',
    color: '#9932CC',
    startDegree: 320
  },
  { 
    id: 26, 
    name: 'Uttara Bhadrapada', 
    devanagari: 'उत्तराभाद्रपदा',
    symbol: '🐉',
    color: '#8A2BE2',
    startDegree: 333.333
  },
  { 
    id: 27, 
    name: 'Revati', 
    devanagari: 'रेवती',
    symbol: '🐟',
    color: '#9370DB',
    startDegree: 346.666
  }
];

// Helper function to get Nakshatra angle in radians
export const getNakshatraAngle = (index) => {
  // Each Nakshatra = 360° / 27 = 13.333°
  const degreesPerNakshatra = 360 / 27;
  const degrees = index * degreesPerNakshatra;
  // Convert to radians (Math in JavaScript uses radians)
  return (degrees * Math.PI) / 180;
};

// Helper function to calculate position on circle
export const getPointOnCircle = (angle, radius) => {
  // In Vedic astrology, 0° is at the TOP (12 o'clock position)
  // Standard math has 0° at RIGHT (3 o'clock)
  // So we subtract 90° (π/2 radians) to rotate everything counterclockwise
  // This makes 0° point upward
  const adjustedAngle = angle - (Math.PI / 2);
  
  return {
    x: radius * Math.cos(adjustedAngle),
    y: radius * Math.sin(adjustedAngle)
  };
};
