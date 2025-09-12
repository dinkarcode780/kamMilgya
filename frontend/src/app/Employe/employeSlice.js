import { createSlice } from "@reduxjs/toolkit";   
import { employeLogin, employeRegister, employeSendOtp, employeResetPassword, updateRecruiterProfile} from "./thunkemploye";
const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    user: null,
     token: null, 
     recruiter: null, // Ensure this is used consistently
    updatedRecruiter: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("recruiter");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(employeLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(employeLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(employeLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
       builder
      .addCase(employeRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(employeRegister.fulfilled, (state, action) => {
  state.isLoading = false;
  state.user = action.payload.user;   // ✅ only user object
  state.token = action.payload.token; // ✅ token
  localStorage.setItem("recruiter", JSON.stringify(action.payload.user));
  localStorage.setItem("token", action.payload.token);
  state.error = null;
})
.addCase(employeRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        //  state.error = action.payload?.message || action.payload || "Registration failed";
      })



  .addCase(updateRecruiterProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRecruiterProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.updatedRecruiter = action.payload;
        state.recruiter = action.payload; // update main recruiter state
        state.updatedRecruiter = null; // Clear updatedRecruiter
        localStorage.setItem("recruiter", JSON.stringify(action.payload));
      })
      .addCase(updateRecruiterProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Update failed";
      });

        builder
      .addCase(employeSendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(employeSendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(employeSendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      builder
      .addCase(employeResetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(employeResetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(employeResetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      
      

    // Same pattern for Register, Send OTP, Reset Password
  },
});


export const { logout } = employeeSlice.actions;
export default employeeSlice.reducer;