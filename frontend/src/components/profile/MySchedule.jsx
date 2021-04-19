import React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
const MySchedule = () => {
  const currentDate = "2018-11-01";
  const schedulerData = [
    {
      startDate: "2018-11-01T09:45",
      endDate: "2018-11-01T11:00",
      title: "Meeting",
    },
    {
      startDate: "2018-11-01T12:00",
      endDate: "2018-11-01T13:30",
      title: "Go to a gym",
    },
  ];
  return (
    <div className="style-background-container">
      <div className="col col-full style-lg-box bg-color-white">
        <p className="bold-text text-20 pd-8">Lịch trực cá nhân</p>
        <Paper>
          <Scheduler data={schedulerData} height={400}>
            <ViewState currentDate={currentDate} />
            <WeekView startDayHour={8} endDayHour={18} />
            <Appointments />
          </Scheduler>
        </Paper>
      </div>
    </div>
  );
};
export default MySchedule;
