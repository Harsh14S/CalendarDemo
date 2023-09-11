import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

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
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(20),
    justifyContent: 'center',
    marginBottom: RFValue(10),
  },
  headerTitle: {
    fontSize: RFValue(20),
    fontWeight: '700',
    color: 'black',
  },
  mainContainer: {
    flex: 1,
    paddingTop: RFValue(20),
    paddingHorizontal: RFValue(20),
    justifyContent: 'center',
  },
  screenBtn: {
    width: '100%',
    backgroundColor: 'lightblue',
    paddingVertical: RFValue(15),
    paddingHorizontal: RFValue(10),
    marginBottom: RFValue(15),
    borderRadius: RFValue(5),
  },
  screenBtnTxt: {
    fontSize: RFValue(15),
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
