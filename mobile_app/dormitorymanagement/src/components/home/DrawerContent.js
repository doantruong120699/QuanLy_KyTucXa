import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Drawer, Title } from 'react-native-paper';

export function DrawerContent(props) {
    return(
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.title}>
                    <Text>
                        My App
                    </Text>
                </View>
                <View>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <FontAwesome5 
                                    color={color} 
                                    size={size}
                                    name={'home'}
                                />
                            )}
                            label="Trang chủ"
                            onPress={() => {props.navigation.navigate("Login")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <FontAwesome5 
                                    color={color} 
                                    size={size}
                                    name={'edit'}
                                />
                            )}
                            label="Đổi thông tin"
                            onPress={() => {props.navigation.navigate("ForgotPassword")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <FontAwesome5 
                                    color={color} 
                                    size={size}
                                    name={'edit'}
                                />
                            )}
                            label="Đổi mật khẩu"
                            onPress={() => {props.navigation.navigate("ChangePassword")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <FontAwesome5 
                                    color={color} 
                                    size={size}
                                    name={'building'}
                                />
                            )}
                            label="Xem danh sách phòng"
                            onPress={() => {props.navigation.navigate("ShowAllRoom")}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    bottomDrawerSection: {
        borderTopColor: 'black',
        borderBottomColor: 'black',
        borderTopWidth: 1,   
        borderBottomWidth: 1, 
    }
})