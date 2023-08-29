import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import Router from './src/navigation/Router';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import CalendarContextProvider from './global/CalendarContext';
import * as Colors from './src/assets/colors';

const App = () => {
  return (
    <CalendarContextProvider>
      <SafeAreaProvider style={styles.container}>
        <Router />
      </SafeAreaProvider>
    </CalendarContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
