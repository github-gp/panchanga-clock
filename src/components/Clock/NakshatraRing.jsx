import React from 'react';
import { NAKSHATRAS, getNakshatraAngle, getPointOnCircle } from '../../utils/nakshatras';

function NakshatraRing({ currentMoonLongitude, planets }) {
  const outerRadius = 270;
  const innerRadius = 240;
  const textRadius = 255;

  const nakshatraSpan = (2 * Math.PI) / 27;

  // Colors by ruling planet (Nakshatra lords)
  const lordColors = {
    'Ketu': '#8B4513',      // Brown
    'Venus': '#FFB6C1',     // Pink
    'Sun': '#FDB813',       // Gold
    'Moon': '#C0C0C0',      // Silver
    'Mars': '#DC143C',      // Red
    'Rahu': '#8B008B',      // Purple
    'Jupiter': '#DAA520',   // Dark Gold
    'Saturn': '#4682B4',    // Blue
    'Mercury': '#A9A9A9'    // Grey
  };

  // Nakshatra lords in order (repeats every 9)
  const nakshatraLords = [
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury', // 1-9
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury', // 10-18
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'  // 19-27
  ];

  // Map Nakshatra names to their index to get the lord
  const getNakshatraLord = (nakshatraName) => {
    const nakshatraIndex = NAKSHATRAS.findIndex(n => n.name === nakshatraName);
    if (nakshatraIndex === -1) return 'Sun'; // Fallback
    return nakshatraLords[nakshatraIndex];
  };

  return (
    <g className="nakshatra-ring">
      {/* Draw colored sections */}
      {NAKSHATRAS.map((nakshatra, index) => {
        const startAngle = getNakshatraAngle(index);
        const endAngle = getNakshatraAngle(index + 1);
        
        const outerStart = getPointOnCircle(startAngle, outerRadius);
        const outerEnd = getPointOnCircle(endAngle, outerRadius);
        const innerStart = getPointOnCircle(startAngle, innerRadius);
        const innerEnd = getPointOnCircle(endAngle, innerRadius);

        const pathData = `
          M ${outerStart.x} ${outerStart.y}
          A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}
          L ${innerEnd.x} ${innerEnd.y}
          A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}
          Z
        `;

        const textAngle = startAngle + (nakshatraSpan / 2);
        const textPos = getPointOnCircle(textAngle, textRadius);
        let textRotation = ((textAngle + Math.PI / 2) * 180) / Math.PI;
        
        if (textRotation > 90 && textRotation < 270) {
          textRotation = textRotation + 180;
        }

        const isCurrentNakshatra = currentMoonLongitude && 
          currentMoonLongitude >= nakshatra.startDegree && 
          currentMoonLongitude < nakshatra.startDegree + 13.333;

        // Get color by lord
        const lord = nakshatraLords[index];
        const lordColor = lordColors[lord] || '#888888';

        return (
          <g key={nakshatra.id}>
            {/* Colored section */}
            <path
              d={pathData}
              fill={lordColor}
              fillOpacity={isCurrentNakshatra ? 0.7 : 0.4}
              stroke={isCurrentNakshatra ? "#FFD700" : "#555555"}
              strokeWidth={isCurrentNakshatra ? 2 : 0.5}
            />

            {/* Nakshatra name */}
            <text
              x={textPos.x}
              y={textPos.y}
              textAnchor="middle"
              fontSize="7"
              fill={isCurrentNakshatra ? "#FFD700" : "#DDDDDD"}
              fontWeight={isCurrentNakshatra ? "bold" : "normal"}
              transform={`rotate(${textRotation} ${textPos.x} ${textPos.y})`}
            >
              {nakshatra.name}
            </text>
          </g>
        );
      })}

      {/* Dividing lines */}
      {NAKSHATRAS.map((nakshatra, index) => {
        const angle = getNakshatraAngle(index);
        const outerPoint = getPointOnCircle(angle, outerRadius);
        const innerPoint = getPointOnCircle(angle, innerRadius);

        return (
          <line
            key={`line-${nakshatra.id}`}
            x1={innerPoint.x}
            y1={innerPoint.y}
            x2={outerPoint.x}
            y2={outerPoint.y}
            stroke="#555555"
            strokeWidth="0.5"
            opacity="0.3"
          />
        );
      })}

      {/* Show Nakshatra LORD labels where planets are located */}
      {planets && Object.entries(planets).map(([planetName, planetData]) => {
        if (!planetData || planetData.longitude === undefined) return null;
        
        const planetLongitude = planetData.longitude;
        
        // Find which Nakshatra this planet is in
        const nakshatra = NAKSHATRAS.find(n => 
          planetLongitude >= n.startDegree && 
          planetLongitude < n.startDegree + 13.333
        );
        
        if (!nakshatra) return null;
        
        // Get the LORD of this Nakshatra
        const nakshatraLord = getNakshatraLord(nakshatra.name);
        
        // Calculate position for label
        const nakshatraIndex = NAKSHATRAS.findIndex(n => n.name === nakshatra.name);
        const startAngle = getNakshatraAngle(nakshatraIndex);
        const endAngle = getNakshatraAngle(nakshatraIndex + 1);
        const middleAngle = (startAngle + endAngle) / 2;
        
        const labelRadius = 285; // Outside the ring
        const pos = getPointOnCircle(middleAngle, labelRadius);
        
        // Lord abbreviations
        const lordAbbr = {
          'Ketu': 'Ke',
          'Venus': 'Ve',
          'Sun': 'Su',
          'Moon': 'Mo',
          'Mars': 'Ma',
          'Rahu': 'Ra',
          'Jupiter': 'Ju',
          'Saturn': 'Sa',
          'Mercury': 'Me'
        };
        
        // Calculate text rotation
        let textRotation = ((middleAngle + Math.PI / 2) * 180) / Math.PI;
        if (textRotation > 90 && textRotation < 270) {
          textRotation = textRotation + 180;
        }
        
        return (
          <g key={`nakshatra-label-${planetName}`}>
            {/* Background circle */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r="12"
              fill="#000000"
              fillOpacity="0.8"
              stroke={lordColors[nakshatraLord]}
              strokeWidth="2"
            />
            
            {/* Show NAKSHATRA LORD (not planet name!) */}
            <text
              x={pos.x}
              y={pos.y + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill={lordColors[nakshatraLord]}
              transform={`rotate(${textRotation} ${pos.x} ${pos.y + 4})`}
            >
              {lordAbbr[nakshatraLord]}
            </text>
          </g>
        );
      })}

      {/* Border circles */}
      <circle cx="0" cy="0" r={outerRadius} fill="none" stroke="#666666" strokeWidth="1.5" opacity="0.5" />
      <circle cx="0" cy="0" r={innerRadius} fill="none" stroke="#666666" strokeWidth="1.5" opacity="0.5" />
    </g>
  );
}

export default NakshatraRing;