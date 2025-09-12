/* eslint-disable no-unused-vars */
import Job from "../models/Jobs.js";
import Application from "../models/Application.js";
import User from "../models/User.js";

/* =========================================================
   Helpers
========================================================= */
// const assertRecruiter = (req) => {
//   if (!(req.role === "recruiter" || req.role === "admin")) {
//     const err = new Error("Recruiter access required");
//     err.status = 403;
//     throw err;
//   }
// };

// const assertUser = (req) => {
//   if (req.role !== "user") {
//     const err = new Error("Admins are not allowed to apply for jobs");
//     err.status = 403;
//     throw err;
//   }
// };


const assertRecruiter = (req) => {
  if (!(req.role === "recruiter" || req.role === "admin")) {
    const err = new Error("First Login");
    err.status = 403;
    throw err;
  }
};

const assertUser = (req) => {
  if (req.role === "admin") {
    const err = new Error("You are Admin you can't to apply for this jobs");
    err.status = 403;
    throw err;
  }

  if (req.role === "recruiter") {
    const err = new Error("You cannot apply as you are on the recruiter page");
    err.status = 403;
    throw err;
  }

  if (req.role !== "user") {
    const err = new Error("Please login or register first to apply for jobs");
    err.status = 403;
    throw err;
  }
};

/* =========================================================
   JOB CRUD  (recruiter only)
   NOTE: createJob is intentionally removed – jobs are created
   only after successful payment in payment.controller.js
========================================================= */

export const updateJob = async (req, res, next) => {
  try {
    assertRecruiter(req);
    // Normalize payload: ensure category is ObjectId and subCategory is string
    const incoming = req.body || {};
    const normalized = { ...incoming };
    if (incoming.category) {
      normalized.category = incoming.category._id || incoming.category;
    }
    if (incoming.subcategory !== undefined || incoming.subCategory !== undefined) {
      const sub = incoming.subcategory ?? incoming.subCategory;
      normalized.subCategory = (sub && (sub._id || sub.name || sub)) || undefined;
      delete normalized.subcategory;
    }
    // Prevent changing recruiter via update
    delete normalized.recruiter;

    const filter = { _id: req.params.id };
    if (req.role === "recruiter") {
      filter.recruiter = req.account.id;
    }

    const job = await Job.findOneAndUpdate(
      filter,
      normalized,
      { new: true }
    ).populate("category", "name");

    if (!job) return res.status(404).json({ error: "Job not found or not yours" });
    res.json(job);
  } catch (err) { next(err); }
};

export const deleteJob = async (req, res, next) => {
  try {
    assertRecruiter(req);
    const filter = { _id: req.params.id };
    if (req.role === "recruiter") {
      filter.recruiter = req.account.id;
    }
    const job = await Job.findOneAndDelete(filter);
    if (!job) return res.status(404).json({ error: "Job not found or not yours" });
    res.json({ message: "Job deleted" });
  } catch (err) { next(err); }
};

/* =========================================================
   PUBLIC JOB LISTING  (open to everyone)
========================================================= */
// export const getJobs = async (req, res, next) => {
//   try {
//     const { keyword, location, category } = req.query;
//     const filter = { isActive: true };

//     if (keyword)
//       filter.$or = [
//         { title: { $regex: keyword, $options: "i" } },
//         { description: { $regex: keyword, $options: "i" } },
//       ];
//     if (location) filter.location = { $regex: location, $options: "i" };
//     if (category) filter.category = category;

//     const jobs = await Job.find(filter).populate("recruiter", "name companyName")
//   .populate("category", "name")
//   .populate("subcategory", "name");
//     res.status(200).json({
//        success:true,
//         message:"Fetched all job successfully",
//       data:jobs
//     });
//   } catch (err) { next(err); }

// };

export const getJobs = async (req, res, next) => {
  try {
    const { keyword, location, category } = req.query;
    const filter = { isActive: true };

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }
    if (location) filter.location = { $regex: location, $options: "i" };
    if (category) filter.category = category;

    const jobs = await Job.find(filter)
      .populate("recruiter", "name companyName")
      .populate("category", "name");

    res.status(200).json({
      success: true,
      message: "Fetched all job successfully",
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
};



export const getAllJobsAdmin = async (req, res, next) => {
  try {
    const jobs = await Job.find({})
      .populate("recruiter", "name companyName")
      .populate("category", "name");
    res.status(200).json({
      success: true,
      message: "Fetched all jobs (admin)",
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================================
   RECRUITER – MY JOBS  (recruiter only)
========================================================= */
export const myPostedJobs = async (req, res, next) => {
  try {
    assertRecruiter(req);
    const jobs = await Job.find({ recruiter: req.account.id }).populate("category", "name")
  .populate("subCategory", "name");
    res.json(jobs);
  } catch (err) { next(err); }
};

/* =========================================================
   USER – SAVE / UNSAVE / LIST SAVED  (user only)
========================================================= */
export const saveJob = async (req, res, next) => {
  try {
    assertUser(req);
    await User.findByIdAndUpdate(req.account.id, { $addToSet: { savedJobs: req.params.id } });
    res.json({ message: "Job saved" });
  } catch (err) { next(err); }
};

export const unsaveJob = async (req, res, next) => {
  try {
    assertUser(req);
    await User.findByIdAndUpdate(req.account.id, { $pull: { savedJobs: req.params.id } });
    res.json({ message: "Job unsaved" });
  } catch (err) { next(err); }
};

export const getSavedJobs = async (req, res, next) => {
  try {
    assertUser(req);
    const user = await User.findById(req.account.id)
      .populate({ path: "savedJobs", populate: { path: "recruiter", select: "name companyName" } });
    res.json(user.savedJobs);
  } catch (err) { next(err); }
};


/* =========================================================
   USER – APPLY / LIST APPLICATIONS  (user only)
   Decrements jobpost on every apply
========================================================= */
// export const applyJob = async (req, res, next) => {
//   try {
//     assertUser(req);

//     const job = await Job.findById(req.params.id);
//     if (!job || !job.isActive)
//       return res.status(404).json({ error: "Job unavailable" });
//     if (job.jobpost <= 0)
//       return res.status(410).json({ error: "Job quota exhausted" });

//     const exists = await Application.findOne({ job: req.params.id, applicant: req.account.id });
//     if (exists) return res.status(400).json({ error: "Already applied" });


//     // consume one slot
//     job.jobpost -= 1;
//     if (job.jobpost <= 0) job.isActive = false;
//     await job.save();

//     const app = await Application.create({
//       job: req.params.id,
//       applicant: req.account.id,

//     });

//     res.status(201).json(app);
//   } catch (err) { next(err); }
// };


//new code 

export const applyJob = async (req, res, next) => {
  try {
    assertUser(req);

    const job = await Job.findById(req.params.id);
    if (!job || !job.isActive)
      return res.status(404).json({ error: "Job is now inactive" });
    if (job.jobpost <= 0)
      return res.status(410).json({ error: "Job quota is full" });

    const exists = await Application.findOne({
      job: req.params.id,
      applicant: req.account.id,
    });
    if (exists) return res.status(400).json({ error: "Already applied" });

    // consume one slot
    job.jobpost -= 1;
    if (job.jobpost <= 0) job.isActive = false;
    await job.save();

    // create the application
    const app = await Application.create({
      job: req.params.id,
      applicant: req.account.id,
    });

    // add to user's applied list
    await User.findByIdAndUpdate(req.account.id, {
      $addToSet: { jobsApplied: app._id },
    });

    res.status(201).json(app);
  } catch (err) {
    next(err);
  }
};

// export const myApplications = async (req, res, next) => {
//   try {
//     assertUser(req);
//     const apps = await Application.find({ applicant: req.account.id })
//       .populate({ path: "job", populate: { path: "recruiter", select: "name companyName" } });
//     res.json(apps);
//   } catch (err) { next(err); }
// };



export const myApplications = async (req, res, next) => {
  try {
    if (req.account.role === "user" || req.account.role === "admin") {
      // USER: show their own applications
      const apps = await Application.find({ applicant: req.account.id })
        .populate({
          path: "job",
          populate: { path: "recruiter", select: "name companyName" }
        });

      return res.json(apps);

    } else if (req.account.role === "recruiter") {
      // RECRUITER: show applications to their jobs
      const jobs = await Job.find({ recruiter: req.account.id }).select("_id");
      const jobIds = jobs.map(job => job._id);

      const apps = await Application.find({ job: { $in: jobIds } })
        .populate("applicant", "name phone skills location dob") // customize as needed
        .populate("job", "title jobType");

      return res.json(
       
        apps
      );
    } else {
      return res.status(403).json({ error: "Unauthorized role" });
    }

  } catch (err) {
    next(err);
  }
};

/* =========================================================
   RECRUITER – APPLICANT LISTS  (recruiter only)
========================================================= */

//old controler code commented out for reference
// export const listApplications = async (req, res, next) => {
//   try {
//     assertRecruiter(req);

//     const job = await Job.findOne({ _id: req.params.id, recruiter: req.account.id });
//     if (!job)
//       return res.status(404).json({ error: "Job not found or not yours" });

//     const apps = await Application.find({ job: req.params.id })
//       .populate("applicant", "name Skills phone");

//     res.json(apps.map(a => ({
//       userId: a.applicant._id,
//       name:   a.applicant.name,
//       phone:  a.applicant.phone,        // <-- this will now work
//       skills: a.applicant.Skills || []
//     })));
//   } catch (err) {
//     next(err);
//   }
// };


// export const listApplications = async (req, res, next) => {
//   try {
//     assertRecruiter(req);

//     const job = await Job.findOne({ _id: req.params.id, recruiter: req.account.id });
//     if (!job)
//       return res.status(404).json({ error: "Job not found or not yours" });

//     const apps = await Application.find({ job: req.params.id })
//       .populate("applicant", "-password -__v") // exclude password and other unnecessary fields
//       .populate("job", "title location"); // optional: include job info if needed

//     res.json(
//       apps.map((a) => ({
//         _id: a._id,
//         status: a.status,
//         user: a.applicant,  // full user details (safe)
//         job: a.job,         // optional: job info
//       }))
//     );
//   } catch (err) {
//     next(err);
//   }
// };

export const listApplications = async (req, res, next) => {
  try {
    // assertRecruiter(req); // <- Temporarily removed for testing

    const job = await Job.findOne({ _id: req.params.id }); // <- removed recruiter filter
    if (!job)
      return res.status(404).json({ error: "Job not found" });

    const apps = await Application.find({ job: req.params.id })
      // .populate("applicant", "-password -__v")
      // .populate("job", "title location");
.populate("applicant", "-password -__v")
      .populate(
        "job",
        "title location company category subCategory experience salaryMin salaryMax website phone description responsibilities requirements"
      )
      .populate("job.category", "name"); 
    res.json(
      apps.map((a) => ({
        _id: a._id,
        status: a.status,
        user: a.applicant,
        job: a.job,
      }))
    );
  } catch (err) {
    next(err);
  }
};



//   addd api

// ✅ Get Job by ID (Public API)
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("recruiter", "name companyName email phone")
      .populate("category", "name")

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      data: job,
    });
  } catch (err) {
    next(err);
  }
};
