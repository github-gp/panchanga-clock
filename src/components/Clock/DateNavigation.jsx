import React from 'react';
import { useTheme } from '../../ThemeContext';

/**
 * DateTimeNavigation Component
 * Date and time selection placed below the clock
 */
function DateNavigation({ selectedDate, onDateChange }) {
  const { colors } = useTheme();

  // Format date for display
  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format date for input field (YYYY-MM-DD)
  const formatInputDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format time for input field (HH:MM)
  const formatInputTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Go to today (with current time)
  const goToToday = () => {
    onDateChange(new Date());
  };

  // Handle date picker change
  const handleDatePickerChange = (e) => {
    const newDate = new Date(selectedDate);
    const [year, month, day] = e.target.value.split('-');
    newDate.setFullYear(parseInt(year));
    newDate.setMonth(parseInt(month) - 1);
    newDate.setDate(parseInt(day));
    onDateChange(newDate);
  };

  // Handle time picker change
  const handleTimePickerChange = (e) => {
    const newDate = new Date(selectedDate);
    const [hours, minutes] = e.target.value.split(':');
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));
    newDate.setSeconds(0);
    onDateChange(newDate);
  };

  // Check if selected date/time is now
  const isNow = () => {
    const now = new Date();
    const diff = Math.abs(selectedDate - now);
    return diff < 60000; // Within 1 minute
  };

  return (
    <div style={{
      marginTop: '24px',
      padding: '24px',
      background: colors.cardBackground,
      borderRadius: '16px',
      maxWidth: '700px',
      margin: '24px auto 0',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    }}>
      {/* Current Date & Time Display */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
      }}>
        <div style={{
          fontSize: '13px',
          color: colors.tertiaryText,
          marginBottom: '8px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          📅 Viewing Panchanga For
        </div>
        <div style={{
          fontSize: '20px',
          fontWeight: 600,
          color: colors.primaryText,
          marginBottom: '4px',
          transition: 'color 0.3s ease',
        }}>
          {formatDisplayDate(selectedDate)}
        </div>
        <div style={{
          fontSize: '16px',
          fontWeight: 500,
          color: colors.secondaryText,
          transition: 'color 0.3s ease',
        }}>
          {formatInputTime(selectedDate)}
        </div>
        {!isNow() && (
          <div style={{
            fontSize: '11px',
            color: colors.accentText,
            marginTop: '6px',
            fontWeight: 500,
          }}>
            {selectedDate < new Date() ? '(Historical Data)' : '(Future Prediction)'}
          </div>
        )}
      </div>

      {/* Date and Time Pickers Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '20px',
      }}>
        {/* Date Picker */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '12px',
            color: colors.tertiaryText,
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            🗓️ Select Date
          </label>
          <input
            type="date"
            value={formatInputDate(selectedDate)}
            onChange={handleDatePickerChange}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              fontWeight: 500,
              background: colors.inputBackground,
              color: colors.inputText,
              border: `2px solid ${colors.inputBorder}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.accentText;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.buttonBackground}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = colors.inputBorder;
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Time Picker */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '12px',
            color: colors.tertiaryText,
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            🕐 Select Time
          </label>
          <input
            type="time"
            value={formatInputTime(selectedDate)}
            onChange={handleTimePickerChange}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              fontWeight: 500,
              background: colors.inputBackground,
              color: colors.inputText,
              border: `2px solid ${colors.inputBorder}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.accentText;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.buttonBackground}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = colors.inputBorder;
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Now Button - centered */}
      {!isNow() && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px',
        }}>
          <button
            onClick={goToToday}
            style={{
              padding: '12px 32px',
              background: colors.accentText,
              color: colors.svgBackground,
              border: `2px solid ${colors.accentText}`,
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            title="Return to current date and time"
          >
            🔄 Now
          </button>
        </div>
      )}

      {/* Helper Text */}
      <div style={{
        padding: '12px',
        background: colors.inputBackground,
        borderRadius: '8px',
        fontSize: '11px',
        color: colors.tertiaryText,
        textAlign: 'center',
        lineHeight: 1.6,
      }}>
        💡 <strong>Tip:</strong> Select any date and time to view historical or future Panchanga
      </div>
    </div>
  );
}

export default DateNavigation;