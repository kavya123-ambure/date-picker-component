import React, { useState } from 'react';

const RecurrenceOptions = ({ onRecurrenceChange }) => {
  const [frequency, setFrequency] = useState('daily'); // Frequency (daily, weekly, monthly, yearly)
  const [nthDay, setNthDay] = useState(0); // Nth day for the recurrence
  const [specificDays, setSpecificDays] = useState([]); // Store selected days
  const [nthWeekDay, setNthWeekDay] = useState(1);
  
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  const handleFrequencyChange = (event) => {
    const newFrequency = event.target.value;
    if (newFrequency !== frequency) {
      setSpecificDays([]); // Clear specific days
      setNthWeekDay(1);    // Reset nth weekday
      setNthDay(0);        // Reset nth day
    }

    setFrequency(newFrequency);
  };

  const handleNthDayChange = (event) => {
    setNthDay(parseInt(event.target.value));
  };

  const handleDayChange = (event) => {
    const day = event.target.value;
    setSpecificDays((prevDays) => 
      prevDays.includes(day) 
        ? prevDays.filter((d) => d !== day) 
        : [...prevDays, day]
    );
  };

  const handleNthWeekDayChange = (event) => {
    setNthWeekDay(parseInt(event.target.value));
  };

  const handleSubmit = () => {
    const recurrenceData = {
      frequency,
      nthDay,
      specificDays,
      nthWeekDay,
    };
    console.log("Recurrence Data: ", recurrenceData); // Log recurrence data for validation
    onRecurrenceChange(recurrenceData);
  };


  return (
    <div className="recurrence-options">
      
       <label className="block font-semibold mb-2">Select gap between Days/Weeks/Monthly/Yearly:</label>
      <input
        type="number"
        name="nthDay"
        min="0"
        value={nthDay}
        onChange={handleNthDayChange}
        className="border text-gray-700  border-gray-300 p-2 rounded-md mb-3 "
      />

<label className="block font-semibold mb-2 ">Recurrence Pattern:</label>
      <select name="frequency" value={frequency} onChange={handleFrequencyChange} className="w-full p-2 mb-4 text-gray-700">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

     
      {/* Weekly Recurrence - Specific Days */}
      {frequency === 'weekly' &&  (
        <div>
          <label className="block  font-semibold mb-2">
            Select Specific Days of the Week:
          </label>
          {weekDays.map((day) => (
            <div key={day} className="mb-1">
              <input
                type="checkbox"
                value={day}
                checked={specificDays.includes(day)}
                onChange={handleDayChange}
              />
              <label className="pl-2">{day}</label>
            </div>
          ))}
        </div>
      )}
       {/* Monthly Recurrence - Specific Days and Nth Occurrence */}
       {frequency === 'monthly' && (
        <div>
          {/* Nth Occurrence Selector */}
          <label className="block  font-semibold mb-2 ">
            Select Nth Occurrence of the Day:
          </label>
          <select name="nthWeekDay" value={nthWeekDay} onChange={handleNthWeekDayChange} className="w-full p-2 mb-4 text-gray-700">
            <option value={1}>1st</option>
            <option value={2}>2nd</option>
            <option value={3}>3rd</option>
            <option value={4}>4th</option>
            <option value={5}>5t</option>
          </select>

          {/* Specific Day of the Week */}
          <label className="block  font-semibold mb-2">
            Select Specific Day of the month
            </label>
            <select
           
            className="border border-gray-300 rounded p-2 mb-4 w-full text-gray-700"
              value={specificDays[0] || ''}
            onChange={(e) => setSpecificDays([e.target.value])}
          >
            <option value=" ">Select a day</option>
            {weekDays.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
</div>
      )}


      {/* Submit Button */}
      <button onClick={handleSubmit} className="my-2 p-2 bg-purple-700 text-white">
        Set Recurrence
      </button>
    </div>
  );
};

export default RecurrenceOptions;
