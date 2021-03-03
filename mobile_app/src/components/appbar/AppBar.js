import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = <Icon name="rocket" size={30} color="#900" />;
function AppBar({ navigation }) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    {/* <Text> Open Drawer </Text> */}
                    <Icon name="facebook" size={30} color="white" />
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
    }
});