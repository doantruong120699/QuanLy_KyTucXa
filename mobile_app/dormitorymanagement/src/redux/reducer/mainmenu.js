import { actionType } from '../actionType';

const { STATUS_MAIN_MENU } = actionType;
const initialState = {
  status: 'Dashboard',
};
export const mainmenu = (state = initialState, actions) => {
  switch (actions.type) {
    case STATUS_MAIN_MENU:
      return { status: actions.status };
    default:
      return state;
  }
};
