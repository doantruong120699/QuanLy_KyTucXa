import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, TextInput, Text, StyleSheet, ImageBackground, ToastAndroid, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { changeprofile } from '../../redux/actions/index';
import DatePicker from 'react-native-date-picker';
import { styleBtnComeBack, styleImgBg } from '../../styles/index';

class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      first_name: '',
      last_name: '',
      birthday: new Date(),
      address: '',
      identity_card: '',
      phone: '',
    };
  };
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  save = async () => {
    const data = {
      "email": "tmquang@gmail.com",
      "username": "quangteo",
      "first_name": "Quang",
      "last_name": "Tran Minh",
      "profile": {
        "birthday": "2021-01-01",
        "address": "DANA",
        "identity_card": "20220002",
        "phone": "0213123123"
      }
    }
    await this.props.changeprofile(data);
    if (this.props.msg !== 'Success') {
      this.showToast('Đổi thông tin không thành công');
    }
    else {
      this.showToast('Đổi thông tin thành công');
      this.props.navigation.goBack();
    }
  }
  goBack = () => {
    this.props.navigation.goBack();
  };
  changeTextEmail = (text) => {
    this.setState({ email: text });
  }
  changeTextUsername = (text) => {
    this.setState({ username: text });
  }
  changeTextFirstName = (text) => {
    this.setState({ first_name: text });
  }
  changeTextLastName = (text) => {
    this.setState({ last_name: text });
  }
  changeTextAddress = (text) => {
    this.setState({ address: text });
  }
  changeTextIdentify = (text) => {
    this.setState({ identity_card: text });
  }
  changeTextPhone = (text) => {
    this.setState({ phone: text });
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
          <View style={styleBtnComeBack.comeBack}>
            <TouchableOpacity style={styleBtnComeBack.buttonComback} onPress={this.goBack}>
              <FontAwesome5 style={styleBtnComeBack.iconUndo} name="long-arrow-alt-left" />
            </TouchableOpacity>
            <Text style={styles.text}>ĐỔI THÔNG TIN</Text>
          </View>
          <View style={styles.container_child}>
            <View style={styles.formChangeInfo}>
              <ScrollView>
                <View style={styles.viewRow}>
                  <Text style={styles.title}>Email:</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={this.changeTextEmail}
                    style={styles.inputText}
                  />
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.title}>Tài khoản:</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={this.changeTextUsername}
                    style={styles.inputText}
                  />
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.title}>Tên:</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={this.changeTextFirstName}
                    style={styles.inputText}
                  />
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.title}>Họ:</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={this.changeTextLastName}
                    style={styles.inputText}
                  />
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.title}>Ngày sinh:</Text>
                  <DatePicker
                    style={styles.datePicker}
                    date={this.state.birthday}
                    mode={"date"}
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1990-01-01"
                    maxDate="2022-01-01"
                    onDateChange={(date) => { this.setState({ birthday: date }) }}
                  />
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.title}>Địa chỉ:</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={this.changeTextAddress}
                    style={styles.inputText}
                  />
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.title}>CMND:</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={this.changeTextIdentify}
                    style={styles.inputText}
                  />
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.title}>Số điện thoại:</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={this.changeTextPhone}
                    style={styles.inputText}
                  />
                </View>
                <View style={styles.viewButton}>
                  <TouchableOpacity style={styles.btnSave} onPress={this.save}>
                    <Text style={styles.textSave}>LƯU</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const mapDispatchToProps = {
  changeprofile,
}

function mapStateToProps(state) {
  return {
    msg: state.changeprofile.msg,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  container_child: {
    flex: 9,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formChangeInfo: {
    backgroundColor: 'white',
    height: '90%',
    width: '80%',
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
  datePicker: {
    flex: 1,
    height: 40,
  }
});
