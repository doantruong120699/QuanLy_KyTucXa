import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { styleContainer } from '../../styles/index';

class WaterElectric extends Component {
  state = {
    modalVisible: false,
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  openDetail = async () => {
    this.setModalVisible(true);
  };
  closeDetail = async () => {
    this.setModalVisible(!modalVisible);
  }
  render() {
    const { modalVisible } = this.state;
    console.log(this.props.item.bill)
    return (
      <View style={[styleContainer.container, styleWaterElectric.container]}>
        <View style={styleWaterElectric.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.closeDetail}
          >
            <View style={[styleWaterElectric.centeredView, styleWaterElectric.opacity]}>
              <View style={styleWaterElectric.modalView}>
                <View style={styleWaterElectric.rowItem}>
                  <Text style={styleWaterElectric.title}>Phòng: </Text>
                  <Text style={styleWaterElectric.modalText}>{this.props.item.room.name}</Text>
                </View>
                <View style={styleWaterElectric.rowItem}>
                  <Text style={styleWaterElectric.title}>Thời gian: </Text>
                  <Text style={styleWaterElectric.modalText}>{this.props.item.month + "/" + this.props.item.year}</Text>
                </View>
                <View style={styleWaterElectric.rowItem}>
                  <Text style={styleWaterElectric.title}>Chỉ số nước: </Text>
                  <Text style={styleWaterElectric.modalText}>{this.props.item.new_index_water}</Text>
                </View>
                <View style={styleWaterElectric.rowItem}>
                  <Text style={styleWaterElectric.title}>Tiền nước: </Text>
                  <Text style={styleWaterElectric.modalText}>{this.props.item.water_price}</Text>
                </View>
                <View style={styleWaterElectric.rowItem}>
                  <Text style={styleWaterElectric.title}>Chỉ số điện: </Text>
                  <Text style={styleWaterElectric.modalText}>{this.props.item.new_index_eclectrical}</Text>
                </View>
                <View style={styleWaterElectric.rowItem}>
                  <Text style={styleWaterElectric.title}>Tiền điện: </Text>
                  <Text style={styleWaterElectric.modalText}>{this.props.item.electrical_price}</Text>
                </View>
                <View style={styleWaterElectric.rowItem}>
                  <Text style={styleWaterElectric.title}>Tình trạng: </Text>
                  <Text style={styleWaterElectric.modalText}>{this.props.item.bill.is_paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</Text>
                </View>
                {
                  this.props.item.bill.sinhvien_paid && (
                    <View style={styleWaterElectric.rowItem}>
                      <Text style={styleWaterElectric.title}>Người đóng: </Text>
                      <Text style={styleWaterElectric.modalText}>{this.props.item.bill.sinhvien_paid.user.last_name + ' ' + this.props.item.bill.sinhvien_paid.user.first_name}</Text>
                    </View>
                  )
                }
                <Pressable
                  style={[styleWaterElectric.button, styleWaterElectric.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styleWaterElectric.textStyle}>Đóng</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>       
        <TouchableOpacity
          style={[styleWaterElectric.button, styleWaterElectric.buttonOpen]}
          onPress={this.openDetail}
        >
          <View style={styleWaterElectric.viewData}>
            <Text style={styleWaterElectric.data}>{this.props.item.month + "/" + this.props.item.year}</Text>
            <Text style={styleWaterElectric.data}>{this.props.item.bill.is_paid ? ' Đã thanh toán' : ' Chưa thanh toán'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(WaterElectric);

const styleWaterElectric = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 5,
  },
  viewData: {
    flexDirection: 'row',
    height: 30,
  },
  data: {
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    elevation: 5
  },
  rowItem: {
    flexDirection: 'row',
  },
  title: {
    width: '50%',
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
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
  }
});
