import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import IconLinks from '../../assets/icons/IconLinks';
import moment from 'moment';
import {CalendarContext} from '../../../global/CalendarContext';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Colors from '../../assets/colors';
import CalendarComponent from '../Calendar/CalendarComponent';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CalendarData from './CalendarView';

export default CalendarDateView = () => {
  const {title, setTitle, time, setTime, month, setMonth, year, setYear} =
    useContext(CalendarContext);
  const [_time, set_time] = useState(new Date(time));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(moment().format('dddd MMM D'));

  useEffect(() => {
    set_time(new Date(time));
    setTitle(moment(time).format('MMMM, YYYY'));
    setMonth(moment(time).format('MMMM'));
    setYear(moment(time).format('YYYY'));
  }, [time]);

  function backPress() {
    setTime(_time.setMonth(_time.getMonth() - 1));
  }

  function nextPress() {
    setTime(_time.setMonth(_time.getMonth() + 1));
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const SelectedDate = moment(date).format('dddd MMM D');
    console.warn('A date has been picked: ', SelectedDate);
    setDate(SelectedDate);
    hideDatePicker();
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.calBackForwBtn}
          onPress={() => backPress()}>
          <Image
            style={styles.calBackForwIcon}
            source={IconLinks.cal_back}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/*
      <View style={styles.controlCenterContainer}>
        <Text style={styles.selectedTimeTxt}>{title}</Text>
      </View> */}

        <TouchableOpacity onPress={showDatePicker}>
          <View
            style={{
              width: RFValue(200),
              height: RFValue(30),
              marginRight: RFValue(120),
              backgroundColor: 'white',
              borderRadius: RFValue(10),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: RFValue(10),
              }}>
              {date}
            </Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              onChange={this.onChange}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </TouchableOpacity>
      </View>
      <CalendarData />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: RFValue(5),
    marginBottom: RFValue(5),
    backgroundColor: '#800080',
  },
  calBackForwBtn: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(5),
  },
  calBackForwIcon: {
    height: RFValue(18),
    width: RFValue(18),
    tintColor: Colors.yellow,
  },
  controlCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTimeTxt: {
    fontSize: RFValue(18),
    fontWeight: '700',
    color: Colors.white,
  },
});
