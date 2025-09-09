import express from "express";
import { registerUser, registerRecruiter, loginWithPhone, logout, getCurrentUser, getCurrentRecruiter, login, loginUser, loginRecruiter } from "../controllers/auth.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register/user",   upload.single("resume"), registerUser);
router.post("/register/recruiter", upload.none(),registerRecruiter);
router.post("/login", login)
router.post("/login/user",loginUser);
router.post("/login/recruiter", loginRecruiter);
router.post("/loginphone", loginWithPhone);
router.get("/logout", logout); 
//  isss code ko hataya hai
// router.get("/me", getCurrentUser); // ✅ fetch current logged-in user
// router.get("/ME",protect, getCurrentRecruiter)
// For normal users / admins

// iss code ko use kiya hai thunk me v update kiye hai api me bhi dono ko update kiye hai
router.get("/user/me", protect, getCurrentUser);

// For recruiters
router.get("/recruiter/me", protect, getCurrentRecruiter);

export default router;