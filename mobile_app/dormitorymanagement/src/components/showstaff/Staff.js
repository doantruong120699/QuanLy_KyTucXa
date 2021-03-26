import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { setbackgroundcolor } from '../../redux/actions/index';

class Staff extends Component {
    state = {
        modalVisible: false,
    };
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };
    openDetail = async () => {
        this.setModalVisible(true);
        this.props.setbackgroundcolor('gray');
    };
    closeDetail = async () => {
        this.setModalVisible(!modalVisible);
        this.props.setbackgroundcolor('white');
    }
    render() {
        const { modalVisible } = this.state;
        return(
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={this.closeDetail}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.rowItem}>
                                <Text style={styles.title}>Email: </Text>
                                <Text style={styles.modalText}>{this.props.staff.email}</Text>
                            </View>
                            <View style={styles.rowItem}>
                                <Text style={styles.title}>Họ: </Text>
                                <Text style={styles.modalText}>{this.props.staff.first_name}</Text>
                            </View>
                            <View style={styles.rowItem}>
                                <Text style={styles.title}>Tên: </Text>
                                <Text style={styles.modalText}>{this.props.staff.last_name}</Text>
                            </View>
                            <View style={styles.rowItem}>
                                <Text style={styles.title}>SĐT: </Text>
                                <Text style={styles.modalText}>{this.props.staff.profile.phone}</Text>
                            </View>
                            <View style={styles.rowItem}>
                                <Text style={styles.title}>Vị trí: </Text>
                                <Text style={styles.modalText}>{this.props.staff.profile.position.name}</Text>
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
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={this.openDetail}
                >
                    <View style={styles.item}>
                        <View style={styles.viewData}>
                            <Text style={styles.email}>{this.props.staff.email}</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        )
    }
}

const mapDispatchToProps = {
    setbackgroundcolor,
}
function mapStateToProps(state) {
  return {

  }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Staff);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 10,
    },
    item: {
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewData: {
      flex: 2,
      flexDirection: 'column',
    },
    email: {
      fontSize: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
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
    },
    buttonOpen: {
        width: '80%',
        backgroundColor: "white",
        elevation: 5,
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
        // textAlign: "center"
    }
});