import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../config/axios"

export const updateUserProfile = createAsyncThunk(
  "users/updateUser",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/user/${userId}`, payload,{
         headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data, "updatedUserData");
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const updateUserProfile = createAsyncThunk(
//   "users/updateUser",
//   async ({ userId, payload }, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(`/api/user/${userId}`, payload);
//     // const res = await axios.put(`http://localhost:5000/api/user/${userId}`, payload);

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );