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
                <AppBar style={styles.appbar} navigation={this.props.navigation}/>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                    <View style={styles.container_child}>
                        <Text style={styles.text}>ĐẶT LẠI MẬT KHẨU</Text>
                        {/* <Loader status={this.props.loading} msg={'Signing in '}></Loader> */}
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
    text: {
        paddingBottom: 30,
        fontSize: 25,
        fontWeight: 'bold',
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
