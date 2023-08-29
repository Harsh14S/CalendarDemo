import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';

export default GalleryScreen = () => {
  const [allPhotoes, setAllPhotoes] = useState([]);
  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        const data = r.edges.map(item => {
          const localFilePath =
            RNFS.CachesDirectoryPath + '/' + item.node.image.filename;

          return localFilePath;
        });
        console.log('localFilePath ----> ', data);
        // setAllPhotoes(data);
        setAllPhotoes(r.edges);
      })
      .catch(err => {
        //Error Loading Images
        console.log('getPhotos error -----> ', err);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{'Gallery'}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => _handleButtonPress()}>
        <Text>GalleryScreen</Text>
      </TouchableOpacity>
      <View style={{flex: 1, width: '100%', backgroundColor: 'grey'}}>
        {allPhotoes.length ? (
          <FlatList
            data={allPhotoes}
            renderItem={({item}) => {
              console.log('IETEEEE_E_', item);
              return (
                <Image
                  source={{uri: item.node.image.uri}}
                  // source={{uri: item}}
                  style={{width: '100%', height: 100}}
                  resizeMode="contain"
                />
              );
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

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
  btn: {
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
  },
});
