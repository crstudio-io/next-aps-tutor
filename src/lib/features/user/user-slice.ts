import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  signedIn: false,
  fetching: false,
};

export const createAppSlice = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator},
});


export const userSlice = createAppSlice({
  name: "user-info",
  initialState,
  reducers: (create) => ({
    signOut: create.reducer((state) => {
      localStorage.removeItem("jwt");
      state.email = "";
      state.signedIn = false;
    }),
    fetchUserInfo: create.asyncThunk(async (_, {rejectWithValue}) => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) return rejectWithValue("");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
      const response = await fetch("http://localhost:8080/auth/user-info", {
        headers
      });
      if (!response.ok) return rejectWithValue("");
      const json = await response.json();
      return json.email;
    }, {
      pending: (state) => {
        state.fetching = true;
      },
      fulfilled: (state, action) => {
        state.email = action.payload;
        state.signedIn = true;
        state.fetching = false;
      },
      rejected: (state) => {
        if (state.signedIn) {
          state.email = "";
          state.signedIn = false;
          state.fetching = false;
          localStorage.removeItem("jwt");
        }
      }
    }),
  }),
  selectors: {
    selectUserEmail: (userInfo) => userInfo.email,
    selectSignedIn: (userInfo) => userInfo.signedIn,
    selectFetching: (userInfo) => userInfo.fetching,
  },
});

export const {fetchUserInfo, signOut} = userSlice.actions;
export const {selectUserEmail, selectSignedIn, selectFetching} = userSlice.selectors;
