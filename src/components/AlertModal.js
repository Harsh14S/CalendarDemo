import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Colors from '../assets/colors';

export default AlertModal = ({
  visible,
  alertMsg,
  primBtnTxt,
  secBtnTxt,
  primBtnFunc,
  secBtnFunc,
}) => {
  if (visible) {
    return (
      <Modal
        visible={true}
        transparent
        statusBarTranslucent
        animationType={'fade'}>
        <View style={styles.modalMainView}>
          <View style={styles.container}>
            <View style={styles.alertMsgContainer}>
              <Text style={styles.alertMsgTxt}>{alertMsg}</Text>
            </View>
            <View style={styles.rowBtnContainer}>
              <TouchableOpacity
                style={[styles.btnStyle, {marginRight: RFValue(10)}]}
                onPress={primBtnFunc}>
                <Text style={styles.btnTxt}>{primBtnTxt}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnStyle} onPress={secBtnFunc}>
                <Text style={styles.btnTxt}>{secBtnTxt}</Text>
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
    backgroundColor: Colors.modalBackTrans,
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
  alertMsgContainer: {
    paddingVertical: RFValue(10),
    marginBottom: RFValue(10),
  },
  alertMsgTxt: {
    fontSize: RFValue(14),
    fontWeight: '500',
    color: Colors.black,
    textAlign: 'center',
  },
  rowBtnContainer: {
    flexDirection: 'row',
  },
  btnStyle: {
    flex: 1,
    paddingVertical: RFValue(8),
    backgroundColor: Colors.greyBlue,
    borderRadius: RFValue(4),
  },
  btnTxt: {
    color: Colors.white,
    fontSize: RFValue(14),
    fontWeight: '700',
    textAlign: 'center',
  },
});
