import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ToastAndroid } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Drawer, Title } from 'react-native-paper';
import { allstaff, allstudent, mainmenu, getallroom, getarea, getnotification, getcalendar } from '../../redux/actions/index';
import { connect } from 'react-redux';
import moment from 'moment';
import { getData } from '../../utils/asyncStorage';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: ''
    }
  }
  getStyle(status) {
    const myStatus = this.props.status;
    if (status === myStatus)
      return { backgroundColor: '#d3d3d3' }
  }
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  displayCreateNotification = () => {
    if (this.state.permission) {
      if (JSON.parse(this.state.permission).findIndex(item => item="add_notification") !== -1) {
        return { display: 'flex' };
      }
      return { display: 'none' };
    }
    return { display: 'none' };
  }
  async componentDidMount() {
    let getPermission = await getData('permission');
    if (getPermission) {
      this.setState({
        permission: getPermission,
      })
    } 
  }
  render() {
    return (
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
                icon={({ color, size }) => (
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
                style={this.getStyle('ShowAllRoom')}
                icon={({ color, size }) => (
                  <FontAwesome5
                    color={color}
                    size={size}
                    name={'eye'}
                    style={styles.iconMenu}
                  />
                )}
                label="Xem phòng"
                onPress={async () => {
                  await this.props.getallroom(1);
                  await this.props.getarea();
                  if (this.props.msgRoom != "Success") {
                    this.showToast(this.props.msgRoom);
                  }
                  else {
                    this.props.mainmenu('ShowAllRoom');
                    this.props.navigation.navigate("ShowAllRoom");
                  }   
                }}
              />
              <DrawerItem
                style={this.getStyle('AllStudent')}
                icon={({ color, size }) => (
                  <FontAwesome5
                    color={color}
                    size={size}
                    name={'graduation-cap'}
                    style={styles.iconMenu}
                  />
                )}
                label="Sinh viên"
                onPress={async () => {
                  await this.props.allstudent(1);
                  if (this.props.msgSV != "Success") {
                    this.showToast(this.props.msgSV);
                  }
                  else {
                    this.props.mainmenu('AllStudent');
                    this.props.navigation.navigate("AllStudent");
                  }              
                }}
              />
              <DrawerItem
                style={this.getStyle('AllStaff')}
                icon={({ color, size }) => (
                  <FontAwesome5
                    color={color}
                    size={size}
                    name={'user-friends'}
                    style={styles.iconMenu}
                  />
                )}
                label="Nhân viên"
                onPress={async () => {
                  await this.props.allstaff(1);
                  if (this.props.msgNV != "Success") {
                    this.showToast(this.props.msgNV);
                  }
                  else {
                    this.props.navigation.navigate("AllStaff");
                    this.props.mainmenu('AllStaff');
                  }      
                }}
              />
              <DrawerItem
                style={this.getStyle('Schedule')}
                icon={({ color, size }) => (
                  <FontAwesome5
                    color={color}
                    size={size}
                    name={'calendar-week'}
                    style={styles.iconMenu}
                  />
                )}
                label="Lịch trực"
                onPress={async () => {
                  let week = moment().format("w") - 1;
                  await this.props.getcalendar(week);
                  if (this.props.msgCalendar != "Success") {
                    this.showToast(this.props.msgCalendar);
                  }
                  else {
                    this.props.navigation.navigate("Schedule");
                    this.props.mainmenu('Schedule');
                  } 
                }}
              />
              <DrawerItem
                style={this.getStyle('Notification')}
                icon={({ color, size }) => (
                  <FontAwesome5
                    color={color}
                    size={size}
                    name={'clipboard'}
                    style={styles.iconMenu}
                  />
                )}
                label="Thông báo"
                onPress={async () => {
                  await this.props.getnotification(1);
                  if (this.props.msgNotification != "Success") {
                    this.showToast(this.props.msgNotification);
                  }
                  else {
                    this.props.navigation.navigate("Notification");
                    this.props.mainmenu('Notification');
                  }    
                }}
              />
              <DrawerItem
                style={[this.getStyle('CreateNotification'), this.displayCreateNotification()]}
                icon={({ color, size }) => (
                  <FontAwesome5
                    color={color}
                    size={size}
                    name={'clipboard'}
                    style={styles.iconMenu}
                  />
                )}
                label="Tạo thông báo"
                onPress={() => {
                  this.props.navigation.navigate("CreateNotification");
                  this.props.mainmenu('CreateNotification');  
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
  allstudent,
  allstaff,
  getallroom,
  getarea,
  getnotification,
  getcalendar,
}
function mapStateToProps(state) {
  return {
    status: state.mainmenu.status,
    msgMain: state.mainmenu.msg,
    msgNV: state.allstaff.msg,
    msgSV: state.allstudent.msg,
    msgNotification: state.getnotification.msg,
    msgRoom: state.getallroom.msg,
    msgCalendar: state.getcalendar.msg,
    permission: state.login.permission
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
  logoSchool: {
    paddingLeft: 5,
    borderRadius: 25,
    flex: 1,
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
  bottomView: {
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
