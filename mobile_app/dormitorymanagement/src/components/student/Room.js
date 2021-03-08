import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { getallroom } from '../../redux/actions/getallroom';


class Room extends Component {
    render() {
        const { status } = this.props.myRoom;
        const icon = status === true ? 'check-circle' : 'ban';
        return(
            <View>
              <TouchableOpacity>
                <View style={styles.item}>
                    <FontAwesome5 style={styles.iconItem} name={icon}/>
                    <View style={styles.viewData}>
                      <Text style={styles.title}>{this.props.myRoom.room}</Text>
                      <Text style={styles.numbers}>{this.props.myRoom.numbers}</Text>
                    </View>
                    <View style={styles.viewIconPeople}>
                      <FontAwesome5 style={styles.iconPeople} name="male"/>
                      <FontAwesome5 style={styles.iconPeople} name="male"/>
                      <FontAwesome5 style={styles.iconPeople} name="male"/>
                      <FontAwesome5 style={styles.iconPeople} name="male"/>
                      <FontAwesome5 style={styles.iconPeople} name="male"/>
                      <FontAwesome5 style={styles.iconPeople} name="male"/>
                      <FontAwesome5 style={styles.iconPeople} name="male"/>
                      <FontAwesome5 style={styles.iconPeople} name="male"/>
                    </View>
                </View>
              </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
  return {
    textSearch : state.searchroom.textSearch,
  }
} 
export default connect(mapStateToProps)(Room);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    item: {
      marginLeft: 20,
      marginRight: 20,
      backgroundColor: 'yellow',
      borderRadius: 15,
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
      fontSize: 20,
    },
});