import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, SectionList, ImageBackground, ToastAndroid, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { getallroom } from '../../redux/actions/getallroom';
import { searchroom } from '../../redux/actions/searchroom';
import { AppBar } from '../index';
import Room from './Room';
import { useEffect } from 'react';
// const Item = ({ item, onPress, style }) => (
//     <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
//         <Text style={styles.title}>{item.title}</Text>
//     </TouchableOpacity>
// );
// const renderItem = ({ item }) => {
//     return (
//         <Item
//           item={item}
//         />
//     );
// };
const ShowAllRoom = (props) => {
  const { data, navigation } = props;
  handleClickItem = (item) => {
    console.log("Clicked", item);
    navigation.navigate("RoomDetail", { item });
  }
  const renderItem = ({ item }) => {
    let result;
    return (
      <Room myRoom={item} onClick={() => this.handleClickItem(item)} />
    )
  }
  const [selectedValue, setSelectedValue] = useState("All");
  const [loading, setLoading] = useState(false);
  const loadCurrentData = () => {
    const result = data.filter(t => t.title === selectedValue)
    setSectionData(...[result]);

  }
  const [sectionData, setSectionData] = useState(data);
  useEffect(() => {
    loadCurrentData();
  }, [])
  const changeSelectedValueItem = (item) => {
    setSelectedValue(item);
  }
  const handlePickerChange = async (item) => {
    changeSelectedValueItem(item);

  }
  return (
    <View style={styles.container}>

      <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
        <AppBar style={styles.appBar} navigation={navigation} onChange={(t) => {
        }
        } />
        <View style={styles.container}>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 100, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              handlePickerChange(itemValue);
            }}
          >
            <Picker.Item label="Khu A" value="Khu A" />
            <Picker.Item label="Khu B" value="Khu B" />
            <Picker.Item label="Khu C" value="Khu C" />
            <Picker.Item label="Tat ca" value="All" />
          </Picker>
        </View>
        <View style={styles.container_child}>
          <SectionList
            style={styles.sectionList}
            sections={selectedValue === "All" ? data : data.filter(t => t.title === selectedValue)}
            keyExtrator={(item, index) => item + index}
            renderItem={
              renderItem
            }
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
const mapDispatchToProps = {
  getallroom,
};
function mapStateToProps(state) {
  return {
    textSearch: state.searchroom.textSearch,
    data: state.getallroom.data,
    filter_status: state.getallroom.filter_status,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowAllRoom);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    resizeMode: "cover",
    alignItems: 'center',
  },
  appBar: {
    flex: 1,
  },
  container_child: {
    flex: 9,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionList: {
    elevation: 7,
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    marginBottom: '2%',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
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
  iconitem: {
    padding: 5,
    fontSize: 15,
  },
  title: {
    padding: 5,
    fontSize: 15,
  },
});