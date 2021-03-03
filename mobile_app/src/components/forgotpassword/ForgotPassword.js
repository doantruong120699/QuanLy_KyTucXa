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
        this.setState({ms: text});
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
    textForgot: {
        paddingBottom: 30,
        fontSize: 25,
        fontWeight: 'bold',
    },
    text1: {
        fontSize: 10,
    },
    text2: {
        paddingBottom: 20,
        fontSize: 10,
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
    forgotPasswordText: {
        color: 'white',
    },
});
