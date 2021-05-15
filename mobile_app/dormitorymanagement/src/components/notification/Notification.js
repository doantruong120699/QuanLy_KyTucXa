import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppBar } from '../index';
import ItemNotification from './ItemNotification';
import { getnotification } from '../../redux/actions/getnotification';
import { TextInput } from 'react-native-gesture-handler';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: this.props.listSV,
      page: "1",
    }
  }
  renderItem = ({ item }) => {
    console.log("ab");
    return (
      <ItemNotification item={item} />
    )
  }
  changeNumberPage = async (value) => {
    await this.setState({ page: value });
    await this.props.getnotification(this.state.page);
    await this.setState({ listSV: this.props.listSV.results });
  }
  minusNumberPage = async () => {
    if (this.state.page > 1) {
      await this.setState({ page: (parseInt(this.state.page) - 1).toString() });
      await this.props.getnotification(this.state.page);
      await this.setState({ listSV: this.props.listSV.results });
    }
  }
  plusNumberPage = async () => {
    await this.setState({ page: (parseInt(this.state.page) + 1).toString() });
    await this.props.getnotification(this.state.page);
    await this.setState({ listSV: this.props.listSV.results });
  }
  render() {
    console.log(this.props.listNotification);
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
          <AppBar style={styles.appbar} navigation={this.props.navigation} />
          <View style={styles.container_child}>
            <FlatList
              style={styles.flatlist}
              data={this.props.listNotification.results}
              renderItem={this.renderItem}
              keyExtractor={item => item.public_id}
            />
            <View style={styles.flexRow}>
              <TouchableOpacity style={[styles.btnOperation, styles.viewPage]} onPress={this.minusNumberPage}>
                <Text>-</Text>
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid="transparent"
                onChangeText={this.changeNumberPage}
                value={this.state.page}
                style={[styles.inputPage, styles.viewPage]}
                placeholderTextColor="#808080"
                keyboardType="numeric"
              >
              </TextInput>
              <TouchableOpacity style={[styles.btnOperation, styles.viewPage]} onPress={this.plusNumberPage}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}
const mapDispatchToProps = {
  getnotification,
};
function mapStateToProps(state) {
  return {
    listNotification: state.getnotification.data,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);

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
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  viewPage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPage: {
    width: 50,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    color: 'black',
    padding: 5,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  btnOperation: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
  }
});
