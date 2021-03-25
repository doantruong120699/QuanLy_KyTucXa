import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class RoomDetail extends Component {
    constructor(props) {
        super(props);
    };

    goBack = () => {
        this.props.navigation.navigate("ShowAllRoom");
    }
    handleAssignRoom = () => {
        ToastAndroid.show('Từ từ chưa làm tới đoạn này, ngủ ngoài đường tí đê', ToastAndroid.LONG);
    }
    render() {
        const item = this.props.route.params.item;
        console.log(item);

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                    <View style={styles.comeBack}>
                        <TouchableOpacity onPress={this.goBack}>
                            <FontAwesome5 style={styles.iconUndo} name="long-arrow-alt-left" />
                        </TouchableOpacity>
                        <Text style={styles.text}>ROOM DETAIL</Text>
                    </View>
                    <View style={styles.container_child}>
                        <View style={styles.formProfile}>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>Tên Phòng:</Text>
                                <Text style={styles.info}>{item.room}</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>Loại Phòng:</Text>
                                <Text style={styles.info}>Phòng Thường</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>Giá Phòng:</Text>
                                <Text style={styles.info}>800k/Tháng</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>Số Người Trong Phòng:</Text>
                                <Text style={styles.info}>{item.numbers}</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>Thành Viên:</Text>
                                <Text style={styles.info}>Nguyễn Văn A, Hoàng Văn B, Đinh Văn C, Tôn Hữu D, Võ Văn E</Text>
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.title}>Tình Trạng Phòng:</Text>
                                <Text style={styles.info}>{item.numbers < 8 ? 'Có Thể Đăng Kí' : 'Đã Đủ Người'}</Text>
                            </View>
                            <View style={styles.viewButton}>

                                <TouchableOpacity style={styles.button} onPress={this.handleAssignRoom}>
                                    <Text style={styles.textButton}>Đăng Kí Phòng Này</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default connect()(RoomDetail);

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
        paddingLeft: '20%',
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
        marginLeft: 20,
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        width: '50%',
    },
    info: {
        width: '45%',
    },
    viewButton: {
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'red',
        margin: 5,
        width: '80%',
        height: '50%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
    },
})