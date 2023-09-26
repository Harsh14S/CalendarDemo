import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  black,
  blue,
  greyBlue,
  greyLight,
  lightBlue,
  lightViolet,
  ligtWhite,
  violate,
  white,
} from '../../assets/colors';
import IconLinks from '../../assets/icons/IconLinks';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const array1 = ['In-person', 'Virtual', 'Hybrid'];
const array2 = ['Tentetives', 'Confirmed'];

const CalendarModal = ({
  openModal,
  setOpenModal,
  location,
  startTime,
  endTime,
  setEndTime,
  setStartTime,
  setMeetings,
  meetings,
  setRenderFlag,
  renderFlag,
}) => {
  const [selected, setSelected] = useState('Hybrid');
  const [selectedBtn, setSelectedBtn] = useState('Confirmed');
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const selectedMeeting = meetings.find(
    meeting => meeting.location === location && meeting.startTime === startTime,
  );
  // console.log("selectedMeeting", selectedMeeting);
  // console.log("meetings", meetings);
  const handleTouch = (name, time, startTime) => {
    console.log('presss', name);
    // const selectedTimeSlot = array[dayIndex];
    const newMeeting = {
      location: location,
      time: time,
      startTime: startTime,
    };
    setRenderFlag(!renderFlag);
    setMeetings([...meetings, newMeeting]);
  };
  //   console.log('startTime', startTime);
  if (openModal) {
    return (
      <Modal visible={openModal} transparent={true}>
        <View style={styles.modalMainView}>
          <View style={styles.modalView}>
            <View style={styles.cancelNDSaveBtnView}>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Discard new changes?',
                    'Any new chnages you made will be loast. Or continue to edit the meeting',
                    [
                      {
                        text: 'Keep Editing',
                        onPress: () => {},
                      },
                      {
                        text: 'Discard',
                        onPress: () => {
                          setOpenModal(false);
                        },
                      },
                    ],
                  )
                }>
                <Text style={styles.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOpenModal(false),
                    handleTouch(location, startTime, endTime);
                }}>
                <Text style={styles.saveTxt}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnMainView}>
              <View style={styles.btnView}>
                {array1.map(item => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          setSelected(item);
                        }}
                        style={[
                          {
                            backgroundColor:
                              selected == item ? 'white' : lightBlue,
                          },
                          styles.btnTouchView,
                        ]}>
                        <Text
                          Text
                          style={[
                            styles.inPersonTxt,
                            {color: selected == item ? 'black' : greyBlue},
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    </>
                  );
                })}
              </View>
              <View style={styles.btn2View}>
                {array2.map(item => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedBtn(item);
                        }}
                        style={[
                          {
                            backgroundColor:
                              selectedBtn == item ? 'white' : lightBlue,
                          },
                          styles.btn2TouchView,
                        ]}>
                        <Text
                          style={[
                            styles.inPersonTxt,
                            {color: selectedBtn == item ? 'black' : greyBlue},
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    </>
                  );
                })}
              </View>
            </View>
            <View style={styles.boxMainView}>
              <View style={{flexDirection: 'row'}}>
                <Image source={IconLinks.location} style={styles.icon} />
                <Text style={styles.boxTxt}>Location</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.newLocationTxt}>{location}</Text>
                <Image source={IconLinks.next} style={styles.rightIcon}></Image>
              </View>
            </View>
            <View style={styles.boxMainView}>
              <View style={{flexDirection: 'row'}}>
                <Image source={IconLinks.calendar} style={styles.icon} />
                <Text style={styles.boxTxt}>Date</Text>
              </View>
              <View style={styles.dateView}>
                <Text style={styles.dateTxt}>Wednesday,Aug 30</Text>
              </View>
            </View>
            <View style={styles.timeBoxView}>
              <View style={{flexDirection: 'row'}}>
                <Image source={IconLinks.clock} style={styles.icon} />
                <Text style={styles.boxTxt}>Time</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    setShowStartTimePicker(true);
                  }}>
                  <Text style={styles.startTimeTxt}>{startTime}</Text>
                </TouchableOpacity>
                <Text style={styles.toTxt}>to</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowEndTimePicker(true);
                  }}>
                  <Text style={styles.endTimeTxt}>{endTime}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {showStartTimePicker && (
              <DateTimePickerModal
                minuteInterval={15}
                isVisible={showStartTimePicker}
                mode="time"
                onConfirm={time => {
                  setStartTime(moment(time, 'h:mm A').format('h:mm A')),
                    setShowStartTimePicker(false);
                }}
                onCancel={time => setShowStartTimePicker(false)}
              />
            )}
            {showEndTimePicker && (
              <DateTimePickerModal
                minuteInterval={15}
                isVisible={showEndTimePicker}
                mode="time"
                onConfirm={time => {
                  setEndTime(moment(time, 'h:mm A').format('h:mm A')),
                    setShowEndTimePicker(false);
                }}
                onCancel={time => setShowEndTimePicker(false)}
              />
            )}
            <View style={styles.boxMainView}>
              <View style={{flexDirection: 'row'}}>
                <Image source={IconLinks.topic} style={styles.topicIcon} />
                <Text style={styles.boxTxt}>Topics</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.addTxt}>Add</Text>
                <Image source={IconLinks.next} style={styles.rightIcon}></Image>
              </View>
            </View>
            <View style={styles.boxMainView}>
              <Text style={styles.appHoastTxt}>Appointment Host</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.addTxt}>Add</Text>
                <Image source={IconLinks.next} style={styles.rightIcon}></Image>
              </View>
            </View>
            <View style={styles.boxMainView}>
              <Text style={styles.internalTxt}>Internal Attendees</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.addTxt}>Add</Text>
                <Image source={IconLinks.next} style={styles.rightIcon}></Image>
              </View>
            </View>
            <View style={styles.boxMainView}>
              <Text style={styles.internalTxt}>External Attendees</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.addTxt}>Add</Text>
                <Image source={IconLinks.next} style={styles.rightIcon}></Image>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
};

export default CalendarModal;

const styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: ligtWhite,
    padding: RFValue(10),
    borderRadius: 10,
    // maxWidth: 5000,
    maxHeight: 1100,
    flex: 1,
  },
  cancelNDSaveBtnView: {flexDirection: 'row', justifyContent: 'space-between'},
  cancelTxt: {
    color: greyBlue,
    textDecorationLine: 'underline',
    fontSize: 30,
    fontWeight: '500',
  },
  saveTxt: {
    color: blue,
    textDecorationLine: 'underline',
    fontSize: 30,
    fontWeight: '500',
  },
  inPersonTxt: {fontSize: 28, textAlign: 'center'},
  virtualTxt: {
    color: greyBlue,
    fontSize: 28,
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  btnMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: lightBlue,
    padding: 5,
    flex: 0.9,
    borderRadius: 10,
    overflow: 'hidden',
  },
  btnTouchView: {
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 0.5,
    paddingVertical: 10,
  },
  btn2View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: lightBlue,
    padding: 5,
    flex: 0.9,
    marginLeft: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  btn2TouchView: {
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 0.5,
    paddingVertical: 10,
  },
  boxMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    backgroundColor: white,
    padding: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  boxTxt: {color: black, fontSize: 30, alignSelf: 'center', marginLeft: 30},
  newLocationTxt: {color: black, fontSize: 30, textDecorationLine: 'underline'},
  icon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    tintColor: violate,
    alignSelf: 'center',
  },
  rightIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    tintColor: blue,
    marginLeft: 30,
  },
  dateView: {
    flexDirection: 'row',
    backgroundColor: lightViolet,
    padding: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  dateTxt: {color: blue, fontSize: 30, textDecorationLine: 'underline'},
  timeBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    backgroundColor: white,
    padding: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  startTimeTxt: {
    color: blue,
    fontSize: 30,
    textDecorationLine: 'underline',
    backgroundColor: lightViolet,
    padding: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  endTimeTxt: {
    color: blue,
    fontSize: 30,
    textDecorationLine: 'underline',
    marginLeft: 30,
    backgroundColor: lightViolet,
    padding: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  toTxt: {
    color: black,
    fontSize: 30,
    textDecorationLine: 'underline',
    marginLeft: 30,
    alignSelf: 'center',
  },
  topicIcon: {height: 40, width: 40, resizeMode: 'contain', tintColor: violate},
  addTxt: {color: blue, fontSize: 30, textDecorationLine: 'underline'},
  appHoastTxt: {color: black, fontSize: 30, alignSelf: 'center'},
  internalTxt: {color: black, fontSize: 30, alignSelf: 'center'},
});
