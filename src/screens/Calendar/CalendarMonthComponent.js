import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {weekDays} from './CalendarData';
import {CalendarContext} from '../../../global/CalendarContext';
import * as Colors from '../../assets/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import MonthlyDatesAction from '../../redux/action/MonthlyDatesAction';
import CalendarEventActionModal from './CalendarEventActionModal';
import IconLinks from '../../assets/icons/IconLinks';
import CalendarEventShowModal from './CalendarEventShowModal';

export default CalendarMonthComponent = () => {
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
      setShowLoader(false);
    }
  }, [allDays]);

  return (
    <View style={styles.container}>
      <View style={styles.weekDaysContainer}>
        <FlatList
          data={weekDays}
          scrollEnabled={false}
          numColumns={7}
          extraData={weekDays}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
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
          }}
        />
      </View>
      {showLoader ? (
        <ActivityIndicator
          size={'large'}
          color={'grey'}
          style={styles.loaderContainer}
        />
      ) : (
        <View style={styles.datesContainer}>
          <FlatList
            data={allDays}
            scrollEnabled={false}
            numColumns={7}
            extraData={MonthlyData}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => btn_showEvents(item)}
                  onLongPress={() => btn_addEvent(item)}
                  disabled={item?.isSelectedMonth ? false : true}
                  style={[
                    styles.dayItem,
                    {
                      opacity: item?.isSelectedMonth ? 1 : 0.3,
                      backgroundColor: item?.isToday
                        ? Colors.yellow
                        : Colors.white,
                    },
                  ]}
                  key={index}>
                  <View
                    style={[
                      styles.upperLine,
                      {
                        backgroundColor: item?.isToday
                          ? Colors.white
                          : Colors.yellow,
                      },
                    ]}
                  />
                  <View style={styles.dateContainer}>
                    <Text
                      style={[
                        styles.daysTxt,
                        {
                          color: item?.isToday
                            ? Colors.white
                            : Colors.greyBlack,

                          fontWeight: item?.isToday ? '700' : '500',
                        },
                      ]}>
                      {item?.day}
                    </Text>
                    <View
                      style={[
                        styles.holidayIndicator,
                        {
                          backgroundColor: item?.events?.length
                            ? item?.isToday
                              ? Colors.white
                              : Colors.yellow
                            : null,
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <Text style={styles.hintTxt}>
        {'*Single press to view event & Long press to add event'}
      </Text>

      <CalendarEventActionModal
        visible={showAddEventModal}
        setShowModal={setShowAddEventModal}
      />
      <CalendarEventShowModal
        visible={showEventModal}
        setShowModal={setShowEventModal}
      />
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
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: RFValue(5),
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
  daysTxt: {
    fontSize: RFValue(12),
    fontWeight: '500',
    color: Colors.greyBlue,
  },
  dateContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperLine: {
    height: RFValue(16),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 0.5,
  },
  holidayIndicator: {
    padding: RFValue(2.2),
    marginTop: RFValue(2),
    borderRadius: RFValue(20),
  },
  hintTxt: {
    marginHorizontal: RFValue(5),
    fontSize: RFValue(12),
    color: Colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
});
