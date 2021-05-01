import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { changepassword } from '../../redux/actions/changepassword';
import { AppBar } from '../index';
import { getData } from '../../utils/asyncStorage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'asdquang111@gmail.com',
            old_password: 'quang301199',
            new_password: 'quang1999',
            repeat_new_password: 'quang1999',
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
    showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    };
    changePassword = async () => {
        const data = {
            "email": this.state.email, 
            "old_password": this.state.old_password, 
            "password": this.state.new_password, 
            "confirm_password": this.state.repeat_new_password
        };
        await this.props.changepassword(data);
        const token = await getData('token');
        // const role = await getData('role');
        if (this.props.msg!=='Success') {
            this.showToast('Đổi mật khẩu không thành công');
            // this.props.navigation.navigate("Login");
        }
        else {
            this.showToast('Đổi mật khẩu thành công');
            // this.props.navigation.navigate("HomePage");
        }
    };
    goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                    <View style={styles.comeBack}>
                        <TouchableOpacity style={styles.buttonComback} onPress={this.goBack}>
                            <FontAwesome5 style={styles.iconUndo} name="undo"/>
                        </TouchableOpacity>
                        <Text style={styles.text}>ĐỔI MẬT KHẨU</Text>
                    </View>
                    <View style={styles.container_child}>
                        <View style={styles.formChangePassword}>
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
                                    onChangeText={this.changTextRepeatNewPassword}
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
    comeBack: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    buttonComback: {
        position: 'absolute',
        left: '5%',
    },
    iconUndo: {
        fontSize: 20,
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
