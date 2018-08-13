import {combineReducers} from 'redux';

import artReducer from './artReducer'
// import userReducer from './userReducer'

// `combineReducers` is not currently used, but eventually should be for modular code :D
// When you're ready to use it, un-comment the line below!
// import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  arts: artReducer,
  // users: userReducer, 
})

export default rootReducer;
