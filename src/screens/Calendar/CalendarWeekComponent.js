import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
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
import WeeklyDatesAction from '../../redux/action/WeeklyDatesAction';

const {width, height} = Dimensions.get('screen');
const horizontalItemHeight = RFValue(40);
const horizontalItemWidth = RFValue(150);
const verticalItemWidth = RFValue(50);
const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const hours = new Array(25).fill(0);
const ETCWidth = RFValue(60);
const ItemHeight = RFValue(80);
const ItemWidth = (width - ETCWidth) / 7;
const commonBorderWidth = 0.3;
const DaysItemHeight = RFValue(50);

export default CalendarWeekComponent = () => {
  const {time, enableAddEvent, setEnableAddEvent, setSelectedItem} =
    useContext(CalendarContext);
  const dispatch = useDispatch();
  const WeeklyData = useSelector(state => state.getweeklyData);
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
    dispatch(WeeklyDatesAction({time: time}));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [time]);

  useEffect(() => {
    if (WeeklyData.length) {
      console.log('WeeklyData ---> ', JSON.stringify(WeeklyData));
      setAllDays(WeeklyData);
    }
  }, [WeeklyData]);

  useEffect(() => {
    if (AddEventData.success) {
      dispatch(WeeklyDatesAction({time: time}));
    }
  }, [AddEventData]);

  useEffect(() => {
    if (allDays.length) {
      // console.log('allDays ----> ', allDays);
      setShowLoader(false);
    }
  }, [allDays]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: Colors.white,
          height: DaysItemHeight,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: RFValue(4),
          overflow: 'hidden',
          // paddingVertical: RFValue(10),
        }}>
        <View
          style={{
            height: '100%',
            width: ETCWidth,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: commonBorderWidth,
          }}>
          <Text>{'ETC'}</Text>
        </View>
        <FlatList
          style={{backgroundColor: Colors.greyBlue}}
          contentContainerStyle={{
            backgroundColor: Colors.white,
          }}
          scrollEnabled={false}
          data={weekDays}
          numColumns={7}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  // borderRadius: RFValue(5),
                  height: DaysItemHeight,
                  backgroundColor: Colors.yellow,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRightWidth: index === 6 ? 0 : commonBorderWidth,
                }}>
                <Text>{item}</Text>
                <Text>{index + 17}</Text>
              </View>
            );
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          marginTop: RFValue(5),
          borderRadius: RFValue(4),
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            // borderWidth: commonBorderWidth,
          }}>
          <View style={{width: ETCWidth}}>
            {hours.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: ItemHeight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: commonBorderWidth,
                    borderTopWidth: index === 0 ? commonBorderWidth : 0,
                  }}>
                  <Text>{index + ':00'}</Text>
                </View>
              );
            })}
          </View>
          <FlatList
            scrollEnabled={false}
            data={weekDays}
            horizontal
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    width: ItemWidth,
                    alignItems: 'center',
                    borderRightWidth: index === 6 ? commonBorderWidth : 0,
                    borderLeftWidth: index === 0 ? 0 : commonBorderWidth,
                    // borderWidth: commonBorderWidth,
                  }}>
                  <View style={{width: ETCWidth}}>
                    {hours.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            height: ItemHeight,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopWidth: index === 0 ? 0 : commonBorderWidth,
                          }}>
                          <Text>{'*'}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
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
