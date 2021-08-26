import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppBar } from '../index';
import ItemNotification from './ItemNotification';
import { getnotification } from '../../redux/actions/getnotification';
import { TextInput } from 'react-native-gesture-handler';
import { stylePages, styleImgBg, styleContainer } from '../../styles/index';

class Notification extends Component {
  constructor(props) {
    super(props);
  }
  renderItem = ({ item }) => {
    return (
      <ItemNotification item={item} />
    )
  }
  fetchApi = async (page) => {
    await this.props.allstudent(page);
    await this.setState({ page: page });
    await this.setState({ listNotification: this.props.listNotification.results, nextPage: this.props.listNotification.next_page, totals: this.props.listNotification.totals });
  }
  minusNumberPage = async () => {
    await this.fetchApi(this.props.listNotification.current_page - 1);
  }
  plusNumberPage = async () => {
    await this.fetchApi(this.props.listNotification.current_page + 1);
  }
  
  render() {
    let totalPages = Math.ceil(this.props.listNotification.totals / 20);
    return (
      <View style={[styleContainer.container, styles.container]}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
          <AppBar style={styles.appbar} navigation={this.props.navigation} />
          <View style={styles.container_child}>
            <FlatList
              style={styles.flatlist}
              data={this.props.listNotification.results}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index + 1}
            />
            <View style={stylePages.flexRow}>
              <TouchableOpacity 
                style={[stylePages.btnOperation, stylePages.viewPage]} 
                onPress={this.minusNumberPage}
                disabled={this.props.listNotification.current_page <= 1}
              >
                <Text style={stylePages.textOpe}>-</Text>
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid="transparent"
                value={this.props.listNotification.current_page.toString()}
                style={[stylePages.inputPage, stylePages.viewPage]}
                placeholderTextColor="#808080"
                keyboardType="numeric"
              >
              </TextInput>
              <TouchableOpacity 
                style={[stylePages.btnOperation, stylePages.viewPage]} 
                onPress={this.plusNumberPage}
                disabled={this.props.listNotification.current_page >= totalPages}
              >
                <Text style={stylePages.textOpe}>+</Text>
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
    listNotification: state.getnotification.payload,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
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
});
