import moment from 'moment';
import React, {useState, useEffect, useContext, createContext} from 'react';

export const CalendarContext = createContext();

const CalendarContextProvider = ({children}) => {
  const [title, setTitle] = useState(moment().format('MMMM, YYYY'));
  const [time, setTime] = useState(new Date().getTime());
  const [typeSelected, setTypeSelected] = useState('Monthly');
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [year, setYear] = useState(moment().format('YYYY'));
  const [enableAddEvent, setEnableAddEvent] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const value = {
    title,
    setTitle,
    time,
    setTime,
    typeSelected,
    setTypeSelected,
    month,
    setMonth,
    year,
    setYear,
    enableAddEvent,
    setEnableAddEvent,
    selectedItem,
    setSelectedItem,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
