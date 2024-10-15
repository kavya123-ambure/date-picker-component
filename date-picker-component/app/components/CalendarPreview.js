"use client";

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'; // Importing react-calendar
import 'react-calendar/dist/Calendar.css'; // Importing calendar CSS for basic styling
import '../globals.css'; // Ensure this path is correct for your project

const CalendarPreview = ({ startDate, endDate, recurrence }) => {
  const [recurringDates, setRecurringDates] = useState([]);

  const dayOfWeekMap = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
  };


  useEffect(() => {
    console.log("CalendarPreview Props: ", { startDate, endDate, recurrence });
    if (startDate && recurrence) {
      const generatedDates = generateRecurringDates();
      setRecurringDates(generatedDates);
    }
  }, [startDate, endDate, recurrence]);

  const generateRecurringDates = () => {
    if (!startDate || !recurrence?.frequency) {
      console.warn("Invalid startDate or recurrence:", { startDate, recurrence });
      return [];
    }
  
    const dates = [];
    let currentDate = new Date(startDate); // Start from the given start date
    const { frequency, nthDay } = recurrence;
  
    // Loop to generate recurring dates
    while ((!endDate || currentDate <= endDate) && dates.length < 50) {
      // Add currentDate to the list of recurring dates
      dates.push(new Date(currentDate));
  
      // Calculate the next date based on the recurrence pattern
      switch (frequency) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() + nthDay);
          break;
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + nthDay * 7);
          break;
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + nthDay);
          break;
        case 'yearly':
          currentDate.setFullYear(currentDate.getFullYear() + nthDay);
          break;
        default:
          console.error("Unsupported frequency:", frequency);
          return [];
      }
    }
  
    return dates;
  };
  

 
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isRecurringDate = recurringDates.some(
        (recurringDate) =>
          new Date(recurringDate).toDateString() === new Date(date).toDateString() 
      );
      return isRecurringDate ? 'highlight' : null;
    }
  };

  return (
    <div className="calendar-preview bg-white p-6 rounded-lg shadow-lg text-gray-800">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3 text-center text-purple-700">Selected Dates</h3>
        <div className="bg-gray-100 p-2 rounded-md">
          <p className="mb-2">
            <span className="font-semibold text-purple-600 pr-2">Start Date:</span>
            {startDate ? startDate.toDateString() : "Not selected"}
          </p>
          <p>
            <span className="font-semibold text-purple-600 pr-2">End Date:</span>
            {endDate ? endDate.toDateString() : "Not selected"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-3 text-purple-700">Recurring Dates:</h3>
        <div className="bg-gray-100 p-4 rounded-md">
          {recurringDates.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {recurringDates.map((date, index) => (
                <li key={index}>{date.toDateString()}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No recurring dates generated.</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-2xl  font-semibold my-5 p-3  text-center text-purple-700 ">Mini Calendar Preview:</h3>
        <div className="calendar-container flex flex-col items-center text-purple-700 bg-purple">
          <Calendar value={new Date()} tileClassName={tileClassName} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPreview;
