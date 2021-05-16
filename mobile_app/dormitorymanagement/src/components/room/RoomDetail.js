import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, ToastAndroid, Modal, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { registrationroom } from '../../redux/actions/index';
import { styleBtnComeBack, styleImgBg } from '../../styles/index';

class RoomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dateStart: new Date(),
      dateEnd: new Date(),
      paymentMethod: '1',
    }
  };
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  openDetail = async () => {
    this.setModalVisible(true);
  };
  closeDetail = async () => {
    this.setModalVisible(!this.state.modalVisible);
  }
  goBack = () => {
    this.props.navigation.navigate("ShowAllRoom");
  }
  handleAssignRoom = () => {
    this.openDetail;
  }
  registrationRoom = async () => {
    const data = {
      "room": this.props.route.params.item.id,
      "start_at": moment(this.state.dateStart).format('YYYY-MM-DD'),
      "end_at": moment(this.state.dateEnd).format('YYYY-MM-DD'),
      "payment_method": this.state.paymentMethod, 
    }
    if (this.state.dateEnd > this.state.dateStart) {
      await this.props.registrationroom(data);
      if (this.props.msg != 'Success') {
        this.showToast(this.props.msg);
      } else {
        this.showToast('Đăng ký phòng thành công');
      }
      this.closeDetail();
    }
    else {
      this.showToast("Ngày kết thúc phải sau ngày bắt đầu");
    }
  }
  render() {
    const item = this.props.route.params.item;
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={this.closeDetail}
          >
            <View style={[styles.centeredView, styles.opacity]}>
              <View style={styles.modalView}>
                <View style={styles.rowItem}>
                  <Text style={styles.titleModal}>Ngày bắt đầu: </Text>
                  <DatePicker
                    style={styles.datePicker}
                    date={this.state.dateStart}
                    format="YYYY-MM-DD"
                    onDateChange={date => this.setState({ dateStart: date })}
                    mode={'date'}
                  />
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.titleModal}>Ngày kết thúc: </Text>
                  <DatePicker
                    style={styles.datePicker}
                    date={this.state.dateEnd}
                    format="YYYY-MM-DD"
                    onDateChange={date => this.setState({ dateEnd: date })}
                    mode={'date'}
                  />
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.titleModal}>Thanh toán: </Text>
                  <Picker 
                    style={styles.pickerPayment}
                    selectedValue={this.state.paymentMethod}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ paymentMethod: itemValue })
                    }>
                    <Picker.Item label="Tiền mặt" value="1" />
                    <Picker.Item label="Chuyển khoản" value="2" />
                  </Picker>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.buttonRegistration]}
                  onPress={this.registrationRoom}
                >
                  <Text style={styles.textStyle}>Đăng kí</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                  <Text style={styles.textStyle}>Đóng</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>  
        <View style={styleBtnComeBack.comeBack}>
          <TouchableOpacity style={styleBtnComeBack.buttonComback} onPress={this.goBack}>
            <FontAwesome5 style={styleBtnComeBack.iconUndo} name="long-arrow-alt-left" />
          </TouchableOpacity>
          <Text style={styles.text}>ROOM DETAIL</Text>
        </View>
        <View style={styles.container_child}>
          <View style={styles.formProfile}>
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Tên Phòng:</Text>
              <Text style={styles.info}>{item.area.name + item.name}</Text>
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
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Thành Viên:</Text>
              <Text style={styles.info}>Nguyễn Văn A, Hoàng Văn B, Đinh Văn C, Tôn Hữu D, Võ Văn E</Text>
            </View>
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Tình Trạng Phòng:</Text>
              <Text style={styles.info}>{item.number_now < item.typeroom.number_max ? 'Có Thể Đăng Kí' : 'Đã Đủ Người'}</Text>
            </View>
            <View style={styles.viewButton}>
              <TouchableOpacity style={[styles.button, styles.buttonOpen]} onPress={this.handleAssignRoom}>
                <Text style={styles.textButton} onPress={() => this.setModalVisible(!this.state.modalVisible)}>Đăng Kí Phòng Này</Text>
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
  registrationroom,
};

function mapStateToProps(state) {
  return {
    msg: state.registrationroom.msg,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  formProfile: {
    backgroundColor: 'white',
    height: '70%',
    width: '80%',
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
  viewButton: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
  },
  opacity: {
    backgroundColor: 'gray',
    opacity: 0.9,
  },
  modalView: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    elevation: 5
  },
  titleModal: {
    fontWeight: 'bold',
    width: 60,
    alignItems: 'center',
  },
  pickerPayment: {
    flex: 1,
  },
  rowItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 5,
  },
  buttonOpen: {
    width: '80%',
    height: '90%',
    backgroundColor: "white",
    backgroundColor: "#2196F3",
    margin: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  datePicker: {
    flex: 1,
    height: 40,
  },
  buttonRegistration: {
    marginBottom: 10,
  }
})
