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
import IconLinks from '../../assets/icons/IconLinks';
import moment from 'moment';
import CalendarNavigator from './CalendarNavigator';
import CalendarHeader from './CalendarHeader';
import CalendarComponent from './CalendarComponent';
import {CalendarContext} from '../../../global/CalendarContext';

export default CalendarScreen = ({navigation}) => {
  const {title, setTitle, time, setTime, typeSelected, setTypeSelected} =
    useContext(CalendarContext);
  // const [title, setTitle] = useState(moment().format('MMMM, YYYY'));
  // const [time, setTime] = useState(new Date());
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
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
  },
  mainContainer: {
    flex: 1,
  },
});
