import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class ShowCalendar extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>CHANGE INFO</Text>
                </View>
            </View>
        )
    };
};

export default connect()(ShowCalendar);

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#87ceeb',
      flex: 1,
    },
});