import {
  pink,
  purple,
  amber,
  deepOrange,
  blue,
} from "@material-ui/core/colors";

export function getTaskList(data) {
  let result = [];
  const setColor = new Map();
  var j = 0;
  data.forEach((element) => {
    var endDate = new Date(`${element.shift.date}T${element.shift.end_at}`);

    if (!setColor.has(element.staff.username)) {
      setColor.set(element.staff.username, colorData[j++].id);
    }
    if (element.shift.id % 3 === 0) {
      endDate.setDate(endDate.getDate() + 1);
    }
    result.push({
      shiftID: element.id,
      title: element.staff.first_name + " " + element.staff.last_name,
      colorID: setColor.get(element.staff.username),
      startDate: new Date(`${element.shift.date}T${element.shift.start_at}`),
      endDate: endDate,
    });
  });

  return result;
}

export const colorData = [
  {
    id: 1,
    color: amber,
  },
  {
    id: 2,
    color: pink,
  },
  {
    id: 3,
    color: purple,
  },
  {
    id: 4,
    color: deepOrange,
  },
  {
    id: 5,
    color: blue,
  },
  {
    id: 6,
    color: amber,
  },
  {
    id: 7,
    color: pink,
  },
  {
    id: 8,
    color: purple,
  },
  {
    id: 9,
    color: deepOrange,
  },
  {
    id: 10,
    color: blue,
  },
];
