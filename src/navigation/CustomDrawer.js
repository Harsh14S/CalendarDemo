import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {CalendarContext} from '../../global/CalendarContext';
import * as Colors from '../assets/colors';

export default CustomDrawer = ({navigation}) => {
  const {title, setTitle, time, setTime, typeSelected, setTypeSelected} =
    useContext(CalendarContext);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <SafeAreaView />
      <View style={styles.topContainer}></View>
      <View style={styles.bottomContainer}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  typeSelected === 'Daily' ? Colors.lightOrange : Colors.white,
              },
            ]}
            onPress={() => {
              setTypeSelected('Daily');
              navigation.closeDrawer();
            }}
            disabled={typeSelected === 'Daily'}>
            <Text style={styles.btnText}>{'Daily'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  typeSelected === 'Weekly' ? Colors.lightOrange : Colors.white,
              },
            ]}
            onPress={() => {
              setTypeSelected('Weekly');
              navigation.closeDrawer();
            }}
            disabled={typeSelected === 'Weekly'}>
            <Text style={styles.btnText}>{'Weekly'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  typeSelected === 'Monthly'
                    ? Colors.lightOrange
                    : Colors.white,
              },
            ]}
            onPress={() => {
              setTypeSelected('Monthly');
              navigation.closeDrawer();
            }}
            disabled={typeSelected === 'Monthly'}>
            <Text style={styles.btnText}>{'Monthly'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightOrange,
    paddingTop: StatusBar.currentHeight,
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: Colors.white,
  },
  btnContainer: {
    // backgroundColor: Colors.lightOrange,
    marginVertical: 20,
  },
  btn: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginRight: 15,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 10,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
});
