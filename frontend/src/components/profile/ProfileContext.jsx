import React from "react";
const ProfileContext = React.createContext({
  profile: null,
  updateOrigin: () => {},
});
export default ProfileContext;
