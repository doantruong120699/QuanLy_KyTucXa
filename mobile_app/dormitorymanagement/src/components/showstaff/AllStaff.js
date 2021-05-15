import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, SectionList, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { AppBar } from '../index';
import Staff from './Staff';
import { TextInput } from 'react-native-gesture-handler';
import { allstaff } from '../../redux/actions/allstaff';

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
    let totalPages = Math.ceil(this.state.totals / 10);
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/background.jpg')} style={styles.imageBackground}>
          <AppBar style={styles.appBar} navigation={this.props.navigation} />
          <View style={styles.viewSearch}>
            <TextInput
              underlineColorAndroid="transparent"
              onChangeText={this.changeTextSearch}
              placeholder="Tìm kiếm"
              style={styles.inputTextSearch}
              placeholderTextColor="#808080"
            >
            </TextInput>
            <TouchableOpacity style={styles.btnSearch} onPress={this.searchStaff}>
              <Text style={styles.textBtnSearch}>Tìm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container_child}>
            <FlatList
              style={styles.flatlist}
              data={this.state.listNV}
              renderItem={this.renderItem}
              keyExtractor={item => item.profile.public_id}
            />
            <View style={styles.flexRow}>
              <TouchableOpacity 
                style={[styles.btnOperation, styles.viewPage]} 
                onPress={this.minusNumberPage}
                disabled={this.state.page <= 1}
              >
                <Text>-</Text>
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid="transparent"
                value={this.state.page.toString()}
                style={[styles.inputPage, styles.viewPage]}
                placeholderTextColor="#808080"
                keyboardType="numeric"
              >
              </TextInput>
              <TouchableOpacity 
                style={[styles.btnOperation, styles.viewPage]} 
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
  header: {
    textAlign: 'center',
    fontSize: 20,
  },
  viewSearch: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    marginBottom: 10,
  },
  inputTextSearch: {
    flex: 7,
    marginRight: 10,
    elevation: 7,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  btnSearch: {
    padding: 10,
    elevation: 7,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    flex: 1,
  },
  textBtnSearch: {
    color: 'white',
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
