

// import { createSlice } from "@reduxjs/toolkit";
// import {
//   loginUser,
//   loginRecruiter,
//   fetchCurrentUser,
//   fetchCurrentRecruiter,
//   logoutUser,
//   loginWithPhone
// } from "./authThunks";

// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   recruiter: JSON.parse(localStorage.getItem("recruiter")) || null,
//   token: localStorage.getItem("token") || null,
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

//       localStorage.removeItem("user");
//       localStorage.removeItem("recruiter");
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // USER LOGIN
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem("user", JSON.stringify(action.payload.user));
//         localStorage.setItem("token", action.payload.token);
//         state.error = null;
//       })

//       // RECRUITER LOGIN
//       .addCase(loginRecruiter.fulfilled, (state, action) => {
//         state.recruiter = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem("recruiter", JSON.stringify(action.payload.user));
//         localStorage.setItem("token", action.payload.token);
//         state.error = null;
//       })

//       // PHONE LOGIN (optional)
//       .addCase(loginWithPhone.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem("user", JSON.stringify(action.payload.user));
//         localStorage.setItem("token", action.payload.token);
//         state.error = null;
//       })

//       // LOGOUT
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.recruiter = null;
//         state.token = null;
//         localStorage.removeItem("user");
//         localStorage.removeItem("recruiter");
//         localStorage.removeItem("token");
//         state.error = null;
//       })

//       // FETCH CURRENT USER
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         localStorage.setItem("user", JSON.stringify(action.payload));
//       })

//       // FETCH CURRENT RECRUITER
//       .addCase(fetchCurrentRecruiter.fulfilled, (state, action) => {
//         state.recruiter = action.payload;
//         localStorage.setItem("recruiter", JSON.stringify(action.payload));
//       });
      
//   },
// });

// export const { clearAuth } = authSlice.actions;
// export default authSlice.reducer;



//=========new code=========

import { createSlice } from "@reduxjs/toolkit";

// import {
//   loginUser,
//   loginRecruiter,
//   // fetchCurrentUser,
//   // fetchCurrentRecruiter,
//   logoutUser,
//   loginWithPhone
// } from "./authThunks";

import {
  loginUser,
  loginRecruiter,
  // fetchCurrentUser,
  fetchCurrentRecruiter,
  logoutUser,
  loginWithPhone,
  registerUser,
  registerRecruiter
} from "../../app/auth/authThunks";

// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   recruiter: JSON.parse(localStorage.getItem("recruiter")) || null,
//   token: localStorage.getItem("token") || null,
//   loading: false,
//   error: null,

// };



const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  recruiter: JSON.parse(localStorage.getItem("recruiter")) || null,
  token: localStorage.getItem("token") || null,
  jobsApplied: JSON.parse(localStorage.getItem("jobsApplied")) || [],
  savedJobs: JSON.parse(localStorage.getItem("savedJobs")) || [],
  loading: false,
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.recruiter = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("recruiter");
      localStorage.removeItem("token");
      localStorage.removeItem("jobsApplied");
      localStorage.removeItem("savedJobs");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔵 USER LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
          state.jobsApplied = action.payload.user.jobsApplied || [];
        state.savedJobs = action.payload.user.savedJobs || [];
        
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("jobsApplied", JSON.stringify(state.jobsApplied));
        localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // 🟢 RECRUITER LOGIN
      .addCase(loginRecruiter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginRecruiter.fulfilled, (state, action) => {
        state.loading = false;
        state.recruiter = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("recruiter", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        state.error = null;
      })
      .addCase(loginRecruiter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // 📱 PHONE LOGIN
      .addCase(loginWithPhone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithPhone.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

         state.jobsApplied = action.payload.user.jobsApplied || [];
  state.savedJobs = action.payload.user.savedJobs || [];

   localStorage.setItem("jobsApplied", JSON.stringify(state.jobsApplied));
  localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        state.error = null;
      })
      .addCase(loginWithPhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })



      // 🚪 LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.recruiter = null;
        state.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("recruiter");
        localStorage.removeItem("token");
        state.error = null;
        state.loading = false;
      })


      //  add code register

      .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user; // ✅ user set ho jaye
      state.token = action.payload.token;
      state.jobsApplied = action.payload.user.jobsApplied || [];
      state.savedJobs = action.payload.user.savedJobs || [];

      // localStorage update
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("jobsApplied", JSON.stringify(state.jobsApplied));
      localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
      state.error = null;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.error?.message || "Registration failed";
    }) 
    // 🔵 Recruiter Registration
  .addCase(registerRecruiter.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(registerRecruiter.fulfilled, (state, action) => {
    state.loading = false;
    state.recruiter = action.payload.user; // 👈 recruiter set ho raha hai
    state.token = action.payload.token;

    localStorage.setItem("recruiter", JSON.stringify(action.payload.user));
    localStorage.setItem("token", action.payload.token);
    state.error = null;
  })
  .addCase(registerRecruiter.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error.message;
  })


  
  .addCase(fetchCurrentRecruiter.pending, (state) => {
  state.loading = true;
  state.error = null; // clear previous errors
})
.addCase(fetchCurrentRecruiter.fulfilled, (state, action) => {
  state.loading = false;
  state.recruiter = action.payload;
  localStorage.setItem("recruiter", JSON.stringify(action.payload));
})
.addCase(fetchCurrentRecruiter.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || "Failed to fetch recruiter";
});
  

      

      // 👤 FETCH CURRENT USER
      // .addCase(fetchCurrentUser.fulfilled, (state, action) => {
      //   state.user = action.payload;
      //   localStorage.setItem("user", JSON.stringify(action.payload));
      // })

      // // 👤 FETCH CURRENT RECRUITER
      // .addCase(fetchCurrentRecruiter.fulfilled, (state, action) => {
      //   state.recruiter = action.payload;
      //   localStorage.setItem("recruiter", JSON.stringify(action.payload));
      // });
  },
});

export const { clearAuth,setUser } = authSlice.actions;
export default authSlice.reducer;






// import { createSlice } from "@reduxjs/toolkit";
// import {
//   loginUser,
//   loginRecruiter,
//   fetchCurrentRecruiter,
//   logoutUser,
//   loginWithPhone,
//   registerUser,
//   registerRecruiter,
// } from "../../app/auth/authThunks";

// const initialState = {
//   user: null,
//   recruiter: null,
//   token: null,
//   jobsApplied: [],
//   savedJobs: [],
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
//       state.jobsApplied = [];
//       state.savedJobs = [];
//       state.error = null;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // 🔵 USER LOGIN
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.jobsApplied = action.payload.user.jobsApplied || [];
//         state.savedJobs = action.payload.user.savedJobs || [];
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })

//       // 🟢 RECRUITER LOGIN
//       .addCase(loginRecruiter.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginRecruiter.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recruiter = action.payload.user;
//         state.token = action.payload.token;
//         state.error = null;
//       })
//       .addCase(loginRecruiter.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })

//       // 📱 PHONE LOGIN
//       .addCase(loginWithPhone.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginWithPhone.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.jobsApplied = action.payload.user.jobsApplied || [];
//         state.savedJobs = action.payload.user.savedJobs || [];
//         state.error = null;
//       })
//       .addCase(loginWithPhone.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })

//       // 🚪 LOGOUT
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null;
//         state.recruiter = null;
//         state.token = null;
//         state.jobsApplied = [];
//         state.savedJobs = [];
//         state.error = null;
//         state.loading = false;
//       })

//       // 👤 USER REGISTRATION
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.jobsApplied = action.payload.user.jobsApplied || [];
//         state.savedJobs = action.payload.user.savedJobs || [];
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })

//       // 🔵 RECRUITER REGISTRATION
//       .addCase(registerRecruiter.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerRecruiter.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recruiter = action.payload.user;
//         state.token = action.payload.token;
//         state.error = null;
//       })
//       .addCase(registerRecruiter.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })

//       // 🔄 FETCH CURRENT RECRUITER
//       .addCase(fetchCurrentRecruiter.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCurrentRecruiter.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recruiter = action.payload;
//       })
//       .addCase(fetchCurrentRecruiter.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch recruiter";
//       });
//   },
// });

// export const { clearAuth, setUser } = authSlice.actions;
// export default authSlice.reducer;
