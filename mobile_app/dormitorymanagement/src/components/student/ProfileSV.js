import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styleBtnComeBack, styleImgBg, styleContainer } from '../../styles/index';
import { getdetailroom } from '../../redux/actions/getdetailroom';

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
  detailRoom = async () => {
    await this.props.getdetailroom(this.props.dataProfile.room.slug);
    this.props.navigation.navigate('ShowRoomOfSV');
  }
  render() {
    let data = this.props.dataProfile;
    return (
      <View style={[styleContainer.container, styles.container]}>
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
                <Text style={styles.title}>Họ tên:</Text>
                <Text style={styles.info}>{data.last_name + ' ' + data.first_name}</Text>
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
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Lớp:</Text>
                <Text style={styles.info}>{data.profile.my_class.name}</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Phòng của bạn:</Text>
                <Text style={styles.info}>{data.room?.name ? data.room.name : 'Bạn chưa có phòng'}</Text>
                <TouchableOpacity style={data.room?.name ? styles.btnDetailRoom : {display: 'none'}} onPress={this.detailRoom}>
                  <Text style={styles.textDetailRoom}>Xem chi tiết</Text>
                </TouchableOpacity>
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
  getdetailroom,
}
function mapStateToProps(state) {
  return {
    dataProfile: state.getprofile.payload,
    detailRoom: state.getdetailroom.payload,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileSV);

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
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    elevation: 7,
  },
  viewInfo: {
    position: 'relative',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    width: '25%',
  },
  info: {
    marginLeft: 5,
    width: '75%'
  },
  viewButton: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#5f6ff6',
    margin: 5,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  btnDetailRoom: {
    position: 'absolute',
    right: 5,
    borderColor: 'blue',
    borderWidth: 1,
    padding:5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25
  }
})
