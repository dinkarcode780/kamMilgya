import Recruiter from "../models/Recruiter.js";
import User from "../models/User.js";
import Job from "../models/Jobs.js";
import Application from "../models/Application.js";
import app from "../app.js";

export const countActiveRecruiters = async (_, res, next) => {
  try {
    const active = await User.countDocuments({ role: "recruiter", isActive: true });
    res.json({ active });
  } catch (err) { next(err); }
};


// 1 updateRecruiterProfile

// export const updateRecruiterProfile = async (req, res) => {
//   const allowed = [
//   "companyName",
//   "industry",
//   "website",
//   "location",
//   "contactEmail",
//   "businessType"   // store "About Company" here
// ];

// const payload ={};
// Object.keys(req.body).forEach( k =>{
//   if (allowed.includes(k)) payload[k] = req.body[k];
// });

//   try{
//     const recruiter = await Recruiter.findOneAndUpdate(
//       {user: req.user.id},
//       payload,
//       {new: true, runValidators: true }
//     );
//     if(!recruiter) return res.status(404).json({ error: "Recruiter not found" });
//     res.json(recruiter);    
//   } catch(err) {
//     res.status(400).json({error: err.message});
//   }
// }





// export const updateRecruiterProfile = async (req, res) => {
//   const allowed = [
//     "companyName",
//     "industry",
//     "website",
//     "location",
//     "contactEmail",
//     "businessType"
//   ];

//   const payload = {};
//   const body = req.body || {};

//   if (req.file) {
//       console.log("req.file:", req.file); // for debugging
//       update.companyLogo = req.file.path || req.file.filename || req.file.url; 
//     }
//   Object.keys(req.body).forEach(k => {
//     if (allowed.includes(k)) payload[k] = req.body[k];
//   });




//   try {
//     const {recruiterId} = req.query;   // 👈 recruiter id URL se lo

//     const recruiter = await Recruiter.findByIdAndUpdate(
//       recruiterId,
//       payload,
//       { new: true, runValidators: true }
//     );

//     if (!recruiter) {
//       return res.status(404).json({ error: "Recruiter not found" });
//     }

//     res.json(recruiter);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


// export const updateRecruiterProfile = async (req, res) => {
// //   const allowed = [
// //     "companyName",
// //     "industry",
// //     "website",
// //     "location",
// //     "contactEmail",
// //     "businessType",
// //     "about",
// //     "companyLogo"
// //   ];

// //   // const payload = {};
// // const body = req.body || {};
// // Object.keys(body).forEach((k) => {
// //   if (allowed.includes(k)) {
// //     try {
// //       // Try parsing JSON if stringified
// //       payload[k] = typeof body[k] === "string" && body[k].startsWith("{")
// //         ? JSON.parse(body[k])
// //         : body[k];
// //     } catch {
// //       payload[k] = body[k]; // fallback
// //     }
// //   }
// // });

// const allowed = [
//   "companyName",
//   "industry",
//   "website",
//   "location",
//   "contactEmail",
//   "businessType",
//   "about",
//   "companyLogo",
//   "contactPerson",
//   "contactPhone",
//   "companySize",
//   "hiringNeeds"
//   // note: wallet is NOT here
// ];

// const payload = {};
// const body = req.body || {};

// if (body && typeof body === "object") {
//   Object.keys(body).forEach((k) => {
//     if (allowed.includes(k)) {
//       // parse JSON fields if stringified (for arrays/objects)
//       try {
//         payload[k] =
//           typeof body[k] === "string" && body[k].startsWith("{")
//             ? JSON.parse(body[k])
//             : body[k];
//       } catch {
//         payload[k] = body[k];
//       }
//     }
//   });
// }

//   // Add Cloudinary uploaded file URL if present
// if (req.file?.path) {
//   payload.companyLogo = req.file.path;
// }

//   try {
//     const { recruiterId } = req.query;

//     // const recruiter = await Recruiter.findByIdAndUpdate(
//     //   recruiterId,
//     //   payload,
//     //   { new: true, runValidators: true }
//     // );

//     const recruiter = await Recruiter.findByIdAndUpdate(
//   recruiterId,
//   payload,
//   { new: true, runValidators: true }
// );
//     if (!recruiter) {
//       return res.status(404).json({ error: "Recruiter not found" });
//     }

//     res.json(recruiter);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: err.message });
//   }
// };


// export const updateRecruiterProfile = async (req, res) => {

//   const allowed = [
//     "companyName",
//     "industry",
//     "website",
//     "location",
//     "contactEmail",
//     "businessType",
//     "about",
//     "companyLogo",
//     "contactPerson",
//     "contactPhone"
//   ];

//   const payload = {};

//   // Check if req.body exists and is an object
//   if (req.body && typeof req.body === "object") {
//     Object.keys(req.body).forEach((k) => {
//       if (allowed.includes(k)) {
//         try {
//           payload[k] = typeof req.body[k] === "string" ? JSON.parse(req.body[k]) : req.body[k];
//         } catch {
//           payload[k] = req.body[k]; // Fallback if not JSON
//         }
//       }
//     });
//   }

//   // File upload
//   if (req.file?.path) {
//     payload.companyLogo = req.file.path;
//   }

//   console.log("req.body:", req.body);
//   console.log("req.file:", req.file);
//   try {
//     const { recruiterId } = req.query;
//     if (!recruiterId) return res.status(400).json({ error: "Recruiter ID required" });

//     const recruiter = await Recruiter.findByIdAndUpdate(recruiterId, payload, {
//       new: true,
//       runValidators: true,
//     });

//     if (!recruiter) return res.status(404).json({ error: "Recruiter not found" });

//     res.json(recruiter);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: err.message });
//   }
// };


export const updateRecruiterProfile = async (req, res) => {
  const allowed = [
    "companyName",
    "industry",
    "website",
    "location",
    "contactEmail",
    "businessType",
    "about",
    "companyLogo",
    "contactPerson",
    "contactPhone"
  ];

  const payload = {};

  if (req.body && typeof req.body === "object") {
    Object.keys(req.body).forEach((k) => {
      if (allowed.includes(k)) {
        if (k === "companyLogo" && typeof req.body[k] === "string") {
          payload[k] = req.body[k]; // ✅ string hi allow
        } else if (k !== "companyLogo") {
          payload[k] = req.body[k]; // ✅ normal fields
        }
      }
    });
  }

  // ✅ File upload override
  if (req.file?.path) {
    payload.companyLogo = req.file.path;
  }

  console.log(req.file,"heeeee")
  try {
    const { recruiterId } = req.query;
    if (!recruiterId)
      return res.status(400).json({ error: "Recruiter ID required" });

    const recruiter = await Recruiter.findByIdAndUpdate(recruiterId, payload, {
      new: true,
      runValidators: true,
    });

    if (!recruiter) return res.status(404).json({ error: "Recruiter not found" });

    res.json(recruiter);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};





export const deleteRecruiterProfile = async (req, res) => {
  try {
    const { recruiterId } = req.query;

    if (!recruiterId) {
      return res.status(400).json({ error: "Recruiter ID is required" });
    }

    const recruiter = await Recruiter.findByIdAndDelete(recruiterId);

    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter not found" });
    }

    res.json({ message: "Recruiter profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// get users who have clicked on a recruiter's job post 

// export const getUsersForRecruiterJobs = async (req , res, next) => {
//   try{
//     //find all the jobs posted by the recruiter
//     const jobs = await Jobs.find({recruiter: req.user.id}).select("_id");
//     const jobIds = jobs.map(j => j.id);
//     // find all applications for these jobs and populate user info 
//     const applications = await Application.find({job: {$in: jobIds}}).populate("user", "-password");

//     //extract unique users
//     const user = [];
//     const userIds = new Set();
//     applications.forEach( a => {
//       if(app.user && !userIds.has(a.user.id.toString())){
//         user.push(app.user);
//         userIds.add(app.user._id.toString());
//   }
// });
// } catch (err) {
//   next(err);
// }
// }






// Get users who have applied to a recruiter's job posts
// export const getUsersForRecruiterJobs = async (req, res, next) => {
//   try {
//     // Find all jobs posted by this recruiter
//     const jobs = await Job.find({ recruiter: req.user.id }).select("_id");
//     const jobIds = jobs.map(j => j._id);

//     // Find all applications for these jobs, and populate applicant info
//     const applications = await Application.find({ job: { $in: jobIds } })
//       .populate("applicant", "-password");

//     // Extract unique applicants
//     const users = [];
//     const userIds = new Set();
//     applications.forEach(app => {
//       if (app.applicant && !userIds.has(app.applicant._id.toString())) {
//         users.push(app.applicant);
//         userIds.add(app.applicant._id.toString());
//       }
//     });

//     res.json({ users });
//   } catch (err) {
//     next(err);
//   }
// };


// export const getUsersForRecruiterJobs = async (req, res, next) => {
//   try {
//     // Get all job IDs posted by this recruiter
//     const jobs = await Job.find({ recruiter: req.user._id }).select("_id");
//     const jobIds = jobs.map(job => job._id);

//     // Find applications for those jobs and populate the user (applicant) field
//     const applications = await Application.find({ job: { $in: jobIds } })
//       .populate("user", "-password");

//     // Extract unique users
//     const users = [];
//     const userIds = new Set();

//     applications.forEach(app => {
//       if (app.user && !userIds.has(app.user._id.toString())) {
//         users.push(app.user);
//         userIds.add(app.user._id.toString());
//       }
//     });

//     res.status(200).json({ users });
//   } catch (err) {
    
//     next(err);
//   }
// };


export const getUsersForRecruiterJobs = async (req, res, next) => {
  try {
    // Get all job IDs posted by this recruiter
    const jobs = await Job.find({ recruiter: req.user._id }).select("_id");
    const jobIds = jobs.map(job => job._id);

    // Find applications for those jobs and populate the user (applicant) field
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("applicant", "-password");

    // Extract unique users
    const users = [];
    const userIds = new Set();

    applications.forEach(app => {
      if (app.applicant && !userIds.has(app.applicant._id.toString())) {
        users.push(app.applicant); // ✅ changed user → applicant
        userIds.add(app.applicant._id.toString());
      }
    });

    res.status(200).json({ users });
  } catch (err) {
    
    next(err);
  }
};
