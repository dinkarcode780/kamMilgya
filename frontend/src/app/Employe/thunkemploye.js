import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axios";

const API_URL = 'api/auth';

// ✅ Login
export const employeLogin = createAsyncThunk(
  'employe/login',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login/recruiter`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);



// ✅ Register
// export const employeRegister = createAsyncThunk(
//   'employe/register',
//   async (data, thunkAPI) => {
//     try {
//       const response = await axios.post(`${API_URL}/register/recruiter`, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log("employe thunk", response);
//       return response.data;
      
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

export const employeRegister = createAsyncThunk(
  'employe/register',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register/recruiter`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);


// ✅ Send OTP
export const employeSendOtp = createAsyncThunk(
  'employe/sendOtp',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/send-otp`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// ✅ Reset Password using OTP
export const employeResetPassword = createAsyncThunk(
  'employe/resetPassword',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);




// Update recruiter profile
// export const updateRecruiterProfile = createAsyncThunk(
//   "auth/updateRecruiterProfile",
//   async ({ recruiterId, payload }, { rejectWithValue }) => {
//     try {
//       // Using query param for recruiterId as per your backend
//       const response = await axios.put(
//   `/api/recruiter?recruiterId=${recruiterId}`,
//   payload,
//   {
//     headers: { "Content-Type": "multipart/form-data" },
//   }
// );
//       return response.data; 
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.error || err.message);
//     }
//   }
// );

export const updateRecruiterProfile = createAsyncThunk(
  "auth/updateRecruiterProfile",
  async ({ recruiterId, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/recruiter?recruiterId=${recruiterId}`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Important for file
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

