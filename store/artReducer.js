import axios from "axios";
import NetworkInfo from 'react-native-network-info'

const initialState = {
  allArt: [],
  singleArt: {}
};

const GET_ALL_ART = "GET_ALL_ART";
const GET_SINGLE_ART = "GET_SINGLE_ART";
const SAVE_SINGLE_ART = "SAVE_SINGLE_ART";

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

export const fetchAllArt = () => async dispatch => {
  try {
    const res = await axios.get("http://172.16.23.84:8080/api/art");
    const allArt = res.data;
    dispatch(getAllArt(allArt));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleArt = () => async dispatch => {
  try {
    const res = await axios.get("http://172.16.23.84:8080/api/art/:id");
    const singleArt = res.data;
    dispatch(getSingleArt(singleArt));
  } catch (error) {
    console.log(error);
  }
};

export const saveArt = artData => async dispatch => {
  try {
    //put your exact Ip using network utility
    const response = await axios.post(
      "http://172.16.23.84:8080/api/art/add",
      artData
    );
    return dispatch(saveSingleArt(response.data));
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

    default:
      return artState;
  }
};

export default artReducer;
