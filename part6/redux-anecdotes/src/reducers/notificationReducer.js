import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    }
  }
})

const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (text, duration) => {
  return (dispatch) => {
    dispatch(addNotification(text))
    setTimeout(() => {
        dispatch(removeNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer