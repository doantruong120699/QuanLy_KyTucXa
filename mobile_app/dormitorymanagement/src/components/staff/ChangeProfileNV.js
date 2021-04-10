import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, TextInput, Text, StyleSheet, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker'
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

class ChangeProfileNV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            selectedGender: '',
            choosenIndex: 0,
            selectedPosition: '',
            choosenIndexPosition: 0,
            selectedArea: '',
            choosenIndexArea: 0,
        };
    };
    goBack = () => {
        this.props.navigation.goBack();
    };
    render() {
        const area = [];
        for (let i=0; i<this.props.area.length; i++) {
            let a = {label: this.props.area[i].name, value: this.props.area[i].name};
            area.push(a);
        };
        const position = [];
        for (let i=0; i<this.props.position.length; i++) {
            let a = {label: this.props.position[i].name, value: this.props.position[i].name};
            position.push(a);
        };
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
                                <TextInput 
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.changeTextUsername}
                                    style={styles.inputText}
                                />
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Ngày sinh:</Text>
                                <DatePicker 
                                    style={{width: '65%'}}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="1950-01-01"
                                    maxDate="2022-01-01"
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
                                />
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>CMND:</Text>
                                <TextInput 
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.changeTextUsername}
                                    style={styles.inputText}
                                />
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Giới tính:</Text>
                                <DropDownPicker
                                    items={[
                                        {label: 'Nam', value: 'Nam'},
                                        {label: 'Nữ', value: 'Nữ'},
                                    ]}
                                    defaultValue={this.state.selectedGender}
                                    containerStyle={{height: 40, width: '65%'}}
                                    style={{backgroundColor: '#fafafa'}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => this.setState({
                                        selectedGender: item.value
                                    })}
                                />
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Số điện thoại:</Text>
                                <TextInput 
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.changeTextUsername}
                                    style={styles.inputText}
                                />
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Chức vụ:</Text>
                                {/* <Picker
                                    style={styles.pickerGT}
                                    selectedValue={this.state.selectedPosition}
                                    onValueChange={(itemValue, itemPosition) =>
                                        this.setState({selectedPosition: itemValue, choosenIndexPosition: itemPosition})
                                    }>
                                    <Picker.Item label="Bảo vệ" value="Bảo vệ" />
                                    <Picker.Item label="Vệ sinh" value="Vệ sinh" />
                                </Picker> */}
                                <DropDownPicker
                                    items={position}
                                    defaultValue={this.state.selectedPosition}
                                    containerStyle={{height: 40, width: '65%'}}
                                    style={{backgroundColor: '#fafafa'}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => this.setState({
                                        selectedPosition: item.value
                                    })}
                                />
                            </View>
                            <View style={styles.viewRow}>
                                <Text style={styles.title}>Khu vực:</Text>
                                <DropDownPicker
                                    items={area}
                                    defaultValue={this.state.selectedArea}
                                    containerStyle={{height: 40, width: '65%'}}
                                    style={{backgroundColor: '#fafafa'}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item => this.setState({
                                        selectedArea: item.value
                                    })}
                                />
                            </View>
                            <View style={styles.viewButton}>
                                <TouchableOpacity 
                                    onPress={() => {}}
                                    style={styles.btnSave}
                                    >
                                    <Text style={styles.textSave}>LƯU</Text>
                                </TouchableOpacity>
                            </View>
                        </View>                 
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        area: state.getarea.msg,
        position: state.getposition.msg,
    }
}

export default connect(mapStateToProps)(ChangeProfileNV);

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
        height: '90%',
        width: '80%',
        borderRadius: 20,
        elevation: 7,
    },
    viewRow: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
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
        width: '65%',
    },
    pickerGT: {
        borderRadius: 15,
        height: 40,
        width: '65%',
    },
    viewButton: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSave: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        borderRadius: 25,
        height: '100%',
        backgroundColor: '#5f6ff6',
    },
    textSave: {
        color: 'white',
        fontSize: 20,
    }
});