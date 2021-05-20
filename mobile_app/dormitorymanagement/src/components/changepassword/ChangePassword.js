import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { changepassword } from '../../redux/actions/changepassword';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styleBtnComeBack, styleImgBg, styleInput, styleContainer } from '../../styles/index';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: 'quang111',
      new_password: 'quang19999',
      repeat_new_password: 'quang19999',
    };
  };
  changTextOldPassword = (text) => {
    this.setState({ old_password: text });
  };
  changTextNewPassword = (text) => {
    this.setState({ new_password: text });
  };
  changTextRepeatNewPassword = (text) => {
    this.setState({ repeat_new_password: text });
  };
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  changePassword = async () => {
    const data = {
      "old_password": this.state.old_password,
      "new_password": this.state.new_password,
      "confirm_password": this.state.repeat_new_password
    };
    await this.props.changepassword(data);
    if (this.props.msg !== 'Success') {
      this.showToast(this.props.msg);
    }
    else {
      this.showToast('Đổi mật khẩu thành công');
    }
  };
  goBack = () => {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={[styleContainer.container, styles.container]}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
          <View style={styleBtnComeBack.comeBack}>
            <TouchableOpacity style={styleBtnComeBack.buttonComback} onPress={this.goBack}>
              <FontAwesome5 style={styleBtnComeBack.iconUndo} name="long-arrow-alt-left" />
            </TouchableOpacity>
            <Text style={styles.text}>ĐỔI MẬT KHẨU</Text>
          </View>
          <View style={styles.container_child}>
            <View style={styles.formChangePassword}>
              <View style={styleInput.inputView}>
                <TextInput
                  onChangeText={this.changTextOldPassword}
                  style={styleInput.inputText}
                  placeholder="Mật khẩu cũ"
                  placeholderTextColor="#808080"
                  secureTextEntry={true}
                />
              </View>
              <View style={styleInput.inputView}>
                <TextInput
                  onChangeText={this.changTextNewPassword}
                  style={styleInput.inputText}
                  placeholder="Mật khẩu mới"
                  placeholderTextColor="#808080"
                  secureTextEntry={true}
                />
              </View>
              <View style={styleInput.inputView}>
                <TextInput
                  onChangeText={this.changTextRepeatNewPassword}
                  style={styleInput.inputText}
                  placeholder="Xác thực mật khẩu"
                  placeholderTextColor="#808080"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.changePasswordBtn} onPress={this.changePassword}>
                  <Text style={styles.changePasswordText}>ĐẶT LẠI</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  };
}

const mapDispatchToProps = {
  changepassword,
};
function mapStateToProps(state) {
  return {
    msg: state.changepassword.msg,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  container_child: {
    flex: 9,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formChangePassword: {
    elevation: 7,
    borderRadius: 20,
    width: '80%',
    height: 300,
    backgroundColor: 'white',
  },
  inputView: {
    marginTop: '4%',
    marginLeft: '10%',
    width: '80%',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 40,
    color: 'black',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePasswordBtn: {
    width: '60%',
    backgroundColor: '#5f6ff6',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  changePasswordText: {
    color: 'white',
  },
});
