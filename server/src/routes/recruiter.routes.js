    import express from "express";
    import { countActiveRecruiters, deleteRecruiterProfile, getUsersForRecruiterJobs, updateRecruiterProfile } from "../controllers/recruiter.controller.js";
    import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

    const router = express.Router();

    router.get("/", countActiveRecruiters); // stats
    router.put("/",protect,upload.single("companyLogo") ,updateRecruiterProfile) // edit
    router.get("/applicants", protect, getUsersForRecruiterJobs);


    router.delete("/deleteRecruiterProfile",deleteRecruiterProfile)

   

    export default router;