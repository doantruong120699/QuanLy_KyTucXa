import { createStore, combineReducers, applyMiddleware } from 'redux';
import { login, getallroom, searchroom } from '../reducer/index';
import thunkMiddleware from 'redux-thunk';

const AppReduces = combineReducers({
  login,
  getallroom,
  searchroom,
});

const rootReducer = (state, action) => {
    return AppReduces(state, action);
};

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));