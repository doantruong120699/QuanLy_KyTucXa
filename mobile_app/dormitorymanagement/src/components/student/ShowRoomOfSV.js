import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, ToastAndroid, Modal, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import { registrationroom, getpaymentmethod, getschoolyear } from '../../redux/actions/index';
import { styleBtnComeBack, styleImgBg, styleContainer } from '../../styles/index';
import { getData } from '../../utils/asyncStorage';

class ShowRoomOfSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dateStart: new Date(),
      dateEnd: new Date(),
      payment: 1,
      semester: '1',
      schoolYear: 1,
      stageRegistrationRoom: '',
      modalVisible: false
    }
  };
  async componentDidMount() {
    this.props.getpaymentmethod();
    this.props.getschoolyear();
    const permission = JSON.parse(await getData('permission'));
    for (let i = 0; i < permission.length; i++) {
      if (permission[i] === 'not_registration_time' || permission[i] === 'registration_stage_1' || permission[i] === 'registration_stage_2' || permission[i] === 'registration_stage_3') {
        this.setState({ stageRegistrationRoom: permission[i] });
        break;
      }
    }
  }
  registrationRoom = async () => {
    const data = {
      "room": this.props.detailRoom.id,
      "payment_method": this.state.payment,
      "semester": this.state.semester,
      "school_year": this.state.schoolYear
    }
    await this.props.registrationroom(data, this.state.stageRegistrationRoom);
    if (this.props.msg != 'Success') {
      this.showToast(this.props.msg);
    } else {
      this.showToast('Đăng ký phòng thành công');
    }
    this.setModalVisible(!this.state.modalVisible);
  }
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  goBack = () => {
    this.props.navigation.goBack();
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
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
    let item = this.props.detailRoom;
    let status;
    let disable = true;
    if (item.status == 'A') {
      status = 'Có thể đăng kí';
      disable = false;
    }
    else if (item.status == 'F') {
      status = 'Đã đủ người'
    }
    else {
      status = 'Phòng này hiện không thể đăng kí';
    }
    const userOfRoom = () => {
      const nameUsers = item.list_user?.map(user => user.last_name + ' ' + user.first_name);
      return nameUsers?.join(', ');
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
                  <Text style={styles.textStyle}>Bao phòng</Text>
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
            <View style={styles.viewInfo}>
              <Text style={styles.title}>Danh sách:</Text>
              <Text style={styles.info}>
                {userOfRoom()}
              </Text>
            </View>
            {
              (this.state.stageRegistrationRoom === 'registration_stage_2') && (
                <View style={styles.viewButton}>
                  <TouchableOpacity style={[styles.button, styles.buttonOpen]} onPress={this.handleAssignRoom}>
                    <Text 
                      style={styles.textButton} 
                      onPress={() => this.setModalVisible(!this.state.modalVisible)}
                      disable={disable}
                    >
                      Bao phòng
                    </Text>
                  </TouchableOpacity>
                </View>
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
    detailRoom: state.getdetailroom.payload,
    schoolYear: state.getschoolyear.payload
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
    width: 300,
    paddingTop: 10,
    paddingBottom: 20,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonRegistration: {
    marginBottom: 10,
  }
})
