// features/admin/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchAdminUsers, fetchAdminRecruiters, updateAdminRecruiter, deleteAdminRecruiter, updateUserByAdmin, deleteUserByAdmin } from './adminThunk';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    recruiters: [],
      updateStatus: "idle",
      deleteStatus: "idle",
    loadingUsers: false,
    loadingRecruiters: false,
    errorUsers: null,
    errorRecruiters: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 📦 Users Handling
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loadingUsers = true;
        state.errorUsers = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.errorUsers = action.payload;
      });



      //  Update User by Admin
builder
  .addCase(updateUserByAdmin.pending, (state) => {
    state.updateStatus = "loading";
  })
  .addCase(updateUserByAdmin.fulfilled, (state, action) => {
    state.updateStatus = "succeeded";
    const index = state.users.findIndex(u => u._id === action.payload._id);
    if (index !== -1) state.users[index] = action.payload;
  })
  .addCase(updateUserByAdmin.rejected, (state, action) => {
    state.updateStatus = "failed";
    state.errorUsers = action.payload;
  });

// delete user by admin

  builder
  .addCase(deleteUserByAdmin.pending, (state) => {
    state.deleteStatus = "loading";
  })
  .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
    state.deleteStatus = "succeeded";
    state.users = state.users.filter(u => u._id !== action.payload.userId); // ✅ frontend से हटाना
  })
  .addCase(deleteUserByAdmin.rejected, (state, action) => {
    state.deleteStatus = "failed";
    state.errorUsers = action.payload;
  });


    // 📦 Recruiters Handling
    builder
      .addCase(fetchAdminRecruiters.pending, (state) => {
        state.loadingRecruiters = true;
        state.errorRecruiters = null;
      })
      .addCase(fetchAdminRecruiters.fulfilled, (state, action) => {
        state.loadingRecruiters = false;
        state.recruiters = action.payload;
      })
      .addCase(fetchAdminRecruiters.rejected, (state, action) => {
        state.loadingRecruiters = false;
        state.errorRecruiters = action.payload;
      });


      //  Update Recruiter
    builder
      .addCase(updateAdminRecruiter.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateAdminRecruiter.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.recruiters.findIndex(r => r._id === action.payload._id);
        if (index !== -1) state.recruiters[index] = action.payload;
      })
      .addCase(updateAdminRecruiter.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.errorRecruiters = action.payload;
      });


      //  Delete Recruiter
    builder
      .addCase(deleteAdminRecruiter.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteAdminRecruiter.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.recruiters = state.recruiters.filter(r => r._id !== action.payload.recruiterId);
      })
      .addCase(deleteAdminRecruiter.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.errorRecruiters = action.payload;
      });
  },
});

export default adminSlice.reducer;
