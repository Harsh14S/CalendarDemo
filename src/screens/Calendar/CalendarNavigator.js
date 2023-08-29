import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import IconLinks from '../../assets/icons/IconLinks';
import moment from 'moment';
import {nextPrevYear} from './CalendarFunctions';
import {CalendarContext} from '../../../global/CalendarContext';

export default CalendarNavigator = () => {
  const {title, setTitle, time, setTime, month, setMonth, year, setYear} =
    useContext(CalendarContext);
  const [_time, set_time] = useState(new Date(time));

  useEffect(() => {
    set_time(new Date(time));
    setTitle(moment(time).format('MMMM, YYYY'));
    setMonth(moment(time).format('MMMM'));
    setYear(moment(time).format('YYYY'));
    // console.log(moment(time).format('MMMM'), moment(time).format('YYYY'));
  }, [time]);

  function backPress() {
    // console.log(moment(time).subtract(1, 'month').format('MMMM, YYYY'));
    // console.log(moment(time).format('MMMM, YYYY'));
    setTime(_time.setMonth(_time.getMonth() - 1));
  }

  function nextPress() {
    // console.log(moment(time).add(1, 'month').format('MMMM, YYYY'));
    // console.log(moment(time).format('MMMM, YYYY'));
    setTime(_time.setMonth(_time.getMonth() + 1));
  }
  return (
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
      <View style={styles.controlCenterContainer}>
        <Text style={styles.selectedTimeTxt}>{title}</Text>
      </View>
      <TouchableOpacity
        style={styles.calBackForwBtn}
        onPress={() => nextPress()}>
        <Image
          style={styles.calBackForwIcon}
          source={IconLinks.cal_forward}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginBottom: 5,
  },
  calBackForwBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  calBackForwIcon: {
    height: 20,
    width: 20,
  },
  controlCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTimeTxt: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
});
