import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  name: null,
  email: null,
  password: null,
  is_teacher: false,
  is_blocked_chat: false,
  id: null,
};

export const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    set: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    logout: () => ({...initialState}),
  },
});

export const actions = authSlice.actions;

export default authSlice.reducer;
