import axios from "axios";
import domain from "../../domain.js";

const initialState = {
  allArt: [],
  singleArt: {},
  userArt: []
};

const GET_ALL_ART = "GET_ALL_ART";
const GET_SINGLE_ART = "GET_SINGLE_ART";
const SAVE_SINGLE_ART = "SAVE_SINGLE_ART";
const GET_USER_ART = "GET_USER_ART";
const EDIT_SINGLE_ART = "EDIT_SINGLE_ART";

export const getAllArt = allArt => ({
  type: GET_ALL_ART,
  allArt
});

export const getSingleArt = singleArt => ({
  type: GET_SINGLE_ART,
  singleArt
});

export const saveSingleArt = singleArt => ({
  type: SAVE_SINGLE_ART,
  singleArt
});

export const editSingleArt = singleArt => ({
  type: EDIT_SINGLE_ART,
  singleArt
});

export const getUserArt = userArt => ({
  type: GET_USER_ART,
  userArt
});

export const fetchAllArt = () => async dispatch => {
  try {
    const res = await axios.get(`${domain}/api/art`);
    const allArt = res.data;
    dispatch(getAllArt(allArt));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleArt = () => async dispatch => {
  try {
    const res = await axios.get(`${domain}/api/art/:id`);
    const singleArt = res.data;
    dispatch(getSingleArt(singleArt));
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserArt = id => async dispatch => {
  try {
    const res = await axios.get(`${domain}/api/art/user/${id}`);
    const userArt = res.data;
    dispatch(getUserArt(userArt));
  } catch (error) {
    console.log(error);
  }
};

export const saveArt = artData => async dispatch => {
  try {
    //put your exact Ip using network utility
    const response = await axios.post(`${domain}/api/art/add`, artData);
    return dispatch(saveSingleArt(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const editArt = (id, artEditData) => async dispatch => {
  try {
    //put your exact Ip using network utility
    const response = await axios.put(`${domain}/api/art/${id}`, artEditData);
    return dispatch(editSingleArt(response.data));
  } catch (error) {
    console.log(error);
  }
};

const artReducer = (artState = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ART:
      return {
        ...artState,
        allArt: action.allArt
      };
    case GET_SINGLE_ART:
      return {
        ...artState,
        singleArt: action.singleArt
      };
    case SAVE_SINGLE_ART:
      return {
        ...artState,
        singleArt: action.singleArt
      };
    case GET_USER_ART:
      return {
        ...artState,
        userArt: action.userArt
      };
    case EDIT_SINGLE_ART:
      return {
        ...artState,
        singleArt: action.singleArt
      };
    default:
      return artState;
  }
};

export default artReducer;
