import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, TextInput, Text, StyleSheet, ImageBackground, ToastAndroid, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { changeprofile } from '../../redux/actions/index';
import DatePicker from 'react-native-date-picker';
import { styleBtnComeBack, styleImgBg, styleContainer } from '../../styles/index';

class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      birthday: new Date(),
      address: '',
      identify_card: '',
      phone: '',
    };
  };
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  save = async () => {
    if (!this.state.first_name || !this.state.last_name || !this.state.birthday || !this.state.address || !this.state.identify_card || !this.state.phone) {
      this.showToast("Vui lòng nhập đầy đủ thông tin");
    }
    else {
      let month = parseInt(this.state.birthday.getMonth()) + 1;
      const data = {
        "first_name": this.state.first_name,
        "last_name": this.state.last_name,
        "profile": {
          "birthday": this.state.birthday.getFullYear() + "-" + month + "-" + this.state.birthday.getDate(),
          "address": this.state.address,
          "identify_card": this.state.identify_card,
          "phone": this.state.phone
        }
      }
      console.log(data)
      await this.props.changeprofile(data);
      if (this.props.msg !== 'Success') {
        this.showToast('Đổi thông tin không thành công');
      }
      else {
        this.showToast('Đổi thông tin thành công');
        this.props.navigation.goBack();
      }
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
    this.setState({ identify_card: text });
  }
  changeTextPhone = (text) => {
    this.setState({ phone: text });
  }
  render() {
    return (
      <View style={[styleContainer.container, styles.container]}>
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
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.viewRow}>
                  <Text style={styles.title}>Số điện thoại:</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    onChangeText={this.changeTextPhone}
                    style={styles.inputText}
                    keyboardType="numeric"
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
    width: "100%",
    height: "100%",
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
    height: 460,
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
  datePicker: {
    flex: 1,
    height: 40,
  }
});
