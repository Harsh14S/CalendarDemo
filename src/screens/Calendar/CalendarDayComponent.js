import {
  ActivityIndicator,
  Animated,
  LayoutAnimation,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import * as Colors from '../../assets/colors';
import {CalendarContext} from '../../../global/CalendarContext';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';

const horizontalItemHeight = RFValue(40);
const horizontalItemWidth = RFValue(150);
const verticalItemWidth = RFValue(50);
const array = new Array(31).fill(0);
const hours = new Array(25).fill(0);

const myEvents = [
  {
    id: 1,
    startDate: new Date(2023, 1, 11, 9),
    endDate: new Date(2023, 1, 11, 11),
    color: 'blue',
    description: 'E1',
    // ... more properties if needed,
  },
  {
    id: 2,
    startDate: new Date(2023, 1, 22, 10),
    endDate: new Date(2023, 1, 22, 11),
    color: 'red',
    description: 'E2',
  },
  // more events...
];

export default CalendarDayComponent = () => {
  const {time, enableAddEvent, setEnableAddEvent, setSelectedItem} =
    useContext(CalendarContext);
  const dispatch = useDispatch();
  const MonthlyData = useSelector(state => state.getMonthlyData);
  const AddEventData = useSelector(state => state.addEventData);
  const [allDays, setAllDays] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  function btn_addEvent(item) {
    setSelectedItem(item);
    setEnableAddEvent(false);
    setShowAddEventModal(true);
  }
  function btn_showEvents(item) {
    setSelectedItem(item);
    setShowEventModal(true);
  }

  useEffect(() => {
    dispatch(MonthlyDatesAction({time: time}));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [time]);

  useEffect(() => {
    if (MonthlyData) {
      // console.log('MonthlyData ---> ', MonthlyData);
      setAllDays(MonthlyData);
    }
  }, [MonthlyData]);

  useEffect(() => {
    if (AddEventData.success) {
      dispatch(MonthlyDatesAction({time: time}));
    }
  }, [AddEventData]);

  useEffect(() => {
    if (allDays.length) {
      // console.log('allDays ----> ', allDays);
      setShowLoader(false);
    }
  }, [allDays]);
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyBlue,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftItemContainer: {
    // backgroundColor: Colors.greyBlue,
    height: horizontalItemHeight,
    width: verticalItemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.greyLight,
    borderWidth: 1,
  },
  topLeftItemTxt: {
    fontSize: RFValue(14),
    color: Colors.greyBlue,
    fontWeight: '500',
  },
});
