import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const initialState = {
  allArt: [],
  singleArt: {}
};

const GET_ALL_ART = "GET_ALL_ART";
const GET_SINGLE_ART = "GET_SINGLE_ART";

export const getAllArt = allArt => ({
  type: GET_ALL_ART,
  allArt
});

export const getSingleArt = singleArt => ({
  type: GET_SINGLE_ART,
  singleArt
});

// write out thunk later
// export const fetchAllArt = () => {
//   return 1;
// };

// write out thunk later
// export const fetchSingleArt = () => {
//   return 2;
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ART:
      return {
        ...state,
        allArt: action.allArt
      };
    case GET_SINGLE_ART:
      return {
        ...state,
        singleArt: action.singleArt
      };
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunkMiddleware));
