import { createStore, combineReducers, applyMiddleware } from 'redux';
import { 
  login, 
  getallroom, 
  searchroom, 
  mainmenu, 
  changepassword, 
  getprofile, 
  allstudent, 
  allstaff,  
  getarea,
  getclass, 
  getfaculty,
  getposition,
  changeprofile,
  getnotification,
  registrationroom,
  dashboard,
  getcalendar,
} from '../reducer/index';
import thunkMiddleware from 'redux-thunk';

const AppReduces = combineReducers({
  login,
  getallroom,
  searchroom,
  mainmenu,
  changepassword,
  getprofile,
  allstudent,
  allstaff,
  getarea,
  getclass, 
  getfaculty,
  getposition,
  changeprofile,
  getnotification,
  registrationroom,
  dashboard,
  getcalendar,
});

const rootReducer = (state, action) => {
    return AppReduces(state, action);
};

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));