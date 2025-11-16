import React from 'react';
import { RASHIS, getRashiAngle, getCurrentMoonRashi } from '../../utils/rashis';
import { getPointOnCircle } from '../../utils/nakshatras';
// ⭐ NEW: Import theme hook
import { useTheme } from '../../ThemeContext';

function RashiRing({ currentMoonLongitude }) {
  // ⭐ NEW: Get theme
  const { theme } = useTheme();

  // Radius settings for the Rashi ring (inside Nakshatra ring)
  const outerRadius = 220;  // Outer edge of Rashi ring
  const innerRadius = 170;  // Inner edge of Rashi ring
  const textRadius = 195;   // Where text will be placed

  // Get current Moon's Rashi for highlighting
  const currentMoonRashi = getCurrentMoonRashi();

  // Calculate one Rashi's angle span
  const rashiSpan = (2 * Math.PI) / 12; // Full circle / 12 = 30° each

  return (
    <g className="rashi-ring">
      {/* Draw each Rashi section */}
      {RASHIS.map((rashi, index) => {
        // Calculate start and end angles for this Rashi
        const startAngle = getRashiAngle(index);
        const endAngle = getRashiAngle(index + 1);
        
        // Calculate points for the arc
        const outerStart = getPointOnCircle(startAngle, outerRadius);
        const outerEnd = getPointOnCircle(endAngle, outerRadius);
        const innerStart = getPointOnCircle(startAngle, innerRadius);
        const innerEnd = getPointOnCircle(endAngle, innerRadius);

        // Create SVG path for this Rashi section (larger than Nakshatra)
        const pathData = `
          M ${outerStart.x} ${outerStart.y}
          A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}
          L ${innerEnd.x} ${innerEnd.y}
          A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}
          Z
        `;

        // Calculate text position (middle of the Rashi)
        const textAngle = startAngle + (rashiSpan / 2);
        const textPos = getPointOnCircle(textAngle, textRadius);

        // Calculate text rotation
        let textRotation = ((textAngle + Math.PI / 2) * 180) / Math.PI;
        
        // Flip text on bottom half so it's always readable
        if (textRotation > 90 && textRotation < 270) {
          textRotation = textRotation + 180;
        }

        // Check if this is the current Moon's Rashi
        const isCurrentRashi = currentMoonLongitude &&
          currentMoonLongitude >= rashi.startDegree &&
          currentMoonLongitude < rashi.endDegree;

        // ⭐ NEW: Text colors based on theme
        // For Rashi symbols and English names - always visible
        const symbolColor = theme === 'dark' ? '#ffffff' : '#1a1a1a';
        const englishColor = theme === 'dark' ? '#ffffff' : '#2c3e50';
        // Sanskrit names - slightly lighter
        const sanskritColor = theme === 'dark' ? '#cccccc' : '#495057';

        return (
          <g key={rashi.id}>
            {/* Colored section for this Rashi */}
            <path
              d={pathData}
              fill={rashi.color}
              fillOpacity={isCurrentRashi ? 0.7 : 0.4}  // Brighter if current
              stroke="#D4AF37"
              strokeWidth={isCurrentRashi ? 3 : 1.5}    // Thicker if current
            />

            {/* Zodiac Symbol (large) */}
            <text
              x={textPos.x}
              y={textPos.y - 8}
              textAnchor="middle"
              fontSize="24"
              fill={symbolColor}  // ⭐ CHANGED: Now uses theme-aware color
              fontWeight="bold"
              transform={`rotate(${textRotation} ${textPos.x} ${textPos.y - 8})`}
            >
              {rashi.symbol}
            </text>

            {/* English name */}
            <text
              x={textPos.x}
              y={textPos.y + 10}
              textAnchor="middle"
              fontSize="11"
              fill={englishColor}  // ⭐ CHANGED: Now uses theme-aware color
              fontWeight="600"
              transform={`rotate(${textRotation} ${textPos.x} ${textPos.y + 10})`}
            >
              {rashi.english}
            </text>

            {/* Sanskrit name (smaller) */}
            <text
              x={textPos.x}
              y={textPos.y + 22}
              textAnchor="middle"
              fontSize="9"
              fill={sanskritColor}  // ⭐ CHANGED: Now uses theme-aware color
              transform={`rotate(${textRotation} ${textPos.x} ${textPos.y + 22})`}
            >
              {rashi.name}
            </text>
          </g>
        );
      })}

      {/* Draw dividing lines between Rashis */}
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
            stroke="#8B7355"
            strokeWidth="2"
            opacity="0.6"
          />
        );
      })}

      {/* Optional: Add decorative border circles */}
      <circle
        cx="0"
        cy="0"
        r={outerRadius}
        fill="none"
        stroke="#D4AF37"
        strokeWidth="2"
        opacity="0.5"
      />
      <circle
        cx="0"
        cy="0"
        r={innerRadius}
        fill="none"
        stroke="#D4AF37"
        strokeWidth="2"
        opacity="0.5"
      />
    </g>
  );
}

export default RashiRing;