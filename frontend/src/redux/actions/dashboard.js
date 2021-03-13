import * as TypeAction from "../constants";
export const actFetchTitleNavigation = (title) => {
  return {
    type: TypeAction.FETCH_NAV_TITLE,
    title,
  };
};
