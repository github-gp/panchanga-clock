import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeContext';
import { generateKPSubLords } from '../../utils/kpSubLords';

function EventTracker({ panchangaData, selectedDate }) {
  const { colors } = useTheme();
  const [events, setEvents] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [eventType, setEventType] = useState('good');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('panchangaEvents');
    if (stored) {
      try {
        const parsedEvents = JSON.parse(stored);
        const migratedEvents = parsedEvents.map(event => {
          if (event.planets) {
            const migratedPlanets = {};
            Object.entries(event.planets).forEach(([planetName, data]) => {
              const { longitude, ...cleanData } = data;
              migratedPlanets[planetName] = cleanData;
            });
            return { ...event, planets: migratedPlanets };
          }
          return event;
        });
        setEvents(migratedEvents);
      } catch (e) {
        console.error('Error loading events:', e);
        setEvents([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('panchangaEvents', JSON.stringify(events));
  }, [events]);

  const getSignLord = (signName) => {
    const signLords = {
      'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury',
      'Cancer': 'Moon', 'Leo': 'Sun', 'Virgo': 'Mercury',
      'Libra': 'Venus', 'Scorpio': 'Mars', 'Sagittarius': 'Jupiter',
      'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
    };
    return signLords[signName] || 'N/A';
  };

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

  const getKPSubLord = (longitude) => {
    const subLords = generateKPSubLords();
    const subLord = subLords.find(sub => 
      longitude >= sub.startDegree && longitude < sub.endDegree
    );
    return subLord ? subLord.subLord : 'N/A';
  };

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

  const getPadaFromLongitude = (longitude) => {
    const positionInNakshatra = (longitude % 13.333333);
    const pada = Math.floor(positionInNakshatra / 3.333333) + 1;
    return pada;
  };

  const getSignFromLongitude = (longitude) => {
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    const signIndex = Math.floor((longitude % 360) / 30);
    return signs[signIndex] || 'N/A';
  };

  // Proper CSV escaping function
  const escapeCsvField = (field) => {
    // Convert to string
    const str = String(field);
    // If contains comma, newline, or quote, wrap in quotes and escape internal quotes
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const captureEventData = () => {
    if (!panchangaData || !description.trim()) return;

    const eventData = {
      id: Date.now(),
      timestamp: selectedDate.toISOString(),
      type: eventType,
      description: description.trim(),
      planets: {}
    };

    const getPlanetData = (planetName) => {
      const lowerName = planetName.toLowerCase();
      if (panchangaData[lowerName]) return panchangaData[lowerName];
      if (panchangaData.planets && panchangaData.planets[planetName]) {
        return panchangaData.planets[planetName];
      }
      return null;
    };

    const planetNames = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'];

    planetNames.forEach(planetName => {
      const planetData = getPlanetData(planetName);

      if (planetData && planetData.longitude !== undefined) {
        const longitude = Number(planetData.longitude);
        const signName = planetData.sign || planetData.rashi || getSignFromLongitude(longitude);
        const nakshatraName = planetData.nakshatra || getNakshatraFromLongitude(longitude);
        const pada = planetData.pada || getPadaFromLongitude(longitude);
        const kpSubLord = getKPSubLord(longitude);

        eventData.planets[planetName] = {
          signLord: getSignLord(signName),
          nakshatraLord: getNakshatraLord(nakshatraName),
          pada: pada,
          subLord: kpSubLord
        };
      }
    });

    setEvents([eventData, ...events]);
    setDescription('');
    setShowForm(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const downloadCSV = () => {
    if (events.length === 0) return;

    const headers = [
      'Timestamp', 'Type', 'Description',
      'Sun_SignLord', 'Sun_NakshatraLord', 'Sun_Pada', 'Sun_SubLord',
      'Moon_SignLord', 'Moon_NakshatraLord', 'Moon_Pada', 'Moon_SubLord',
      'Mercury_SignLord', 'Mercury_NakshatraLord', 'Mercury_Pada', 'Mercury_SubLord',
      'Venus_SignLord', 'Venus_NakshatraLord', 'Venus_Pada', 'Venus_SubLord',
      'Mars_SignLord', 'Mars_NakshatraLord', 'Mars_Pada', 'Mars_SubLord',
      'Jupiter_SignLord', 'Jupiter_NakshatraLord', 'Jupiter_Pada', 'Jupiter_SubLord',
      'Saturn_SignLord', 'Saturn_NakshatraLord', 'Saturn_Pada', 'Saturn_SubLord',
      'Rahu_SignLord', 'Rahu_NakshatraLord', 'Rahu_Pada', 'Rahu_SubLord',
      'Ketu_SignLord', 'Ketu_NakshatraLord', 'Ketu_Pada', 'Ketu_SubLord'
    ];

    const rows = events.map(event => {
      const planetOrder = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'];
      const planetData = planetOrder.map(p => {
        const planet = event.planets[p] || {};
        return [
          escapeCsvField(planet.signLord || ''),
          escapeCsvField(planet.nakshatraLord || ''),
          escapeCsvField(planet.pada || ''),
          escapeCsvField(planet.subLord || '')
        ];
      }).flat();

      const timestamp = new Date(event.timestamp).toLocaleString('en-IN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });

      return [
        escapeCsvField(timestamp),
        escapeCsvField(event.type),
        escapeCsvField(event.description),
        ...planetData
      ];
    });

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `panchanga_events_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div style={{
      width: '100%', maxWidth: '900px', margin: '30px auto',
      backgroundColor: colors.cardBackground, border: `2px solid ${colors.border}`,
      borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', overflow: 'hidden'
    }}>
      <div style={{
        padding: '12px 16px', borderBottom: `1px solid ${colors.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: colors.background
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: colors.text, fontWeight: '600' }}>
          📝 Event Tracker ({events.length} events)
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {events.length > 0 && (
            <button onClick={downloadCSV} title="Download CSV"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '4px 8px' }}>
              ⬇️
            </button>
          )}
          <button onClick={() => setShowForm(!showForm)} title={showForm ? "Cancel" : "Add Event"}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '4px 8px' }}>
            {showForm ? '✖️' : '➕'}
          </button>
          <button onClick={() => setIsExpanded(!isExpanded)} title={isExpanded ? "Collapse" : "Expand"}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '4px 8px' }}>
            {isExpanded ? '🔽' : '▶️'}
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{ padding: '16px', borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.background }}>
          <div style={{ marginBottom: '12px', display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" value="good" checked={eventType === 'good'} 
                onChange={(e) => setEventType(e.target.value)} style={{ cursor: 'pointer' }} />
              <span style={{ color: '#4ade80', fontWeight: '600' }}>✅ Good Time</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" value="bad" checked={eventType === 'bad'} 
                onChange={(e) => setEventType(e.target.value)} style={{ cursor: 'pointer' }} />
              <span style={{ color: '#f87171', fontWeight: '600' }}>❌ Bad Time</span>
            </label>
          </div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: colors.textMuted }}>
            Recording for: {formatDate(selectedDate.toISOString())}
          </div>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what happened at this moment..."
            style={{
              width: '100%', minHeight: '80px', padding: '10px', borderRadius: '6px',
              border: `1px solid ${colors.border}`, backgroundColor: colors.cardBackground,
              color: colors.text, fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit'
            }} />
          <button onClick={captureEventData} disabled={!description.trim()}
            style={{
              marginTop: '8px', width: '100%', padding: '10px',
              backgroundColor: description.trim() ? '#3b82f6' : '#94a3b8',
              color: 'white', border: 'none', borderRadius: '6px',
              cursor: description.trim() ? 'pointer' : 'not-allowed',
              fontWeight: '600', fontSize: '14px'
            }}>
            💾 Save Event
          </button>
        </div>
      )}

      {isExpanded && (
        <div style={{ maxHeight: '500px', overflowY: 'auto', padding: '12px' }}>
          {events.length === 0 ? (
            <p style={{ textAlign: 'center', color: colors.textMuted, padding: '40px 20px', fontSize: '14px' }}>
              No events recorded yet. Click ➕ to add your first event!
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {events.map(event => (
                <div key={event.id} style={{
                  padding: '14px', backgroundColor: colors.cardBackground,
                  borderLeft: `4px solid ${event.type === 'good' ? '#4ade80' : '#f87171'}`,
                  borderRadius: '8px', position: 'relative', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <button onClick={() => deleteEvent(event.id)}
                    style={{
                      position: 'absolute', top: '10px', right: '10px', background: 'none',
                      border: 'none', cursor: 'pointer', fontSize: '16px', opacity: 0.5
                    }} title="Delete event">
                    🗑️
                  </button>
                  <div style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '6px', fontWeight: '500' }}>
                    {formatDate(event.timestamp)}
                  </div>
                  <div style={{ fontSize: '15px', color: colors.text, marginBottom: '10px', paddingRight: '30px', lineHeight: '1.5' }}>
                    {event.description}
                  </div>
                  <details style={{ fontSize: '12px' }}>
                    <summary style={{ cursor: 'pointer', color: colors.primary, fontWeight: '600', padding: '4px 0', userSelect: 'none' }}>
                      🔮 Planetary Lordships ({Object.keys(event.planets).length} planets)
                    </summary>
                    <div style={{ marginTop: '10px', display: 'grid', gap: '6px', backgroundColor: colors.background, padding: '10px', borderRadius: '6px' }}>
                      {Object.entries(event.planets).map(([planet, data]) => (
                        <div key={planet} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', fontSize: '11px', padding: '4px 0', borderBottom: `1px solid ${colors.border}` }}>
                          <span style={{ fontWeight: '700', color: colors.accentText }}>{planet}:</span>
                          <span style={{ color: colors.text }}>
                            Sign: {data.signLord} | Naksh: {data.nakshatraLord} | Pada: {data.pada} | Sub: {data.subLord}
                          </span>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EventTracker;