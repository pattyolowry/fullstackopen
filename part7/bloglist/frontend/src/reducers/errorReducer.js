import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: null,
  reducers: {
    addError(state, action) {
      return action.payload;
    },
    removeError() {
      return null;
    },
  },
});

const { addError, removeError } = errorSlice.actions;

export const setError = (text, duration = 5) => {
  return (dispatch) => {
    dispatch(addError(text));
    setTimeout(() => {
      dispatch(removeError());
    }, duration * 1000);
  };
};

export default errorSlice.reducer;
