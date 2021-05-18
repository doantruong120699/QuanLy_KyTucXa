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
import { colorData, getTaskList } from "../../utilities/dataRender/schedule";
import moment from "moment-timezone";

const MySchedule = () => {
  const currentWeek = moment().tz("Asia/Ho_Chi_Minh").format("w") - 1;

  const [myScheduleState, setSchedule] = useState({
    date: new Date(),
    week: currentWeek,
    data: null,
  });

  const [filter, setFilter] = useState({
    week: currentWeek,
  });

  useEffect(() => {
    getSchedule(filter.week, (output) => {
      if (output) {
        setSchedule({
          ...myScheduleState,
          data: getTaskList(output),
          week: output[0].week,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const resources = [
    {
      fieldName: "colorID",
      instances: colorData,
    },
  ];

  function handleWeekChange(newWeek, newDate) {
    setSchedule({
      ...myScheduleState,
      date: newDate,
    });
    setFilter({ week: newWeek });
  }

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
          <div className="col col-full style-pagination-container">
            <div className="float-right">
              <button
                className="text-is-pink bg-color-white pt-4 pb-4 pr-8 pl-8"
                disabled={myScheduleState.week <= 1}
                onClick={() =>
                  handleWeekChange(
                    myScheduleState.week - 1,
                    moment(myScheduleState.date).subtract(7, "day")
                  )
                }
              >
                <i className="fi-rr-angle-small-left text-14" />
              </button>
              <div className="style-current-page bg-color-red">
                <input
                  className="field-curent-page text-align-ct bg-color-red text-is-white bold-text"
                  type="text"
                  value={myScheduleState.week}
                  size="1"
                  readOnly={true}
                />
              </div>
              <button
                className="text-is-pink bg-color-white bold-text pt-4 pb-4 pr-8 pl-8"
                disabled={myScheduleState.week >= currentWeek}
                onClick={() =>
                  handleWeekChange(
                    myScheduleState.week + 1,
                    moment(myScheduleState.date).add(7, "day")
                  )
                }
              >
                <i className="fi-rr-angle-small-right text-14" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MySchedule;
