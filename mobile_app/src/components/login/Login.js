import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/login';
import { AppBar } from '../index';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    };
    changTextUsername = (text) => {
        this.setState({username: text});
    };
    changTextPassword = (text) => {
        this.setState({password: text});
    };
    loginSuccess = async () => {
        const data = {email: this.state.email, password: this.state.password};
        // await this.props.login(data);
        const token = '';
        // const role = await getData('role');
        if (token === null || token === undefined || token === '') {
            this.props.navigation.navigate("ForgotPassword");
        }
        else {
            this.props.navigation.navigate("HomePage");
        }
    };
    forgotPassword = () => {
        this.props.navigation.navigate("ForgotPassword");
    }
    render() {
        return (
            <View style={styles.container}>
                <AppBar style={styles.appbar} navigation={this.props.navigation}/>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                    <View style={styles.container_child}>
                        <Text style={styles.textLogin}>ĐĂNG NHẬP</Text>
                        <Text style={styles.text}>Có thể đăng nhập bằng tài khoản sinh viên:</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={this.changeTextUsername}
                                style={styles.inputText}
                                placeholder="Tài khoản"
                                placeholderTextColor="#808080"
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                underlineColorAndroid='#FFF'
                                onChangeText={this.changeTextPass}
                                style={styles.inputText}
                                placeholder="Mật khẩu"
                                placeholderTextColor="#808080"
                                secureTextEntry={true}
                            >
                                {/* <TouchableOpacity style={{paddingRight: 5}}>
                                    <Text>Show</Text>
                                </TouchableOpacity> */}
                            </TextInput>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
        flex: 9,
        width: '100%',
        justifyContent: 'center',
        resizeMode: "cover",
        alignItems: 'center',
    },
    container_child: {
      elevation: 7,  
      borderRadius: 20,
      width: '80%',
      height: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    textLogin: {
        paddingBottom: 30,
        fontSize: 25,
        fontWeight: 'bold',
    },
    text: {
        paddingBottom: 20,
        fontSize: 10,
        
    },
    forgot: {
      color: '#5f6ff6',
      fontSize: 13,
      fontWeight: 'bold',
    },
    loginBtn: {
      width: '60%',
      backgroundColor: '#4682b4',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    inputView: {
      width: '80%',
      backgroundColor: '#f5f5f5',
      borderRadius: 25,
      height: 40,
      marginBottom: 10,
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
    },
    loginText: {
        color: 'white',
    },
});
