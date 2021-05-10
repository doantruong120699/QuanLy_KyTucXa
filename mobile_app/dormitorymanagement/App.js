import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import 'react-native-gesture-handler';
import { Login, HomePage, ProfileSV, ProfileNV, ChangePassword, ChangeProfile, RoomDetail, Schedule, ShowAllRoom } from './src/components/index';
// 
const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ProfileSV" component={ProfileSV} />
            <Stack.Screen name="ProfileNV" component={ProfileNV} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
            <Stack.Screen name="ShowAllRoom" component={ShowAllRoom} />
            <Stack.Screen name="RoomDetail" component={RoomDetail} />
            <Stack.Screen name="Schedule" component={Schedule} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;