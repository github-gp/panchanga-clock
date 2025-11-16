// Muhurta Calculations
// Divides the day (sunrise to sunset) into 8 equal periods

/**
 * Muhurta Names and Their Qualities
 * Traditional 8 muhurtas of the day
 */
export const MUHURTAS = [
  {
    name: 'Rudra',
    sanskrit: 'रुद्र',
    quality: 'inauspicious',
    lord: 'Shiva',
    description: 'Not favorable for new beginnings',
    color: '#dc2626' // Red
  },
  {
    name: 'Ahi',
    sanskrit: 'आहि',
    quality: 'inauspicious',
    lord: 'Serpent',
    description: 'Avoid important activities',
    color: '#ea580c' // Orange-red
  },
  {
    name: 'Mitra',
    sanskrit: 'मित्र',
    quality: 'auspicious',
    lord: 'Friend',
    description: 'Good for friendships and partnerships',
    color: '#16a34a' // Green
  },
  {
    name: 'Pitri',
    sanskrit: 'पितृ',
    quality: 'neutral',
    lord: 'Ancestors',
    description: 'Neutral period, ancestor worship',
    color: '#eab308' // Yellow
  },
  {
    name: 'Vasu',
    sanskrit: 'वसु',
    quality: 'auspicious',
    lord: 'Wealth',
    description: 'Excellent for wealth and prosperity',
    color: '#16a34a' // Green
  },
  {
    name: 'Vara',
    sanskrit: 'वर',
    quality: 'auspicious',
    lord: 'Blessing',
    description: 'Very auspicious, blessings',
    color: '#16a34a' // Green
  },
  {
    name: 'Vishvadeva',
    sanskrit: 'विश्वदेव',
    quality: 'neutral',
    lord: 'All Gods',
    description: 'Moderate period, prayers recommended',
    color: '#eab308' // Yellow
  },
  {
    name: 'Brahma',
    sanskrit: 'ब्रह्म',
    quality: 'most_auspicious',
    lord: 'Creator',
    description: 'Most auspicious, best for all activities',
    color: '#10b981' // Bright green
  }
];

/**
 * Calculate muhurta periods for a given date
 * @param {Date} date - The date to calculate for
 * @param {number} latitude - Location latitude
 * @param {number} longitude - Location longitude
 * @returns {Array} Array of muhurta periods with times
 */
export function calculateMuhurtas(date, latitude = 28.6139, longitude = 77.2090) {
  // For now, using approximate sunrise/sunset
  // In a real app, you'd use a proper astronomy library
  
  const sunrise = getSunrise(date, latitude, longitude);
  const sunset = getSunset(date, latitude, longitude);
  
  const dayDuration = sunset - sunrise;
  const muhurtaDuration = dayDuration / 8; // 8 muhurtas
  
  const muhurtas = MUHURTAS.map((muhurta, index) => {
    const startTime = new Date(sunrise.getTime() + (muhurtaDuration * index));
    const endTime = new Date(sunrise.getTime() + (muhurtaDuration * (index + 1)));
    
    return {
      ...muhurta,
      index: index + 1,
      startTime,
      endTime,
      duration: muhurtaDuration,
      startMinutes: (startTime - sunrise) / 60000, // Minutes from sunrise
      endMinutes: (endTime - sunrise) / 60000,
    };
  });
  
  return {
    muhurtas,
    sunrise,
    sunset,
    dayDuration: dayDuration / 60000, // Duration in minutes
  };
}

/**
 * Get approximate sunrise time
 * Simplified calculation - in production, use a proper library
 */
function getSunrise(date, latitude, longitude) {
  const sunrise = new Date(date);
  // Approximate: 6 AM + adjustment for latitude
  const baseHour = 6;
  const latitudeAdjustment = (latitude - 23) / 60; // Rough adjustment
  sunrise.setHours(baseHour + latitudeAdjustment);
  sunrise.setMinutes(0);
  sunrise.setSeconds(0);
  return sunrise;
}

/**
 * Get approximate sunset time
 * Simplified calculation - in production, use a proper library
 */
function getSunset(date, latitude, longitude) {
  const sunset = new Date(date);
  // Approximate: 6 PM + adjustment for latitude
  const baseHour = 18;
  const latitudeAdjustment = (latitude - 23) / 60;
  sunset.setHours(baseHour + latitudeAdjustment);
  sunset.setMinutes(0);
  sunset.setSeconds(0);
  return sunset;
}

/**
 * Get current muhurta based on time
 * @param {Date} currentTime - Current time
 * @param {Array} muhurtas - Array of muhurta periods
 * @returns {Object} Current muhurta or null
 */
export function getCurrentMuhurta(currentTime, muhurtas) {
  return muhurtas.find(m => 
    currentTime >= m.startTime && currentTime < m.endTime
  );
}

/**
 * Format time for display
 */
export function formatMuhurtaTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

/**
 * Get quality color based on muhurta quality
 */
export function getQualityColor(quality, theme = 'dark') {
  const colors = {
    most_auspicious: theme === 'dark' ? '#10b981' : '#059669',
    auspicious: theme === 'dark' ? '#16a34a' : '#15803d',
    neutral: theme === 'dark' ? '#eab308' : '#ca8a04',
    inauspicious: theme === 'dark' ? '#ea580c' : '#c2410c',
  };
  return colors[quality] || colors.neutral;
}

/**
 * Get quality emoji
 */
export function getQualityEmoji(quality) {
  const emojis = {
    most_auspicious: '⭐',
    auspicious: '✅',
    neutral: '⚠️',
    inauspicious: '❌',
  };
  return emojis[quality] || '⚪';
}

/**
 * Get quality label
 */
export function getQualityLabel(quality) {
  const labels = {
    most_auspicious: 'Excellent',
    auspicious: 'Good',
    neutral: 'Moderate',
    inauspicious: 'Avoid',
  };
  return labels[quality] || 'Unknown';
}