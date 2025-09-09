import { createSlice } from "@reduxjs/toolkit";
import {  updateUserProfile } from "../user/userThunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    updateStatus: "idle", // idle | loading | succeeded | failed
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.updateStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // 📦 Fetch User
    // builder
    //   .addCase(fetchUser.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchUser.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.user = action.payload;
    //   })
    //   .addCase(fetchUser.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });

    // ✏️ Update User
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.user = action.payload; 
        // state.user = action.payload.user;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
