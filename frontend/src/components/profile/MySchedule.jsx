import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { getSchedule } from "../../redux/actions/profile";
import { colorData, getTaskList } from "../../utilities/DataRender/schedule";
import moment from "moment";

const MySchedule = () => {
  const [myScheduleState, setSchedule] = useState({
    date: new Date(),
    data: null,
  });

  useEffect(() => {
    const currentWeek = moment().format("w") - 1;
    getSchedule(currentWeek, (output) => {
      if (output) {
        setSchedule({ ...myScheduleState, data: getTaskList(output) });
      }
    });
  }, []);

  const resources = [
    {
      fieldName: "colorID",
      instances: colorData,
    },
  ];
  return (
    <div className="style-background-container">
      {myScheduleState.data && (
        <div className="col col-full style-lg-box bg-color-white">
          <p className="bold-text text-20 pd-8">Lịch trực cá nhân</p>
          <Paper>
            <Scheduler data={myScheduleState.data} height={400}>
              <ViewState currentDate={myScheduleState.date} />
              <WeekView startDayHour={0} endDayHour={24} cellDuration={120} />
              <Appointments />
              <Resources data={resources} />
            </Scheduler>
          </Paper>
        </div>
      )}
    </div>
  );
};
export default MySchedule;
