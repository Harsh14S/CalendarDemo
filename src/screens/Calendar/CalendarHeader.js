import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IconLinks from '../../assets/icons/IconLinks';

export default CalendarHeader = ({navigation}) => {
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
        <Image
          source={IconLinks.calendar}
          style={styles.calendarHeaderIcon}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>{'Calendar'}</Text>
      </View>
      <TouchableOpacity style={styles.LRBtnContainer}>
        <Image
          source={IconLinks.search}
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
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  headerMidContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarHeaderIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  LRBtnContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  LRIcon: {
    height: 25,
    width: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
});
