import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ShowAllRoom, Dashboard, AllStudent, AllStaff, Notification, Schedule } from '../index';
import { connect } from 'react-redux';
import 'react-native-gesture-handler';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();
class HomePage extends Component {
  render() {
    return (
      <Drawer.Navigator initialRouteName={this.props.status} drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Notification" component={Notification} />
        <Drawer.Screen name="ShowAllRoom" component={ShowAllRoom} />
        <Drawer.Screen name="AllStudent" component={AllStudent} />
        <Drawer.Screen name="AllStaff" component={AllStaff} />
        <Drawer.Screen name="Schedule" component={Schedule} />
      </Drawer.Navigator>
    )
  }
}

function mapStateToProps(state) {
  return {
    status: state.mainmenu.status,
  }
};

export default connect(mapStateToProps)(HomePage)
