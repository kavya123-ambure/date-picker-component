"use client";
import React, { useState } from 'react';

const RecurrenceOptions = ({ onRecurrenceChange }) => {
  const [frequency, setFrequency] = useState('daily'); // Frequency (daily, weekly, monthly, yearly)
  const [nthDay, setNthDay] = useState(1); // Nth day for the recurrence
 
  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleNthDayChange = (event) => {
    setNthDay(parseInt(event.target.value));
  };

  

  const handleSubmit = () => {
    const recurrenceData = {
      frequency,
      nthDay,
     
    };
    onRecurrenceChange(recurrenceData);
  };


  return (
    <div className="recurrence-options">
       {/* Input for nth day */}
       <label className="block font-semibold mb-2">Select gap between Days/Weeks/Monthly/Yearly:</label>
      <input
        type="number"
        name="nthDay"
        min="1"
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
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <div key={day} className="mb-2">
               <input
                type="checkbox"
                name="specificDays"
                value={day}
               
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
          <select name="nthWeekDay"  className="w-full p-2 mb-4 text-gray-700">
            <option value={1}>1st</option>
            <option value={2}>2nd</option>
            <option value={3}>3rd</option>
            <option value={4}>4th</option>
            <option value={5}>Last</option>
          </select>

          {/* Specific Day of the Week */}
          <label className="block  font-semibold mb-2">
            Select Specific Day of the month
            </label>
            <select
           
            className="border border-gray-300 rounded p-2 mb-4 w-full text-gray-700"
          >
            <option value="">Select a day</option>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
</div>
      )}


      {/* Submit Button */}
      <button onClick={handleSubmit} className="my-2 p-2 bg-purple-500 text-white">
        Set Recurrence
      </button>
    </div>
  );
};

export default RecurrenceOptions;
