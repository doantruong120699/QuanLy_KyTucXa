import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, ToastAndroid, Modal, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import { registrationroom, getpaymentmethod, getschoolyear } from '../../redux/actions/index';
import { styleBtnComeBack, styleImgBg, styleContainer } from '../../styles/index';
import { getData } from '../../utils/asyncStorage';

class RoomDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      payment: 1,
      semester: '1',
      schoolYear: 1,
      stageRegistrationRoom: '',
      roleUser: '',
      myRoom: '',
    }
  };
  async componentDidMount() {
    this.props.getpaymentmethod();
    this.props.getschoolyear();
    const role = await getData('role');
    const myRoom = await getData('myRoom');
    this.setState({ roleUser: role, myRoom: myRoom });
    const permission = JSON.parse(await getData('permission'));
    for (let i = 0; i < permission.length; i++) {
      if (permission[i] === 'not_registration_time' || permission[i] === 'registration_stage_1' || permission[i] === 'registration_stage_2' || permission[i] === 'registration_stage_3') {
        this.setState({ stageRegistrationRoom: permission[i] });
        break;
      }
    }
  }
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
    this.props.navigation.goBack();
  }
  handleAssignRoom = () => {
    this.openDetail;
  }
  registrationRoom = async () => {
    const data = {
      "room": this.props.route.params.item.id,
      "payment_method": this.state.payment,
      "semester": this.state.semester,
      "school_year": this.state.schoolYear
    }
    await this.props.registrationroom(data, this.state.stageRegistrationRoom);
    this.showToast(this.props.msg);
    this.closeDetail();
  }
  render() {
    const renderSchoolYear = () => {
      return this.props.schoolYear.map(item => (
        <Picker.Item label={item.label} value={item.id} />
      ))
    }
    const renderPayment = () => {
      let listPayment = [];
      this.props.paymentMethod.forEach(item => {
        listPayment.push(<Picker.Item label={item.name} value={item.id} />);
      })
      return listPayment;
    }
    const item = this.props.route.params.item;
    let status;
    let disable = true;
    if (item.status == 'A' && this.state.stageRegistrationRoom !== 'not_registration_time') {
      status = 'Có thể đăng kí';
      disable = false;
    }
    else if (item.status == 'F') {
      status = 'Đã đủ người'
    }
    else {
      status = 'Hiện không thể đăng kí';
    }
    return (
      <View style={styleContainer.container}>
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
                    <Text style={styles.titleModal}>Học kỳ: </Text>
                    <Picker 
                      style={styles.pickerPayment}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ semester: itemValue })
                      }
                    >
                      <Picker.Item label="1" value="1" />
                      <Picker.Item label="2" value="2" />
                      <Picker.Item label="Hè" value="3" />
                    </Picker>
                  </View>
                  <View style={styles.rowItem}>
                    <Text style={styles.titleModal}>Năm học: </Text>
                    <Picker 
                      style={styles.pickerPayment}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ schoolYear: itemValue })
                      }
                    >
                      {renderSchoolYear()}
                    </Picker>
                  </View>
                  {this.state.stageRegistrationRoom === 'registration_stage_2' && (
                    <View style={styles.rowItem}>
                      <Text style={styles.titleModal}>Số giường trống: </Text>
                      <Text style={{paddingTop: 15, paddingLeft: 15}}>{item.typeroom.number_max - item.number_now}</Text>
                    </View>
                  )}  
                  <View style={styles.rowItem}>
                    <Text style={styles.titleModal}>Thanh toán: </Text>
                    <Picker 
                      style={styles.pickerPayment}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ payment: itemValue })
                      }
                    >
                      {renderPayment()}
                    </Picker>
                  </View>
                  <Pressable
                    style={[styles.button, styles.buttonClose, styles.buttonRegistration]}
                    onPress={this.registrationRoom}
                  >
                    <Text style={styles.textStyle}>{this.state.stageRegistrationRoom === 'registration_stage_2' ? 'Bao phòng' : 'Đăng ký'}</Text>
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
                <Text style={styles.info}>{item.name}</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Đối tượng:</Text>
                <Text style={styles.info}>{item.typeroom.name_gender}</Text>
              </View>
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Khu vực:</Text>
                <Text style={styles.info}>{item.area.name}</Text>
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
                <Text style={styles.title}>Danh sách:</Text>
                <Text style={styles.info}>Nguyễn Văn A, Hoàng Văn B, Đinh Văn C, Tôn Hữu D, Võ Văn E</Text>
              </View> */}
              <View style={styles.viewInfo}>
                <Text style={styles.title}>Tình Trạng Phòng:</Text>
                <Text style={styles.info}>{status}</Text>
              </View>
              {
                (this.state.roleUser !== 'nhanvien_group' && this.state.stageRegistrationRoom !== 'not_registration_time' && (item.number_max > item.number_now)) && (
                  (this.state.stageRegistrationRoom !== 'registration_stage_2' || (this.state.stageRegistrationRoom === 'registration_stage_2' && this.state.myRoom === item.name)) && (
                    <View style={styles.viewButton}>
                      <TouchableOpacity style={[styles.button, styles.buttonOpen]} onPress={this.handleAssignRoom}>
                        <Text 
                          style={styles.textButton} 
                          onPress={() => this.setModalVisible(!this.state.modalVisible)}
                          disabled={disable}
                        >
                          {this.state.stageRegistrationRoom === 'registration_stage_2' ? 'Bao phòng' : 'Đăng ký'}  
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                  
                )
              }
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
  getschoolyear
};

function mapStateToProps(state) {
  return {
    msg: state.registrationroom.msg,
    paymentMethod: state.getpaymentmethod.payload,
    schoolYear: state.getschoolyear.payload
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetail);

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
  formProfile: {
    backgroundColor: 'white',
    width: '80%',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20,
    elevation: 7,
  },
  viewInfo: {
    marginTop: 5,
    marginBottom: 5,
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
    marginTop: 15,
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
    opacity: 1,
  },
  modalView: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    elevation: 5
  },
  titleModal: {
    paddingTop: 15,
    fontWeight: 'bold',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerPayment: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray'
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
