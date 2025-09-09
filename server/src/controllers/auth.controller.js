import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Recruiter from "../models/Recruiter.js";
import jwt from "jsonwebtoken";

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};




export const registerUser = async (req, res, next) => {
  try {
    const { name, phone, Skill } = req.body;

    // Convert Skill string to array if needed
    const parsedSkill = typeof Skill === 'string'
      ? Skill.split(',').map(s => s.trim())
      : Array.isArray(Skill) ? Skill : [];

    const user = await User.create({
      name,
      phone,
      Skill: parsedSkill,
      role: "user",
      resume: req.file
        ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        : null,
    });

    const token = user.generateToken();

    res.cookie("token", token, cookieOptions).status(201).json({
      message: "User registered",
      token,
      user: { ...user.toObject(), password: undefined },
    });
  } catch (err) {
     if (err.code === 11000 && err.keyPattern?.phone) {
      return res.status(409).json({ message: "Phone number already registered" });
    }
    next(err);
  }
};

// Register Recruiter
export const registerRecruiter = async (req, res, next) => {
  try {
    const payload = { ...req.body, role: "recruiter" };
   
    const recruiter = await Recruiter.create(payload);
    const token = recruiter.generateToken();
    res.cookie("token", token, cookieOptions).status(201).json({
      message: "Recruiter registered",
      token,
      user: { ...recruiter.toObject(), password: undefined },
    });
  } catch (err) {
        if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(409).json({ message: "Email already exists.Please use another one" });
    }
    next(err);
  }
};




const isLoggedin = (req) => {
  const token = req.cookies.token;
  if (!token) return false;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return !!decoded;
  } catch (err) {
    return false;
  }
};

// export const loginWithPhone = async (req, res, next) => {
//   try {
//     const { phone, name } = req.body;

//     // First check if user with this phone exists
//     let user = await User.findOne({ phone });

//     // If user is already logged in, send their info
//     if (isLoggedin(req)) {
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       return res.json({
//         message: "User already logged in",
//         user: { ...user.toObject(), password: undefined },
//       });
//     }

//     // If user doesn't exist, create new one
//     if (!user) {
//       user = await User.create({ name, phone, role: "user" });
//     }

//     // Generate a new token
//     const token = user.generateToken();

//     res
//       .cookie("token", token, cookieOptions)
//       .json({ token, user: { ...user.toObject(), password: undefined } });

//   } catch (err) {
//     // If the error is a duplicate key error (just in case)
//     if (err.code === 11000 && err.keyPattern?.phone) {
//       return res.status(409).json({ error: "Phone number already in use" });
//     }

//     next(err);
//   }
// };







// new login with phone to generate token and register user if not exists
export const loginWithPhone = async (req, res, next) => {
  try {
    const { phone, name } = req.body;

    // Try to find user by phone
    let user = await User.findOne({ phone });

    // If user does not exist, create one with default values
    if (!user) {
      user = await User.create({
        name,
        phone,
        email: `${phone}@autofill.com`,
        password: phone,
        Skill: [],
        role: "user",
        resume: null,
      });
    }

    // Generate a new token
    const token = user.generateToken();

    // Send user info without password
    res
      .cookie("token", token, cookieOptions)
      .json({
        message: "User logged in or registered",
        token,
        user: { ...user.toObject(), password: undefined },
      });

  } catch (err) {
    // Handle duplicate phone number edge case
    if (err.code === 11000 && err.keyPattern?.phone) {
      return res.status(409).json({ error: "Phone number already in use" });
    }

    next(err);
  }
};



// loign as User with email and password

// export const loginUser = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email }).select("+password");

//     if (!user || (user.role !== "user" && user.role !== "admin")) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const match = await user.matchPassword(password);
//     if (!match) return res.status(401).json({ error: "Invalid credentials" });

//     const token = user.generateToken();
//     res.cookie("token", token, cookieOptions).json({
//       token,
//       user: { ...user.toObject(), password: undefined },
//     });
//   } catch (err) {
//     next(err);
//   }
// };



// login with phone and name for the user 
// export const loginUser = async (req, res, next) => {
//   try {
//     const { phone, name } = req.body;

//     // Find user by phone number
//     const user = await User.findOne({ phone }).select("+password");

//     // If no user or invalid role
//     if (!user || (user.role !== "user" && user.role !== "admin")) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Optional: Check if name matches (for extra verification)
//     if (name && user.name !== name) {
//       return res.status(401).json({ error: "Invalid name for this phone number" });
//     }

//     // Match password (we're assuming password is phone)
//     const match = await user.matchPassword(phone);
//     if (!match) return res.status(401).json({ error: "Invalid credentials" });

//     // Generate token and respond
//     const token = user.generateToken();
//     res.cookie("token", token, cookieOptions).json({
//       token,
//       user: { ...user.toObject(), password: undefined },
//     });
//   } catch (err) {
//     next(err);
//   }
// };




//login wiht phone and name for the user 


// login with phone and name for the user 
export const loginUser = async (req, res, next) => {
  try {
    const { phone, name } = req.body;

    // Find user by phone number
    const user = await User.findOne({ phone });

    // If no user or invalid role
    if (!user || (user.role !== "user" && user.role !== "admin")) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if name matches (for extra verification)
    if (name && user.name !== name) {
      return res.status(401).json({ error: "Invalid name for this phone number" });
    }

    // Generate token and respond
    const token = user.generateToken();
    res.cookie("token", token, cookieOptions).json({
      token,
      user: { ...user.toObject(), password: undefined },
    });
  } catch (err) {
    next(err);
  }
};


// Login as Recruiter
export const loginRecruiter = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const recruiter = await Recruiter.findOne({ email }).select("+password");

    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter not found" });
    }

    const match = await recruiter.matchPassword(password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = recruiter.generateToken();
    res.cookie("token", token, cookieOptions).json({
      token,
      user: { ...recruiter.toObject(), password: undefined },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let account = await User.findOne({ email }).select("+password");
    let role = "user";

    if (!account) {
      account = await Recruiter.findOne({ email }).select("+password");
      role = "recruiter";
    }

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const match = await account.matchPassword(password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = account.generateToken();

    res.cookie("token", token, cookieOptions).json({
      token,
      user: { ...account.toObject(), password: undefined },
      role: account.role || role, // e.g., "admin", "user", or "recruiter"
    });
  } catch (err) {
    next(err);
  }
};



export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions).json({ message: "Logged out" });
};


// export const getCurrentUser = async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ error: "Not authenticated" });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded._id).select("+password");
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       res.status(200).json({
//         user: { ...user.toObject(), password: undefined },
//         role: user.role,
//       });
//     } catch (err) {
//       return res.status(401).json({ error: "Invalid token" });
//     }
//   } catch (err) {
//     console.error("Get current user error:", err.message);
//     res.status(500).json({ error: "Server error while fetching user" });
//   }
// };
// get current recruiter 



export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user || (req.role !== "user" && req.role !== "admin")) {
      return res.status(401).json({ error: "Not authenticated as user/admin" });
    }

    res.status(200).json({
      user: req.user,
      role: req.role,
    });
  } catch (err) {
    console.error("Get current user error:", err.message);
    res.status(500).json({ error: "Server error while fetching user" });
  }
};


// controllers/authController.js
// Add this right below getCurrentUser

// export const getCurrentRecruiter = async (req, res) => {
//   try {
//     // Ensure the logged-in user is actually a recruiter
//     if (!req.user || !req.role || req.role !== "recruiter") {
//       return res.status(401).json({ error: "Not authenticated as recruiter" });
//     }

//     // Optionally re-fetch to populate extra fields (e.g., jobs they posted)
//     const recruiter = await Recruiter.findById(req.user._id)
//       // Example: .populate("postedJobs")  // if you have a jobs reference
//       .lean();

//     if (!recruiter) {
//       return res.status(404).json({ error: "Recruiter not found" });
//     }

//     res.status(200).json({
//       user: recruiter,
//       role: req.role,
//     });
//   } catch (err) {
//     console.error("Get current recruiter error:", err.message);
//     res.status(500).json({ error: "Server error while fetching recruiter" });
//   }
// };

// controllers/authController.js

// export const getCurrentRecruiter = async (req, res) => {
//   try {
//     const recruiter = await Recruiter.findById(req.user._id).select("-password");
//     if (!recruiter) {
//       return res.status(404).json({ error: "Recruiter not found" });
//     }

//     res.json({ recruiter }); // ✅ error field hatao
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

export const getCurrentRecruiter = async (req, res) => {
  try {
    if (!req.user || req.role !== "recruiter") {
      return res.status(401).json({ error: "Not authenticated as recruiter" });
    }

    res.status(200).json({
      recruiter: req.user,
      role: req.role,
    });
  } catch (err) {
    console.error("Get current recruiter error:", err.message);
    res.status(500).json({ error: "Server error while fetching recruiter" });
  }
};
