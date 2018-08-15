import axios from "axios";

const initialState = {
  user: {}
};

const LOGIN_ME = "LOGIN_ME";

const loginWithoutGoogle = user => ({
  type: LOGIN_ME,
  user
});

export const getMe = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    const user = res.data;
    dispatch(gotMe(user));
  } catch (error) {
    console.log(error);
  }
};

export const login = formData => async dispatch => {
  try {
    const res = await axios.get("http://172.16.23.84:8080/api/user/login", formData);
    // const currentUser = res.da
    dispatch(loginWithoutGoogle(res));
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
    default:
      return userState;
  }
};

export default userReducer;
