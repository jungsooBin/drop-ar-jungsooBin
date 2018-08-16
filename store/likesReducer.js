import axios from 'axios';
import domain from '../domain.js';

const initialState = {
  likeArt: [],
};

const LIKE_ART = 'LIKE_ART';
const DISLIKE_ART = 'DISLIKE_ART';

export const likeArt = likeArt => ({
  type: LIKE_ART,
  likeArt,
});

export const dislikeArt = dislikeArt => ({
  type: DISLIKE_ART,
  dislikeArt,
});

export const saveDislikeArt = dislikeArtData => async dispatch => {
  try {
    console.log(dislikeArtData);
    const response = await axios.put(`${domain}/api/likes`, dislikeArtData);
    return dispatch(dislikeArt(response.data));
  } catch (error) {
    console.log(error);
  }
};
export const saveLikeArt = likeData => async dispatch => {
  try {
    const response = await axios.post(`${domain}/api/likes`, likeData);
    return dispatch(likeArt(response.data));
  } catch (error) {
    console.log(error);
  }
};

const likesReducer = (likesState = initialState, action) => {
  switch (action.type) {
    case DISLIKE_ART:
      return {
        ...likesState,
        likeArt: action.likeArt,
      };
    case LIKE_ART:
      return {
        ...likesState,
        likeArt: action.likeArt,
      };
    default:
      return likesState;
  }
};

export default likesReducer;
