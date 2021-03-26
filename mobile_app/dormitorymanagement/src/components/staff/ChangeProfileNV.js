import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, TextInput, Text, StyleSheet, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker'
import {Picker} from '@react-native-picker/picker';

class ChangeProfileNV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            selectedLanguage: '',
        };
    };
    goBack = () => {
        this.props.navigation.goBack();
    };
    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                    <View style={styles.comeBack}>
                        <TouchableOpacity style={styles.buttonComback} onPress={this.goBack}>
                            <FontAwesome5 style={styles.iconUndo} name="undo"/>
                        </TouchableOpacity>
                        <Text style={styles.text}>ĐỔI THÔNG TIN</Text>
                    </View>
                    <View style={styles.container_child}>
                        <View style={styles.formChangeInfo}>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Email:</Text>
                                <Text style={styles.info}>ABC</Text>
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Ngày sinh:</Text>
                                <DatePicker 
                                    style={{width: '50%'}}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2016-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                      dateIcon: {
                                        // position: 'absolute',
                                        // left: 0,
                                        // top: 4,
                                        marginLeft: 0
                                      },
                                      dateInput: {
                                        marginLeft: 0
                                      }
                                      // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {this.setState({date: date})}} 
                                />
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Địa chỉ:</Text>
                                <TextInput 
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.changeTextUsername}
                                    style={styles.inputText}
                                    placeholder="Tài khoản"
                                    placeholderTextColor="#808080"
                                />
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>CMND:</Text>
                                <Text style={styles.info}>ABC</Text>
                            </View>
                            <Picker
                                    selectedValue={this.state.selectedLanguage}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({SelectedLanguage: itemValue})
                                    }>
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Giới tính:</Text>
                                
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Số điện thoại:</Text>
                                <Text style={styles.info}>ABC</Text>
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Chức vụ:</Text>
                                <Text style={styles.info}>ABC</Text>
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Khu vực:</Text>
                                <Text>ABC</Text>
                            </View>
                            
                        </View>                 
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default connect()(ChangeProfileNV);

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
        justifyContent: 'center',
        alignItems: 'center',
    },
    formChangeInfo: {
        backgroundColor: 'white',
        height: '70%',
        width: '80%',
        borderRadius: 20,
        elevation: 7,
    },
    viewRow: {
        marginTop: 10,
        marginLeft: 40,
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        width: '35%',
    },
    info: {

    },
    inputText: {
        borderRadius: 15,
        backgroundColor: '#f5f5f5',
        height: 40,
        width: '60%',
    },
});