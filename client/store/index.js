import { combineReducers } from 'redux';

import artReducer from './artReducer';
import userReducer from './userReducer';
import likesReducer from './likesReducer';

const rootReducer = combineReducers({
  arts: artReducer,
  users: userReducer,
  likes: likesReducer,
});

export default rootReducer;
