import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, ToastAndroid, Modal, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { registrationroom, getpaymentmethod } from '../../redux/actions/index';
import { styleBtnComeBack, styleImgBg, styleContainer } from '../../styles/index';

class ShowRoomOfSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dateStart: new Date(),
      dateEnd: new Date(),
      payment: 1,
    }
  };
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  goBack = () => {
    this.props.navigation.goBack();
  }
  render() {
    let item = this.props.detailRoom;
    let status;
    if (item.status == 'A') {
      status = 'Có thể đăng kí';
    }
    else if (item.status == 'F') {
      status = 'Đã đủ người'
    }
    else {
      status = 'Phòng này hiện không thể đăng kí';
    }
    return (
      <View style={styleContainer.container}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
        <View style={styleBtnComeBack.comeBack}>
          <TouchableOpacity style={styleBtnComeBack.buttonComback} onPress={this.goBack}>
            <FontAwesome5 style={styleBtnComeBack.iconUndo} name="long-arrow-alt-left" />
          </TouchableOpacity>
          <Text style={styles.text}>CHI TIẾT PHÒNG</Text>
        </View>
        <View style={styles.container_child}>
          <View style={styles.formDetailRoom}>
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Tên Phòng:</Text>
              <Text style={styles.info}>{item.name}</Text>
            </View>
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Loại Phòng:</Text>
              <Text style={styles.info}>{item.typeroom.name}</Text>
            </View>
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Giá Phòng:</Text>
              <Text style={styles.info}>{`${item.typeroom.price}/Tháng`}</Text>
            </View>
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Số Người Trong Phòng:</Text>
              <Text style={styles.info}>{item.number_now}</Text>
            </View>
            {/* <View style={styles.viewInfo}>
              <Text style={styles.title}>Thành Viên:</Text>
              <Text style={styles.info}>Nguyễn Văn A, Hoàng Văn B, Đinh Văn C, Tôn Hữu D, Võ Văn E</Text>
            </View> */}
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Tình Trạng Phòng:</Text>
              <Text style={styles.info}>{status}</Text>
            </View>
          </View>
        </View>
        </ImageBackground>
      </View>
    )
  }
}

const mapDispatchToProps = {
  registrationroom,
  getpaymentmethod,
};

function mapStateToProps(state) {
  return {
    msg: state.registrationroom.msg,
    paymentMethod: state.getpaymentmethod.payload,
    detailRoom: state.getdetailroom.payload,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowRoomOfSV);

const styles = StyleSheet.create({
  comeBack: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  iconUndo: {
    margin: 15,
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
  formDetailRoom: {
    backgroundColor: 'white',
    height: 200,
    width: 300,
    borderRadius: 20,
    elevation: 7,
  },
  viewInfo: {
    marginTop: 10,
    marginLeft: 20,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    width: '50%',
  },
  info: {
    width: '45%',
  },
  opacity: {
    backgroundColor: 'gray',
    opacity: 0.9,
  },
})
