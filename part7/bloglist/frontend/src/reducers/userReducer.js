import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear(state, action) {
      return null;
    },
  },
});

const { set, clear } = userSlice.actions;

export const setUser = (user) => {
  return (dispatch) => {
    blogService.setToken(user.token);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    dispatch(set(user));
  };
};

export const clearUser = (user) => {
  return (dispatch) => {
    dispatch(clear(user));
    blogService.setToken(null);
  };
};

export const initializeUser = () => {
  console.log("initializing user");
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(set(loggedUser));
    }
  };
};

export default userSlice.reducer;
