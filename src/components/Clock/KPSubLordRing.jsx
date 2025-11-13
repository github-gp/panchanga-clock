import React from 'react';
import { generateKPSubLords, KP_COLORS } from '../../utils/kpSubLords';
import { getPointOnCircle } from '../../utils/nakshatras';

function KPSubLordRing({ showKPSubLords }) {
  if (!showKPSubLords) return null;

  const outerRadius = 285;  // Outside Nakshatra ring
  const innerRadius = 275;  // Thin ring
  const subLords = generateKPSubLords();

  return (
    <g className="kp-sublord-ring">
      {/* Draw each sub-lord division */}
      {subLords.map((sub) => {
        const startAngle = (sub.startDegree * Math.PI) / 180;
        const endAngle = (sub.endDegree * Math.PI) / 180;
        
        const outerStart = getPointOnCircle(startAngle, outerRadius);
        const outerEnd = getPointOnCircle(endAngle, outerRadius);
        const innerStart = getPointOnCircle(startAngle, innerRadius);
        const innerEnd = getPointOnCircle(endAngle, innerRadius);
        
        // For very small arcs, use straight line, otherwise use arc
        const isLargeArc = (sub.endDegree - sub.startDegree) > 180 ? 1 : 0;
        
        const pathData = `
          M ${outerStart.x} ${outerStart.y}
          A ${outerRadius} ${outerRadius} 0 ${isLargeArc} 1 ${outerEnd.x} ${outerEnd.y}
          L ${innerEnd.x} ${innerEnd.y}
          A ${innerRadius} ${innerRadius} 0 ${isLargeArc} 0 ${innerStart.x} ${innerStart.y}
          Z
        `;
        
        return (
          <path
            key={sub.id}
            d={pathData}
            fill={KP_COLORS[sub.subLord]}
            fillOpacity="0.6"
            stroke="#333"
            strokeWidth="0.2"
          />
        );
      })}
      
      {/* Border circles */}
      <circle cx="0" cy="0" r={outerRadius} fill="none" stroke="#666" strokeWidth="1" opacity="0.5" />
      <circle cx="0" cy="0" r={innerRadius} fill="none" stroke="#666" strokeWidth="1" opacity="0.5" />
      
        {/* Show all sub-lord labels */}
        {subLords.map((sub) => {
          // Only show if sub-lord width is big enough (> 0.5°)
          if (sub.spanDegrees < 0.5) return null;
          
          const angle = ((sub.startDegree + (sub.spanDegrees / 2)) * Math.PI) / 180;
          const labelRadius = 280;
          const pos = getPointOnCircle(angle, labelRadius);
          
          // Planet abbreviation mapping
          const abbr = {
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
          
          // Calculate text rotation for better readability
          let textRotation = ((angle + Math.PI / 2) * 180) / Math.PI;
          if (textRotation > 90 && textRotation < 270) {
            textRotation = textRotation + 180;
          }
          
          return (
            <text
              key={`label-${sub.id}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              fontSize="5"
              fill="#FFF"
              fontWeight="bold"
              opacity="0.7"
              transform={`rotate(${textRotation} ${pos.x} ${pos.y})`}
            >
              {abbr[sub.subLord]}
            </text>
          );
        })}
    </g>
  );
}

export default KPSubLordRing;
