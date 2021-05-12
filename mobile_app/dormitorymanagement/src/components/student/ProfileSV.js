import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getarea, getclass, getfaculty } from '../../redux/actions/index';

class ProfileSV extends Component {
  constructor(props) {
    super(props);
  }
  goBack = () => {
    this.props.navigation.goBack();
  };
  moveToChangeProfile = () => {
    this.props.navigation.navigate("ChangeProfile");
  };
  moveToChangePassword = () => {
    this.props.navigation.navigate("ChangePassword");
  };
  render() {
    let data = this.props.dataProfile;
    console.log(data);
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
          <View style={styles.comeBack}>
            <TouchableOpacity style={styles.buttonComback} onPress={this.goBack}>
              <FontAwesome5 style={styles.iconUndo} name="undo" />
            </TouchableOpacity>
            <Text style={styles.text}>PROFILE</Text>
          </View>
          <View style={styles.container_child}>
            <View style={styles.formProfile}>
              <View>
                <Text style={styles.textProfile}>PROFILE</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Email:</Text>
                <Text style={styles.info}>{data.email}</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Ngày sinh:</Text>
                <Text style={styles.info}>{data.profile.birthday}</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Địa chỉ:</Text>
                <Text style={styles.info}>{data.profile.address}</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>CMND:</Text>
                <Text style={styles.info}>{data.profile.identify_card}</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Giới tính:</Text>
                <Text style={styles.info}>{data.profile.gender ? 'Nam' : 'Nữ'}</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Số điện thoại:</Text>
                <Text style={styles.info}>{data.profile.phone}</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Khoa:</Text>
                <Text style={styles.info}>{data.profile.faculty.name}</Text>
              </View>
              <View style={styles.viewButton}>
                <TouchableOpacity style={styles.button} onPress={this.moveToChangeProfile}>
                  <Text style={styles.textButton}>Sửa thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.moveToChangePassword}>
                  <Text style={styles.textButton}>Đổi mật khẩu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const mapDispatchToProps = {
  getarea,
  getclass,
  getfaculty,
};

function mapStateToProps(state) {
  return {
    dataProfile: state.getprofile.payload,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileSV);

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
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: 50,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    width: '25%',
  },
  info: {
    // marginLeft: 20,
  },
  viewButton: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    margin: 5,
    width: '40%',
    height: '35%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
})
