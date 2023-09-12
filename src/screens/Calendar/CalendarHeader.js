import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import IconLinks from '../../assets/icons/IconLinks';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Colors from '../../assets/colors';
import {CalendarContext} from '../../../global/CalendarContext';

export default CalendarHeader = ({navigation}) => {
  const {setEnableAddEvent} = useContext(CalendarContext);
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.LRBtnContainer}
        onPress={() => navigation.openDrawer()}>
        <Image
          source={IconLinks.menu}
          style={styles.LRIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.headerMidContainer}>
        {/* <Image
          source={IconLinks.calendar}
          style={styles.calendarHeaderIcon}
          resizeMode="contain"
        /> */}
        <Text style={styles.headerTitle}>{'Calendar'}</Text>
      </View>
      <TouchableOpacity
        style={styles.LRBtnContainer}
        onPress={() => {
          setEnableAddEvent(true);
        }}>
        <Image
          source={IconLinks.plus}
          style={styles.LRIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: RFValue(10),
    paddingHorizontal: RFValue(5),
  },
  headerMidContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarHeaderIcon: {
    height: RFValue(25),
    width: RFValue(25),
    marginRight: RFValue(10),
  },
  LRBtnContainer: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(15),
  },
  LRIcon: {
    height: RFValue(20),
    width: RFValue(20),
    tintColor: Colors.yellow,
  },
  headerTitle: {
    fontSize: RFValue(20),
    fontWeight: '700',
    color: Colors.white,
  },
});
