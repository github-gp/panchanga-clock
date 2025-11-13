import React from 'react';
import { RASHIS, getRashiAngle } from '../../utils/rashis';
import { getPointOnCircle } from '../../utils/nakshatras';

function RashiRing({ currentMoonLongitude }) {
  const outerRadius = 230;
  const innerRadius = 180;
  const textRadius = 205;

  const rashiSpan = (2 * Math.PI) / 12;

  // Softer, eye-friendly colors
  const softRashiColors = {
    'Mesha': '#FF8A8080',      // Soft red
    'Vrishabha': '#90EE9080',  // Soft green
    'Mithuna': '#FFD70080',    // Soft yellow
    'Karka': '#87CEEB80',      // Soft blue
    'Simha': '#FFA50080',      // Soft orange
    'Kanya': '#98FB9880',      // Soft mint
    'Tula': '#DDA0DD80',       // Soft purple
    'Vrischika': '#20B2AA80',  // Soft teal
    'Dhanu': '#F4A46080',      // Soft coral
    'Makara': '#8FBC8F80',     // Soft sage
    'Kumbha': '#B0C4DE80',     // Soft steel blue
    'Meena': '#DEB88780'       // Soft pink
  };

  return (
    <g className="rashi-ring">
      {RASHIS.map((rashi, index) => {
        const startAngle = getRashiAngle(index);
        const endAngle = getRashiAngle(index + 1);
        
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

        const textAngle = startAngle + (rashiSpan / 2);
        const textPos = getPointOnCircle(textAngle, textRadius);
        let textRotation = ((textAngle + Math.PI / 2) * 180) / Math.PI;
        
        if (textRotation > 90 && textRotation < 270) {
          textRotation = textRotation + 180;
        }

        const isCurrentRashi = currentMoonLongitude &&
          currentMoonLongitude >= rashi.startDegree &&
          currentMoonLongitude < rashi.endDegree;

        return (
          <g key={rashi.id}>
            {/* Colored section */}
            <path
              d={pathData}
              fill={softRashiColors[rashi.name] || rashi.color}
              fillOpacity={isCurrentRashi ? 0.7 : 0.3}
              stroke={isCurrentRashi ? "#FFD700" : "#8B7355"}
              strokeWidth={isCurrentRashi ? 2.5 : 1}
            />

            {/* Large zodiac symbol */}
            <text
              x={textPos.x}
              y={textPos.y - 5}
              textAnchor="middle"
              fontSize="20"
              fill={isCurrentRashi ? "#FFD700" : "#FFFFFF"}
              fontWeight="bold"
              transform={`rotate(${textRotation} ${textPos.x} ${textPos.y - 5})`}
            >
              {rashi.symbol}
            </text>

            {/* English name only - cleaner! */}
            <text
              x={textPos.x}
              y={textPos.y + 12}
              textAnchor="middle"
              fontSize="10"
              fill={isCurrentRashi ? "#FFD700" : "#DDDDDD"}
              fontWeight={isCurrentRashi ? "bold" : "normal"}
              transform={`rotate(${textRotation} ${textPos.x} ${textPos.y + 12})`}
            >
              {rashi.english}
            </text>
          </g>
        );
      })}

      {/* Dividing lines */}
      {RASHIS.map((rashi, index) => {
        const angle = getRashiAngle(index);
        const outerPoint = getPointOnCircle(angle, outerRadius);
        const innerPoint = getPointOnCircle(angle, innerRadius);

        return (
          <line
            key={`line-${rashi.id}`}
            x1={innerPoint.x}
            y1={innerPoint.y}
            x2={outerPoint.x}
            y2={outerPoint.y}
            stroke="#666666"
            strokeWidth="1"
            opacity="0.4"
          />
        );
      })}

      {/* Border circles */}
      <circle cx="0" cy="0" r={outerRadius} fill="none" stroke="#8B7355" strokeWidth="1.5" opacity="0.4" />
      <circle cx="0" cy="0" r={innerRadius} fill="none" stroke="#8B7355" strokeWidth="1.5" opacity="0.4" />
    </g>
  );
}

export default RashiRing;