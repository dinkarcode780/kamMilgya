import express from "express";
import { getUserById, countActiveUsers, updateUser, deleteUserByAdmin } from "../controllers/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", countActiveUsers);
router.get("/:id", getUserById);
// router.put("/:id",updateUser);
router.put("/:id",upload.single("image"),updateUser);


router.delete("/deleteUserByAdmin",deleteUserByAdmin);

export default router;