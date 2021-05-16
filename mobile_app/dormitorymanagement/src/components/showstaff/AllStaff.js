import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { AppBar } from '../index';
import Staff from './Staff';
import { TextInput } from 'react-native-gesture-handler';
import { allstaff } from '../../redux/actions/allstaff';
import { stylePages, styleListNvSv, styleSearch, styleImgBg } from '../../styles/index';

class AllStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: "",
      listNV: this.props.listNV.results,
      page: this.props.listNV.current_page,
      nextPage: this.props.listNV.next_page,
      totals: this.props.listNV.totals,
    }
  }
  renderItem = ({ item }) => {
    return (
      <Staff staff={item}/>
    )
  }
  changeTextSearch = (value) => {
    this.setState({ textSearch: value });
  }
  searchStaff = () => {
    var listSearch = this.props.listNV.results.filter(item => item.email.indexOf(this.state.textSearch) !== -1);
    this.setState({ listNV: listSearch });
  }
  fetchApi = async (page) => {
    await this.props.allstudent(page);
    await this.setState({ page: page });
    await this.setState({ listNV: this.props.listNV.results, nextPage: this.props.listNV.next_page, totals: this.props.listNV.totals });
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
            <TouchableOpacity style={styleSearch.btnSearch} onPress={this.searchStaff}>
              <Text style={styleSearch.textBtnSearch}>Tìm</Text>
            </TouchableOpacity>
          </View>
          <View style={styleListNvSv.container_child}>
            <FlatList
              style={styleListNvSv.flatlist}
              data={this.state.listNV}
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
  allstaff,
};
function mapStateToProps(state) {
  return {
    listNV: state.allstaff.payload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllStaff);
