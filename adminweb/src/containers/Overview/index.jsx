import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import AddBoxIcon from "@material-ui/icons/AddBox";
import NotificationList from "./NotificationList";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import "./styles.css";
import { getUsedRoom, getNotifications } from "../../redux/actions/overview";
import ReactModal from "react-modal";
import NotificationForm from "./NotificationForm";
export default function Overview() {
  function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex" paddingTop="20px">
        <Box
          position="relative"
          display="inline-flex"
          boxShadow={2}
          height={400}
          width={350}
          justifyContent="center"
          marginRight={"20px"}
          marginBottom={"20px"}
        >
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            justifyContent="center"
          >
            <Typography
              variant="h3"
              component="div"
              color="textSecondary"
              style={{ paddingTop: "20px" }}
            >
              {`${props.allRoom - props.availabeRoom}/${props.allRoom}`}
            </Typography>
          </Box>
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            justifyContent="center"
          >
            <Typography
              variant="h6"
              component="div"
              color="textSecondary"
              style={{ paddingTop: "80px" }}
            >
              {`Còn trống ${props.availabeRoom} chỗ`}
            </Typography>
          </Box>
          <CircularProgress
            variant="determinate"
            color={"primary"}
            size={150}
            style={{
              color: "olivedrab",
              marginTop: "130px",
              position: "absolute",
            }}
            value={100}
          />
          <CircularProgress
            variant="determinate"
            color={"primary"}
            size={150}
            style={{ color: "maroon", marginTop: "130px" }}
            value={Number(
              (
                ((props.allRoom - props.availabeRoom) / props.allRoom) *
                100
              ).toFixed(3)
            )}
          />

          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            justifyContent="center"
          >
            <Typography
              variant="h5"
              component="div"
              color="textSecondary"
              style={{
                paddingTop: "190px",
                paddingLeft: "8px",
                fontSize: "30px",
              }}
            >
              {`${(
                ((props.allRoom - props.availabeRoom) / props.allRoom) *
                100
              ).toFixed(2)}%`}
            </Typography>
          </Box>
          <Box position="absolute" bottom={5}>
            <Typography variant="h3" component="div" color="textSecondary">
              {props.name}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const handleSendNoti = () => {
    setIsModalVisible(true);
  };
  const handleSuccessSubmit = () => {
    setIsModalVisible(false);
    getNotifications((output) => {
      if (output) {
        console.log("output", output.results);
        setNotifications(output.results);
      }
    });
  };
  const [data, setData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getUsedRoom((output) => {
      if (output) {
        console.log(output);
        setData(output);
      }
    });
    getNotifications((output) => {
      if (output) {
        console.log("output", output.results);
        setNotifications(output.results);
      }
    });
  }, []);

  return (
    <div>
      {data && (
        <Grow in={true} timeout={1000} style={{ transformOrigin: "10 10 10" }}>
          <Box style={{ transform: "scale(1)", marginLeft: "5%" }}>
            <Box>
              {data.map((n, index) => {
                return (
                  <CircularProgressWithLabel
                    key={index}
                    name={n.name}
                    allRoom={n.total}
                    availabeRoom={n.total - n.full}
                  />
                );
              })}
            </Box>
            <Box>
              <Button
                startIcon={<AddBoxIcon />}
                style={{
                  backgroundColor: "#005CC8",
                  width: "300px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={handleSendNoti}
              >
                Thêm một thông báo mới
              </Button>
              <Box className={"notification-area"}>
                {notifications && <NotificationList listNoti={notifications} />}
              </Box>
            </Box>
          </Box>
        </Grow>
      )}
      <ReactModal
        isOpen={isModalVisible}
        onRequestClose={hideModal}
        style={customStyles}
      >
        <NotificationForm onSuccess={handleSuccessSubmit} />
      </ReactModal>
    </div>
  );
}
