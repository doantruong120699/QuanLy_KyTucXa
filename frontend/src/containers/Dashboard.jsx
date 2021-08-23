import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoContainer from "../components/dashboard/InfoContainer";
import Notification from "../components/dashboard/Notification";
import * as TitleList from "../utilities/constants/titles";
import Pagination from "../components/common/Pagination";
import Button from "../components/common/Button";
import FormError from "../components/common/FormError";
import InputField from "../components/common/InputField";
import Alertness from "../components/common/Alertness";
import Popup from "reactjs-popup";
import * as AlertMessage from "../utilities/constants/AlertMessage";
import * as APIAlertMessage from "../utilities/constants/APIAlertMessage";
import validate from "../utilities/regex";
import {
  actFetchTitleNavigation,
  getNotifications,
  getDashboard,
  createNotification,
} from "../redux/actions/dashboard";
import Loader from "../components/common/Loader";
import TextArea from "../components/common/TextArea";
import queryString from "query-string";
import { getAuth } from "../utilities/helper";

const Dashboard = () => {
  const dispatch = useDispatch();

  const loader = useSelector((state) => state.dashboard.loading);

  const [notifications, setNotification] = useState();

  const [success, setSuccess] = useState(false);

  const [post, setPost] = useState({
    title: {
      value: "",
      title: "Tiêu đề",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.EMPTY_STRING,
    },
    content: {
      value: "",
      title: "Nội dung",
      type: "text",
      validateType: "string",
      isValid: true,
      isHidden: true,
      errorMessage: AlertMessage.EMPTY_STRING,
    },
    isDisplayed: {
      value: "True",
    },
  });

  const [alert, setAlert] = useState({
    type: "",
    content: "",
  });

  const [dashboard, setDashboard] = useState();

  const [open, setOpen] = useState(false);

  const [openAlert, setAlertOpen] = useState(false);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const onAlertClose = () => setAlertOpen(false);

  const onAlertOpen = () => setAlertOpen(true);

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    let newState = { ...post[name] };
    newState.value = value;
    setPost({ ...post, [name]: newState });
  }

  function validatePost() {
    let tempData = { ...post };

    Object.keys(post).forEach((value) => {
      if (
        post[value].validateType &&
        !validate[post[value].validateType](post[value].value)
      ) {
        tempData[value].isValid = false;
        tempData[value].isHidden = false;
      } else {
        tempData[value].isValid = true;
        tempData[value].isHidden = true;
      }
      setPost(tempData);
    });
  }

  function createPost() {
    validatePost();
    if (post.title.isValid && post.content.isValid) {
      let dataSent = {
        title: post.title.value,
        content: post.content.value,
        is_display: post.isDisplayed.value,
      };

      createNotification(dataSent, (output, isOk) => {
        if (isOk) {
          switch (output.status) {
            case APIAlertMessage.STATUS_SUCCESS:
              setAlert({
                type: "type-success",
                content: AlertMessage.CREATE_POST_SUCCESSFULLY,
              });

              setPost({
                title: {
                  value: "",
                  title: "Tiêu đề",
                  type: "text",
                  validateType: "string",
                  isValid: true,
                  isHidden: true,
                  errorMessage: AlertMessage.EMPTY_STRING,
                },
                content: {
                  value: "",
                  title: "Nội dung",
                  type: "text",
                  validateType: "string",
                  isValid: true,
                  isHidden: true,
                  errorMessage: AlertMessage.EMPTY_STRING,
                },
                isDisplayed: {
                  value: "True",
                },
              });
              setSuccess((prev) => !prev);
              break;
            default:
              setAlert({
                type: "type-error",
                content: AlertMessage.SYSTEM_ERROR,
              });
              break;
          }
        } else {
          setAlert({
            type: "type-error",
            content: AlertMessage.SYSTEM_ERROR,
          });
        }
        onClose();
        onAlertOpen();
      });
    }
  }

  const isAllowed = getAuth().permission.filter(
    (per) => "add_notification" === per
  );

  useEffect(() => {
    let mounted = true;

    const paramsString = queryString.stringify(filter);

    dispatch(actFetchTitleNavigation(TitleList.NAVIGATION_TITLE[0].title));

    const GetNotifications = () =>
      getNotifications(paramsString, (output) => {
        if (output) {
          const pagination = {
            page: output.current_page,
            page_size: output.page_size,
            totals: output.totals,
          };
          if (mounted) {
            setNotification(output);
            setPagination(pagination);
          }
        }
      });

    const GetDashboard = () =>
      getDashboard((output) => {
        if (output) {
          console.log(output);
          if (mounted) {
            window.scrollTo(0, 0);
            setDashboard(output);
          }
        }
      });
    GetDashboard();
    GetNotifications();

    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, success]);
  return (
    <div className="style-background-container" style={{ height: "90vh" }}>
      {loader ? (
        <div className="align-item-ct">
          <Loader />
        </div>
      ) : (
        <div>
          {dashboard && (
            <div className="col col-half">
              <div className="col col-full">
                <div className="col col-half">
                  <InfoContainer
                    number={dashboard?.student?.total}
                    title={"Tổng số sinh viên"}
                    iconStyle={"fi-sr-graduation-cap"}
                    color={"#c71cca"}
                    increasedPercent={dashboard?.student?.cur_month}
                  />
                </div>
                <div className="col col-half">
                  <InfoContainer
                    number={dashboard?.staff?.total}
                    title={"Tổng số nhân viên"}
                    iconStyle={"fi-sr-users"}
                    color={"#0a3dbd"}
                    increasedPercent={dashboard?.staff?.cur_month}
                  />
                </div>
                <div className="col col-half">
                  <InfoContainer
                    number={dashboard?.room?.total}
                    title={"Tổng số phòng"}
                    iconStyle={"fi-sr-school"}
                    color={"#2bc155"}
                    increasedPercent={null}
                  />
                </div>
                <div className="col col-half">
                  <InfoContainer
                    number={dashboard?.room_available}
                    title={"Phòng trống"}
                    iconStyle={"fi-sr-checkbox"}
                    color={"#ff6275"}
                    increasedPercent={null}
                  />
                </div>
              </div>
              <div></div>
            </div>
          )}
          {notifications && (
            <div className="col col-half">
              <div className="notificationsContainer style-lg-box col col-full">
                <div className="col col-full mr-16 mb-16 display-flex-space-between">
                  <p className="style-notiTitle col col-half pt-8">
                    <span>
                      <i className="fi-sr-bell"></i>
                    </span>
                    Notification
                  </p>
                  {isAllowed.length >= 1 && (
                    <Button
                      type="normal-blue"
                      content="Tạo"
                      onClick={() => onOpen()}
                      isDisable={false}
                    />
                  )}
                </div>
                <div className="style-list-notifications col col-full">
                  {notifications.results.map((data, index) => {
                    return (
                      <Notification
                        key={index}
                        time={data?.last_update}
                        poster={`${data?.created_by.first_name} ${data?.created_by?.last_name}`}
                        title={data?.title}
                        content={data?.content}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="col col-full">
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        <Popup open={open} closeOnDocumentClick onClose={() => onClose()}>
          <div className="col modal style-lg-box bg-color-white text-align-ct">
            <h2>Thông báo mới</h2>
            <div className="col col-full pd-24">
              <div className="col col-full mt-8">
                <FormError
                  isHidden={post.title.isHidden}
                  errorMessage={post.title.errorMessage}
                />
                <InputField
                  name="title"
                  isValid={post.title.isValid}
                  value={post.title.value}
                  type={post.title.value}
                  placeholder={post.title.title}
                  onChange={handleChange}
                  autocomplete="off"
                />
              </div>
              <div className="col col-full mt-8">
                <FormError
                  isHidden={post.content.isHidden}
                  errorMessage={post.content.errorMessage}
                />
                <TextArea
                  name="content"
                  isValid={post.content.isValid}
                  value={post.content.value}
                  type={"text"}
                  placeholder={post.content.title}
                  onChange={handleChange}
                  autocomplete="off"
                  rows="5"
                  cols="33"
                />
              </div>
              <div className="col col-full mt-8">
                <select
                  className="form-control mb-16"
                  name="isDisplayed"
                  value={post.isDisplayed.value}
                  onChange={handleChange}
                >
                  <option value="True">Hiển thị</option>
                  <option value="False">Ẩn</option>
                </select>
              </div>
              <div className="col col-full mt-24">
                <div className="col col-half">
                  <Button
                    type="normal-red"
                    content="HỦY"
                    isDisable={false}
                    onClick={onClose}
                  />
                </div>
                <div className="col col-half">
                  <Button
                    type="normal-ubg"
                    content="LƯU"
                    isDisable={false}
                    onClick={createPost}
                  />
                </div>
              </div>
            </div>
          </div>
        </Popup>
        <div>
          <div>
            <Alertness
              open={openAlert}
              onClose={onAlertClose}
              type={alert.type}
              content={alert.content}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Dashboard);
