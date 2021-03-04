import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function AppBar({ navigation }) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.bars} onPress={() => navigation.openDrawer()}>
                    <FontAwesome5 style={styles.iconbars} name={'bars'}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.user} onPress={() => navigation.openDrawer()}>
                    <FontAwesome5 style={styles.iconuser} name={'user'}/>
                </TouchableOpacity>
            </View> 
        );       
}

export default AppBar;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    bars: {
        marginRight: 280,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 25,
        width: 30,
        height: 30,
    },
    iconbars: {
        color: 'black',
        fontSize: 20,
    },
    user: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        width: 30,
        height: 30,
        backgroundColor: 'black',
    },
    iconuser: {
        color: 'white',
        fontSize: 15,
    }
});