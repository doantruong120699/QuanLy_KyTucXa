import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getprofile, mainmenu } from '../../redux/actions/index';
import { storeData, getData } from '../../utils/asyncStorage';

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
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  alert = async () => {
    const group = await getData('role');
    let role = '';
    if (group === 'sinhvien_group') {
      role = 'Sinh viên';
    }
    if (group === 'nhanvien_group') {
      role = 'Nhân viên';
    }
    Alert.alert(
      this.props.data.last_name + ' ' + this.props.data.first_name,
      role,
      [
        {
          text: "Cá nhân", onPress: async () => {
            const role = await getData('role');
            await this.props.getprofile();
            if (this.props.msg != "Success") {
              this.showToast(this.props.msg);
            }
            else {
              if (role === 'sinhvien_group') {
                this.props.navigation.navigate("ProfileSV");
              }
              if (role === 'nhanvien_group') {
                this.props.navigation.navigate("ProfileNV");
              }
            }
          }
        },
        {
          text: "Đăng xuất", onPress: async () => {
            await storeData('token', '');
            await storeData('role', '');
            await storeData('name', '');
            await storeData('permission', '');
            this.props.mainmenu('Dashboard');
            this.props.navigation.navigate("Login");
          }
        },
        { text: "Đóng", onPress: () => { } }
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
        <TouchableOpacity style={styles.bars} onPress={() => { openDrawer(this.props.navigation) }}>
          <FontAwesome5 style={styles.iconbars} name={'bars'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.user} onPress={this.alert}>
          <View style={styles.viewuser}>
            <FontAwesome5 style={styles.iconuser} name={'user'} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = {
  getprofile,
  mainmenu,
};
function mapStateToProps(state) {
  return {
    msg: state.getprofile.msg,
    data: state.getprofile.payload
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppBar);

const styles = StyleSheet.create({
  container: {
    width: '90%',
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
    marginLeft: '5%',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  iconbars: {
    color: 'black',
    fontSize: 20,
  },
  user: {
    marginRight: '5%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 30,
    width: 30,
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
});
