import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import * as Colors from '../assets/colors';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Draw = createDrawerNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Draw.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          sceneContainerStyle: {backgroundColor: Colors.white},
          swipeEnabled: false,
        }}>
        <Draw.Screen name="Calendar" component={CalendarScreen} />
      </Draw.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
