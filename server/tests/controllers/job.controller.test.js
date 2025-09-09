import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as jobController from "../controllers/job.controller.js";
import Job from "../models/Jobs.js";
import Application from "../models/Application.js";
import User from "../models/User.js";

vi.mock("../models/Jobs.js");
vi.mock("../models/Application.js");
vi.mock("../models/User.js");

describe("Job Controller", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("test_updateJob_success_recruiter", async () => {
    const req = {
      account: { role: "recruiter", id: "rec123" },
      params: { id: "job123" },
      body: { title: "Updated Title" }
    };
    const updatedJob = { _id: "job123", title: "Updated Title", recruiter: "rec123" };
    Job.findOneAndUpdate.mockResolvedValue(updatedJob);

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    };
    const next = vi.fn();

    await jobController.updateJob(req, res, next);

    expect(Job.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "job123", recruiter: "rec123" },
      { title: "Updated Title" },
      { new: true }
    );
    expect(res.json).toHaveBeenCalledWith(updatedJob);
    expect(res.status).not.toHaveBeenCalledWith(404);
    expect(next).not.toHaveBeenCalled();
  });

  it("test_applyJob_success_user", async () => {
    const req = {
      account: { role: "user", id: "user123" },
      params: { id: "job123" }
    };
    const jobDoc = {
      _id: "job123",
      isActive: true,
      jobpost: 2,
      save: vi.fn().mockResolvedValue(undefined)
    };
    Job.findById.mockResolvedValue(jobDoc);
    Application.findOne.mockResolvedValue(null);
    const createdApp = { _id: "app123", job: "job123", applicant: "user123" };
    Application.create.mockResolvedValue(createdApp);
    User.findByIdAndUpdate.mockResolvedValue({});
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    const next = vi.fn();

    await jobController.applyJob(req, res, next);

    expect(Job.findById).toHaveBeenCalledWith("job123");
    expect(Application.findOne).toHaveBeenCalledWith({ job: "job123", applicant: "user123" });
    expect(jobDoc.jobpost).toBe(1);
    expect(jobDoc.save).toHaveBeenCalled();
    expect(Application.create).toHaveBeenCalledWith({ job: "job123", applicant: "user123" });
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("user123", { $addToSet: { jobsApplied: "app123" } });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdApp);
    expect(next).not.toHaveBeenCalled();
  });

  it("test_getSavedJobs_success_user", async () => {
    const req = {
      account: { role: "user", id: "user123" }
    };
    const savedJobs = [
      {
        _id: "job1",
        title: "Job 1",
        recruiter: { _id: "rec1", name: "Recruiter 1", companyName: "Company 1" }
      },
      {
        _id: "job2",
        title: "Job 2",
        recruiter: { _id: "rec2", name: "Recruiter 2", companyName: "Company 2" }
      }
    ];
    const userDoc = {
      savedJobs
    };
    const populateMock = vi.fn().mockResolvedValue(userDoc);
    User.findById.mockReturnValue({ populate: populateMock });

    const res = {
      json: vi.fn()
    };
    const next = vi.fn();

    await jobController.getSavedJobs(req, res, next);

    expect(User.findById).toHaveBeenCalledWith("user123");
    expect(populateMock).toHaveBeenCalledWith({
      path: "savedJobs",
      populate: { path: "recruiter", select: "name companyName" }
    });
    expect(res.json).toHaveBeenCalledWith(savedJobs);
    expect(next).not.toHaveBeenCalled();
  });

  it("test_updateJob_not_owned_recruiter", async () => {
    const req = {
      account: { role: "recruiter", id: "rec123" },
      params: { id: "job999" },
      body: { title: "Should Not Update" }
    };
    Job.findOneAndUpdate.mockResolvedValue(null);

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    const next = vi.fn();

    await jobController.updateJob(req, res, next);

    expect(Job.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "job999", recruiter: "rec123" },
      { title: "Should Not Update" },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Job not found or not yours" });
    expect(next).not.toHaveBeenCalled();
  });

  it("test_applyJob_quota_exhausted", async () => {
    const req = {
      account: { role: "user", id: "user123" },
      params: { id: "job123" }
    };
    const jobDoc = {
      _id: "job123",
      isActive: true,
      jobpost: 0
    };
    Job.findById.mockResolvedValue(jobDoc);

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    const next = vi.fn();

    await jobController.applyJob(req, res, next);

    expect(Job.findById).toHaveBeenCalledWith("job123");
    expect(res.status).toHaveBeenCalledWith(410);
    expect(res.json).toHaveBeenCalledWith({ error: "Job quota exhausted" });
    expect(next).not.toHaveBeenCalled();
  });

  it("test_listApplications_unauthorized_role", async () => {
    const req = {
      account: { role: "user", id: "user123" },
      params: { id: "job123" }
    };
    // We want to test recruiter-only access, so assertRecruiter will throw
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    const next = vi.fn();

    await jobController.listApplications(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Recruiter access required" });
  });
});