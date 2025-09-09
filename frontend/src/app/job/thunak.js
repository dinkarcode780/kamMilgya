// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../config/axios';  // Your axios instance

// const API_URL = '/api/job';

// // // ✅ Get all jobs
// export const fetchAllJobs = createAsyncThunk(
//   'jobs/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get(`${API_URL}/`);
//       console.log(response);

//     //   console.log(response , "thunk");

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// // // ✅ Get job by ID
// // export const fetchJobById = createAsyncThunk(
// //   'jobs/fetchById',
// //   async (id, thunkAPI) => {
// //     try {
// //       const response = await axios.get(`${API_URL}/${id}`);
// //       return response.data;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// // ✅ Get jobs by category
// // export const fetchJobsByCategory = createAsyncThunk(
// //   'jobs/fetchByCategory',
// //   async (categoryId, thunkAPI) => {
// //     try {
// //       const response = await axios.get(`${API_URL}/category/${categoryId}`);
// //       console.log( "fetch job", response );

// //       return response.data;

// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response.data);
// //     }
// //   }
// // );


// export const fetchJobsByCategory = createAsyncThunk(
//   'jobs/fetchByCategory',
//   async (categoryName, thunkAPI) => {
//     try {
//       const response = await axios.get(`${API_URL}/category/${categoryName}/jobs`);
//       console.log("fetch job", response);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );



// // // ✅ Get jobs by subcategory
// // export const fetchJobsBySubcategory = createAsyncThunk(
// //   'jobs/fetchBySubcategory',
// //   async (subcategoryId, thunkAPI) => {
// //     try {
// //       const response = await axios.get(`${API_URL}/subcategory/${subcategoryId}`);
// //       return response.data;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// // // ✅ Create new job
// // export const createJob = createAsyncThunk(
// //   'jobs/create',
// //   async (jobData, thunkAPI) => {
// //     try {
// //       const response = await axios.post(`${API_URL}/`, jobData);
// //       console.log(response, "create job");

// //       return response.data;
// //     } catch (error) {
// // return thunkAPI.rejectWithValue(
// //   error.response?.data || { message: error.message || 'Kuch galat ho gaya' }
// // );
// //     }
// //   }
// // );

// // ✅ Update job
// export const updateJob = createAsyncThunk(
//   'jobs/update',
//   async ({ id, jobData }, thunkAPI) => {
//     try {
//       const response = await axios.put(`${API_URL}/${id}`, jobData);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// // ✅ Delete job
// export const deleteJob = createAsyncThunk(
//   'jobs/delete',
//   async (id, thunkAPI) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// // export const applyToJob = createAsyncThunk(
// //   'jobs/applyToJob',
// //   async (jobId, thunkAPI) => {
// //     try {
// //       const response = await axios.post(`${API_URL}/${jobId}/apply`);
// //       return response.data;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response.data);
// //     }
// //   }
// // );


// // export const fetchApplications = createAsyncThunk(
// //   "applications/fetchAll",
// //   async (_, thunkAPI) => {
// //     try {
// //       const res = await axios.get("/api/myjobs/applications"); // 👈 api prefix
// //       return res.data.data;
// //       console.log(res.data ,"applictions");

// //        // backend success:true,data:{} format है
// //     } catch (err) {
// //       return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
// //     }
// //   }
// // );





// // import { createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from '../../../'; // Tumhara axios base instance


// // 1. Get All Jobs
// export const fetchJobs = createAsyncThunk("jobs/fetchAll", async (_, thunkAPI) => {
//   try {
//     const { data } = await axios.get("/api/job");
//     console.log(data, "alljobs");

//     return data;

//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data);
//   }
// });

// // 2. Get My Posted Jobs (Recruiter)
// export const fetchMyPostedJobs = createAsyncThunk("jobs/fetchMyPosted", async (_, thunkAPI) => {
//   try {
//     const { data } = await axios.get("/api/job/posted");
//     return data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data);
//   }
// });

// // 3. Save Job (User)
// export const saveJob = createAsyncThunk("jobs/saveJob", async (jobId, thunkAPI) => {
//   try {
//     const { data } = await axios.post(`/api/job/${jobId}/save`);
//     return data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data);
//   }
// });

// // 4. Unsave Job (User)
// export const unsaveJob = createAsyncThunk("jobs/unsaveJob", async (jobId, thunkAPI) => {
//   try {
//     const { data } = await axios.delete(`/api/job/${jobId}/save`);
//     return data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data);
//   }
// });

// // 5. Apply Job
// export const applyJob = createAsyncThunk("jobs/apply", async (jobId, thunkAPI) => {
//   try {
//     const { data } = await axios.post(`/api/job/${jobId}/apply`);
//     console.log(data, "apply job");

//     return data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data);
//   }
// });

// // 6. Get Saved Jobs  
// export const fetchSavedJobs = createAsyncThunk("jobs/fetchSaved", async (_, thunkAPI) => {
//   try {
//     const { data } = await axios.get(`/api/job/saved`);
//     return data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data);
//   }
// });

// // 7. Get Applied Jobs
// export const fetchAppliedJobs = createAsyncThunk("jobs/fetchApplied", async (_, thunkAPI) => {
//   try {
//     const { data } = await axios.get(`/api/job/applied`);
//     return data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data);
//   }
// });
// // app/application/thunks.js

// // export const fetchApplicationsByJobId = createAsyncThunk(
// //   'applications/fetchByJobId',
// //   async (jobId, thunkAPI) => {
// //     console.log(jobId , "id check karna");

// //     try {
// //       const response = await axios.get(`/api/job/${jobId}/applications`);
// //       console.log(response.data, "applications by job id");

// //       return response.data;

// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(
// //         error.response?.data?.error || "Failed to fetch applications"
// //       );
// //     }
// //   }
// // );

// export const fetchApplicationsByJobId = createAsyncThunk(
//   'applications/fetchByJobId',
//   async (jobId, thunkAPI) => {
//     console.log(jobId, 'id check karna');
//     try {
//       const state = thunkAPI.getState();
//       const token = state.auth?.token; // assuming token is stored here

//       const { data } = await axios.get(`/api/job/${jobId}/applications`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log(data, 'applications by job id');
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.error || 'Failed to fetch applications'
//       );
//     }
//   }
// );
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const API_URL = '/api/job';

// ✅ Get all jobs
// export const fetchJobs = createAsyncThunk("jobs/fetchAll", async (_, thunkAPI) => {
//   try {
//     const { data } = await axios.get(`${API_URL}`);
//     return data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data || "Something went wrong");
//   }
// });


// ✅ Apply to a job
export const fetchJobs = createAsyncThunk("jobs/fetchAll", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${API_URL}`);
     console.log("API Response =>", data);
    return data.data; // ✅ data must be an array
  } catch (err) {
        console.log("API Error =>", err.response?.data || err.message);
    return thunkAPI.rejectWithValue(err.response?.data || "Something went wrong");
  }
});



export const fetchAllJobsAdmin = createAsyncThunk(
  "jobs/fetchAllAdmin",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/all`);
      // If backend sends { success, message, data }
      return data.data; // <-- array of jobs
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch all jobs");
    }
  }
);



// ✅ Get job by ID
// export const fetchJobById = createAsyncThunk("jobs/fetchById", async (id, thunkAPI) => {
//   try {
//     const { data } = await axios.get(`${API_URL}/${id}`);
//     return data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch job");
//   }
// });

export const fetchJobById = createAsyncThunk(
  "jobs/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/getJobById/${id}`); // ✅ yaha route fix
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch job");
    }
  }
);


// ✅ Get jobs by category
export const fetchJobsByCategory = createAsyncThunk("jobs/fetchByCategory", async (categoryName, thunkAPI) => {
  try {
    const { data } = await axios.get(`${API_URL}/category/${categoryName}/jobs`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch jobs by category");
  }
});

// ✅ Get posted jobs by recruiter
export const fetchMyPostedJobs = createAsyncThunk("jobs/fetchMyPosted", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${API_URL}/posted`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch posted jobs");
  }
});

// ✅ Save job (user)
export const saveJob = createAsyncThunk("jobs/saveJob", async (jobId, thunkAPI) => {
  try {
    const { data } = await axios.post(`${API_URL}/${jobId}/save`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to save job");
  }
});

// ✅ Unsave job (user)
export const unsaveJob = createAsyncThunk("jobs/unsaveJob", async (jobId, thunkAPI) => {
  try {
    const { data } = await axios.delete(`${API_URL}/${jobId}/save`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to unsave job");
  }
});

// ✅ Apply for job
export const applyJob = createAsyncThunk("jobs/apply", async (jobId, thunkAPI) => {
  try {
    const { data } = await axios.post(`${API_URL}/${jobId}/apply`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to apply to job");
  }
});

// ✅ Get saved jobs (user)
export const fetchSavedJobs = createAsyncThunk("jobs/fetchSaved", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${API_URL}/saved`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch saved jobs");
  }
});

// ✅ Get applied jobs (user)
export const fetchAppliedJobs = createAsyncThunk("jobs/fetchApplied", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${API_URL}/applied`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch applied jobs");
  }
});

// ✅ Create a new job (recruiter)
export const createJob = createAsyncThunk("jobs/create", async (jobData, thunkAPI) => {
  try {
    const { data } = await axios.post(`${API_URL}`, jobData);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to create job");
  }
});

// ✅ Update job (recruiter)
export const updateJob = createAsyncThunk("jobs/update", async ({ id, jobData }, thunkAPI) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, jobData);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to update job");
  }
});

// ✅ Delete job (recruiter)
export const deleteJob = createAsyncThunk("jobs/delete", async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Failed to delete job");
  }
});

// ✅ Fetch applications by Job ID (recruiter)
// export const fetchApplicationsByJobId = createAsyncThunk(
//   'applications/fetchByJobId',
//   async (jobId, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       const token = state.auth?.token;

//       const {data} = await axios.get(`${API_URL}/${jobId}/applications`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(data, "data sb")
//       return data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to fetch applications");
//     }
//   }
// );


// export const fetchApplicationsByJobId = createAsyncThunk(
//   'applications/fetchByJobId',
//   async (jobId, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       const token = state.auth?.token;

//       const { data } = await axios.get(`${API_URL}/${jobId}/applications`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log(data, 'applications by job id');

//       // FIX: return only the array
//       return data.applications || [];
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.error || "Failed to fetch applications"
//       );
//     }
//   }
// );


export const fetchApplicationsByJobId = createAsyncThunk(
  "applications/fetchByJobId",
  async (jobId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.token;

      const { data } = await axios.get(`${API_URL}/${jobId}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Applications API response:", data);

      // FIX ✅ – backend returns array directly
      return Array.isArray(data) ? data : data.applications || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch applications"
      );
    }
  }
);


export const fetchJobByIdd = createAsyncThunk(
  "jobs/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/getJobById/${id}`);
      return data.data; // <-- note: your backend sends { success, message, data }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch job");
    }
  }
);






