import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import moment from 'moment';
import { AppBar } from '../index';
import { getcalendar } from '../../redux/actions/index';
import { styleImgBg, styleContainer } from '../../styles/index';

const Schedule = (props) => {
  const { navigation, getcalendar } = props;
  
  const [items, setItems] = useState({});

  const [selectDay, setSelectDay] = useState({
    week: moment().format("w") - 1,
    start: moment().startOf('w').add(1, 'days'),
  });
  let daySelect = selectDay.start.toISOString().split('T')[0];
  let dayCalendar;
  var dataCalendar = {};
  const initData = useSelector((state) => state.getcalendar.payload);
  const fetchData = async (day) => {
    let week = moment(day.dateString).format("w") - 1;
    let year = moment(day.dateString).get('year');
    await getcalendar(week, year);
    await setSelectDay({
      week: week,
      start: moment(day.dateString).startOf('week').add(1, 'w').subtract(6, 'days'),
    });
  }
  useEffect(() => {
    loadItems();
  }, [selectDay])
  const loadItems = () => {
    let dayRender = selectDay.start;
    setTimeout(() => {
      for (let i = 0; i < 7; i++) {
        dayCalendar = dayRender.toISOString().split('T')[0];
        dataCalendar[dayCalendar] = [];
        for (let i = 0; i < initData.length; i++) {
          if (initData[i].shift.date == dayCalendar) {
            dataCalendar[dayCalendar].push(initData[i]);
          }
        }
        if (!items[dayCalendar]) {
          items[dayCalendar] = [];
          for (let i = 0; i < initData.length; i++) {
            if (initData[i].shift.date == dayCalendar) {
              items[dayCalendar].push({
                date: initData[i].shift.date,
                start: initData[i].shift.start_at,
                end: initData[i].shift.end_at,
                staff: initData[i].staff.last_name + " " + initData[i].staff.first_name,
              })
            }
          }
        }
        dayRender = moment(dayRender).add(1, 'days');
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };
  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 10 }}>
        <Card>
          <Card.Content>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <View>
                <Text style={{color: 'red', fontSize: 15}}>{item.staff}</Text>
                <Text style={{color: 'blue'}}>{item.date}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>Từ: </Text>
                  <Text>{item.start}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text>Đến: </Text>
                  <Text>{item.end}</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styleContainer.container, styles.container]}>
      <ImageBackground source={require('../../assets/background.jpg')} style={styleImgBg.imageBackground}>
        <AppBar style={styles.appBar} navigation={navigation} />
        <View style={styles.schedule}>
          <Agenda
            items={items}
            selected={daySelect}
            renderItem={renderItem}
            onDayPress={async (day) => {fetchData(day)}}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

const mapDispatchToProps = {
  getcalendar: getcalendar,
}
function mapStateToProps(state) {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  appBar: {
    height: 50,
  },
  schedule: {
    flex: 9,
    width: '100%'
  }
});
