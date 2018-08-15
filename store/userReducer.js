import axios from "axios";

const initialState = {
  user: {}
};

const GOT_ME = "G0T_ME";

const gotMe = user => ({
  type: G0T_ME,
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
    const res = await axios.put("/auth/login", formData);
    dispatch(gotMe(user));
  } catch (error) {
    console.log(error);
  }
};

const userReducer = (userState = initialState, action) => {
  switch (action.type) {
    case GOT_ME:
      return {
        ...userState,
        user: action.user
      };
    default:
      return userState;
  }
};

export default userReducer;
