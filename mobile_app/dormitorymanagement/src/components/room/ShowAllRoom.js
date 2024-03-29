import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SectionList, ImageBackground, ToastAndroid } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { getallroom, getarea } from '../../redux/actions/index';
import { AppBar } from '../index';
import Room from './Room';
import { useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { stylePages, styleImgBg, styleSearch } from '../../styles/index';

const ShowAllRoom = (props) => {
  const { navigation, getallroom, getarea } = props;
  const handleClickItem = (item) => {
    navigation.navigate("RoomDetail", { item });
  }
  const renderItem = ({ item }) => {
    return (
      <Room myRoom={item} onClick={() => handleClickItem(item)} key={item.name}/>
    )
  }
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  const [newData, setNewData] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const getRoom = useSelector((state) => state.getallroom);
  const dataArea = useSelector((state) => state.getarea.payload);
  const [area, setArea] = useState('Tất cả');
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
        title: `${t.name}`,
        data: [...roomInThisArea],
      }
    }))
  }, [page, textSearch, getRoom])
  const minusNumberPage = async () => {
    await getallroom(page.current_page - 1, '', area === 'Tất cả' ? '' : 'area-' + area);
    await getarea();
    setPage({
      ...page,
      current_page: page.current_page - 1,
    });
  }
  const plusNumberPage = async () => {
    await getallroom(page.current_page + 1, '', area === 'Tất cả' ? '' : 'area-' + area);
    await getarea();
    setPage({
      ...page,
      current_page: page.current_page + 1,
    });
  }
  const changeTextSearch = (value) => {
    setTimeout(async () => {
      await getallroom(1, value);
      await getarea();
      await setTextSearch(value);
    }, 1000);
  }
  const getRoomOfKhu = async (title) => {
    const khu = title.split(' ')[title.split(' ').length - 1];
    await getallroom(1, '', khu === 'cả' ? '' : 'area-' + khu);
    await getarea();
    setPage({
      ...page,
      current_page: 1
    })
    setArea(khu === 'cả' ? 'Tất cả' : khu);
  }
  return newData != [] ? (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
        <AppBar style={styles.appBar} navigation={navigation} onChange={(t) => {
        }
        } />
        <View style={styleSearch.viewSearch}>
          <TextInput
            underlineColorAndroid="transparent"
            onChangeText={(value) => {changeTextSearch(value)}}
            placeholder="Tìm kiếm"
            style={styleSearch.inputTextSearch}
            placeholderTextColor="#808080"
          >
          </TextInput>
        </View>
        <View style={styles.sectionColor}>
          <View  style={styles.sectionColorItem}>
            <View style={styles.male}></View>
            <Text>Nam</Text>
          </View>
          <View style={styles.sectionColorItem}>
            <View style={styles.female}></View>
            <Text>Nữ</Text>
          </View>
          <View  style={styles.sectionColorItem}>
            <View style={styles.shared}></View>
            <Text>Sinh hoạt chung</Text>
          </View>
        </View>
        <View style={styles.container_child}>
          <SectionList
            style={styles.sectionList}
            sections={newData}
            keyExtrator={(item, index) => {item + index}}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
              <TouchableOpacity onPress={() => getRoomOfKhu(title)}>
                <Text style={styles.header}>
                  {title}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={stylePages.flexRow}>
              <TouchableOpacity 
                style={[stylePages.btnOperation, stylePages.viewPage]} 
                onPress={() => { minusNumberPage() }}
                disabled={page.current_page <= 1}
              >
                <Text style={stylePages.textOpe}>{'<'}</Text>
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
                <Text style={stylePages.textOpe}>{'>'}</Text>
              </TouchableOpacity>
            </View> 
        </View>
      </ImageBackground>
    </View>
  ) : (<View></View>);
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
  sectionColor: {
    height: 40,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionColorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  male: {
    width: 25,
    height: 25,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: 'rgb(55, 198, 247)',
  },
  female: {
    width: 25,
    height: 25,
    marginRight: 5,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: 'rgb(247, 117, 244)',
  },
  shared: {
    width: 25,
    height: 25,
    marginRight: 5,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: 'rgb(247, 203, 115)',
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
