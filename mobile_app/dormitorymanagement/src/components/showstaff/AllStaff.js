import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text, SectionList, ImageBackground} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { AppBar } from '../index';
import Staff from './Staff';

class AllStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: this.props.listSV,
        }
    }
    renderItem = ({item}) => {
        return (
            <Staff staff={item}/>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
                    <AppBar style={styles.appBar} navigation={this.props.navigation}/>
                    <View style={styles.container_child}>
                        <FlatList
                            style={styles.flatlist}
                            data={this.props.listNV.results}
                            renderItem={this.renderItem}
                            keyExtractor={item=>item.profile.public_id}
                        />
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const mapDispatchToProps = {

};
function mapStateToProps(state) {
    return {
        listNV: state.allstaff.msg,
        color: state.setbackgroundcolor.color,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllStaff);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        resizeMode: "cover",
        alignItems: 'center',
    },
    appBar: {
        flex: 1,
    },
    container_child: {
        flex: 9, 
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlist: {
        elevation: 7,
        borderRadius: 20,
        backgroundColor: 'white',
        width: '90%',
        marginBottom: '2%',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
    },
    item: {
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'yellow',
        borderRadius: 15,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconitem: {
        padding: 5,
        fontSize: 15,
    },
    title: {
        padding: 5,
        fontSize: 15,
    },
});