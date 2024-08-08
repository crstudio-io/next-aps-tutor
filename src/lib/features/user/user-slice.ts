import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  signedIn: false,
  status: "idle",
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
      if (!jwt) rejectWithValue("");
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
        state.status = "pending";
      },
      fulfilled: (state, action) => {
        state.email = action.payload;
        state.signedIn = true;
        state.status = "idle";
      },
      rejected: (state) => {
        state.email = "";
        state.signedIn = false;
        state.status = "idle";
        localStorage.removeItem("jwt");
      }
    }),
  }),
  selectors: {
    selectUserEmail: (userInfo) => userInfo.email,
    selectSignedIn: (userInfo) => userInfo.signedIn,
  },
});

export const {fetchUserInfo, signOut} = userSlice.actions;
export const {selectUserEmail, selectSignedIn} = userSlice.selectors;
