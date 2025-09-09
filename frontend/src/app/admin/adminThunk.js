// features/admin/adminThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';




// 👤 Fetch Users Thunk
export const fetchAdminUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/admin/users', {

      });
      console.log(res , "userData");
      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// //  Update User by Admin Thunk
// export const updateUserByAdmin = createAsyncThunk(
//   "admin/updateUser",
//   async ({ userId, payload }, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(`/api/admin/users/${userId}`, payload);
//       console.log(res.data, "updatedUserData");
//       return res.data; // updated user object return hoga
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );


export const updateUserByAdmin = createAsyncThunk(
  "admin/updateUser",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/user/${userId}`, payload);
      console.log(res.data, "updatedUserData");
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// delte user by admin

export const deleteUserByAdmin = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/user/deleteUserByAdmin`, {
        params: { userId },   // query param send kar rahe hai
      });
      return { userId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);




// 🧑‍💼 Fetch Recruiters Thunk
export const fetchAdminRecruiters = createAsyncThunk(
  'admin/fetchRecruiters',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/admin/recruiters', {
      
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



export const updateAdminRecruiter = createAsyncThunk(
  "admin/updateRecruiter",
  async ({ recruiterId, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/recruiter?recruiterId=${recruiterId}`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Update failed");
    }
  }
);




export const deleteAdminRecruiter = createAsyncThunk(
  "admin/deleteRecruiter",
  async (recruiterId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `/api/recruiter/deleteRecruiterProfile?recruiterId=${recruiterId}`
      );
      return { recruiterId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Delete failed");
    }
  }
);
