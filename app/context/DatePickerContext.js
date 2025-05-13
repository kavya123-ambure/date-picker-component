// app/context/DatePickerContext.js
"use client"; 
import React, { createContext, useState } from 'react';

// 1. Create the context
export const DatePickerContext = createContext();

// 2. Create your own wrapper component
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
