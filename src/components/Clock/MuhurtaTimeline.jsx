import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeContext';
import {
  calculateMuhurtas,
  getCurrentMuhurta,
  formatMuhurtaTime,
  getQualityColor,
  getQualityEmoji,
  getQualityLabel
} from '../../utils/muhurtaCalculations';

/**
 * MuhurtaTimeline Component
 * Visual timeline showing day divisions and current time
 */
function MuhurtaTimeline({ selectedDate, location }) {
  const { colors, theme } = useTheme();
  const [hoveredMuhurta, setHoveredMuhurta] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [muhurtaData, setMuhurtaData] = useState(null);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate muhurtas when date or location changes
  useEffect(() => {
    const data = calculateMuhurtas(
      selectedDate,
      location.latitude,
      location.longitude
    );
    setMuhurtaData(data);
  }, [selectedDate, location]);

  if (!muhurtaData) return null;

  const { muhurtas, sunrise, sunset, dayDuration } = muhurtaData;
  const currentMuhurta = getCurrentMuhurta(currentTime, muhurtas);
  
  // Calculate current time position on timeline (percentage)
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const currentPosition = isToday
    ? ((currentTime - sunrise) / (sunset - sunrise)) * 100
    : null;

  return (
    <div style={{
      marginTop: '24px',
      padding: '24px',
      background: colors.cardBackground,
      borderRadius: '16px',
      maxWidth: '900px',
      margin: '24px auto 0',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: colors.primaryText,
          marginBottom: '8px',
          transition: 'color 0.3s ease',
        }}>
          📊 Day Timeline - Muhurta Periods
        </h3>
        <div style={{
          fontSize: '13px',
          color: colors.tertiaryText,
        }}>
          🌅 Sunrise: {formatMuhurtaTime(sunrise)} • 🌇 Sunset: {formatMuhurtaTime(sunset)}
        </div>
      </div>

      {/* Timeline Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '80px',
        background: colors.inputBackground,
        borderRadius: '12px',
        overflow: 'hidden',
        border: `2px solid ${colors.inputBorder}`,
      }}>
        {/* Muhurta Segments */}
        {muhurtas.map((muhurta, index) => {
          const width = (muhurta.duration / (dayDuration * 60000)) * 100;
          const left = (muhurta.startMinutes / dayDuration) * 100;
          const isHovered = hoveredMuhurta === index;
          const isCurrent = currentMuhurta?.index === muhurta.index;
          
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${left}%`,
                top: 0,
                width: `${width}%`,
                height: '100%',
                background: getQualityColor(muhurta.quality, theme),
                opacity: isHovered ? 0.9 : (isCurrent ? 0.8 : 0.6),
                borderRight: index < muhurtas.length - 1 ? `2px solid ${colors.svgBackground}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
              }}
              onMouseEnter={() => setHoveredMuhurta(index)}
              onMouseLeave={() => setHoveredMuhurta(null)}
            >
              {/* Muhurta Name */}
              <div style={{
                fontSize: width > 10 ? '11px' : '9px',
                fontWeight: 600,
                color: '#ffffff',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                marginBottom: '2px',
              }}>
                {muhurta.name}
              </div>
              
              {/* Quality Emoji */}
              <div style={{
                fontSize: width > 10 ? '16px' : '12px',
              }}>
                {getQualityEmoji(muhurta.quality)}
              </div>
              
              {/* Current indicator */}
              {isCurrent && (
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: colors.accentText,
                }}>
                  ⬇️
                </div>
              )}
            </div>
          );
        })}

        {/* Current Time Indicator */}
        {currentPosition !== null && currentPosition >= 0 && currentPosition <= 100 && (
          <div
            style={{
              position: 'absolute',
              left: `${currentPosition}%`,
              top: 0,
              width: '3px',
              height: '100%',
              background: colors.accentText,
              boxShadow: `0 0 8px ${colors.accentText}`,
              zIndex: 10,
            }}
          >
            {/* Time label */}
            <div style={{
              position: 'absolute',
              bottom: '-24px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '11px',
              fontWeight: 600,
              color: colors.accentText,
              whiteSpace: 'nowrap',
              background: colors.cardBackground,
              padding: '2px 6px',
              borderRadius: '4px',
              border: `1px solid ${colors.accentText}`,
            }}>
              Now
            </div>
          </div>
        )}
      </div>

      {/* Hover/Current Muhurta Details */}
      {(hoveredMuhurta !== null || currentMuhurta) && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: colors.inputBackground,
          borderRadius: '10px',
          border: `2px solid ${colors.inputBorder}`,
        }}>
          {(() => {
            const displayMuhurta = hoveredMuhurta !== null 
              ? muhurtas[hoveredMuhurta] 
              : currentMuhurta;
            
            return (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: colors.primaryText,
                  }}>
                    {displayMuhurta.name} {displayMuhurta.sanskrit}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: getQualityColor(displayMuhurta.quality, theme),
                  }}>
                    {getQualityEmoji(displayMuhurta.quality)} {getQualityLabel(displayMuhurta.quality)}
                  </div>
                </div>
                
                <div style={{
                  fontSize: '13px',
                  color: colors.secondaryText,
                  marginBottom: '8px',
                }}>
                  ⏰ {formatMuhurtaTime(displayMuhurta.startTime)} - {formatMuhurtaTime(displayMuhurta.endTime)}
                </div>
                
                <div style={{
                  fontSize: '13px',
                  color: colors.tertiaryText,
                }}>
                  🔱 Lord: {displayMuhurta.lord} • {displayMuhurta.description}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div style={{
        marginTop: '16px',
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {[
          { quality: 'most_auspicious', label: 'Excellent' },
          { quality: 'auspicious', label: 'Good' },
          { quality: 'neutral', label: 'Moderate' },
          { quality: 'inauspicious', label: 'Avoid' },
        ].map(item => (
          <div
            key={item.quality}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: colors.tertiaryText,
            }}
          >
            <div style={{
              width: '20px',
              height: '12px',
              background: getQualityColor(item.quality, theme),
              borderRadius: '2px',
            }} />
            <span>{getQualityEmoji(item.quality)} {item.label}</span>
          </div>
        ))}
      </div>

      {/* Helper Text */}
      <div style={{
        marginTop: '12px',
        padding: '10px',
        background: colors.inputBackground,
        borderRadius: '6px',
        fontSize: '11px',
        color: colors.tertiaryText,
        textAlign: 'center',
      }}>
        💡 Hover over any period to see details
      </div>
    </div>
  );
}

export default MuhurtaTimeline;