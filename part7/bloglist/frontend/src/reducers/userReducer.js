import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const stored = window.localStorage.getItem("loggedBlogappUser");

const initialUser = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON);
    blogService.setToken(loggedUser.token);
    return loggedUser;
  } else {
    return null;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser(),
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
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(clear(user));
    blogService.setToken(null);
  };
};

export default userSlice.reducer;
