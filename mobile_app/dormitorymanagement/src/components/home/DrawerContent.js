import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Drawer, Title } from 'react-native-paper';
import { mainmenu } from '../../redux/actions/mainmenu';
import { connect } from 'react-redux';

class DrawerContent extends Component {
    getStyle(status) {
        const myStatus = this.props.status;
        if (status === myStatus) 
            return {backgroundColor: '#d3d3d3'}
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Image 
                        style={styles.logoSchool}
                        source={require('../../assets/logoschool.png')}
                    />
                    <View style={styles.textView}>
                        <Text style={styles.dormitory}>Dormitory</Text>
                        <Text style={styles.nameSchool}>Trường ĐH Bách Khoa</Text>
                    </View>
                </View>
                <View style={styles.viewMainMenu}>
                    <Text style={styles.textMainMenu}>Main Menu</Text>
                </View>
                <DrawerContentScrollView {...this.props}>
                    <View style={styles.drawerSection}>
                        <Drawer.Section style={styles.topDrawerSection}>
                            <DrawerItem
                                style={this.getStyle('Dashboard')}
                                icon={({color, size}) => (
                                    <FontAwesome5 
                                        color={color} 
                                        size={size}
                                        name={'th-large'}
                                        style={styles.iconMenu}
                                    />
                                )}
                                label="Dashboard"
                                onPress={() => {
                                    this.props.mainmenu('Dashboard');
                                    this.props.navigation.navigate("Dashboard");
                                }}
                            />
                            <DrawerItem
                                style={this.getStyle('Xemphong')}
                                icon={({color, size}) => (
                                    <FontAwesome5 
                                        color={color} 
                                        size={size}
                                        name={'eye'}
                                        style={styles.iconMenu}
                                    />
                                )}
                                label="Xem phòng"
                                onPress={() => {
                                    this.props.mainmenu('Xemphong');
                                    this.props.navigation.navigate("ShowAllRoom");
                                }}
                            />
                            <DrawerItem
                                style={this.getStyle('Sinhvien')}
                                icon={({color, size}) => (
                                    <FontAwesome5 
                                        color={color} 
                                        size={size}
                                        name={'graduation-cap'}
                                        style={styles.iconMenu}
                                    />
                                )}
                                label="Sinh viên"
                                onPress={() => {
                                    this.props.mainmenu('Sinhvien');
                                    this.props.navigation.navigate("Login");
                                }}
                            />
                            <DrawerItem
                                style={this.getStyle('Nhanvien')}
                                icon={({color, size}) => (
                                    <FontAwesome5 
                                        color={color} 
                                        size={size}
                                        name={'user-friends'}
                                        style={styles.iconMenu}
                                    />
                                )}
                                label="Nhân viên"
                                onPress={() => {
                                    this.props.mainmenu('Nhanvien');
                                    this.props.navigation.navigate("ForgotPassword");
                                }}
                            />
                            <DrawerItem
                                style={this.getStyle('Dichvu')}
                                icon={({color, size}) => (
                                    <FontAwesome5 
                                        color={color} 
                                        size={size}
                                        name={'globe'}
                                        style={styles.iconMenu}
                                    />
                                )}
                                label="Dịch vụ"
                                onPress={() => {
                                    this.props.mainmenu('Dichvu');
                                    this.props.navigation.navigate("ChangePassword");
                                }}
                            />
                        </Drawer.Section>
                    </View>
                </DrawerContentScrollView>
                <View style={styles.bottomView}>
                    <Text style={styles.textBottom1}>Dormitory Management</Text>
                    <Text style={styles.textBottom2}>@2021 All Right Reserved</Text>
                    <Text style={styles.textBottom3}>Made with love by DEMAILAM</Text>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = {
    mainmenu,
}
function mapStateToProps(state) {
    return {
        status: state.mainmenu.status,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
    },
    drawerSection: {
    },
    logoSchool: {
        paddingLeft: 5,
        borderRadius: 25,
        flex:1,
        height: '100%',
        width: '100%',
    },
    textView: {
        flex: 3,
    },
    dormitory: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewMainMenu: {
        backgroundColor: '#d3d3d3',
        padding: 10,
        paddingLeft: 20,
    },
    textMainMenu: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    topDrawerSection: {
        // borderTopColor: 'black',
        // borderBottomColor: 'black',
        // borderTopWidth: 1,   
        // borderBottomWidth: 1, 
    },
    bottomView: {
        // borderTopColor: 'black',
        // borderTopWidth: 1,
        marginBottom: 15,
    },
    textBottom1: {
        marginLeft: 20,
        fontWeight: 'bold',
    },
    textBottom2: {
        marginBottom: 15,
        marginLeft: 20,
    },
    textBottom3: {
        marginLeft: 20,
    },
    iconMenu: {
        width: '18%',
    }
})