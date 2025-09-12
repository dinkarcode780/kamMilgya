// models/Jobs.js  (final – copy/paste)
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company:      { type: String },
    jobpost:      { type: Number,require:true }, // remaining phone views / applications
    experience:   { type: Number},
    location:     { type: String },
    phone:        { type: Number,require:true },
    recruiter:    { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter", required: true },
    title:        { type: String,require:true},
    description:  { type: String},
    category:     { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory:  String,
    // subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },

    salaryMin:    Number,
    salaryMax:    Number,
    skills:       [String],
    
    isActive:     { type: Boolean, default: true },
    // expiresAt:    { type: Date, default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 },
    candidateMatched: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    viewedCount:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    contacted:    { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);