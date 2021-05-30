import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SectionList, ImageBackground, ToastAndroid, ScrollView } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { createnotification } from '../../redux/actions/index';
import { AppBar } from '../index';
import { TextInput } from 'react-native-gesture-handler';
import { styleImgBg } from '../../styles/index';

const CreateNotification = (props) => {
  const { navigation, createnotification } = props;
  const [data, setData] = useState({
    title: '',
    content: '',
    is_display: true,
  });
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  const dataEmpty = () => {
    if (data.title || data.content) {
      return false;
    }
    return true;
  }
  const save = async () => {
    let checkData = dataEmpty();
    if (!checkData) {
      showToast('Phải nhập đầy đủ thông tin');
    }
    else {
      let dataCreate = {
        "title": data.title,
        "content": data.content,
        "is_display": data.is_display
      };
      await createnotification(dataCreate);
    }  
  }
  const changeTitle = (value) => {
    setData({
      ...data,
      title: value,
    })
  }
  const changeContent = (value) => {
    setData({
      ...data,
      content: value,
    })
  }
  const msg = useSelector((state) => state.createnotification.msg);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
        <AppBar style={styles.appBar} navigation={navigation} />
        <View style={styles.container_child}>
          <View style={styles.form}>
            <ScrollView>
              <Text style={styles.text}>TẠO THÔNG BÁO</Text>
              <View style={styles.viewRow}>
                <Text style={styles.title}>Tiêu đề:</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  onChangeText={(value) => {changeTitle(value)}}
                  style={styles.inputText}
                />
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.title}>Nội dung:</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  onChangeText={(value) => {changeContent(value)}}
                  style={styles.inputText}
                />
              </View>
              <View style={styles.viewButton}>
                <TouchableOpacity style={styles.btnSave} onPress={save}>
                  <Text style={styles.textSave}>Đăng</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const mapDispatchToProps = {
  createnotification
};
function mapStateToProps(state) {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotification);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  container_child: {
    flex: 9,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'white',
    height: 250,
    width: 300,
    borderRadius: 20,
    elevation: 7,
  },
  viewRow: {
    margin: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    width: 50,
  },
  inputText: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    height: 40,
  },
  viewButton: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSave: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
    height: '100%',
    backgroundColor: '#5f6ff6',
  },
  textSave: {
    color: 'white',
    fontSize: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  }
});
