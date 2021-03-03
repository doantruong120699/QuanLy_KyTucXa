import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../drawercontent/DrawerContent';
import { Login, Home, ChangeInfo, ChangePassword, ShowCalendar, AppBar, ShowAllRoom } from '../index';
import { connect } from 'react-redux';

const Drawer = createDrawerNavigator();

class HomePage extends Component {
    render() {
        return (
            <Drawer.Navigator initialRouteName="Login">
                <Drawer.Screen name="Login" component={Login}/>
                <Drawer.Screen name="Home" component={Home}/>
                <Drawer.Screen name="ChangeInfo" component={ChangeInfo}/>
                <Drawer.Screen name="ChangePassword" component={ChangePassword}/>
                <Drawer.Screen name="ShowAllRoom" component={ShowAllRoom}/>
                {/* <Drawer.Screen name="AppBar" component={AppBar}/> */}
            </Drawer.Navigator>
        );
    }   
}

export default connect()(HomePage);