import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

class Room extends Component {
  render() {
    const RenderPeople = (number) => {
      let listPeople = [];
      for (let i = 0; i < number; i++) {
        listPeople.push(<FontAwesome5 style={styles.iconPeople} name="user-check" />)
      }
      while (number < 8) {
        listPeople.push(<FontAwesome5 style={styles.iconPeople} name="user-plus" />)
        number++;
      }
      return listPeople;
    }
    let icon;
    if (this.props.myRoom.status == 'A') {
      icon = 'check-circle';
    }
    else {
      icon = 'ban';
    }
    const bgColor = () => {
      switch (this.props.myRoom.typeroom.gender) {
        case '1':
          return 'rgb(55, 198, 247)';
        case '2':
          return 'rgb(247, 117, 244)';
        case '3':
          return 'rgb(247, 203, 115)';
      }
    }
    return (
      <View key={this.props.myRoom.name}>
        <TouchableOpacity onPress={this.props.onClick}>
          <View style={[styles.item, { backgroundColor: bgColor() }]}>
            <FontAwesome5 style={styles.iconItem} name={icon} />
            <View style={styles.viewData}>
              <Text style={styles.title}>{`${this.props.myRoom.name}`}</Text>
              <Text style={styles.numbers}>{this.props.myRoom.number_now}/8</Text>
            </View>
            <View style={styles.viewIconPeople}>
              {RenderPeople(this.props.myRoom.number_now)}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(Room);

const styles = StyleSheet.create({
  item: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
  },
  viewData: {
    padding: 5,
    flex: 2,
    flexDirection: 'column',
  },
  title: {
    fontSize: 15,
  },
  numbers: {
    fontSize: 15,
  },
  viewIconPeople: {
    flex: 6,
    flexDirection: 'row',
  },
  iconPeople: {
    padding: 2,
    fontSize: 13,
  },
});
