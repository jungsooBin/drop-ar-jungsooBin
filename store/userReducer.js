import axios from 'axios';

const initialState = {
  user: {},
};

const LOGIN_ME = 'LOGIN_ME';

const loginWithoutGoogle = user => ({
  type: LOGIN_ME,
  user: user,
});

export const login = formData => async dispatch => {
  try {
    const res = await axios.put(
      'http://172.16.21.129:8080/api/user/login',
      formData
    );
    const user = res.data;
    dispatch(loginWithoutGoogle(user));
  } catch (error) {
    console.log(error);
  }
};

const userReducer = (userState = initialState, action) => {
  switch (action.type) {
    case LOGIN_ME:
      return {
        ...userState,
        user: action.user,
      };
    default:
      return userState;
  }
};

export default userReducer;
