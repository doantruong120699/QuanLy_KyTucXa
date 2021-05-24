import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styleBtnComeBack, styleImgBg, styleContainer } from '../../styles/index';
import { forgotpassword } from '../../redux/actions/forgotpassword';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  };
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  changTextEmail = (text) => {
    this.setState({ email: text });
  };
  changePassword = async () => {
    let data = { "email": this.state.email };
    await this.props.forgotpassword(data);
    if (this.props.msg != 'Success') {
      this.showToast(this.props.msg);
    }
    else {
      this.showToast('Vui lòng kiểm tra email để tạo mật khẩu mới!');
      this.props.navigation.navigate("Login");
    }
  }
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
            <Text style={styles.text}>QUÊN MẬT KHẨU</Text>
          </View>
          <View style={styles.container_child}>
            <View style={styles.formForgot}>
              <Text style={styles.text1}>Bạn hãy nhập vào Email dưới đây.</Text>
              <Text style={styles.text2}>Chúng tôi sẽ gửi cho bạn đường link đổi mật khẩu mới</Text>
              <View style={styles.inputView}>
                <TextInput
                  onChangeText={this.changTextEmail}
                  style={styles.inputText}
                  placeholder="Email"
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
  forgotpassword,
};
function mapStateToProps(state) {
  return {
    msg: state.forgotpassword.msg
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

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
  formForgot: {
    elevation: 7,
    borderRadius: 20,
    width: '80%',
    height: 250,
    backgroundColor: 'white',
  },
  text1: {
    marginTop: 30,
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
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
