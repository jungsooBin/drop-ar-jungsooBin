import { combineReducers } from "redux";

import artReducer from "./artReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  arts: artReducer,
  users: userReducer
});

export default rootReducer;
