import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { AppBar } from '../index';
import Staff from './Staff';
import { TextInput } from 'react-native-gesture-handler';
import { allstaff } from '../../redux/actions/allstaff';
import { stylePages, styleListNvSv, styleSearch, styleImgBg, styleContainer } from '../../styles/index';

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
    setTimeout(async () => {
      await this.props.allstaff(1, value);
      await this.setState({ 
        textSearch: value,
        page: this.props.listNV.current_page, 
        listNV: this.props.listNV.results, 
        nextPage: this.props.listNV.next_page, 
        totals: this.props.listNV.totals 
      });
    }, 1000);
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
      <View style={[styleContainer.container, styleListNvSv.container]}>
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
                <Text style={stylePages.textOpe}>-</Text>
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
  allstaff,
};
function mapStateToProps(state) {
  return {
    listNV: state.allstaff.payload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllStaff);
