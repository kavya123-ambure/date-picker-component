
import React from 'react';
import Calendar from 'react-calendar'; // Importing react-calendar
import 'react-calendar/dist/Calendar.css'; // Importing calendar CSS for basic styling
import '../globals.css'; 

const CalendarPreview = ({ startDate, endDate, recurrence }) => {
  const generateRecurringDates = () => {
    if (!startDate || !recurrence?.frequency) {
      console.warn("Invalid startDate or recurrence:", { startDate, recurrence });
      return [];
    }
    const dates = [];
    const { frequency, nthDay, specificDays = [], nthWeekDay } = recurrence;
    let currentDate = new Date(startDate);
    const endDateObj = endDate ? new Date(endDate) : null;
    const dayOfWeekMap = {
      "Sunday": 0,
      "Monday": 1,
      "Tuesday": 2,
      "Wednesday": 3,
      "Thursday": 4,
      "Friday": 5,
      "Saturday": 6,
    };

    const specificDayIndices = specificDays.map(day => dayOfWeekMap[day]);
    // Generate weekly recurrence with specific days
    while (!endDateObj || currentDate <= endDateObj)  {

        if (!endDateObj && dates.length >= 48) break;
      if (frequency === 'weekly' ) {
        if (specificDays.length === 0) {
          if ((!endDateObj || currentDate <= endDateObj)) {
            dates.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 7 * (nthDay + 1));
        } 
        else {
          // Go through each day of the week only if in selected specific days
          for (let i = 0; i < 7; i++) {
            const dayOfWeek = (currentDate.getDay() + i) % 7;
            if (specificDayIndices.includes(dayOfWeek)){
              const date = new Date(currentDate);
              date.setDate(date.getDate() + i);
              if ((!endDateObj || date <= endDateObj) && date >= startDate) {
                dates.push(new Date(date));
              }
            }
          }
          // Advance by "nthDay" number of weeks
          currentDate.setDate(currentDate.getDate() + 7 * (nthDay + 1));

         }
       } 
       else if (frequency === 'monthly') {
        if (specificDays.length === 0) {
          if ((!endDateObj || currentDate <= endDateObj) && currentDate >= startDate) {
            dates.push(new Date(currentDate));
        }
         currentDate.setMonth(currentDate.getMonth() + (nthDay+1));
      } 
      else {
        // Handle monthly recurrence
        const specificDay = specificDays[0]; // Only one specific day
        const specificDayIndex = dayOfWeekMap[specificDay];
        // Find the nth occurrence of that specific day in the month
        let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        let count = 0;
        while (date.getMonth() === currentDate.getMonth()) {
          if (date.getDay() === specificDayIndex) {
            count++;
            if (count === nthWeekDay) {
              if ((!endDateObj || date <= endDateObj) && date >= startDate) {
                dates.push(new Date(date));
              }
            }
        }
         date.setDate(date.getDate() + 1);
       }
       currentDate.setMonth(currentDate.getMonth() + (nthDay + 1));
      }
    } else {
      if ((!endDateObj || currentDate <= endDateObj) && currentDate >= startDate) {
        dates.push(new Date(currentDate));
      }
      switch (frequency) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() + nthDay + 1);
        break;
        case 'yearly':
          currentDate.setFullYear(currentDate.getFullYear() + nthDay + 1);
        break;
        default:
          console.error("Unsupported frequency:", frequency);
        return [];
      }
    }
  }
  return dates;
};
  
// Call the generator directly
  const recurringDates = generateRecurringDates();

 
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
        <div className="bg-purple-100 p-2 rounded-md">
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
      <div className="bg-purple-100 p-2 rounded-md">
        <h3 className="text-2xl  font-semibold my-2   text-center text-purple-700 "> Calendar Preview:</h3>
        <div className="calendar-container flex flex-col items-center text-purple-700 bg-purple mb-6">
          <Calendar value={new Date()} tileClassName={tileClassName} />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold my-3 text-purple-700 text-center">Recurring Dates:</h3>
       
          {recurringDates.length > 0 ? (
            <div className="  text-gray-50 font-semibold flex flex-wrap gap-2 bg-purple-100 p-4 justify-center">
              {recurringDates.map((date, index) => (
                <span key={index} className="bg-purple-700 w-40 p-2 rounded ">{date.toDateString()}</span>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No recurring dates generated.</p>
          )}
       
      </div>

      
    </div>
  );
};

export default CalendarPreview;
