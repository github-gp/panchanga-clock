import React from 'react';
import { generateKPSubLords, KP_COLORS } from '../../utils/kpSubLords';
import { getPointOnCircle } from '../../utils/nakshatras';

function KPSubLordRing({ showKPSubLords, planets }) {
  if (!showKPSubLords) return null;

  const outerRadius = 295;
  const innerRadius = 270;
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
      
      {/* ONLY show sub-lord labels where planets are located */}
      {planets && Object.entries(planets).map(([planetName, planetData]) => {
        if (!planetData || planetData.longitude === undefined) return null;
        
        // Find which sub-lord this planet is in
        const planetLongitude = planetData.longitude;
        const subLord = subLords.find(sub => 
          planetLongitude >= sub.startDegree && 
          planetLongitude < sub.endDegree
        );
        
        if (!subLord) return null;
        
        // Calculate position for label (middle of sub-lord section)
        const middleAngle = ((subLord.startDegree + subLord.endDegree) / 2 * Math.PI) / 180;
        const labelRadius = 280;
        const pos = getPointOnCircle(middleAngle, labelRadius);
        
        // Sub-lord abbreviations
        const subLordAbbr = {
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
        
        // Calculate text rotation for readability
        let textRotation = ((middleAngle + Math.PI / 2) * 180) / Math.PI;
        if (textRotation > 90 && textRotation < 270) {
          textRotation = textRotation + 180;
        }
        
        return (
          <g key={`kp-label-${planetName}`}>
            {/* Background circle for visibility */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r="12"
              fill="#000000"
              fillOpacity="0.8"
              stroke={KP_COLORS[subLord.subLord]}
              strokeWidth="1"
            />
            
            {/* ONLY Sub-lord name - BIGGER and centered */}
            <text
              x={pos.x}
              y={pos.y + 5}
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill={KP_COLORS[subLord.subLord]}
              transform={`rotate(${textRotation} ${pos.x} ${pos.y + 5})`}
            >
              {subLordAbbr[subLord.subLord]}
            </text>
            
            {/* Connecting line from label to ring */}
            <line
              x1={pos.x}
              y1={pos.y}
              x2={getPointOnCircle(middleAngle, outerRadius).x}
              y2={getPointOnCircle(middleAngle, outerRadius).y}
              stroke={KP_COLORS[subLord.subLord]}
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.7"
            />
          </g>
        );
      })}
    </g>
  );
}

export default KPSubLordRing;