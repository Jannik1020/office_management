import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: {id: "",username: "", firstName: "", lastName: "", organisation: ""},
    status: "",
    signedIn: false
}

export const loginUser = createAsyncThunk("users/login", async (username) => {
    return await axios.post("http://localhost:8080/api/user/login", {
        username: username
    }).then((res) => {
        return res.data.user;
    }).catch((err) => {
        console.log("Failed logging in")
        console.log(err)
    })
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const user = action.payload

                state.status = "idle"

                if(user) {
                    state.user = user;
                    state.signedIn = true;
                }
            })
    }
});

export const selectUser = (state) => {return {...state.user.user, signedIn: state.user.signedIn}};
export default userSlice.reducer;

