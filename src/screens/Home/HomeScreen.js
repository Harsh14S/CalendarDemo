import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{'Home'}</Text>
      </View>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.screenBtn}
          onPress={() => navigation.navigate('Calendar')}>
          <Text style={styles.screenBtnTxt}>{'Calendar'}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.screenBtn}
          onPress={() => navigation.navigate('Gallery')}>
          <Text style={styles.screenBtnTxt}>{'Gallery'}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  screenBtn: {
    width: '100%',
    backgroundColor: 'lightblue',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  screenBtnTxt: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
