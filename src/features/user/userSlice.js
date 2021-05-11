import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: { id: "", username: "", firstName: "", lastName: "", organisation: "" },
  status: "",
  signedIn: false,
};

export const loginUser = createAsyncThunk("users/login", async (username) => {
  const data = await fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Failed logging in");
      console.log(err);
    });
  return data.user;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload;

        state.status = "idle";

        if (user) {
          state.user = user;
          state.signedIn = true;
        }
      });
  },
});

export const selectUser = (state) => {
  return { ...state.user.user, signedIn: state.user.signedIn };
};
export default userSlice.reducer;
