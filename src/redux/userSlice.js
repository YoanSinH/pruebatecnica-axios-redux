import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    username: '',
  };

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUsername(state, action) {
        state.username = action.payload;
      },
    },
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {...state,...action.payload.user};
      },
    },
  });

  export const { setUsername } = userSlice.actions;
export const selectUsername = (state) => state.user.username;

export default userSlice.reducer;
