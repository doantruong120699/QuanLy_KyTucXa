import React, { useState, Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Alert, TextInput } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { searchroom } from '../../redux/actions/searchroom';
import { getprofile } from '../../redux/actions/getprofile';
import { getData } from '../../utils/asyncStorage';

const openDrawer = (navigation) => {
    navigation.openDrawer();
}

class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textSearch: '',
        }
    };
    alert = async () => {
        const name = await getData('name');
        const group = await getData('role');
        let role = '';
        if(group==='sinhvien_group') {
            role = 'Sinh viên';
        }
        if(group==='nhanvien_group') {
            role = 'Nhân viên';
        }
        Alert.alert(
            name,
            role,
            [
              { text: "Trang cá nhân", onPress: async () => {
                  const decoded = await getData('decoded');
                //   console.log(decoded);
                //   const group = decoded.group[0];
                //   console.log(decoded.group);
                  await this.props.getprofile();
                  if(decoded==='sinhvien_group') {
                    this.props.navigation.navigate("ProfileSV");
                  }
                  if(decoded==='nhanvien_group') {
                    this.props.navigation.navigate("ProfileNV"); 
                  }
              }},
              { text: "Đóng", onPress: () => {} }
            ],
            { cancelable: true },
            
          );
    }
    changeTextSearch = (text) => {
        this.setState({
            textSearch: text,
        })
    };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.bars} onPress={() => {openDrawer(this.props.navigation)}}>
                    <FontAwesome5 style={styles.iconbars} name={'bars'}/>
                </TouchableOpacity>
                <View style={styles.viewSearch}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        onChangeText={this.changeTextSearch}
                        style={styles.inputText}
                        placeholder="Tìm kiếm"
                        placeholderTextColor="#808080"
                    />
                    <TouchableOpacity 
                        style={styles.buttonSearch} 
                        onPress={() => {this.props.searchroom(this.state.textSearch)}}
                    >
                        <Text>Tìm</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.user} onPress={this.alert}>
                    <View style={styles.viewuser}>
                        <FontAwesome5 style={styles.iconuser} name={'user'}/>
                    </View>
                </TouchableOpacity>
            </View> 
        ); 
    }      
}

const mapDispatchToProps = {
    searchroom,
    getprofile,
};
function mapStateToProps(state) {
    return {
        
    };
} ;
export default connect(mapStateToProps, mapDispatchToProps)(AppBar);

const styles = StyleSheet.create({
    container: {
        width: '90%',
        // height: '50%',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 5,
        elevation: 7,
    },
    alert: {
        flexDirection: 'row',
    },
    bars: {
        flex: 1,
        // marginRight: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 25,
        width: 30,
        height: 30,
    },
    iconbars: {
        color: 'black',
        fontSize: 20,
    },
    user: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        // backgroundColor: 'black',
    },
    viewuser: {
        height: 30,
        width: 30,
        borderRadius: 25,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconuser: {
        color: 'white',
        fontSize: 15,
    },
    viewSearch: {
        flex: 5.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        flex: 5,
    },
    buttonSearch: {
        flex: 1,
    }
});