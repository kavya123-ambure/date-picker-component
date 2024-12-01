// app/context/DatePickerContext.js
"use client"; 
import React, { createContext, useState } from 'react';

// Create the DatePickerContext
export const DatePickerContext = createContext();

// Create a provider component for managing state
export const DatePickerProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  

  return (
    <DatePickerContext.Provider
      value={{ startDate, setStartDate, endDate, setEndDate }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};
