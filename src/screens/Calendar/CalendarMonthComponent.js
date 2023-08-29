import {
  ActivityIndicator,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {weekDays} from './CalendarData';
import {CalendarContext} from '../../../global/CalendarContext';
import moment from 'moment';
import * as Colors from '../../assets/colors';

const {width, height} = Dimensions.get('screen');
const itemWidth = width / 8.1;

export default CalendarMonthComponent = () => {
  const {
    title,
    setTitle,
    time,
    setTime,
    typeSelected,
    setTypeSelected,
    month,
    year,
  } = useContext(CalendarContext);
  const [allDays, setAllDays] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const totalDays = new Date(
      new Date(time).getFullYear(),
      new Date(time).getMonth() + 1,
      0,
    ).getDate();
    const _time = new Date(
      new Date(time).getFullYear(),
      new Date(time).getMonth(),
      1,
    );
    const isCurrentMonth =
      moment(new Date()).format('MMMM') === moment(time).format('MMMM') &&
      moment(new Date()).format('YYYY') === moment(time).format('YYYY');
    console.log('isCurrentMonth ----> ', isCurrentMonth);

    const emptyAdds = Number(moment(_time).format('d'));
    const lastMonthDays = Number(
      moment(time).subtract(1, 'month').daysInMonth(),
    );
    const nextMonthDays = Number(moment(time).add(1, 'month').daysInMonth());
    console.log('lastMonthDays ---> ', lastMonthDays);
    console.log('nextMonthDays ---> ', nextMonthDays);
    const remainAdds =
      Number(7 - ((emptyAdds + totalDays) % 7)) === 7
        ? 0
        : Number(7 - ((emptyAdds + totalDays) % 7));
    let arr = [
      ...new Array(emptyAdds).fill(false),
      ...new Array(totalDays).fill(0).map((item, index) => {
        return {
          date: index + 1,
          today: new Date().getDate() === index + 1 && isCurrentMonth,
        };
      }),
      ...new Array(remainAdds).fill(false),
    ];

    setAllDays(arr);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [time]);

  useEffect(() => {
    if (allDays.length) {
      setShowLoader(false);
    }
  }, [allDays]);
  return (
    <View style={styles.container}>
      <View style={styles.weekDaysContainer}>
        {weekDays.map(item => {
          return (
            <View
              key={item.id}
              style={[styles.weekDayItem, {backgroundColor: Colors.orange}]}>
              {item ? (
                <Text style={[styles.weekDayTxt, {color: Colors.white}]}>
                  {item.short}
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>
      {showLoader ? (
        <ActivityIndicator
          size={'large'}
          color={'grey'}
          style={styles.loaderContainer}
        />
      ) : (
        <View style={styles.weekDaysContainer}>
          {allDays.map((item, index) => {
            return (
              <View
                style={[styles.weekDayItem, {marginBottom: 5, height: 70}]}
                key={index}>
                <Text style={styles.daysTxt}>{item?.date}</Text>
              </View>
            );
          })}
        </View>
      )}
      {/* <Text style={styles.daysTxt}>{}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
    marginHorizontal: 5,
  },
  weekDayItem: {
    width: '12.8%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightOrange,
    marginHorizontal: '0.74%',
    // paddingVertical: 12,
    height: 40,
    borderRadius: 5,
  },
  weekDayTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
  },
  daysTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
});
