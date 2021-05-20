import { createStore, combineReducers, applyMiddleware } from 'redux';
import { 
  login, 
  getallroom, 
  mainmenu, 
  changepassword, 
  getprofile, 
  allstudent, 
  allstaff,  
  getarea,
  changeprofile,
  getnotification,
  registrationroom,
  dashboard,
  getcalendar,
  forgotpassword,
} from '../reducer/index';
import thunkMiddleware from 'redux-thunk';

const AppReduces = combineReducers({
  login,
  getallroom,
  mainmenu,
  changepassword,
  getprofile,
  allstudent,
  allstaff,
  getarea,
  changeprofile,
  getnotification,
  registrationroom,
  dashboard,
  getcalendar,
  forgotpassword
});

const rootReducer = (state, action) => {
    return AppReduces(state, action);
};

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
