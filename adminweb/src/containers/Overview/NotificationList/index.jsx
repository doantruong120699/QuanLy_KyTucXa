import React, { useState, useEffect } from "react";
import "./styles.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import NotificationItem from "./NotificationItem";
import { getNotifications } from "../../../redux/actions/overview";
import Modal from "react-modal";
import NotificationForm from "../NotificationForm";
import queryString from "query-string";
import Pagination from "../../../components/common/Pagination";

export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 20,
    totals: 1,
  });

  const [filter, setFilter] = useState({
    page: 1,
  });

  const hideModal = () => {
    setIsModalVisible(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "53%",
      right: "50%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: { zIndex: 1000 },
  };

  useEffect(() => {
    const paramsString = queryString.stringify(filter);

    getNotifications(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };

        setPagination(pagination);
        setNotifications(output.results);
      }
    });
  }, [filter]);

  const handleSendNoti = () => {
    setIsModalVisible(true);
  };

  const handleSuccessSubmit = () => {
    setIsModalVisible(false);

    const paramsString = queryString.stringify(filter);

    getNotifications(paramsString, (output) => {
      if (output) {
        const pagination = {
          page: output.current_page,
          page_size: output.page_size,
          totals: output.totals,
        };

        setPagination(pagination);
        setNotifications(output.results);
      }
    });
  };

  function handlePageChange(newPage) {
    setFilter({ ...filter, page: newPage });
  }

  return (
    <Box>
      <Button
        startIcon={<AddBoxIcon />}
        style={{
          backgroundColor: "#005CC8",
          width: "175px",
          color: "white",
          cursor: "pointer",
        }}
        onClick={handleSendNoti}
      >
        Thêm thông báo
      </Button>
      <Box className={"notification-area"}>
        <div className="notification-list-box">
          {notifications && (
            <div>
              {notifications.map((value, index) => {
                return <NotificationItem key={index} notification={value} />;
              })}
            </div>
          )}
        </div>
      </Box>
      <div className="col col-full">
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={hideModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <NotificationForm onSuccess={handleSuccessSubmit} />
      </Modal>
    </Box>
  );
}
