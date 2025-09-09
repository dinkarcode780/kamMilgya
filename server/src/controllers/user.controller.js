// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) { next(err); }
};

export const countActiveUsers = async (_, res, next) => {
  try {
    const active = await User.countDocuments({ role: "user", isActive: true });
    res.json({ active });
  } catch (err) { next(err); }
};


// export const updateUser = async (req, res, next) => {
//   try{
//     const update ={ ...req.body };
//     //prevent password update 
//     delete update.password;

//     console.log("update bhai",update)

//     if (req.file) {
//           const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//             folder: "users",
//           });
//           update.image = uploadResult.secure_url;
//         }

//         console.log("Image",req.file);
    
//     const user = await User.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true, select: "-password"  });
//     if (!user) return res.status(404).json({ error: "User not found" });
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// }


export const updateUser = async (req, res, next) => {
  try {
    const update = { ...req.body };
    delete update.password;

    if (req.file) {
      console.log("req.file:", req.file); // for debugging
      update.image = req.file.path || req.file.filename || req.file.url; 
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, select: "-password" }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
};



export const deleteUserByAdmin = async(req,res)=>{

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "Recruiter ID is required" });
    }

    const removeData = await User.findByIdAndDelete(userId);

    if (!removeData) {
      return res.status(404).json({ error: "Recruiter not found" });
    }

    res.json({ message: "Canditate deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


}