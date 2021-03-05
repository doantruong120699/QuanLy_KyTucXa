import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { getallroom } from '../../redux/actions/getallroom';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
const renderItem = ({ item }) => {

    return (
      <Item
        item={item}
      />
    );
  };
//   const data = [
//     {
//       id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//       title: "First Item",
//     },
//     {
//       id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//       title: "Second Item",
//     },
//     {
//       id: "58694a0f-3da1-471f-bd96-145571e29d72",
//       title: "Third Item",
//     },
// ];
getAllRoom = () => {
    this.props.getallroom();
}
class ShowAllRoom extends Component {

    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.props.data} 
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
                <TouchableOpacity onPress={this.getAllRoom}>
                    <Text>Show</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

const mapDispatchToProps = {
    getallroom,
};
function mapStateToProps(state) {
    return {
        data: state.getallroom.data,
        filter_status: state.getallroom.filter_status,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowAllRoom);