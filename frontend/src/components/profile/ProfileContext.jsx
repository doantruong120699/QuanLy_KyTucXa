import React from "react";
const ProfileContext = React.createContext({
  data: null,
  updateOrigin: () => {},
  origin: null,
});
export default ProfileContext;
