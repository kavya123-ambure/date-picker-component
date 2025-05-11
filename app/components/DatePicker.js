// app/components/DatePicker.js


"use client";

import React, { useContext, useState } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';
import RecurrenceOptions from './RecurrenceOptions';
import CalendarPreview from './CalendarPreview';

const DatePicker = () => {
    const { startDate, endDate, setStartDate, setEndDate } = useContext(DatePickerContext);
    const [recurrence, setRecurrence] = useState(null); // Initialize recurrence state
    const [errors, setErrors] = useState({ start: '', end: '' }); // Combined validation state

    
    const handleStartDateChange = (event) => {
      const value = event.target.value;
      if (!value) {
        setStartDate(null);
        setErrors({ ...errors, start: '' });
        return;
      }
  
      const newStartDate = new Date(value);
      if (endDate && newStartDate > endDate) {
        setErrors({ ...errors, start: '⚠️ Start date cannot be after end date.' });
      } else {
        setErrors({ ...errors, start: '' });
        setStartDate(newStartDate);
      }
    };

    const handleEndDateChange = (event) => {
      const value = event.target.value;
      if (!value) {
        setEndDate(null);
        setErrors({ ...errors, end: '' });
        return;
      }
  
      const newEndDate = new Date(value);
      if (!startDate) {
        setErrors({ ...errors, start: '⚠️ Please select a start date first.' });
      } else if (newEndDate < startDate) {
        setErrors({ ...errors, end: '⚠️ End date cannot be before start date.' });
      } else {
        setErrors({ ...errors, end: '' });
        setEndDate(newEndDate);
      }
    };


    const handleRecurrenceChange = (recurrenceData) => {
      setRecurrence(recurrenceData); // Update the recurrence state
  };

  return (
    <div className="date-picker w-full sm:w-3/4  mx-auto p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg text-white ">

      <h2 className="text-2xl font-bold mb-4 text-center">Select Dates</h2>

       {/* Start Date */}
      <div className="date-inputs mb-6">
        <label htmlFor="start-date" className="block mb-1 text-lg">
          Start Date: 
          </label>
          <input
            type="date"
            id="start-date"
          value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={handleStartDateChange}
            className={`w-full border-none rounded-lg p-3 text-black focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 transition-all duration-300 `}
            
          />
           {errors.start && <div className="text-yellow-300 font-semibold mt-2 animate-pulse">{errors.start}</div>}
       
        </div>

        {/* End Date */}
        <div className="mb-6">
        <label htmlFor="end-date" className="block mb-1 text-lg">
          End Date: </label>
          <input
            type="date"
            id="end-date"
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={handleEndDateChange}
            className={`w-full border-none rounded-lg p-3 text-black focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 transition-all duration-300 `}
           
          />
        {errors.end && <div className="text-yellow-300 font-semibold mt-2 animate-pulse">{errors.end}</div>}
      </div>
      
 {/* Recurrence Options */}
 <RecurrenceOptions onRecurrenceChange={handleRecurrenceChange} />


{/* Calendar Preview */}
<CalendarPreview 
  startDate={startDate} 
  endDate={endDate} 
  recurrence={recurrence} 
/>

      
    </div>
  );
};

export default DatePicker;
