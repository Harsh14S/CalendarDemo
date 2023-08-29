import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {DaysInMonth} from './CalendarFunctions';
import CalendarMonthComponent from './CalendarMonthComponent';
import {CalendarContext} from '../../../global/CalendarContext';
import CalendarWeekComponent from './CalendarWeekComponent';
import CalendarDayComponent from './CalendarDayComponent';
// const date = new Date();
export default CalendarComponent = () => {
  const {title, setTitle, time, setTime, typeSelected, setTypeSelected} =
    useContext(CalendarContext);
  const date = new Date(time);
  const [totalDays, setTotalDays] = useState(
    DaysInMonth(date.getFullYear(), date.getMonth() + 1),
  );
  useEffect(() => {
    setTotalDays(DaysInMonth(date.getFullYear(), date.getMonth() + 1));
    // console.log('totalDays -----> ', totalDays);
  }, [time]);
  return (
    <View style={styles.container}>
      {typeSelected === 'Monthly' ? <CalendarMonthComponent /> : null}
      {typeSelected === 'Weekly' ? <CalendarWeekComponent /> : null}
      {typeSelected === 'Daily' ? <CalendarDayComponent /> : null}
      <View style={styles.weekDaysRow}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    // backgroundColor: 'lightgrey',
  },
  weekDaysRow: {
    flexDirection: 'row',
  },
});
