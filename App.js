import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Router from './src/navigation/Router';

const App = () => {
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} /> */}
      <SafeAreaView />
      <Router />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
