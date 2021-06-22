import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Loader from "../common/Loader";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { getSchedule } from "../../redux/actions/profile";
import { colorData, getTaskList } from "../../utilities/DataRender/schedule";
import moment from "moment-timezone";
import querystring from "querystring";

const MySchedule = () => {
  const currentWeek = moment().tz("Asia/Ho_Chi_Minh").format("w") - 1;

  const [myScheduleState, setSchedule] = useState({
    date: new Date(),
    week: currentWeek,
    data: null,
  });

  const currentYear = new Date().getFullYear();

  const loader = useSelector((state) => state.profile.loading);

  const [filter, setFilter] = useState({
    week: currentWeek,
    year: currentYear,
  });

  const years = [];

  for (var j = currentYear; j > currentYear - 5; j--) {
    years.push({ value: j, label: j.toString() });
  }

  useEffect(() => {
    const params = querystring.stringify(filter);
    getSchedule(params, (output) => {
      if (output) {
        window.scrollTo(0, 0);
        if (output.status === "fail") {
          setSchedule({
            ...myScheduleState,
            data: getTaskList([]),
            week: filter.week,
          });
        } else {
          setSchedule({
            ...myScheduleState,
            data: getTaskList(output),
            week: filter.week,
          });
        }
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
    setFilter({ ...filter, week: newWeek });
  }

  function handleChangeYear(event) {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  }

  return (
    <div className="style-background-container" style={{ height: "100vh" }}>
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="col col-5">
            <select
              className="form-control mb-16"
              name="year"
              value={filter.year}
              onChange={handleChangeYear}
            >
              {years.map((year, index) => (
                <option key={index} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>
          {myScheduleState.data && (
            <div className="col col-full style-lg-box bg-color-white">
              <p className="bold-text text-20 pd-8">Lịch trực cá nhân</p>
              <Paper>
                <Scheduler data={myScheduleState.data} height={400}>
                  <ViewState currentDate={myScheduleState.date} />
                  <WeekView
                    startDayHour={0}
                    endDayHour={24}
                    cellDuration={120}
                  />
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
                    disabled={myScheduleState.week >= 52}
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
      )}
    </div>
  );
};
export default MySchedule;
