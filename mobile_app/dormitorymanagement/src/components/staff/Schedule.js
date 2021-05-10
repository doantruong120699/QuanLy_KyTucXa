import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Calendar, Agenda } from 'react-native-calendars';
import { Avatar, Card } from 'react-native-paper';
import moment from 'moment';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const initData = [
  {
    "public_id": "atdi4wFPXFF4EBC8P4vGYP",
    "week": 17,
    "year": 2021,
    "title": "ca 2",
    "content": "",
    "shift": {
      "id": 3,
      "name": "morning",
      "weekdays": "Mon",
      "start_at": "08:00:00",
      "end_at": "12:00:00",
      "slug": "1213",
      "date": "2021-04-26"
    },
    "staff": {
      "username": "tranminhquang",
      "email": "asdquang111@gmail.com",
      "first_name": "Quang",
      "last_name": "Tran Minh"
    }
  },
  {
    "public_id": "atdi4wFPXFF4EBC8P4vGYP",
    "week": 17,
    "year": 2021,
    "title": "ca 1",
    "content": "",
    "shift": {
      "id": 3,
      "name": "morning",
      "weekdays": "Mon",
      "start_at": "08:00:00",
      "end_at": "12:00:00",
      "slug": "1213",
      "date": "2021-04-26"
    },
    "staff": {
      "username": "tranminhquang",
      "email": "asdquang111@gmail.com",
      "first_name": "Quang",
      "last_name": "Tran Minh"
    }
  },

  {
    "public_id": "atdi4wFPXFF4EBC8P4vGYPa",
    "week": 17,
    "year": 2021,
    "title": "ca 2",
    "content": "",
    "shift": {
      "id": 4,
      "name": "afternoon",
      "weekdays": "Tue",
      "start_at": "12:00:00",
      "end_at": "14:46:11",
      "slug": "12212",
      "date": "2021-04-27"
    },
    "staff": {
      "username": "tranminhquang",
      "email": "asdquang111@gmail.com",
      "first_name": "Quang",
      "last_name": "Tran Minh"
    }
  }
];

const Schedule: React.FC = () => {
  var week = moment().format("w") - 1;
  var start = moment().startOf("isoWeek");
  var dayCalendar;
  const [items, setItems] = useState({});
  var selectDay = moment(start).add(1, 'days').toISOString().split('T')[0];
  var dataCalendar = {};
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = 0; i < 7; i++) {
        // const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        // const strTime = timeToString(time);
        // console.log(strTime);
        start = moment(start).add(1, 'days');
        dayCalendar = start.toISOString().split('T')[0];
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
                name: initData[i].title + " " + initData[i].shift.start_at + " ",
                // height: Math.max(50, Math.floor(Math.random() * 150)),
              })
            }
          }
          // const numItems = Math.floor(Math.random() * 3 + 1);
          // for (let j = 0; j < numItems; j++) {
          //   items[day].push({
          //     name: 'Item for ' + day + '#' + j,
          //     height: Math.max(50, Math.floor(Math.random() * 150)),
          //   })
          // }
        }
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
              <Text>{item.name}</Text>
              {/* <Avatar.Text label="J"/> */}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={selectDay}
        renderItem={renderItem}
      />
    </View>
  )
}

export default connect()(Schedule);
