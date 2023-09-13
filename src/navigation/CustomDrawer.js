import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {CalendarContext} from '../../global/CalendarContext';
import * as Colors from '../assets/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import AlertModal from '../components/AlertModal';
import {useDispatch} from 'react-redux';
import MonthlyDatesAction from '../redux/action/MonthlyDatesAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default CustomDrawer = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const {time, typeSelected, setTypeSelected} = useContext(CalendarContext);
  const dispatch = useDispatch();

  function btn_alertClose() {
    setShowModal(false);
  }
  async function btn_alertOk() {
    setShowModal(false);
    try {
      await AsyncStorage.clear()
        .then(() => {
          dispatch(MonthlyDatesAction({time}));
        })
        .catch(e => {
          console.log('Clear Data Error 2 ----> ', e);
        });
    } catch (error) {
      console.log('Clear Data Error ----> ', error);
    }
  }

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
        <TouchableOpacity
          style={styles.clearDataBtn}
          onPress={() => {
            setShowModal(true);
            navigation.closeDrawer();
          }}>
          <Text style={styles.clearDataBtnTxt}>{'Clear Memory'}</Text>
        </TouchableOpacity>
      </View>
      <AlertModal
        visible={showModal}
        alertMsg={
          'Are you sure you want clear all Events data? You will not be able to revert this action.'
        }
        primBtnTxt={'Cancel'}
        primBtnFunc={() => btn_alertClose()}
        secBtnTxt={'Ok'}
        secBtnFunc={() => btn_alertOk()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyBlue,
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
    flex: 1,
    // backgroundColor: Colors.lightOrange,
    marginVertical: RFValue(20),
  },
  btn: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(15),
    marginRight: RFValue(15),
    borderTopRightRadius: RFValue(100),
    borderBottomRightRadius: RFValue(100),
    marginBottom: RFValue(10),
  },
  btnText: {
    fontSize: RFValue(12),
    fontWeight: '700',
    color: Colors.black,
  },
  clearDataBtn: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(15),
    marginHorizontal: RFValue(15),
    borderTopRightRadius: RFValue(100),
    borderBottomRightRadius: RFValue(100),
    marginBottom: RFValue(20),
    backgroundColor: Colors.greyBlue,
    borderRadius: RFValue(100),
  },
  clearDataBtnTxt: {
    fontSize: RFValue(14),
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
});
