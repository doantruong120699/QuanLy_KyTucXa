import React, { Component, useState, useEffect } from 'react';
import {LogBox} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { getData, storeData } from './src/utils/asyncStorage';
import 'react-native-gesture-handler';
import { 
  Login, 
  HomePage, 
  ProfileSV, 
  ProfileNV, 
  ChangePassword, 
  ChangeProfile, 
  RoomDetail, 
  ShowAllRoom, 
  ForgotPassword, 
  ShowRoomOfSV 
} from './src/components/index';

const Stack = createStackNavigator();
const App = () => {
  LogBox.ignoreLogs(['VirtualizedLists','Warning']);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Login'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="ProfileSV" component={ProfileSV} />
          <Stack.Screen name="ProfileNV" component={ProfileNV} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
          <Stack.Screen name="ShowAllRoom" component={ShowAllRoom} />
          <Stack.Screen name="RoomDetail" component={RoomDetail} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ShowRoomOfSV" component={ShowRoomOfSV} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
