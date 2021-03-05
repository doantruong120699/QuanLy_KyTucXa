import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/login';
import { AppBar } from '../index';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password: '',
            new_password: '',
            repeat_new_password: '',
        };
    };
    changTextOldPassword = (text) => {
        this.setState({old_password: text});
    };
    changTextNewPassword = (text) => {
        this.setState({new_password: text});
    };
    changTextRepeatNewPassword = (text) => {
        this.setState({repeat_new_password: text});
    };
    loginSuccess = () => {
        const data = {email: this.state.email, password: this.state.password};
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                    <AppBar style={styles.appbar} navigation={this.props.navigation}/>
                    <View style={styles.container_child}>
                        <View style={styles.formChangePassword}>
                            <Text style={styles.text}>ĐẶT LẠI MẬT KHẨU</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    onChangeText={this.changTextOldPassword}
                                    style={styles.inputText}
                                    placeholder="Mật khẩu cũ"
                                    placeholderTextColor="#808080"
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    onChangeText={this.changTextNewPassword}
                                    style={styles.inputText}
                                    placeholder="Mật khẩu mới"
                                    placeholderTextColor="#808080"
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    onChangeText={this.changTextRepeatNewPassworde}
                                    style={styles.inputText}
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
    login,
};
function mapStateToProps(state) {
    return {
        msg: state.login.msg,
        isLoggedIn: state.login.isLoggedIn,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

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
        resizeMode: "cover",
        alignItems: 'center',
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
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '3%',
        marginBottom: '7%',
        fontSize: 25,
    },
    inputView: {
        marginLeft: '10%',
        width: '80%',
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        height: 40,
        marginBottom: '3%',
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
        marginTop: 20,
        marginBottom: 10,
    },
    changePasswordText: {
        color: 'white',
    },
});
