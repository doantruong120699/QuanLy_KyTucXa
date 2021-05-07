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
const dataArea = [
  {
    "id": 1,
    "name": "A",
    "slug": "a"
  },
  {
    "id": 2,
    "name": "B",
    "slug": "b"
  },
  {
    "id": 4,
    "name": "C",
    "slug": "c"
  },
  {
    "id": 5,
    "name": "D",
    "slug": "d"
  }
]

const room = [
  {
    "id": 1,
    "name": "101",
    "slug": "101",
    "number_now": 5,
    "typeroom": {
      "id": 1,
      "name": "Type 1",
      "price": 200000,
      "number_max": 8,
      "slug": "type-1"
    },
    "area": {
      "id": 1,
      "name": "A",
      "slug": "a"
    },
    "status": "F",
    "created_at": "2021-03-15T14:40:15.339962Z",
    "last_update": "2021-03-18T15:36:20.411397Z"
  },
  {
    "id": 2,
    "name": "102",
    "slug": "102",
    "number_now": 4,
    "typeroom": {
      "id": 2,
      "name": "Type 2",
      "price": 150000,
      "number_max": 8,
      "slug": "type-2"
    },
    "area": {
      "id": 1,
      "name": "A",
      "slug": "a"
    },
    "status": "F",
    "created_at": "2021-03-15T14:40:37.232087Z",
    "last_update": "2021-04-07T09:14:11.123500Z"
  },
  {
    "id": 3,
    "name": "103",
    "slug": "103",
    "number_now": 4,
    "typeroom": {
      "id": 1,
      "name": "Type 1",
      "price": 200000,
      "number_max": 8,
      "slug": "type-1"
    },
    "area": {
      "id": 1,
      "name": "A",
      "slug": "a"
    },
    "status": "A",
    "created_at": "2021-04-14T07:34:53.112768Z",
    "last_update": "2021-04-21T16:06:51.341576Z"
  },

  {
    "id": 4,
    "name": "101",
    "slug": "101",
    "number_now": 5,
    "typeroom": {
      "id": 1,
      "name": "Type 1",
      "price": 200000,
      "number_max": 8,
      "slug": "type-1"
    },
    "area": {
      "id": 2,
      "name": "B",
      "slug": "b"
    },
    "status": "F",
    "created_at": "2021-03-15T14:40:15.339962Z",
    "last_update": "2021-03-18T15:36:20.411397Z"
  },
  {
    "id": 5,
    "name": "102",
    "slug": "102",
    "number_now": 4,
    "typeroom": {
      "id": 2,
      "name": "Type 2",
      "price": 150000,
      "number_max": 8,
      "slug": "type-2"
    },
    "area": {
      "id": 2,
      "name": "B",
      "slug": "b"
    },
    "status": "F",
    "created_at": "2021-03-15T14:40:37.232087Z",
    "last_update": "2021-04-07T09:14:11.123500Z"
  },
  {
    "id": 6,
    "name": "103",
    "slug": "103",
    "number_now": 4,
    "typeroom": {
      "id": 1,
      "name": "Type 1",
      "price": 200000,
      "number_max": 8,
      "slug": "type-1"
    },
    "area": {
      "id": 2,
      "name": "B",
      "slug": "b"
    },
    "status": "F",
    "created_at": "2021-04-14T07:34:53.112768Z",
    "last_update": "2021-04-21T16:06:51.341576Z"
  },
  {
    "id": 7,
    "name": "101",
    "slug": "101",
    "number_now": 5,
    "typeroom": {
      "id": 1,
      "name": "Type 1",
      "price": 200000,
      "number_max": 8,
      "slug": "type-1"
    },
    "area": {
      "id": 3,
      "name": "C",
      "slug": "c"
    },
    "status": "F",
    "created_at": "2021-03-15T14:40:15.339962Z",
    "last_update": "2021-03-18T15:36:20.411397Z"
  },
  {
    "id": 8,
    "name": "102",
    "slug": "102",
    "number_now": 4,
    "typeroom": {
      "id": 2,
      "name": "Type 2",
      "price": 150000,
      "number_max": 8,
      "slug": "type-2"
    },
    "area": {
      "id": 3,
      "name": "C",
      "slug": "c"
    },
    "status": "F",
    "created_at": "2021-03-15T14:40:37.232087Z",
    "last_update": "2021-04-07T09:14:11.123500Z"
  },
  {
    "id": 9,
    "name": "103",
    "slug": "103",
    "number_now": 4,
    "typeroom": {
      "id": 1,
      "name": "Type 1",
      "price": 200000,
      "number_max": 8,
      "slug": "type-1"
    },
    "area": {
      "id": 3,
      "name": "C",
      "slug": "c"
    },
    "status": "A",
    "created_at": "2021-04-14T07:34:53.112768Z",
    "last_update": "2021-04-21T16:06:51.341576Z"
  },

]
const ShowAllRoom = (props) => {
  const { data, navigation } = props;
  handleClickItem = (item) => {
    navigation.navigate("RoomDetail", { item });
  }
  const renderItem = ({ item }) => {
    return (
      <Room myRoom={item} onClick={() => handleClickItem(item)} />
    )
  }
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    setNewData(dataArea.map(t => {
      const roomInThisArea = room.filter(index => index.area.name === t.name)
      return {
        title: `Khu ${t.name}`,
        data: [...roomInThisArea],
      }
    }))
  }, [])
  const [selectedValue, setSelectedValue] = useState("All");
  const changeSelectedValueItem = (item) => {
    setSelectedValue(item);
  }
  const handlePickerChange = async (item) => {
    changeSelectedValueItem(item);

  }
  const [area, setArea] = useState([{
    "id": 6,
    "name": "All",
    "slug": "all"
  }, ...dataArea,])
  console.log("Selected Value", selectedValue);
  console.log("New Data", newData[0])
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
            {area.map(t => {
              return t.name === "All" ? <Picker.Item label="Tất cả phòng" value="all" /> : <Picker.Item label={`Khu ${t.name}`} value={t.name} />
            })}
          </Picker>
        </View>
        <View style={styles.container_child}>
          <SectionList
            style={styles.sectionList}
            sections={selectedValue === "All" ? newData : newData.filter(t => t.title === `Khu ${selectedValue}`)}
            keyExtrator={(item, index) => item + index}
            renderItem={renderItem}
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