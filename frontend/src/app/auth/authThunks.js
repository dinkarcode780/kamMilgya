// features/auth/authThunks.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';

// 1. Register User (with resume)
// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post('/api/auth/register/user', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       console.log("heyy",res)
//       return res.data;

      
//     } catch (err) {
//       return rejectWithValue(err.response?.data || 'Error registering user');
//     }
//   }
// );


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/register/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      // ✅ Send proper error payload
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ message: err.message });
    }
  }
);

// 2. Register Recruiter (with logo)
export const registerRecruiter = createAsyncThunk(
  'auth/registerRecruiter',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/auth/register/recruiter', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error registering recruiter');
    }
  }
);

// 3. Login User
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const res = await axios.post('/api/auth/login/user', credentials);
//       return {
//         token: res.data.token,
//         user: res.data.user,
//       };
//     } catch (err) {
//       return rejectWithValue(err.response?.data || 'Login failed');
//     }
//   }
// );


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/auth/login/user', credentials, { withCredentials: true });

      // yaha localStorage me save karo
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return {
        token: res.data.token,
        user: res.data.user,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);



// 4. Login Recruiter
export const loginRecruiter = createAsyncThunk(
  'auth/loginRecruiter',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/auth/login/recruiter', credentials);
      return {
        token: res.data.token,
        user: res.data.user,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

// 5. Login with Phone
export const loginWithPhone = createAsyncThunk(
  'auth/loginWithPhone',
  async (phoneData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/auth/loginphone', phoneData);
      return {
        token: res.data.token,
        user: res.data.user,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Phone login failed');
    }
  }
);

// 6. Logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/auth/logout');
      // Clear local storage if needed
      localStorage.removeItem('user');
      localStorage.removeItem('recruiter');
      localStorage.removeItem('admin');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Logout failed');
    }
  }
);

// 7. Fetch Current User
// export const fetchCurrentUser = createAsyncThunk(
//   'auth/fetchCurrentUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get('/api/auth/me', { withCredentials: true });
//       return res.data.user;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.error || "Unable to fetch user");
//     }
//   }
// );

// 8. Fetch Current Recruiter
// export const fetchCurrentRecruiter = createAsyncThunk(
//   'auth/fetchCurrentRecruiter',
//   async (_, { rejectWithValue }) => {
//     console.log("this is called");
    
//     try {
//       const res = await axios.get('/api/auth/ME', { withCredentials: true });
//       console.log( res ,"thunk error");
//       return res.data.user;
      
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.error || 'Unable to fetch recruiter');
//     }
//   }
// );



// iss code ko use kiya hai api me v update kiye hai thunk me bhi dono ko update kiye hai (cuurent Recurter)
// thunks.js
export const fetchCurrentRecruiter = createAsyncThunk(
  "auth/fetchCurrentRecruiter",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/auth/recruiter/me", { withCredentials: true });
      
      // ✅ recruiter ko return karo
      if (res.data?.recruiter) {
        return res.data.recruiter;
      }

      return rejectWithValue(res.data?.error || "Recruiter not found");
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Unable to fetch recruiter");
    }
  }
);


