import axios from "axios";
import domain from "../domain.js";

const initialState = {
  user: {}
};

const LOGIN_ME = "LOGIN_ME";
const SIGN_UP_WITHOUT_GOOGLE = "SIGN_UP_WITHOUT_GOOGLE";

const loginWithoutGoogle = user => ({
  type: LOGIN_ME,
  user: user
});

const signUpWithoutGoogle = user => ({
  type: SIGN_UP_WITHOUT_GOOGLE,
  user: user
});

export const login = formData => async dispatch => {
  try {
    const res = await axios.put(`${domain}/api/user/login`, formData);
    const user = res.data;
    dispatch(loginWithoutGoogle(user));
  } catch (error) {
    console.log('do we get error?',error);
    dispatch(loginWithoutGoogle(error));
  }
};

export const signup = formData => async dispatch => {
  try {
    const res = await axios.post(`${domain}/api/user/signup`, formData);
    const user = res.data;
    console.log(user);
    dispatch(signUpWithoutGoogle(user));
  } catch (error) {
    console.log(error);
  }
};

const userReducer = (userState = initialState, action) => {
  switch (action.type) {
    case LOGIN_ME:
      return {
        ...userState,
        user: action.user
      };
    case SIGN_UP_WITHOUT_GOOGLE:
      return {
        ...userState,
        user: action.user
      };

    default:
      return userState;
  }
};

export default userReducer;
