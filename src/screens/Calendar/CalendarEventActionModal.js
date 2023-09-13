import {
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import * as Colors from '../../assets/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment';
import IconLinks from '../../assets/icons/IconLinks';
import {useIsFocused} from '@react-navigation/native';
import {CalendarContext} from '../../../global/CalendarContext';
import {useDispatch} from 'react-redux';
import AddEventAction from '../../redux/action/AddEventAction';

export default CalendarEventActionModal = ({visible, setShowModal}) => {
  const {selectedItem, setSelectedItem, time} = useContext(CalendarContext);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [btnDisable, setBtnDisable] = useState(true);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  function btn_addEvent() {
    const eventObj = {
      title: eventTitle.trim(),
      description: eventDescription.trim(),
      date: selectedItem?.date,
      time: time,
      timeStamp: currentTime.getTime(),
      type: 0,
      typeTitle: 'Other',
    };
    dispatch(AddEventAction(eventObj));
    btn_close();
  }
  function btn_close() {
    setShowModal(false);
    setSelectedItem(null);
    setEventTitle('');
    setEventDescription('');
  }

  useEffect(() => {
    if (isFocused) {
      setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }
  }, [isFocused]);

  useEffect(() => {
    if (eventTitle.trim() && eventDescription.trim()) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [eventTitle, eventDescription]);

  if (visible) {
    return (
      <Modal
        visible={true}
        transparent
        statusBarTranslucent
        animationType={'fade'}>
        <View style={styles.modalMainView}>
          <View style={styles.container}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.headerTxt}>Add Event</Text>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => btn_close()}>
                <Image style={styles.closeBtnIcon} source={IconLinks.cross} />
              </TouchableOpacity>
            </View>
            <View style={styles.eventInteractionContainer}>
              <View style={styles.dateAndTimeContainer}>
                <View style={styles.dateContainer}>
                  <View style={styles.iconBackground}>
                    <Image style={styles.iconStyle} source={IconLinks.clock} />
                  </View>
                  <Text style={styles.dateTxt}>
                    {moment(currentTime).format('HH:mm:ss')}
                  </Text>
                </View>
                <View style={styles.dateContainer}>
                  <View style={styles.iconBackground}>
                    <Image
                      style={styles.iconStyle}
                      source={IconLinks.calendar}
                    />
                  </View>
                  <Text style={styles.dateTxt}>
                    {/* {moment().format('DD-MM-YYYY')} */}
                    {selectedItem?.date}
                  </Text>
                </View>
              </View>
              <TextInput
                placeholder="Add title"
                value={eventTitle}
                style={styles.titleInputStyle}
                onChangeText={txt => setEventTitle(txt)}
                // placeholderTextColor={Colors.greyLight}
              />
              <TextInput
                placeholder="Add description"
                value={eventDescription}
                style={styles.descriptionInputStyle}
                onChangeText={txt => setEventDescription(txt)}
                multiline={true}
                numberOfLines={4}
                // placeholderTextColor={Colors.greyLight}
              />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => btn_addEvent()}
                disabled={btnDisable}
                style={[styles.addBtn, {opacity: btnDisable ? 0.5 : 1}]}
                activeOpacity={0.8}>
                <Text style={styles.addBtnTxt}>Add Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  modalMainView: {
    // flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
    paddingHorizontal: RFValue(20),
    height: Dimensions.get('screen').height,
  },
  container: {
    borderRadius: RFValue(8),
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(15),
    backgroundColor: Colors.white,
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    backgroundColor: Colors.greyBlue,
    padding: RFValue(8),
    borderRadius: RFValue(100),
  },
  closeBtnIcon: {
    tintColor: Colors.yellow,
    height: RFValue(10),
    width: RFValue(10),
    resizeMode: 'contain',
  },
  headerTxt: {
    fontSize: RFValue(18),
    fontWeight: '700',
    color: Colors.greyBlue,
    textAlign: 'center',
  },
  eventInteractionContainer: {
    // backgroundColor: Colors.yellow,
    marginTop: RFValue(15),
  },
  dateAndTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(5),
  },
  iconBackground: {
    backgroundColor: Colors.yellow,
    padding: RFValue(8),
    marginRight: RFValue(5),
    borderRadius: RFValue(100),
  },
  iconStyle: {
    tintColor: Colors.greyBlue,
    height: RFValue(12),
    width: RFValue(12),
    resizeMode: 'contain',
  },
  dateTxt: {
    textAlign: 'center',
    fontSize: RFValue(14),
    fontWeight: '500',
    color: Colors.black,
  },
  titleInputStyle: {
    marginBottom: RFValue(10),
    paddingBottom: 0,
    paddingTop: RFValue(10),
    fontSize: RFValue(14),
    borderBottomWidth: 1,
    borderColor: Colors.greyLight,
  },
  descriptionInputStyle: {
    backgroundColor: Colors.greyLight,
    textAlign: 'left',
    textAlignVertical: 'top',
    borderRadius: RFValue(4),
    paddingHorizontal: RFValue(8),
    height: RFValue(75),
    paddingVertical: RFValue(10),
    fontSize: RFValue(12),
  },
  btnContainer: {
    marginTop: RFValue(10),
  },
  addBtn: {
    backgroundColor: Colors.greyBlue,
    paddingVertical: RFValue(10),
    borderRadius: RFValue(4),
  },
  addBtnTxt: {
    textAlign: 'center',
    fontSize: RFValue(14),
    fontWeight: '700',
    color: Colors.yellow,
  },
});
