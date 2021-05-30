import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { styleContainer } from '../../styles/index';

class ItemNotification extends Component {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View style={[styleContainer.container, styles.container]}>
        <View style={styles.viewData}>
          <Text style={styles.day}>{this.props.item.last_update.split("T")[0]}</Text>
          <Text style={styles.title}>{this.props.item.title}</Text>
          <Text style={styles.content}>{this.props.item.content}</Text>
        </View>
      </View>
    )
  }
}

export default connect()(ItemNotification);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    padding: 5,
  },
  viewData: {
    width: '80%',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    elevation: 1,
    flexDirection: 'column',
  },
  day: {
    color: 'red',
  },
  title: {
    color: 'blue',
    fontSize: 15,
    width: '100%',
  },
  content: {
    width: '100%',
  },
});
