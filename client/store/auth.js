import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
 export const updateProfile = (username, firstName, lastName, email, address) => async dispatch => {
  const token = window.localStorage.getItem("token")
  const res = await axios.put('/auth/me', {username, firstName, lastName, email, address}, {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }


export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method, email) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password, email });
      window.localStorage.setItem("token", res.data.token);
      console.log(window.localStorage.getItem("token"))
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem("token");
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};


/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
