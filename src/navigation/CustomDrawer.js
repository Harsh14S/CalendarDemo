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
        barStyle={'light-content'}
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
                  typeSelected === 'Daily' ? Colors.yellow : Colors.white,
              },
            ]}
            onPress={() => {
              setTypeSelected('Daily');
              navigation.closeDrawer();
            }}
            disabled={typeSelected === 'Daily'}>
            <Text
              style={[
                styles.btnText,
                {color: typeSelected === 'Daily' ? Colors.white : Colors.black},
              ]}>
              {'Daily'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  typeSelected === 'Weekly' ? Colors.yellow : Colors.white,
              },
            ]}
            onPress={() => {
              setTypeSelected('Weekly');
              navigation.closeDrawer();
            }}
            disabled={typeSelected === 'Weekly'}>
            <Text
              style={[
                styles.btnText,
                {
                  color:
                    typeSelected === 'Weekly' ? Colors.white : Colors.black,
                },
              ]}>
              {'Weekly'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  typeSelected === 'Monthly' ? Colors.yellow : Colors.white,
              },
            ]}
            onPress={() => {
              setTypeSelected('Monthly');
              navigation.closeDrawer();
            }}
            disabled={typeSelected === 'Monthly'}>
            <Text
              style={[
                styles.btnText,
                {
                  color:
                    typeSelected === 'Monthly' ? Colors.white : Colors.black,
                },
              ]}>
              {'Monthly'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellow,
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
