import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

class Avatar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>A</Text>
      </View>
    )
  }
}

export default connect()(Avatar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
