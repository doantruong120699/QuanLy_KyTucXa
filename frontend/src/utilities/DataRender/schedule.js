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
    if (!setColor.has(element.staff.username)) {
      setColor.set(element.staff.username, colorData[j++].id);
    }
    result.push({
      shiftID: element.id,
      title: element.staff.first_name + " " + element.staff.last_name,
      colorID: setColor.get(element.staff.username),
      startDate: new Date(`${element.shift.date}T${element.shift.start_at}`),
      endDate: new Date(`${element.shift.date}T${element.shift.end_at}`),
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
];
