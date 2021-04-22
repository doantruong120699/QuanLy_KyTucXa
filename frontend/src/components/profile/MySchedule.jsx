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
import {
  appointments,
  resourcesData,
} from "../../utilities/DataRender/schedule";
import { getTaskList } from "./ScheduleRender";
import moment from "moment";

const MySchedule = () => {

  const [myScheduleState, setSchedule] = useState();

  useEffect(() => {
    
    const currentWeek = moment().format("w") - 1;
    getSchedule(currentWeek, (output) => {
      if (output) {
        console.log(output);
        setSchedule(getTaskList(currentWeek, output));
      }
    });
  }, []);

  const resources = [
    {
      fieldName: "colorID",
      instances: resourcesData,
    },
  ];
  return (
    <div className="style-background-container">
      {myScheduleState && (
        <div className="col col-full style-lg-box bg-color-white">
          <p className="bold-text text-20 pd-8">Lịch trực cá nhân</p>
          <Paper>
            <Scheduler data={appointments} height={400}>
              <ViewState defaultCurrentDate="2017-05-25" />
              <WeekView startDayHour={8} endDayHour={18} />
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
