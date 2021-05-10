import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

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
    console.log(this.props.student.profile.public_id)
    return (
      <View style={styles.container}>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.closeDetail}
          >
            <View style={[styles.centeredView, styles.opacity]}>
              <View style={styles.modalView}>
                <View style={styles.rowItem}>
                  <Text style={styles.title}>Email: </Text>
                  <Text style={styles.modalText}>{this.props.student.email}</Text>
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.title}>Họ: </Text>
                  <Text style={styles.modalText}>{this.props.student.first_name}</Text>
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.title}>Tên: </Text>
                  <Text style={styles.modalText}>{this.props.student.last_name}</Text>
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.title}>SĐT: </Text>
                  <Text style={styles.modalText}>{this.props.student.profile.phone}</Text>
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.title}>Khoa: </Text>
                  <Text style={styles.modalText}>{this.props.student.profile.faculty.name}</Text>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Đóng</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>      
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={this.openDetail}
        >
          <View style={styles.viewData}>
            <Text style={styles.email}>{this.props.student.email}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}
export default connect(mapStateToProps)(Student);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 5,
  },
  viewData: {
    flexDirection: 'column',
    height: 30,
  },
  email: {
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
    width: '30%',
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
