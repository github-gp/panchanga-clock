
import React, { useState } from 'react';
import { useTheme } from '../../ThemeContext';
import { getPanchangaData } from '../../services/astronomyService';
import { generateKPSubLords } from '../../utils/kpSubLords';

function PlanetTransitAnalyzer() {
  const { colors } = useTheme();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromTime, setFromTime] = useState('09:00');
  const [toTime, setToTime] = useState('15:00');
  const [selectedPlanet, setSelectedPlanet] = useState('Moon');
  const [results, setResults] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Available planets
  const planets = [
    { name: 'Sun', label: '☉ Sun', emoji: '☉' },
    { name: 'Moon', label: '🌙 Moon', emoji: '🌙' },
    { name: 'Mercury', label: '☿ Mercury', emoji: '☿' },
    { name: 'Venus', label: '♀ Venus', emoji: '♀' },
    { name: 'Mars', label: '♂ Mars', emoji: '♂' },
    { name: 'Jupiter', label: '♃ Jupiter', emoji: '♃' },
    { name: 'Saturn', label: '♄ Saturn', emoji: '♄' },
    { name: 'Rahu', label: '☊ Rahu', emoji: '☊' },
    { name: 'Ketu', label: '☋ Ketu', emoji: '☋' }
  ];

  // Get Sign Lord
  const getSignLord = (signName) => {
    const signLords = {
      'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury',
      'Cancer': 'Moon', 'Leo': 'Sun', 'Virgo': 'Mercury',
      'Libra': 'Venus', 'Scorpio': 'Mars', 'Sagittarius': 'Jupiter',
      'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
    };
    return signLords[signName] || 'N/A';
  };

  // Get Nakshatra Lord
  const getNakshatraLord = (nakshatraName) => {
    const nakshatraLords = {
      'Ashwini': 'Ketu', 'Bharani': 'Venus', 'Krittika': 'Sun',
      'Rohini': 'Moon', 'Mrigashira': 'Mars', 'Ardra': 'Rahu',
      'Punarvasu': 'Jupiter', 'Pushya': 'Saturn', 'Ashlesha': 'Mercury',
      'Magha': 'Ketu', 'Purva Phalguni': 'Venus', 'Uttara Phalguni': 'Sun',
      'Hasta': 'Moon', 'Chitra': 'Mars', 'Swati': 'Rahu',
      'Vishakha': 'Jupiter', 'Anuradha': 'Saturn', 'Jyeshtha': 'Mercury',
      'Mula': 'Ketu', 'Purva Ashadha': 'Venus', 'Uttara Ashadha': 'Sun',
      'Shravana': 'Moon', 'Dhanishta': 'Mars', 'Shatabhisha': 'Rahu',
      'Purva Bhadrapada': 'Jupiter', 'Uttara Bhadrapada': 'Saturn', 'Revati': 'Mercury'
    };
    return nakshatraLords[nakshatraName] || 'N/A';
  };

  // Get Nakshatra from longitude
  const getNakshatraFromLongitude = (longitude) => {
    const nakshatras = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
      'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
      'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
      'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta',
      'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];
    const nakshatraIndex = Math.floor((longitude % 360) / 13.333333);
    return nakshatras[nakshatraIndex] || 'N/A';
  };

  // Get KP SubLord from longitude
  const getKPSubLord = (longitude) => {
    const subLords = generateKPSubLords();
    const subLord = subLords.find(sub => 
      longitude >= sub.startDegree && longitude < sub.endDegree
    );
    return subLord ? subLord.subLord : 'N/A';
  };

  // Get Sign from longitude
  const getSignFromLongitude = (longitude) => {
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    const signIndex = Math.floor((longitude % 360) / 30);
    return signs[signIndex] || 'N/A';
  };

  // Abbreviate planet names
  const abbreviate = (name) => {
    const abbr = {
      'Sun': 'Su', 'Moon': 'Mo', 'Mars': 'Ma', 'Mercury': 'Me',
      'Jupiter': 'Ju', 'Venus': 'Ve', 'Saturn': 'Sa', 'Rahu': 'Ra', 'Ketu': 'Ke'
    };
    return abbr[name] || name;
  };

  const analyzePlanetTransits = () => {
    if (!fromDate || !toDate) {
      alert('Please select both From and To dates');
      return;
    }

    setIsAnalyzing(true);
    const transitData = [];

    // Parse dates
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    // Parse times
    const [fromHour, fromMin] = fromTime.split(':').map(Number);
    const [toHour, toMin] = toTime.split(':').map(Number);

    // Iterate through each date
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split('T')[0];

      // Track unique lords for this date
      const signLords = new Set();
      const nakshatraLords = new Set();
      const subLords = new Set();
      const signs = new Set();
      const nakshatras = new Set();

      // Sample every hour within the time range
      for (let hour = fromHour; hour <= toHour; hour++) {
        const checkDate = new Date(currentDate);
        checkDate.setHours(hour, hour === fromHour ? fromMin : 0, 0, 0);

        try {
          const panchangaData = getPanchangaData(checkDate);

          // Get selected planet's data
          const planetData = panchangaData[selectedPlanet.toLowerCase()];

          if (planetData && planetData.longitude !== undefined) {
            const planetLongitude = planetData.longitude;
            const planetSign = planetData.sign || planetData.rashi || getSignFromLongitude(planetLongitude);
            const planetNakshatra = planetData.nakshatra || getNakshatraFromLongitude(planetLongitude);

            // Get lords
            const signLord = getSignLord(planetSign);
            const nakshatraLord = getNakshatraLord(planetNakshatra);
            const subLord = getKPSubLord(planetLongitude);

            signs.add(planetSign);
            nakshatras.add(planetNakshatra);
            signLords.add(signLord);
            nakshatraLords.add(nakshatraLord);
            subLords.add(subLord);
          }
        } catch (error) {
          console.error('Error calculating for', checkDate, error);
        }
      }

      transitData.push({
        date: dateKey,
        displayDate: currentDate.toLocaleDateString('en-IN', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        }),
        signs: Array.from(signs),
        nakshatras: Array.from(nakshatras),
        signLords: Array.from(signLords),
        nakshatraLords: Array.from(nakshatraLords),
        subLords: Array.from(subLords)
      });

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setResults(transitData);
    setIsAnalyzing(false);
  };

  const downloadCSV = () => {
    if (results.length === 0) return;

    const headers = ['Date', 'Sign(s)', 'Nakshatra(s)', 'Sign_Lords', 'Nakshatra_Lords', 'Sub_Lords'];

    const rows = results.map(row => [
      row.displayDate,
      row.signs.join('/'),
      row.nakshatras.join('/'),
      row.signLords.map(abbreviate).join(', '),
      row.nakshatraLords.map(abbreviate).join(', '),
      row.subLords.map(abbreviate).join(', ')
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedPlanet.toLowerCase()}_transit_${fromDate}_to_${toDate}.csv`;
    link.click();
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '900px',
      margin: '30px auto',
      backgroundColor: colors.cardBackground,
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.background
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: colors.text, fontWeight: '600' }}>
          🪐 Planet Transit Analyzer
        </h3>
        <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: colors.textMuted }}>
          Analyze any planet's Sign Lord, Nakshatra Lord, and Sub-Lord across date/time ranges
        </p>
      </div>

      {/* Input Form */}
      <div style={{ padding: '20px' }}>
        {/* Planet Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '8px',
            color: colors.text
          }}>
            Select Planet
          </label>
          <select
            value={selectedPlanet}
            onChange={(e) => setSelectedPlanet(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: `2px solid ${colors.border}`,
              backgroundColor: colors.cardBackground,
              color: colors.text,
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              boxSizing: 'border-box',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center'
            }}
          >
            {planets.map(planet => (
              <option key={planet.name} value={planet.name}>
                {planet.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '20px'
        }}>
          {/* From Date */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '6px',
              color: colors.text
            }}>
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.cardBackground,
                color: colors.text,
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* To Date */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '6px',
              color: colors.text
            }}>
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.cardBackground,
                color: colors.text,
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* From Time */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '6px',
              color: colors.text
            }}>
              From Time
            </label>
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.cardBackground,
                color: colors.text,
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* To Time */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '6px',
              color: colors.text
            }}>
              To Time
            </label>
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.cardBackground,
                color: colors.text,
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyzePlanetTransits}
          disabled={isAnalyzing || !fromDate || !toDate}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: (!fromDate || !toDate) ? '#94a3b8' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: (!fromDate || !toDate) ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {isAnalyzing ? '🔄 Analyzing...' : `🔍 Analyze ${selectedPlanet} Transits`}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div style={{
          padding: '20px',
          borderTop: `1px solid ${colors.border}`,
          backgroundColor: colors.background
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: 0, fontSize: '16px', color: colors.text }}>
              {planets.find(p => p.name === selectedPlanet)?.emoji} {selectedPlanet} Transit Results ({results.length} days)
            </h4>
            <button
              onClick={downloadCSV}
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              ⬇️ Download CSV
            </button>
          </div>

          {/* Results Table */}
          <div style={{
            overflowX: 'auto',
            maxHeight: '400px',
            overflowY: 'auto',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px'
            }}>
              <thead style={{
                backgroundColor: colors.cardBackground,
                position: 'sticky',
                top: 0,
                zIndex: 1
              }}>
                <tr>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: `2px solid ${colors.border}`,
                    color: colors.text,
                    fontWeight: '600'
                  }}>Date</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: `2px solid ${colors.border}`,
                    color: colors.text,
                    fontWeight: '600'
                  }}>Sign(s)</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: `2px solid ${colors.border}`,
                    color: colors.text,
                    fontWeight: '600'
                  }}>Nakshatra(s)</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: `2px solid ${colors.border}`,
                    color: colors.text,
                    fontWeight: '600'
                  }}>Sign Lord(s)</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: `2px solid ${colors.border}`,
                    color: colors.text,
                    fontWeight: '600'
                  }}>Nakshatra Lord(s)</th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: `2px solid ${colors.border}`,
                    color: colors.text,
                    fontWeight: '600'
                  }}>Sub-Lord(s)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => (
                  <tr key={row.date} style={{
                    backgroundColor: index % 2 === 0 ? colors.background : colors.cardBackground
                  }}>
                    <td style={{
                      padding: '12px',
                      borderBottom: `1px solid ${colors.border}`,
                      color: colors.text,
                      fontWeight: '500'
                    }}>{row.displayDate}</td>
                    <td style={{
                      padding: '12px',
                      borderBottom: `1px solid ${colors.border}`,
                      color: colors.accentText,
                      fontSize: '12px'
                    }}>
                      {row.signs.join(' / ')}
                    </td>
                    <td style={{
                      padding: '12px',
                      borderBottom: `1px solid ${colors.border}`,
                      color: colors.accentText,
                      fontSize: '12px'
                    }}>
                      {row.nakshatras.join(' / ')}
                    </td>
                    <td style={{
                      padding: '12px',
                      borderBottom: `1px solid ${colors.border}`,
                      color: colors.accentText
                    }}>
                      {row.signLords.map(abbreviate).join(', ')}
                    </td>
                    <td style={{
                      padding: '12px',
                      borderBottom: `1px solid ${colors.border}`,
                      color: colors.accentText
                    }}>
                      {row.nakshatraLords.map(abbreviate).join(', ')}
                    </td>
                    <td style={{
                      padding: '12px',
                      borderBottom: `1px solid ${colors.border}`,
                      color: colors.accentText
                    }}>
                      {row.subLords.map(abbreviate).join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanetTransitAnalyzer;