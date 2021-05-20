import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { connect } from 'react-redux';
import { styleItemSvNv, styleContainer } from '../../styles/index';

class Student extends Component {
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
    return (
      <View style={[styleContainer.container, styleItemSvNv.container]}>
        <View style={styleItemSvNv.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.closeDetail}
          >
            <View style={[styleItemSvNv.centeredView, styleItemSvNv.opacity]}>
              <View style={styleItemSvNv.modalView}>
                <View style={styleItemSvNv.rowItem}>
                  <Text style={styleItemSvNv.title}>Email: </Text>
                  <Text style={styleItemSvNv.modalText}>{this.props.student.email}</Text>
                </View>
                <View style={styleItemSvNv.rowItem}>
                  <Text style={styleItemSvNv.title}>Họ: </Text>
                  <Text style={styleItemSvNv.modalText}>{this.props.student.first_name}</Text>
                </View>
                <View style={styleItemSvNv.rowItem}>
                  <Text style={styleItemSvNv.title}>Tên: </Text>
                  <Text style={styleItemSvNv.modalText}>{this.props.student.last_name}</Text>
                </View>
                <View style={styleItemSvNv.rowItem}>
                  <Text style={styleItemSvNv.title}>SĐT: </Text>
                  <Text style={styleItemSvNv.modalText}>{this.props.student.profile.phone}</Text>
                </View>
                <View style={styleItemSvNv.rowItem}>
                  <Text style={styleItemSvNv.title}>Khoa: </Text>
                  <Text style={styleItemSvNv.modalText}>{this.props.student.profile.faculty.name}</Text>
                </View>
                <Pressable
                  style={[styleItemSvNv.button, styleItemSvNv.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styleItemSvNv.textStyle}>Đóng</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>      
        <TouchableOpacity
          style={[styleItemSvNv.button, styleItemSvNv.buttonOpen]}
          onPress={this.openDetail}
        >
          <View style={styleItemSvNv.viewData}>
            <Text style={styleItemSvNv.data}>{this.props.student.last_name + " " + this.props.student.first_name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(Student);
