import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNofitication(state, action) {
      state = action.payload
      return state
    },
    clear() {
      return "" 
    }
  }
})

export const { setNofitication, clear } = notificationSlice.actions

export function notify(content, timeout) {
  return dispatch => {
    dispatch(setNofitication(content));
    setTimeout(() => dispatch(clear()), timeout)
  }

}

export default notificationSlice.reducer
