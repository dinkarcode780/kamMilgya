// // authSlice.js
// import { loginMultiRole } from './multiRole';
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   recruiter: JSON.parse(localStorage.getItem("recruiter")) || null,
//   token: localStorage.getItem("token") || null,
//   role: localStorage.getItem("role") || null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearAuth: (state) => {
//       state.user = null;
//       state.recruiter = null;
//       state.token = null;
//       state.role = null;
//       localStorage.removeItem("user");
//       localStorage.removeItem("recruiter");
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       // MULTI-ROLE LOGIN
//       .addCase(loginMultiRole.fulfilled, (state, action) => {
//         const { user, token, role } = action.payload;

//         if (role === 'recruiter') {
//           state.recruiter = user;
//           localStorage.setItem("recruiter", JSON.stringify(user));
//         } else {
//           state.user = user;
//           localStorage.setItem("user", JSON.stringify(user));
//         }

//         state.token = token;
//         state.role = role;
//         localStorage.setItem("token", token);
//         localStorage.setItem("role", role);
//         state.error = null;
//       })

//       .addCase(loginMultiRole.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });


// export const { clearAuth } = authSlice.actions;
// export default authSlice.reducer;
