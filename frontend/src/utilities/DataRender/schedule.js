import { pink, purple, amber, deepOrange } from "@material-ui/core/colors";

export function getTaskList(currentWeek, data) {
  let result;
  data.forEach((element) => {});
  return result;
}
export const appointments = [
  {
    title: "Recruiting students",
    colorID: 5,
    startDate: new Date(2017, 4, 26, 10, 0),
    endDate: new Date(2017, 4, 26, 11, 0),
  },
  {
    title: "Final exams",
    colorID: 3,
    startDate: new Date(2017, 4, 26, 12, 0),
    endDate: new Date(2017, 4, 26, 13, 35),
  },
];

export const resourcesData = [
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
    color: deepOrange,
  },
];
