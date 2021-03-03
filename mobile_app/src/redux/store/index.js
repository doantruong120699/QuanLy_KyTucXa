import { createStore, combineReducers, applyMiddleware } from 'redux';
import { login, changeinfo, getcalendar } from '../reducer/index';
import thunkMiddleware from 'redux-thunk';

const AppReduces = combineReducers({
  login,
  changeinfo,
  getcalendar,
});

const rootReducer = (state, action) => {
    return AppReduces(state, action);
};

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));