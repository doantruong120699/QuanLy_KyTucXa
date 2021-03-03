import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppBar } from '../index';
import { changeinfo } from '../../redux/actions/login';;

class ChangeInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            phone_number: '',
        }
    }

    changeInfo = async () => {
        const data = {};
        // this.props.changeinfo(data);
    }
    render() {
        return(
            <View style={styles.container}>
                <AppBar style={styles.appbar} navigation={this.props.navigation}/>
                <View style={styles.container_child}>
                    <View>
                        <Text style={styles.text}>CHANGE INFO</Text>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputText}>Name</Text>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputText}>MSNV</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            onChangeText={this.changeTextUsername}
                            style={styles.inputText}
                            placeholder="Email..."
                            placeholderTextColor="#003f5c"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            onChangeText={this.changeTextPass}
                            style={styles.inputText}
                            placeholder="Phone number..."
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.submitBtn} onPress={this.changeInfo}>
                            <Text style={styles.submitText}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };
}

const mapDispatchToProps = {
    changeinfo,
};

function mapStateToProps(state) {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfo);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1,
    },
    appbar: {
        flex: 1,
    },  
    container_child: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#87ceeb',
      flex: 9,
    },
    text: {
        color: '#4682b4',
        paddingBottom: 50,
        fontSize: 25,
        fontWeight: 'bold',
    },
    inputView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 25,
      height: 40,
      marginBottom: 10,
      justifyContent: 'center',
      padding: 20,
    },
    inputText: {
      height: 40,
      color: 'black',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    submitBtn: {
        width: '60%',
        backgroundColor: '#4682b4',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    submitText: {
        color: 'white',
    },
});
