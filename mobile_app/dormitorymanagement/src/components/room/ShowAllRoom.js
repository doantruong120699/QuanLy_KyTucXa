import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SectionList, ImageBackground, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect, useSelector } from 'react-redux';
import { getallroom, getarea } from '../../redux/actions/index';
import { AppBar } from '../index';
import Room from './Room';
import { useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { G } from 'react-native-svg';
import { stylePages, styleImgBg } from '../../styles/index';

const ShowAllRoom = (props) => {
  const { navigation, getallroom, getarea } = props;
  const nav = navigation;
  const handleClickItem = (item) => {
    navigation.navigate("RoomDetail", { item });
  }
  const renderItem = ({ item }) => {
    return (
      <Room myRoom={item} onClick={() => handleClickItem(item)} />
    )
  }
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  const [newData, setNewData] = useState([]);
  const getRoom = useSelector((state) => state.getallroom);
  const dataArea = useSelector((state) => state.getarea.payload);
  const [page, setPage] = useState({
    current_page: getRoom.payload.current_page,
    nextPage: getRoom.payload.next_page,
    totals: getRoom.payload.totals,
  });
  const totalPages = Math.ceil(page.totals / 20);
  useEffect(() => {
    if (getRoom.msg != 'Success') {
      showToast(getRoom.msg);
    }
    setNewData(dataArea.map((t) => {
      const roomInThisArea = getRoom.payload.results.filter(index => index.area.name === t.name)
      return {
        title: `Khu ${t.name}`,
        data: [...roomInThisArea],
      }
    }))
  }, [page, selectedValue, area])
  const [selectedValue, setSelectedValue] = useState("all");
  const changeSelectedValueItem = (item) => {
    setSelectedValue(item);
  }
  const handlePickerChange = async (item) => {
    changeSelectedValueItem(item);
  }
  const minusNumberPage = async () => {
    await getallroom(page.current_page - 1);
    await getarea();
    setPage({
      ...page,
      current_page: page.current_page - 1,
    });
  }
  const plusNumberPage = async () => {
    await getallroom(page.current_page + 1);
    await getarea();
    setPage({
      ...page,
      current_page: page.current_page + 1,
    });
  }
  const [area, setArea] = useState([{
    "id": 99,
    "name": "All",
    "slug": "all"
  }, ...dataArea,])
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
        <AppBar style={styles.appBar} navigation={nav} onChange={(t) => {
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
            sections={selectedValue === "all" ? newData : newData.filter(t => t.title === `Khu ${selectedValue}`)}
            keyExtrator={(item, index) => item.id}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
          <View style={stylePages.flexRow}>
              <TouchableOpacity 
                style={[stylePages.btnOperation, stylePages.viewPage]} 
                onPress={() => { minusNumberPage() }}
                disabled={page.current_page <= 1}
              >
                <Text>-</Text>
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid="transparent"
                onChangeText={() => {}}
                value={page.current_page.toString()}
                style={[stylePages.inputPage, stylePages.viewPage]}
                placeholderTextColor="#808080"
                keyboardType="numeric"
              >
              </TextInput>
              <TouchableOpacity 
                style={[stylePages.btnOperation, stylePages.viewPage]} 
                onPress={() => { plusNumberPage() }}
                disabled={page.current_page >= totalPages}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View> 
        </View>
      </ImageBackground>
    </View>
  );
}
const mapDispatchToProps = {
  getallroom: getallroom,
  getarea: getarea,
};
function mapStateToProps(state) {
  return {
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
  title: {
    padding: 5,
    fontSize: 15,
  },
});