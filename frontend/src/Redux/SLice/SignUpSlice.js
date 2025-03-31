import { createSlice } from "@reduxjs/toolkit";

const signUpSlice =  createSlice({
  name: "signUpData",
  initialState: {
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
  },
  reducers: {
    setName: (state, action) => {
      state.Name = action.payload;
    },
    setEmail: (state, action) => {
      state.Email = action.payload;
    },
    setPhone: (state, action) => {
      state.Phone = action.payload;
    },
    setPassword: (state, action) => {
      state.Password = action.payload;
    },
  },
}); 

export const { setName, setEmail, setPassword, setPhone } = signUpSlice.actions;
export default signUpSlice.reducer;
