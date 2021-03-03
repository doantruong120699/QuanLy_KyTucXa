import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';


class Background extends Component {
    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                </ImageBackground>
            </View>
        )
    }
}

export default Background;

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        flexDirection: "column"
    },
})