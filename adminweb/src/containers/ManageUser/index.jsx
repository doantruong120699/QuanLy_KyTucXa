import React, { useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex" paddingTop="20px">
      <Box
        position="relative"
        display="inline-flex"
        boxShadow={2}
        height={450}
        width={400}
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
          size={200}
          style={{ color: "olivedrab", marginTop: "130px", position: "absolute" }}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          color={"primary"}
          size={200}
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
              paddingTop: "210px",
              paddingLeft: "15px",
              fontSize: "40px",
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

export default function CircularStatic() {
  const [availabeRoomA, setAvailableRoomA] = useState(375);
  const [availabeRoomB, setAvailableRoomB] = useState(425);
  const [availabeRoomC, setAvailableRoomC] = useState(300);

  const [allRoomA, setAllRoomA] = useState(1500);
  const [allRoomB, setAllRoomB] = useState(1500);
  const [allRoomC, setAllRoomC] = useState(1500);

  const [checkinDate, setCheckinDate] = useState(new Date());

  const dateFormat = "ddd. MMM DD, yyyy ";

  const dateTimeFormatTitle = "dddd, MMMM DD, yyyy";

  //const data =
  return (
    <Box>
      <CircularProgressWithLabel
        name={"Khu A"}
        allRoom={allRoomA}
        availabeRoom={availabeRoomA}
      />
      <CircularProgressWithLabel
        name={"Khu B"}
        allRoom={allRoomB}
        availabeRoom={availabeRoomB}
      />
      <CircularProgressWithLabel
        name={"Khu C"}
        allRoom={allRoomC}
        availabeRoom={availabeRoomC}
      />
    </Box>
  );
}
