import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import CalendarNavigator from './CalendarDirection';
import CalendarHeader from './CalendarHeader';
import CalendarComponent from './CalendarComponent';
import {CalendarContext} from '../../../global/CalendarContext';
import * as Colors from '../../assets/colors';
import CalendarEventMondal from './CalendarEventModal';

export default CalendarScreen = ({navigation}) => {
  const {title, setTitle, time, setTime, typeSelected, setTypeSelected} =
    useContext(CalendarContext);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent
      />
      <SafeAreaView />
      <CalendarHeader navigation={navigation} />
      <View style={styles.mainContainer}>
        <CalendarNavigator
          setTitle={setTitle}
          title={title}
          setTime={setTime}
          time={time}
        />
        <CalendarComponent
          setTitle={setTitle}
          title={title}
          setTime={setTime}
          time={time}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.greyBlue,
  },
  mainContainer: {
    flex: 1,
  },
});
