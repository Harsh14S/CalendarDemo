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
import {RFValue} from 'react-native-responsive-fontsize';

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

    const emptyAdds = Number(moment(_time).format('d'));
    const lastMonthDays = Number(
      moment(time).subtract(1, 'month').daysInMonth(),
    );
    const nextMonthDays = Number(moment(time).add(1, 'month').daysInMonth());
    const remainAdds =
      Number(7 - ((emptyAdds + totalDays) % 7)) === 7
        ? 0
        : Number(7 - ((emptyAdds + totalDays) % 7));
    let arr = [
      ...new Array(emptyAdds).fill(0).map((item, index) => {
        return {
          date: lastMonthDays - emptyAdds + (index + 1),
          isToday: false,
          isCurrentMonth: false,
        };
      }),
      ...new Array(totalDays).fill(0).map((item, index) => {
        return {
          date: index + 1,
          isToday: new Date().getDate() === index + 1 && isCurrentMonth,
          isCurrentMonth: true,
        };
      }),
      ...new Array(remainAdds).fill(0).map((item, index) => {
        return {date: index + 1, isToday: false, isCurrentMonth: false};
      }),
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
              style={[styles.weekDayItem, {backgroundColor: Colors.white}]}>
              {item ? (
                <Text style={[styles.weekDayTxt, {color: Colors.yellow}]}>
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
                style={[
                  styles.dayItem,
                  {
                    opacity: item?.isCurrentMonth ? 1 : 0.3,
                  },
                ]}
                key={index}>
                <View style={[styles.upperLine]} />
                <View style={styles.dateContainer}>
                  {/* {item?.date ? <View style={styles.holidayIndicator} /> : null} */}
                  <View
                    style={[
                      {
                        backgroundColor: item?.isToday ? Colors.yellow : null,
                      },
                      styles.daysBackground,
                    ]}>
                    <Text
                      style={[
                        styles.daysTxt,
                        {
                          color: item?.isToday
                            ? Colors.white
                            : Colors.greyBlack,
                        },
                      ]}>
                      {item?.date}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RFValue(5),
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
    marginBottom: RFValue(10),
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: RFValue(10),
    flexWrap: 'wrap',
    marginHorizontal: RFValue(5),
  },
  weekDayItem: {
    width: '12.8%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: '0.74%',
    height: RFValue(40),
    borderRadius: RFValue(5),
  },
  dayItem: {
    width: '12.8%',
    backgroundColor: Colors.white,
    marginHorizontal: '0.74%',
    height: RFValue(40),
    borderRadius: RFValue(5),
    overflow: 'hidden',
    marginBottom: RFValue(5),
    height: RFValue(65),
    alignItems: 'center',
  },
  weekDayTxt: {
    fontSize: RFValue(12),
    fontWeight: '700',
  },
  daysBackground: {
    height: 30,
    width: 30,
    borderRadius: RFValue(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysTxt: {
    fontSize: RFValue(12),
    fontWeight: '500',
    color: Colors.greyBlue,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperLine: {
    height: RFValue(16),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.yellow,
  },
  holidayIndicator: {
    padding: RFValue(2),
    marginBottom: RFValue(2),
    backgroundColor: Colors.yellow,
    borderRadius: RFValue(20),
  },
});
