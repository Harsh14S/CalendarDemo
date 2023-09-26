import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {white} from '../../assets/colors';
import * as Colors from '../../assets/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment';
import CalendarModal from './CalendarModal';
import Header from './Header';
import {HorizontalSyncFlatList} from './utils/HorizontalScroll';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RunGesturesOnJSContext, ViewWithTouchable} from './utils/gestures';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {HeaderData} from '../../assets/ConstantData';

let verticalTimeData = new Array(64).fill(0);
let a = moment().set('hours', 7);
a = moment(a).set('minutes', 0);
verticalTimeData.map((item, index) => {
  let z = moment(a).add(index * 15, 'minutes');
  let isHalf = Number(moment(z).format('mm')) ? true : false;
  let timeFormat = isHalf ? 'h:mm A' : 'h:mm A';
  verticalTimeData[index] = {
    time: moment(z).format(timeFormat),
    isHalf,
    isLast: false,
    startTime: moment(z, 'h:mm A').add(15, 'minutes').format('h:mm A'),
  };
});

// Add an additional entry for 11:00 PM
verticalTimeData.push({
  time: '11:00 PM',
  isHalf: true,
  isLast: true,
  startTime: '11:15 PM',
});
const ScreenWidth = Dimensions.get('screen').width;
const cellHeight = RFValue(60);
const VerticalStickyComponentWidth = RFValue(60);
const componentWidth = ScreenWidth - VerticalStickyComponentWidth;
const HeaderHeight = RFValue(70);
const timeLabelHeight = cellHeight;
const data = HeaderData;

export default CalendarView = ({}) => {
  const [pageData, setPageData] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [renderFlag, setRenderFlag] = useState(false);
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [pressedStartTime, setPressedStartTime] = useState('');
  const [pressedEndTime, setPressedEndTime] = useState('');
  const xToDayIndex = xValue => Math.floor(xValue / componentWidth);

  const horizontalSyncFlatlistItem = ({item, locIndex}) => {
    return (
      <View
        key={locIndex}
        style={{
          width: componentWidth,
          // borderRightWidth: 1,
          // borderLeftWidth: 1,
          // borderTopWidth: locIndex === 0 ? 1 : 0,
          borderColor: Colors.greyBlack,
        }}>
        <Lines times={verticalTimeData} />
        <ViewWithTouchable
          style={{
            position: 'absolute',
            flexDirection: 'row',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            backgroundColor: 'transparent',
          }}>
          {new Array(7).fill(0).map((eventsInSection, dayIndex) => (
            <View
              style={{flex: 1, borderColor: 'grey', borderRightWidth: 1}}
              pointerEvents="box-none"
              key={dayIndex}></View>
          ))}
        </ViewWithTouchable>
      </View>
    );
  };

  const Lines = ({initialDate, times, gridRowStyle}) => {
    const heightStyle = useAnimatedStyle(() => ({
      height: withTiming(timeLabelHeight),
    }));

    return times.map((time, index) => (
      <Animated.View
        key={index}
        style={[
          {
            borderTopWidth: 1,
            borderColor: 'grey',
            backgroundColor: 'transparent',
          },
          heightStyle,
        ]}>
        <View style={{flex: 1}} />
        {/* <View
          style={[
            styles.timeRow,
            {flex: 1, borderTopWidth: 1, borderColor: '#E9EDF077'},
          ]}
        />
        <View
          style={[
            styles.timeRow,
            {flex: 1, borderTopWidth: 1, borderColor: '#E9EDF077'},
          ]}
        />
        <View
          style={[
            styles.timeRow,
            {flex: 1, borderTopWidth: 1, borderColor: '#E9EDF077'},
          ]}
        /> */}
      </Animated.View>
    ));
  };

  useEffect(() => {
    const totalPages = Math.ceil(data.length / 7);
    let pagesArray = [];
    let subArray = new Array(7);
    data.map((item, index) => {
      if (index % 7 === 0) {
        // console.log(index % 7);
        subArray = new Array(7);
        subArray[index % 7] = item;
      } else {
        subArray[index % 7] = item;
      }
      if ((index + 1) % 7 === 0 || data.length - 1 === index) {
        // console.log(index);
        // if (data.length - 1 === index) {
        //   console.log('subArray ===> ', subArray);
        // }
        pagesArray.push(subArray);
      }
    });
    setPageData(pagesArray);
    // console.log('pagesArray ----> ', pagesArray);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: VerticalStickyComponentWidth,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <Header
            data={pageData}
            componentWidth={componentWidth}
            HeaderHeight={HeaderHeight}
          />
        </View>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          onLayout={e => {
            // setComponentWidth(e.nativeEvent.layout.width);
          }}>
          <RunGesturesOnJSContext.Provider value={false}>
            <View style={{flexDirection: 'row'}}>
              <View>
                {verticalTimeData.map((item, index) => {
                  //   console.log(item);
                  if (item.isLast === false) {
                    return (
                      <View
                        style={{
                          alignItems: 'flex-end',
                          width: VerticalStickyComponentWidth,
                          height: cellHeight,
                          opacity: index % 2 == 1 ? 0 : 1,
                        }}
                        key={index}>
                        <Text
                          style={{
                            fontSize: item.isHalf ? 14 : 14,
                            color: Colors.DarkGray,
                            marginRight: RFValue(5),
                          }}>
                          {item.time}
                        </Text>
                      </View>
                    );
                  }
                })}
              </View>
              <View
                style={{
                  //   borderWidth: 1,
                  borderRightWidth: 1,
                  flex: 1,
                  marginTop: RFValue(4),
                }}>
                <HorizontalSyncFlatList
                  data={pageData}
                  horizontalScrollEnded={true}
                  pagingEnabled
                  renderItem={horizontalSyncFlatlistItem}
                  extraData={renderFlag}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    borderLeftWidth: 1,
                    borderTopWidth: 1,
                    borderColor: Colors.Silver,
                    marginTop: RFValue(1),
                  }}
                  // bounces={false}
                />
              </View>
            </View>
          </RunGesturesOnJSContext.Provider>
        </ScrollView>
      </GestureHandlerRootView>
      <CalendarModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        location={location}
        startTime={startTime}
        endTime={endTime}
        setEndTime={setEndTime}
        meetings={meetings}
        setMeetings={setMeetings}
        setStartTime={setStartTime}
        renderFlag={renderFlag}
        setRenderFlag={setRenderFlag}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
