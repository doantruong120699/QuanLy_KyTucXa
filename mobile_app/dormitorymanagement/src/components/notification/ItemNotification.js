import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { setbackgroundcolor } from '../../redux/actions/index';

class ItemNotification extends Component {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewData}>
          <Text style={styles.day}>{this.props.item.last_update.split("T")[0]}</Text>
          <Text style={styles.title}>{this.props.item.title}</Text>
          <Text style={styles.content}>{this.props.item.content}</Text>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = {
  setbackgroundcolor,
}
function mapStateToProps(state) {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemNotification);

const styles = StyleSheet.create({
  container: {
    //   backgroundColor: 'rgba(52, 52, 52, 0.8)',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
    padding: 2,
  },
  viewData: {
    width: '80%',
    borderRadius: 10,
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
