// import { createSlice } from '@reduxjs/toolkit';
// import {
//   fetchAllJobs,
//   fetchJobById,
//   fetchJobsByCategory,
//   fetchJobsBySubcategory,
//   createJob,
//   updateJob,
//   deleteJob,
//   applyToJob,
//   fetchApplications,
// } from './thunak';


// const jobSlice = createSlice({
//   name: 'jobs',
//   initialState: {
//     jobs: [],
//     job: null,
//     applications: [], // 👈 New state to store applications
//     loading: false,
//     error: null,
//     successMessage: null,
//   },
//   reducers: {
//     // 👇 Approve/Reject reducers (frontend only)
//     approveApplication(state, action) {
//       const app = state.applications.find((a) => a._id === action.payload);
//       if (app) app.status = "Approved";
//     },
//     rejectApplication(state, action) {
//       const app = state.applications.find((a) => a._id === action.payload);
//       if (app) app.status = "Rejected";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // ✅ Fetch all jobs
//       .addCase(fetchAllJobs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllJobs.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = action.payload;
//       })
//       .addCase(fetchAllJobs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Fetch job by ID
//       .addCase(fetchJobById.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchJobById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.job = action.payload;
//       })
//       .addCase(fetchJobById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Fetch jobs by category
//       .addCase(fetchJobsByCategory.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchJobsByCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = action.payload;
//       })
//       .addCase(fetchJobsByCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Fetch jobs by subcategory
//       .addCase(fetchJobsBySubcategory.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchJobsBySubcategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = action.payload;
//       })
//       .addCase(fetchJobsBySubcategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Create job
//       .addCase(createJob.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createJob.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs.push(action.payload);
//       })
//       .addCase(createJob.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Update job
//       .addCase(updateJob.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateJob.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = state.jobs.map((job) =>
//           job._id === action.payload._id ? action.payload : job
//         );
//       })
//       .addCase(updateJob.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Delete job
//       .addCase(deleteJob.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteJob.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = state.jobs.filter((job) => job._id !== action.payload);
//       })
//       .addCase(deleteJob.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Apply to job
//       .addCase(applyToJob.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(applyToJob.fulfilled, (state, action) => {
//         state.loading = false;
//         state.successMessage = action.payload.message || "Applied Successfully";
//       })
//       .addCase(applyToJob.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message || "Failed to apply";
//       })

//       // ✅ Fetch Applications
//       .addCase(fetchApplications.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchApplications.fulfilled, (state, action) => {
//         state.loading = false;
//         state.applications = action.payload;
//       })
//       .addCase(fetchApplications.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { approveApplication, rejectApplication } = jobSlice.actions;

// export default jobSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobs,
  fetchMyPostedJobs,
  saveJob,
  unsaveJob,
  fetchSavedJobs,
  fetchApplicationsByJobId,
  applyJob,
  fetchAppliedJobs,
  updateJob,
  deleteJob,
  fetchJobById,
  fetchAllJobsAdmin,
  
} from "./thunak"; // Make sure file name and path are correct

// ✅ Define initial state
const initialState = {
  allJobs: [],
  postedJobs: [],
  applicationsByJobId: [],
  savedJobs: [],
  appliedJobs: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearJobErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ✅ Fetch all jobs (User)
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
           console.log("Job fulfilled payload:", action.payload); // ✅ add this
        state.loading = false;

        state.allJobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })




      .addCase(fetchAllJobsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobsAdmin = action.payload;
        state.error = null;
      })
      .addCase(fetchAllJobsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch all jobs";
      })


      // ✅ Fetch posted jobs (Recruiter)
      .addCase(fetchMyPostedJobs.fulfilled, (state, action) => {
        state.postedJobs = action.payload;
      })

      // ✅ Save job (User)
      .addCase(saveJob.fulfilled, (state, action) => {
        state.savedJobs.push(action.payload);
      })

      // ✅ Unsave job (User)
      .addCase(unsaveJob.fulfilled, (state, action) => {
        state.savedJobs = state.savedJobs.filter(
          (job) => job._id !== action.payload.jobId
        );
      })

      // ✅ Fetch saved jobs (User)
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.savedJobs = action.payload;
      })

      // ✅ Apply job (User)
      .addCase(applyJob.fulfilled, (state, action) => {
        state.appliedJobs.push(action.payload);
      })

      // ✅ Fetch applied jobs (User)
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.appliedJobs = action.payload;
      })

      // ✅ Update job (Recruiter)
      .addCase(updateJob.fulfilled, (state, action) => {
        const updatedJob = action.payload;
        state.postedJobs = state.postedJobs.map((job) =>
          job._id === updatedJob._id ? updatedJob : job
        );
      })

      // ✅ Delete job (Recruiter)
      .addCase(deleteJob.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.postedJobs = state.postedJobs.filter((job) => job._id !== deletedId);
      })
 
 .addCase(fetchApplicationsByJobId.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchApplicationsByJobId.fulfilled, (state, action) => {
  state.loading = false;
  state.applicationsByJobId = action.payload; // ✅ FIXED
})
.addCase(fetchApplicationsByJobId.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})



.addCase(fetchJobById.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchJobById.fulfilled, (state, action) => {
  state.loading = false;
  state.jobDetails = action.payload; // ✅ store job separately
})
.addCase(fetchJobById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
;



  },
});

export const { clearJobErrors } = jobSlice.actions;
export default jobSlice.reducer;
