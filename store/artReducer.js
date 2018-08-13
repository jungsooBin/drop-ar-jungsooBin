import axios from 'axios'

const initialState = {
  allArt: [],
  singleArt: {}
};

const GET_ALL_ART = 'GET_ALL_ART';
const GET_SINGLE_ART = 'GET_SINGLE_ART';
const SAVE_SINGLE_ART = 'SAVE_SINGLE_ART';

export const getAllArt = allArt => ({
  type: GET_ALL_ART, 
  allArt
});

export const getSingleArt = singleArt => ({
  type: GET_SINGLE_ART,
  singleArt
});

export const saveSingleArt = singleSavingArt => ({
  type: SAVE_SINGLE_ART,
  singleSavingArt
});


export const saveArt = (artData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/art/add', artData)
    return dispatch(saveSingleArt(response.data))
  } catch (error) {
    console.log(error)
  }
}


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
        singleSavingArt: action.singleArt
      };
    
    default:
      return artState;
  }
};

export default artReducer;
