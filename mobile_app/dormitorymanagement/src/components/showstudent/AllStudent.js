import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { AppBar } from '../index';
import Student from './Student';
import { TextInput } from 'react-native-gesture-handler';
import { allstudent } from '../../redux/actions/allstudent';
import { stylePages, styleListNvSv, styleSearch, styleImgBg } from '../../styles/index';

class AllStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: "",
      listSV: this.props.listSV.results,
      page: this.props.listSV.current_page,
      nextPage: this.props.listSV.next_page,
      totals: this.props.listSV.totals,
    }
  }
  renderItem = ({ item }) => {
    return (
      <Student student={item} />
    )
  }
  changeTextSearch = (value) => {
    setTimeout(async () => {
      await this.props.allstudent(1, value);
      await this.setState({ 
        textSearch: value,
        page: this.props.listSV.current_page, 
        listSV: this.props.listSV.results, 
        nextPage: this.props.listSV.next_page, 
        totals: this.props.listSV.totals 
      });
    }, 1000);
  }
  fetchApi = async (page) => {
    await this.props.allstudent(page);
    await this.setState({ page: page });
    await this.setState({ listSV: this.props.listSV.results, nextPage: this.props.listSV.next_page, totals: this.props.listSV.totals });
  }
  minusNumberPage = async () => {
    await this.fetchApi(this.state.page - 1);
  }
  plusNumberPage = async () => {
    await this.fetchApi(this.state.page + 1);
  }
  render() {
    let totalPages = Math.ceil(this.state.totals / 20);
    return (
      <View style={styleListNvSv.container}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
          <AppBar style={styleListNvSv.appBar} navigation={this.props.navigation} />
          <View style={styleSearch.viewSearch}>
            <TextInput
              underlineColorAndroid="transparent"
              onChangeText={this.changeTextSearch}
              placeholder="Tìm kiếm"
              style={styleSearch.inputTextSearch}
              placeholderTextColor="#808080"
            >
            </TextInput>
          </View>
          <View style={styleListNvSv.container_child}>
            <FlatList
              style={styleListNvSv.flatlist}
              data={this.state.listSV}
              renderItem={this.renderItem}
              keyExtractor={item => item.profile.public_id}
            />
            <View style={stylePages.flexRow}>
              <TouchableOpacity 
                style={[stylePages.btnOperation, stylePages.viewPage]} 
                onPress={this.minusNumberPage} 
                disabled={this.state.page <= 1}
              >
                <Text>-</Text>
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid="transparent"
                value={this.state.page.toString()}
                style={[stylePages.inputPage, stylePages.viewPage]}
                placeholderTextColor="#808080"
                keyboardType="numeric"
              >
              </TextInput>
              <TouchableOpacity 
                style={[stylePages.btnOperation, stylePages.viewPage]} 
                onPress={this.plusNumberPage} 
                disabled={this.state.page >= totalPages}
              >
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
  allstudent,
};
function mapStateToProps(state) {
  return {
    listSV: state.allstudent.payload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllStudent);
