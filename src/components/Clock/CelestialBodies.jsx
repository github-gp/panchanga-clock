import React from 'react';
import { getPointOnCircle } from '../../utils/nakshatras';

function CelestialBodies({ planets }) {
  if (!planets) return null;

  const orbitRadius = 150;
  const nakshatraRadius = 255;

  // Render different planet based on name
  const renderPlanet = (planetName, x, y, abbr) => {
    const commonProps = {
      transform: `translate(${x}, ${y})`
    };

    switch(planetName) {
      case 'Sun':
        return (
          <g {...commonProps}>
            {/* Sun glow */}
            <circle cx="0" cy="0" r="20" fill="#FDB81380" opacity="0.4" filter="blur(8px)" />
            <circle cx="0" cy="0" r="12" fill="#FDB813" opacity="0.6" filter="blur(4px)" />
            
            {/* Sun body */}
            <circle cx="0" cy="0" r="8" fill="url(#sunGradient)" />
            
            {/* Sun rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
              const rad = (angle * Math.PI) / 180;
              const x1 = Math.cos(rad) * 10;
              const y1 = Math.sin(rad) * 10;
              const x2 = Math.cos(rad) * 14;
              const y2 = Math.sin(rad) * 14;
              return (
                <line
                  key={angle}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#FFA500"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              );
            })}
            
            <text x="0" y="22" textAnchor="middle" fontSize="6" fill="#FDB813" fontWeight="bold">
              {abbr}
            </text>
          </g>
        );

      case 'Moon':
        return (
          <g {...commonProps}>
            {/* Moon glow */}
            <circle cx="0" cy="0" r="16" fill="#E8E8E8" opacity="0.3" filter="blur(6px)" />
            
            {/* Moon body with craters */}
            <circle cx="0" cy="0" r="7" fill="url(#moonGradient)" stroke="#A0A0A0" strokeWidth="0.5" />
            
            {/* Craters */}
            <circle cx="-2" cy="-2" r="1.5" fill="#D0D0D0" opacity="0.6" />
            <circle cx="2" cy="1" r="1" fill="#D0D0D0" opacity="0.6" />
            <circle cx="0" cy="-3" r="0.8" fill="#D0D0D0" opacity="0.6" />
            
            <text x="0" y="20" textAnchor="middle" fontSize="6" fill="#C0C0C0" fontWeight="bold">
              {abbr}
            </text>
          </g>
        );

      case 'Mercury':
        return (
          <g {...commonProps}>
            {/* Mercury - grey rocky planet */}
            <circle cx="0" cy="0" r="10" fill="#8888" opacity="0.3" filter="blur(4px)" />
            <circle cx="0" cy="0" r="5" fill="url(#mercuryGradient)" stroke="#666" strokeWidth="0.5" />
            
            {/* Surface features */}
            <circle cx="-1" cy="-1" r="1" fill="#999" opacity="0.4" />
            <circle cx="1.5" cy="1" r="0.8" fill="#999" opacity="0.4" />
            
            <text x="0" y="18" textAnchor="middle" fontSize="6" fill="#A9A9A9" fontWeight="bold">
              {abbr}
            </text>
          </g>
        );

      case 'Venus':
        return (
          <g {...commonProps}>
            {/* Venus - bright yellowish planet with thick atmosphere */}
            <circle cx="0" cy="0" r="12" fill="#FFE4B580" opacity="0.4" filter="blur(5px)" />
            <circle cx="0" cy="0" r="6" fill="url(#venusGradient)" stroke="#FFD700" strokeWidth="0.5" />
            
            {/* Cloud patterns */}
            <ellipse cx="0" cy="-1" rx="4" ry="1" fill="#FFF" opacity="0.2" />
            <ellipse cx="0" cy="1" rx="3" ry="0.8" fill="#FFF" opacity="0.2" />
            
            <text x="0" y="19" textAnchor="middle" fontSize="6" fill="#FFB6C1" fontWeight="bold">
              {abbr}
            </text>
          </g>
        );

      case 'Mars':
        return (
          <g {...commonProps}>
            {/* Mars - red planet */}
            <circle cx="0" cy="0" r="11" fill="#DC143C80" opacity="0.3" filter="blur(4px)" />
            <circle cx="0" cy="0" r="5.5" fill="url(#marsGradient)" stroke="#8B0000" strokeWidth="0.5" />
            
            {/* Polar ice cap */}
            <circle cx="0" cy="-4" r="1.5" fill="#FFF" opacity="0.7" />
            
            {/* Surface features */}
            <circle cx="-1" cy="1" r="1" fill="#A0522D" opacity="0.5" />
            <circle cx="2" cy="0" r="0.8" fill="#A0522D" opacity="0.5" />
            
            <text x="0" y="19" textAnchor="middle" fontSize="6" fill="#DC143C" fontWeight="bold">
              {abbr}
            </text>
          </g>
        );

      case 'Jupiter':
        return (
          <g {...commonProps}>
            {/* Jupiter - gas giant with bands */}
            <circle cx="0" cy="0" r="14" fill="#DAA52080" opacity="0.4" filter="blur(6px)" />
            <circle cx="0" cy="0" r="9" fill="url(#jupiterGradient)" stroke="#B8860B" strokeWidth="0.5" />
            
            {/* Great Red Spot */}
            <ellipse cx="2" cy="1" rx="2" ry="1.5" fill="#CD5C5C" opacity="0.6" />
            
            {/* Cloud bands */}
            <rect x="-9" y="-2" width="18" height="1" fill="#D2B48C" opacity="0.4" />
            <rect x="-9" y="1" width="18" height="1" fill="#8B7355" opacity="0.3" />
            <rect x="-9" y="-5" width="18" height="1" fill="#D2B48C" opacity="0.3" />
            
            <text x="0" y="22" textAnchor="middle" fontSize="6" fill="#DAA520" fontWeight="bold">
              {abbr}
            </text>
          </g>
        );

      case 'Saturn':
        return (
          <g {...commonProps}>
            {/* Saturn - ringed planet */}
            <circle cx="0" cy="0" r="13" fill="#4682B480" opacity="0.3" filter="blur(5px)" />
            
            {/* Rings (behind) */}
            <ellipse cx="0" cy="0" rx="12" ry="3" fill="none" stroke="#8B7355" strokeWidth="0.8" opacity="0.4" />
            <ellipse cx="0" cy="0" rx="10" ry="2.5" fill="none" stroke="#A0826D" strokeWidth="0.6" opacity="0.5" />
            
            {/* Planet body */}
            <circle cx="0" cy="0" r="6" fill="url(#saturnGradient)" stroke="#36648B" strokeWidth="0.5" />
            
            {/* Rings (front) */}
            <ellipse cx="0" cy="0" rx="12" ry="3" fill="none" stroke="#D2B48C" strokeWidth="0.8" opacity="0.6" 
              strokeDasharray="0,6,2,6" />
            
            <text x="0" y="22" textAnchor="middle" fontSize="6" fill="#4682B4" fontWeight="bold">
              {abbr}
            </text>
          </g>
        );

      case 'Rahu':
        return (
          <g {...commonProps}>
            {/* Rahu - North Node (dragon's head) */}
            <circle cx="0" cy="0" r="12" fill="#8B008B80" opacity="0.4" filter="blur(5px)" />
            
            {/* Serpent/dragon head symbol */}
            <circle cx="0" cy="0" r="6" fill="url(#rahuGradient)" stroke="#4B0082" strokeWidth="0.5" />
            
            {/* Eyes */}
            <circle cx="-2" cy="-1" r="1" fill="#FF0000" opacity="0.8" />
            <circle cx="2" cy="-1" r="1" fill="#FF0000" opacity="0.8" />
            
            {/* Dragon symbol ☊ */}
            <text x="0" y="3" textAnchor="middle" fontSize="8" fill="#FFF" fontWeight="bold">
              ☊
            </text>
            
            <text x="0" y="20" textAnchor="middle" fontSize="6" fill="#8B008B" fontWeight="bold">
              {abbr}
            </text>
          </g>
        );

      case 'Ketu':
        return (
          <g {...commonProps}>
            {/* Ketu - South Node (dragon's tail) */}
            <circle cx="0" cy="0" r="12" fill="#8B451380" opacity="0.4" filter="blur(5px)" />
            
            {/* Comet/tail appearance */}
            <ellipse cx="0" cy="0" rx="6" ry="4" fill="url(#ketuGradient)" stroke="#654321" strokeWidth="0.5" />
            
            {/* Tail streaks */}
            <path d="M 6 0 L 10 -2" stroke="#8B4513" strokeWidth="1" opacity="0.5" />
            <path d="M 6 1 L 11 0" stroke="#A0522D" strokeWidth="1.2" opacity="0.6" />
            <path d="M 6 -1 L 10 2" stroke="#8B4513" strokeWidth="1" opacity="0.5" />
            
            {/* Dragon tail symbol ☋ */}
            <text x="0" y="3" textAnchor="middle" fontSize="8" fill="#FFF" fontWeight="bold">
              ☋
            </text>
            
            <text x="0" y="20" textAnchor="middle" fontSize="6" fill="#8B4513" fontWeight="bold">
              {abbr}
            </text>
          </g>
        );

      default:
        return null;
    }
  };

  const planetInfo = {
    Sun: { abbr: 'Su', color: '#FDB813' },
    Moon: { abbr: 'Mo', color: '#C0C0C0' },
    Mars: { abbr: 'Ma', color: '#DC143C' },
    Mercury: { abbr: 'Me', color: '#A9A9A9' },
    Jupiter: { abbr: 'Ju', color: '#DAA520' },
    Venus: { abbr: 'Ve', color: '#FFB6C1' },
    Saturn: { abbr: 'Sa', color: '#4682B4' },
    Rahu: { abbr: 'Ra', color: '#8B008B' },
    Ketu: { abbr: 'Ke', color: '#8B4513' }
  };

  return (
    <g className="celestial-bodies">
      {/* Planet gradients */}
      <defs>
        <radialGradient id="sunGradient">
          <stop offset="0%" stopColor="#FFF9E3" />
          <stop offset="50%" stopColor="#FDB813" />
          <stop offset="100%" stopColor="#FF8C00" />
        </radialGradient>
        
        <radialGradient id="moonGradient">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#C0C0C0" />
        </radialGradient>
        
        <radialGradient id="mercuryGradient">
          <stop offset="0%" stopColor="#B0B0B0" />
          <stop offset="100%" stopColor="#707070" />
        </radialGradient>
        
        <radialGradient id="venusGradient">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="50%" stopColor="#FFE4B5" />
          <stop offset="100%" stopColor="#FFD700" />
        </radialGradient>
        
        <radialGradient id="marsGradient">
          <stop offset="0%" stopColor="#FF6347" />
          <stop offset="50%" stopColor="#DC143C" />
          <stop offset="100%" stopColor="#8B0000" />
        </radialGradient>
        
        <radialGradient id="jupiterGradient">
          <stop offset="0%" stopColor="#F5DEB3" />
          <stop offset="40%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
        
        <radialGradient id="saturnGradient">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="50%" stopColor="#4682B4" />
          <stop offset="100%" stopColor="#36648B" />
        </radialGradient>
        
        <radialGradient id="rahuGradient">
          <stop offset="0%" stopColor="#9370DB" />
          <stop offset="100%" stopColor="#4B0082" />
        </radialGradient>
        
        <radialGradient id="ketuGradient">
          <stop offset="0%" stopColor="#D2691E" />
          <stop offset="100%" stopColor="#8B4513" />
        </radialGradient>
      </defs>

      {Object.entries(planets).map(([planetName, planetData]) => {
        if (!planetData || planetData.longitude === undefined) return null;

        const angleRadians = (planetData.longitude * Math.PI) / 180;
        const planetPos = getPointOnCircle(angleRadians, orbitRadius);
        const lineEndPos = getPointOnCircle(angleRadians, nakshatraRadius);
        
        const info = planetInfo[planetName];
        if (!info) return null;

        return (
          <g key={planetName}>
            {/* Line from center to Nakshatra ring */}
            <line
              x1="0" y1="0"
              x2={lineEndPos.x} y2={lineEndPos.y}
              stroke={info.color}
              strokeWidth="1.5"
              opacity="0.6"
              strokeDasharray="4,4"
            />

            {/* Render realistic planet */}
            {renderPlanet(planetName, planetPos.x, planetPos.y, info.abbr)}

            {/* Label at end of line */}
            <g transform={`translate(${lineEndPos.x}, ${lineEndPos.y})`}>
              <circle cx="0" cy="0" r="8" fill={info.color} opacity="0.7" />
              <text
                x="0" y="3"
                textAnchor="middle"
                fontSize="7"
                fontWeight="bold"
                fill="#FFFFFF"
              >
                {info.abbr}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
}

export default CelestialBodies;