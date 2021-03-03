import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class Home extends Component {
    moveToLogin = () => {
        this.props.navigation.navigate('Login');
    };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.moveToLogin}>
                    <Text>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});

export default connect()(Home);