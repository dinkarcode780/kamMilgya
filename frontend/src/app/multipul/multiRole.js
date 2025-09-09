// // authThunks.js
// import axios from '../../config/axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// export const loginMultiRole = createAsyncThunk(
//   'auth/loginMultiRole',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const res = await axios.post('/api/auth/login', credentials, { withCredentials: true });
//       return {
//         token: res.data.token,
//         user: res.data.user,
//         role: res.data.role,
//       };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || 'Multi-role login failed');
//     }
//   }
// );
