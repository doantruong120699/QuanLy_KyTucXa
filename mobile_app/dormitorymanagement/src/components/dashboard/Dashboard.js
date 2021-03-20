import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppBar } from '../index';

class Dashboard extends Component {
    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                    <AppBar style={styles.appbar} navigation={this.props.navigation}/>
                    <View style={styles.container_child}>
                        {/* <View style={styles.dashboard}>
                            <FontAwesome5 style={styles.iconList} name="list-ul"/>
                            <Text style={styles.textDashboard}>DASHBOARD</Text>
                        </View> */}
                        <View style={styles.students}>
                            <Text style={styles.numbers}>9,825</Text>
                            <View style={styles.bottom}>
                                <View style={styles.left}>
                                    <Text style={styles.total}>Total Students</Text>
                                    <Text style={styles.last}>+0,5% than last month</Text>
                                </View>
                                <FontAwesome5 style={styles.icon} name="graduation-cap"/>
                            </View>
                        </View>
                        <View style={styles.teachers}>
                            <Text style={styles.numbers}>9,825</Text>
                            <View style={styles.bottom}>
                                <View style={styles.left}>
                                    <Text style={styles.total}>Total Teachers</Text>
                                    <Text style={styles.last}>+0,5% than last month</Text>
                                </View>
                                <FontAwesome5 style={styles.icon} name="user-friends"/>
                            </View>
                        </View>
                        <View style={styles.rooms}>
                            <Text style={styles.numbers}>9,825</Text>
                            <View style={styles.bottom}>
                                <View style={styles.left}>
                                    <Text style={styles.total}>Total Rooms</Text>
                                    <Text style={styles.last}>+0,5% than last month</Text>
                                </View>
                                <FontAwesome5 style={styles.icon} name="hotel"/>
                            </View>
                        </View>
                        <View style={styles.events}>
                            <Text style={styles.numbers}>9,825</Text>
                            <View style={styles.bottom}>
                                <View style={styles.left}>
                                    <Text style={styles.total}>Total Events</Text>
                                    <Text style={styles.last}>+0,5% than last month</Text>
                                </View>
                                <FontAwesome5 style={styles.icon} name="calendar-week"/>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default connect()(Dashboard);

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
        // resizeMode: "cover",
        alignItems: 'center',
    },
    appbar: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 7,  
        borderRadius: 20,
        marginTop: '3%',
    },  
    container_child: {
        flex: 9, 
        width: '100%',
        height: '100%',
    },
    dashboard: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    iconList: {
        fontSize:25,
        fontWeight: 'bold',
        marginRight: 5,
        marginTop: 10,
    },
    textDashboard: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 10,
    },
    students: {
        marginTop: 10,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: '#8a2be2',
        borderRadius: 20,
        elevation: 7,
    },
    teachers: {
        marginTop: 10,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: 'blue',
        borderRadius: 20,
        elevation: 7,
    },
    rooms: {
        marginTop: 10,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: '#32cd32',
        borderRadius: 20,
        elevation: 6,
    },
    events: {
        marginTop: 10,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: '#ff69b4',
        borderRadius: 20,
        elevation: 6,
    },
    numbers: {
        margin: 10,
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    bottom: {
        flexDirection: 'row',
    },
    left: {
        marginLeft: 10,
        marginBottom: 10,
        flex: 2,
    },
    total: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    last: {
        color: 'white',
        fontSize: 15,
    },
    icon: {
        flex: 1,
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
    }
});