// src/routes/job.routes.js
import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  
  getJobs,
  myPostedJobs,
  saveJob,
  updateJob,
  deleteJob,
  unsaveJob,
  getSavedJobs,
  applyJob,
  myApplications,
  listApplications,
  getJobById,
  getAllJobsAdmin,
} from "../controllers/job.controller.js";

const router = express.Router();

// helpers (inline)
const recruiterOnly = (req, res, next) => {
  // Allow recruiters and admins to manage jobs
  if (req.role === "recruiter" || req.role === "admin") return next();
  // Backward compatibility: in case role is not set, check model name
  if (req.account?.constructor?.modelName === "Recruiter") return next();
  return res.status(403).json({ error: "Recruiter or admin access required" });
};

const userOnly = (req, res, next) =>
  req.account?.constructor.modelName === "User"
    ? next()
    : res.status(403).json({ error: "You cannot apply as you are on the recruiter page" });

/* ---------------- PUBLIC ---------------- */
router.get("/", getJobs);

router.get("/all",getAllJobsAdmin)

/* ---------------- RECRUITER ONLY -------- */

router.get("/posted",   protect, recruiterOnly, myPostedJobs);

/* ---------------- USER ONLY ------------- */
router.get("/saved",       protect, userOnly, getSavedJobs);
router.get("/applied",     protect, userOnly, myApplications);
router.post("/:id/save",   protect, userOnly, saveJob);
router.delete("/:id/save", protect, userOnly, unsaveJob);
router.post("/:id/apply",  protect, userOnly, applyJob);




//----------------------------- RECRUITER ONLY -------- */
router.put("/:id",      protect, recruiterOnly, updateJob);
router.delete("/:id",   protect, recruiterOnly, deleteJob); //
router.get("/:id/applications", listApplications);

router.get("/getJobById/:id",getJobById)

export default router;
