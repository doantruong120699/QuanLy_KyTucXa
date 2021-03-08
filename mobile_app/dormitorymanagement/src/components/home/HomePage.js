import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Login, ChangePassword, ForgotPassword, ShowAllRoom } from '../index';
import { connect } from 'react-redux';
import 'react-native-gesture-handler';
import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();
class HomePage extends Component {
    render() {
        return(
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
                <Drawer.Screen name="Login" component={Login}/>
                <Drawer.Screen name="ChangePassword" component={ChangePassword}/>
                <Drawer.Screen name="ForgotPassword" component={ForgotPassword}/>
                <Drawer.Screen name="ShowAllRoom" component={ShowAllRoom}/>
            </Drawer.Navigator>
        )
    }
}

export default connect()(HomePage)