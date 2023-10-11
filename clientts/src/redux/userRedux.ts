import { createSlice } from "@reduxjs/toolkit";

interface StateVal {
  educator: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    _id: string | null;
  };
}

const initialState: StateVal = {
  educator: {
    firstName: null,
    lastName: null,
    email: null,
    _id: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.educator = action.payload;
    },
    logout: () => initialState,
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
