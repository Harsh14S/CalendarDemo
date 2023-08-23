import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const HomeScreen = () => {
  const [allPhotoes, setAllPhotoes] = useState();
  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        console.log('Photoes ----> ', JSON.stringify(r.edges));
        // setAllPhotoes(r.edges)
      })
      .catch(err => {
        //Error Loading Images
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => _handleButtonPress()}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
  },
});
