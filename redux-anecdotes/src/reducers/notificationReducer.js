import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notify(state, action) {
      state = `you voted '${action.payload}'`
      return state
    },
    clear() {
      return "" 
    }
  }
})

export const { notify, clear } = notificationSlice.actions
export default notificationSlice.reducer
