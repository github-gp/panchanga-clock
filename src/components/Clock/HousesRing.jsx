import React from 'react';
import { getPointOnCircle } from '../../utils/nakshatras';

function HousesRing({ ascendantDegree, showHouses }) {
  if (!showHouses || !ascendantDegree) return null;

  const outerRadius = 165;  // Just outside planet orbit
  const innerRadius = 135;  // Just inside planet orbit
  const textRadius = 150;   // Same as planet orbit
  
  // In our system: 0° = top, 90° = right (East), 180° = bottom, 270° = left (West)
  // Ascendant should be at East (90° in our coordinate system)
  // But user's ascendantDegree is in zodiacal coordinates
  
  // Convert: Zodiacal 0° (Aries start) should map to visual top (0°)
  // Ascendant position needs to be at East (90°)
  
  const houses = [];
  for (let i = 0; i < 12; i++) {
    // Each house is 30°
    // House 1 starts at ascendant position
    // In visual coordinates: Ascendant at 90° (East/Right)
    const houseStartZodiacal = (ascendantDegree + (i * 30)) % 360;
    
    // Visual position: shift by 90° to put ascendant at East
    const visualStart = ((houseStartZodiacal - 90) * Math.PI / 180);
    const visualEnd = ((houseStartZodiacal + 30 - 90) * Math.PI / 180);
    
    const outerStart = getPointOnCircle(visualStart, outerRadius);
    const outerEnd = getPointOnCircle(visualEnd, outerRadius);
    const innerStart = getPointOnCircle(visualStart, innerRadius);
    const innerEnd = getPointOnCircle(visualEnd, innerRadius);
    
    const pathData = `
      M ${outerStart.x} ${outerStart.y}
      A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}
      L ${innerEnd.x} ${innerEnd.y}
      A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}
      Z
    `;
    
    const textAngle = visualStart + ((visualEnd - visualStart) / 2);
    const textPos = getPointOnCircle(textAngle, textRadius);
    
    houses.push({
      number: i + 1,
      pathData,
      textPos,
      textAngle,
      isAscendant: i === 0
    });
  }

  return (
    <g className="houses-ring">
      {/* Draw house sections */}
      {houses.map((house) => (
        <g key={house.number}>
          {/* House section */}
          <path
            d={house.pathData}
            fill={house.isAscendant ? "#FFD70040" : "#FFFFFF10"}
            stroke={house.isAscendant ? "#FFD700" : "#FFFFFF40"}
            strokeWidth={house.isAscendant ? 2 : 1}
            opacity={house.isAscendant ? 0.8 : 0.5}
          />
          
          {/* House number */}
          <text
            x={house.textPos.x}
            y={house.textPos.y}
            textAnchor="middle"
            fontSize={house.isAscendant ? "14" : "11"}
            fill={house.isAscendant ? "#FFD700" : "#FFFFFF"}
            fontWeight={house.isAscendant ? "bold" : "normal"}
          >
            {house.number}
          </text>
          
          {/* Label "ASC" for house 1 */}
          {house.isAscendant && (
            <text
              x={house.textPos.x}
              y={house.textPos.y + 15}
              textAnchor="middle"
              fontSize="8"
              fill="#FFD700"
              fontWeight="bold"
            >
              ASC
            </text>
          )}
        </g>
      ))}
      
      {/* Ascendant marker at East (right side, 90°) */}
      <g>
        <circle cx="165" cy="0" r="8" fill="#FFD700" opacity="0.8" />
        <text x="165" y="4" textAnchor="middle" fontSize="10" fill="#000" fontWeight="bold">
          ASC
        </text>
        
        {/* Arrow pointing to Ascendant */}
        <line x1="180" y1="0" x2="200" y2="0" stroke="#FFD700" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="210" y="5" fontSize="10" fill="#FFD700" fontWeight="bold">
          East ➤
        </text>
      </g>
      
      {/* Arrow marker definition */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#FFD700" />
        </marker>
      </defs>
    </g>
  );
}

export default HousesRing;