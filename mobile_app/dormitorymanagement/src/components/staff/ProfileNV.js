import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styleBtnComeBack, styleContainer, styleImgBg } from '../../styles/index';

class ProfileNV extends Component {
  constructor(props) {
    super(props);
  }
  goBack = () => {
    this.props.navigation.goBack();
  };
  moveToChangeInfo = () => {
    this.props.navigation.navigate("ChangeProfile");
  };
  moveToChangePassword = async () => {
    this.props.navigation.navigate("ChangePassword");
  };
  render() {
    let data = this.props.dataProfile;
    return (
      <View style={styleContainer.container}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
          <View style={styleBtnComeBack.comeBack}>
            <TouchableOpacity style={styleBtnComeBack.buttonComback} onPress={this.goBack}>
              <FontAwesome5 style={styleBtnComeBack.iconUndo} name="long-arrow-alt-left" />
            </TouchableOpacity>
            <Text style={styles.text}>THÔNG TIN CÁ NHÂN</Text>
          </View>
          <View style={styles.container_child}>
            <View style={styles.formProfile}>
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
                <Text style={styles.title}>Chức vụ:</Text>
                <Text style={styles.info}>{data.profile.position.name}</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Khu vực:</Text>
                <Text style={styles.info}>{data.profile.area.name}</Text>
              </View>
              <View style={styles.viewButton}>
                <TouchableOpacity style={styles.button} onPress={this.moveToChangeInfo}>
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

function mapStateToProps(state) {
  return {
    dataProfile: state.getprofile.payload,
  };
};
export default connect(mapStateToProps)(ProfileNV);

const styles = StyleSheet.create({
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
    height: 400,
    width: 300,
    borderRadius: 20,
    elevation: 7,
  },
  viewInfo: {
    marginTop: 10,
    marginLeft: 30,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    width: '25%',
  },
  viewButton: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5f6ff6',
    margin: 5,
    width: '40%',
    height: '40%',
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
