import {StyleSheet} from 'react-native';
import React from 'react';
import Router from './src/navigation/Router';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import CalendarContextProvider from './global/CalendarContext';
import * as Colors from './src/assets/colors';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {RootReducer} from './src/redux/reducer/reduxIndex';
import createSagaMiddleware from 'redux-saga';
import sagaIndex from './src/redux/saga/sagaIndex';
const sagaMiddleware = createSagaMiddleware();
const App = () => {
  const store = configureStore({
    reducer: RootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });
  sagaMiddleware.run(sagaIndex);

  return (
    <Provider store={store}>
      <CalendarContextProvider>
        <SafeAreaProvider style={styles.container}>
          <Router />
        </SafeAreaProvider>
      </CalendarContextProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
