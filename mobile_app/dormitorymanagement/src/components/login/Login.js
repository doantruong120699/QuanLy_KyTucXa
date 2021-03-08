import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/login';
import { AppBar } from '../index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
            this.props.navigation.navigate("HomePage");
        }
        else {
            // this.props.navigation.navigate("HomePage");
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
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                    <AppBar style={styles.appbar} navigation={this.props.navigation}/>
                    <View style={styles.container_child}>
                        <View style={styles.formLogin}>
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
                            <View style={styles.inputViewPassword}>
                                <TextInput
                                    underlineColorAndroid='#FFF'
                                    onChangeText={this.changeTextPass}
                                    style={styles.inputTextPassword}
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
        backgroundColor: 'white',
        elevation: 7,  
        borderRadius: 20,
        marginTop: '3%',
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
    formLogin: {
        elevation: 7, 
        backgroundColor: 'white',
        width: '80%',
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
    text: {
        marginBottom: '5%',
        fontSize: 10,
        textAlign: 'center', 
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
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        height: 40,
        marginBottom: '3%',
        marginLeft: '10%',
        padding: 20,
    },
    inputTextPassword: {
        height: 40,
        color: 'black',
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
        // resizeMode: 'contain',
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
    iconuser: {
        color: 'black',
        fontSize: 15,
        // marginLeft: 50,
        
    }
});
