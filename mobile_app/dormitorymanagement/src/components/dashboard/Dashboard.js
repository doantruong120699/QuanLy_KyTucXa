import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { connect, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppBar } from '../index';
import { dashboard } from '../../redux/actions/index';
import { styleImgBg } from '../../styles/index';

const Dashboard = (props) => {
  const { dashboard, navigation } = props;
  // const fetchData = async () => {
  //   await dashboard();
  // }
  // fetchData();
  const data = useSelector((state) => state.dashboard.payload);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
        <AppBar style={styles.appbar} navigation={navigation} />
        <View style={styles.container_child}>
          <View style={[styles.students, styles.itemDashboard]}>
            <Text style={styles.numbers}>{data.student.total}</Text>
            <View style={styles.bottom}>
              <View style={styles.left}>
                <Text style={styles.total}>Total Students</Text>
              </View>
              <FontAwesome5 style={styles.icon} name="graduation-cap" />
            </View>
          </View>
          <View style={[styles.teachers, styles.itemDashboard]}>
            <Text style={styles.numbers}>{data.staff.total}</Text>
            <View style={styles.bottom}>
              <View style={styles.left}>
                <Text style={styles.total}>Total Teachers</Text>
              </View>
              <FontAwesome5 style={styles.icon} name="user-friends" />
            </View>
          </View>
          <View style={[styles.rooms, styles.itemDashboard]}>
            <Text style={styles.numbers}>{data.room.total}</Text>
            <View style={styles.bottom}>
              <View style={styles.left}>
                <Text style={styles.total}>Total Rooms</Text>
                {/* <Text style={styles.last}>+0,5% than last month</Text> */}
              </View>
              <FontAwesome5 style={styles.icon} name="hotel" />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const mapDispatchToProps = {
  dashboard,
}
function mapStateToProps(state) {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  itemDashboard: {
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 20,
    elevation: 7,
  },
  students: {
    backgroundColor: '#8a2be2',
  },
  teachers: {
    backgroundColor: 'blue',
  },
  rooms: {
    backgroundColor: '#32cd32',
  },
  numbers: {
    margin: 10,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'row',
    height: 50
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
