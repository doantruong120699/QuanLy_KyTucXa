import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Login, ChangePassword } from '../index';
import { connect } from 'react-redux';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();
class HomePage extends Component {
    render() {
        return(
            <Drawer.Navigator initialRouteName="Login">
                <Drawer.Screen name="Login" component={Login}/>
                <Drawer.Screen name="ChangePassword" component={ChangePassword}/>
            </Drawer.Navigator>
        )
    }
}

export default connect()(HomePage)