import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'userState',
  initialState: {
    email: "",
    xtoken: ""
  },
  reducers: {
    setUserData: (state, action) => {
      state.email = action.payload.email;
      state.xtoken = action.payload.xtoken;
    },   
  },
})
export default userSlice.reducer;
export const {
    setUserData,
  } = userSlice.actions
export const getUserEmail = (state) => state.userState.email;
export const getUserToken = (state) => state.userState.xtoken;
export const getUserData = (state) => state.userState;