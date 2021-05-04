import React, { useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import "./styles.css";
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
          value={(
            ((props.allRoom - props.availabeRoom) / props.allRoom) *
            100
          ).toFixed(3)}
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

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function Overview() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Khu A",
      maxRoom: 1500,
      availableRoom: 375,
    },
    {
      id: 2,
      name: "Khu B",
      maxRoom: 1500,
      availableRoom: 425,
    },
    {
      id: 3,
      name: "Khu C",
      maxRoom: 1500,
      availableRoom: 300,
    },
  ]);

  //const data =
  return (
    <Grow in={true} timeout={1000} style={{ transformOrigin: "10 10 10" }}>
      <Box style={{ transform: "scale(1)" }}>
        {data.map((n) => {
          return (
            <CircularProgressWithLabel
              name={n.name}
              allRoom={n.maxRoom}
              availabeRoom={n.availableRoom}
            />
          );
        })}
      </Box>
    </Grow>
  );
}
