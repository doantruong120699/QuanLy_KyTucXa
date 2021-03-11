import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class ProfileSV extends Component {
    goBack = () => {
        
    }
    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                    <View style={styles.comeBack}>
                        <TouchableOpacity onPress={this.goBack}>
                            <FontAwesome5 style={styles.iconUndo} name="undo"/>
                        </TouchableOpacity>
                        <Text style={styles.text}>PROFILE</Text>
                    </View>
                    <View style={styles.container_child}>
                        <View style={styles.formProfile}>
                            <View>
                                <Text style={styles.textProfile}>PROFILE</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>MSSV:</Text>
                                <Text style={styles.info}>123456789</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>Tên:</Text>
                                <Text style={styles.info}>Trần Minh Quang</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>Email:</Text>
                                <Text style={styles.info}>quang@gmail.com</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>SĐT:</Text>
                                <Text style={styles.info}>0987654321</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>Địa chỉ:</Text>
                                <Text style={styles.info}>Đà Nẵng</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>CMND:</Text>
                                <Text style={styles.info}>201712312</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>Quê quán:</Text>
                                <Text style={styles.info}>Quảng Nam</Text>
                            </View>
                            <View style={styles.viewButton}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>Sửa thông tin</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>Đổi mật khẩu</Text>
                                </TouchableOpacity>
                            </View>                            
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default connect()(ProfileSV);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    comeBack: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    iconUndo: {
        margin: 15,
        fontSize: 20,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: '25%',
        paddingTop: '3%',
    },  
    container_child: {
        flex: 9,
        width: '100%',
        justifyContent: 'center',
         alignItems: 'center',
    },
    formProfile: {
        backgroundColor: 'white',
        height: '70%',
        width: '80%',
        borderRadius: 20,
        elevation: 7,
    },
    textProfile: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewInfo: {
        marginTop: 10,
        marginLeft: 50,
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        width: '25%',
    },
    info: {
        // marginLeft: 20,
    },
    viewButton: {
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        margin: 5,
        width: '40%',
        height: '35%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
    },
})