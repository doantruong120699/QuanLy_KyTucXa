import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/login';
import { AppBar } from '../index';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ms: '',
    };
  };
  changTextMs = (text) => {
    this.setState({ ms: text });
  };
  loginSuccess = () => {
    const data = { email: this.state.email, password: this.state.password };
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
          <AppBar style={styles.appbar} navigation={this.props.navigation} />
          <View style={styles.container_child}>
            <View style={styles.formForgot}>
              <Text style={styles.textForgot}>FORGOT PASSWORD</Text>
              <Text style={styles.text1}>Bạn hay nhập vào MSSV dưới đây.</Text>
              <Text style={styles.text2}>Chúng tôi sẽ gửi cho bạn đường link đổi mật khẩu mới</Text>
              <View style={styles.inputView}>
                <TextInput
                  onChangeText={this.changTextMs}
                  style={styles.inputText}
                  placeholder="MSSV or MSNV..."
                  placeholderTextColor="#808080"
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.forgotPasswordBtn} onPress={this.changePassword}>
                  <Text style={styles.forgotPasswordText}>XÁC NHẬN</Text>
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
};
function mapStateToProps(state) {
  return {
    msg: state.login.msg,
    isLoggedIn: state.login.isLoggedIn,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: "column",
  },
  appbar: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    // resizeMode: "cover",
    alignItems: 'center',
  },
  container_child: {
    flex: 9,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formForgot: {
    elevation: 7,
    borderRadius: 20,
    width: '80%',
    height: 250,
    backgroundColor: 'white',
  },
  textForgot: {
    marginTop: '3%',
    marginBottom: '7%',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text1: {
    fontSize: 10,
    textAlign: 'center',
  },
  text2: {
    paddingBottom: 20,
    fontSize: 10,
    textAlign: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    height: 40,
    marginBottom: '5%',
    marginLeft: '10%',
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
  forgotPasswordBtn: {
    width: '60%',
    backgroundColor: '#5f6ff6',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: 'white',
  },
});
