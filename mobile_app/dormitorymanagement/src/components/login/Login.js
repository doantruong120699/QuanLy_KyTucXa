import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { login, dashboard, getprofile } from '../../redux/actions/index';
import { storeData, getData } from '../../utils/asyncStorage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styleImgBg, styleInput, styleContainer } from '../../styles/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      icon: 'eye-slash',
      isShow: true,
    };
  };
  async componentDidMount() {
    let token = await getData('token');
    if(token) {
      this.props.navigation.navigate('HomePage')
    }
  }
  changeTextUsername = (text) => {
    this.setState({ username: text });
  };
  changeTextPassword = (text) => {
    this.setState({ password: text });
  };
  validateData = () => {
    const { username, password } = this.state;
    if (!username || !password)
        return false;
    return true;
  };
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  loginSuccess = async () => {
    if (!this.validateData()) {
      this.showToast('Chưa nhập tài khoản hoặc mật khẩu');
      return;
    }
    let data = { "username": this.state.username, "password": this.state.password };
    // let data = { "username": "tmquang1199@gmail.com", "password": "quang1999" };
    await this.props.login(data);
    let token = await getData('token');
    let role = await getData('role');
    if (token === null || token === undefined || token === '') {
        this.showToast(this.props.msg);
        this.props.navigation.navigate("Login");
    }
    else {
      if (role === "sinhvien_group" || role === "nhanvien_group") {
        this.showToast('Đăng nhập thành công');
        this.props.navigation.navigate("HomePage");
        this.props.getprofile();
      }
      else {
        storeData('token', '');
        storeData('role', '');
        storeData('name', '');
        this.showToast('Sai tài khoản hoặc mật khẩu');
      }
    }
  };
  forgotPassword = () => {
    this.props.navigation.navigate("ForgotPassword");
  }
  hideShowPassword = () => {
    this.setState({
      icon: this.state.icon === 'eye' ? 'eye-slash' : 'eye',
      isShow: !this.state.isShow,
    })
  }
  render() {
    return (
      <View style={[styleContainer.container, styles.container]}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
          <View style={styles.container_child}>
            <View style={styles.formLogin}>
              <Text style={styles.textLogin}>ĐĂNG NHẬP</Text>
              <View style={styleInput.inputView}>
                <TextInput
                  underlineColorAndroid="transparent"
                  onChangeText={this.changeTextUsername}
                  style={styleInput.inputText}
                  placeholder="Tài khoản"
                  placeholderTextColor="#808080"
                />
              </View>
              <View style={[styleInput.inputView, styles.inputViewPassword]}>
                <TextInput
                  underlineColorAndroid="transparent"
                  onChangeText={this.changeTextPassword}
                  style={styleInput.inputText}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#808080"
                  secureTextEntry={this.state.isShow}
                >
                </TextInput>
                <TouchableOpacity
                  style={styles.touchableShowPassword}
                  onPress={this.hideShowPassword}
                >
                  <FontAwesome5
                    style={styles.iconeye}
                    name={this.state.icon}
                  ></FontAwesome5>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this.forgotPassword}>
                <Text style={styles.forgot}>Quên mật khẩu?</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginBtn} onPress={this.loginSuccess}>
                  <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
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
  login,
  getprofile,
  dashboard
};
function mapStateToProps(state) {
  return {
    result: state.login.payload,
    msg: state.login.msg,
    isLoggedIn: state.login.isLoggedIn,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  container_child: {
    flex: 9,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formLogin: {
    elevation: 7,
    backgroundColor: 'white',
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  textLogin: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '3%',
    marginBottom: '7%',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    height: 40,
    marginBottom: '3%',
    marginLeft: '10%',
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 40,
    color: 'black',
  },
  inputViewPassword: {
    position: 'relative',
    alignSelf: 'stretch',
    marginBottom: '5%',
  },
  touchableShowPassword: {
    position: 'absolute',
    right: 5,
    height: 30,
    width: 35,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeye: {
    height: '100%',
    width: '100%',
  },
  forgot: {
    color: '#5f6ff6',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '5%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    width: '60%',
    backgroundColor: '#5f6ff6',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
  },
});
