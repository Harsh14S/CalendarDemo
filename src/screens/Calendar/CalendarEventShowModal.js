import {
  ActivityIndicator,
  Dimensions,
  FlatList,
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

export default CalendarEventShowModal = ({visible, setShowModal}) => {
  const {selectedItem, setSelectedItem, time} = useContext(CalendarContext);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [events, setEvents] = useState([]);

  function btn_close() {
    setShowModal(false);
    setSelectedItem(null);
  }

  useEffect(() => {
    if (isFocused) {
      setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }
  }, [isFocused]);

  useEffect(() => {
    if (selectedItem) {
      if (selectedItem?.events) {
        console.log('selectedItem ----> ', selectedItem?.events);
        setEvents(selectedItem?.events);
      }
    }
  }, [selectedItem]);

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
              <Text style={styles.headerTxt}>{'Events'}</Text>
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
              <View style={styles.eventsContainer}>
                {events?.length ? (
                  <FlatList
                    data={events}
                    showsVerticalScrollIndicator={false}
                    extraData={events}
                    ItemSeparatorComponent={() => (
                      <View style={styles.fLSepartor} />
                    )}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => {
                      return (
                        <View style={styles.fLItem}>
                          <View style={styles.fLTopRow}>
                            <Text style={styles.fLItemTitleTxt}>
                              {item.title}
                            </Text>
                            <Text style={styles.fLItemTimeTxt}>
                              {moment(item.timeStamp).format('hh:mm A')}
                            </Text>
                          </View>
                          <View style={styles.fLMidContainer}>
                            <Text style={styles.fLItemDescTxt}>
                              {item.description}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTxt}>{'No Events'}</Text>
                  </View>
                )}
              </View>
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
    height: RFValue(300),
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
    flex: 1,
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
  eventsContainer: {
    flex: 1,
    marginTop: RFValue(5),
    borderRadius: RFValue(5),
    overflow: 'hidden',
  },
  fLSepartor: {
    marginVertical: RFValue(2),
  },
  fLItem: {
    padding: RFValue(10),
    backgroundColor: Colors.greyLight,
    borderRadius: RFValue(5),
  },
  fLTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fLItemTitleTxt: {
    fontSize: RFValue(14),
    fontWeight: '500',
    color: Colors.greyBlue,
  },
  fLItemTimeTxt: {
    fontSize: RFValue(12),
    fontWeight: '400',
    color: Colors.greyBlue,
  },
  fLMidContainer: {marginTop: RFValue(5)},
  fLItemDescTxt: {
    fontSize: RFValue(12),
    fontWeight: '400',
    color: Colors.greyBlue,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greyLight,
  },
  emptyTxt: {
    fontSize: RFValue(16),
    fontWeight: '700',
    color: Colors.greyBlue,
  },
});
