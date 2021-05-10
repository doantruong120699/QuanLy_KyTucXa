import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ChangePassword, ForgotPassword, ShowAllRoom, Dashboard, AllStudent, AllStaff, Notification } from '../index';
import { connect } from 'react-redux';
import 'react-native-gesture-handler';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();
class HomePage extends Component {
  render() {
    return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Notification" component={Notification} />
        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
        <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
        <Drawer.Screen name="ShowAllRoom" component={ShowAllRoom} />
        <Drawer.Screen name="AllStudent" component={AllStudent} />
        <Drawer.Screen name="AllStaff" component={AllStaff} />

      </Drawer.Navigator>
    )
  }
}

export default connect()(HomePage)
