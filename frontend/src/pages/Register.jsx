// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from '../app/auth/authThunks';
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';

// import {
//   FaUser,
//   FaEnvelope,
//   FaLock,
//   FaPhoneAlt,
//   FaCalendarAlt,
//   FaBriefcase,
//   FaMapMarkerAlt,
// } from "react-icons/fa";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     DOB: "",
//     City: "",
//     Qualification: "",
//     Skill: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   console.log("HADNLECHANGE ", setFormData);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     dispatch(registerUser(formData))
//       .unwrap()
//       .then(() => {
//         toast.success("User Registered Successfully!");
//         navigate("/login");
//       })
//       .catch((err) => {
//         toast.error(err || "Registration Failed!");
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-50 flex items-center justify-center px-4 py-8">
//       <div className="bg-white shadow-2xl rounded-lg w-full max-w-6xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
//         <div className="text-black p-8 hidden md:flex flex-col justify-center">
//           <h2 className="text-3xl font-bold mb-4">Join Our Job Portal</h2>
//           <p className="text-lg">Find your dream job or hire top talent now!</p>
//           <img src="/images/job/4957136.jpg" alt="Register Illustration" className="mt-6 rounded-lg" />
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
//           <h2 className="text-2xl font-bold text-gray-700 mb-2">Create Your Account</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <InputField icon={<FaUser />} name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
//             <InputField icon={<FaEnvelope />} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
//             <InputField icon={<FaPhoneAlt />} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
//             <InputField icon={<FaCalendarAlt />} type="date" name="DOB" value={formData.DOB} onChange={handleChange} />
//             <InputField icon={<FaMapMarkerAlt />} name="City" value={formData.City} onChange={handleChange} placeholder="City / Location" />

//             <div className="relative">
//               <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
//               <select
//                 name="Qualification"
//                 value={formData.Qualification}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 pr-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//               >
//                 <option value="">Highest Qualification</option>
//                 <option value="10th">10th</option>
//                 <option value="12th">12th</option>
//                 <option value="Diploma">Diploma</option>
//                 <option value="Graduate">Graduate</option>
//                 <option value="Post Graduate">Post Graduate</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>

//           <textarea
//             name="Skill"
//             rows="2"
//             placeholder="Enter your Skill (e.g., electrician, tailoring)"
//             value={formData.Skill}
//             onChange={handleChange}
//             required
//             className="w-full pl-4 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           ></textarea>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <InputField icon={<FaLock />} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
//             <InputField icon={<FaLock />} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
//           </div>

//           {error && <p className="text-sm text-red-600 text-center">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>

//           <p className="text-sm text-center text-gray-500 mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 hover:underline">
//               Login here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// const InputField = ({ icon, type = "text", name, value, onChange, placeholder = "" }) => (
//   <div className="relative">
//     <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
//     <input
//       type={type}
//       name={name}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       required
//       className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//     />
//   </div>
// );

// export default Register;



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../app/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaUser,
  FaPhoneAlt,
  FaCalendarAlt,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    DOB: "",
    City: "",
    Qualification: "",
    Skill: "",
  });

  // Handle Redux errors
  useEffect(() => {
    if (error) {
      console.log("Redux error:", error);
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   dispatch(registerUser(formData))
  //     .unwrap()
  //     .then(() => {
  //       toast.success("User Registered Successfully!");
  //       navigate("/user-dash");
  //     })
  //     .catch((err) => {
  //       console.log("Registration error:", err);
  //       // Handle different error structures
  //       let errorMessage = "Registration Failed!";
        
  //       if (typeof err === "string") {
  //         errorMessage = err;
  //       } else if (err?.message) {
  //         errorMessage = err.message;
  //       } else if (err?.error) {
  //         errorMessage = err.error;
  //       } else if (err?.response?.data?.message) {
  //         errorMessage = err.response.data.message;
  //       } else if (err?.response?.data?.error) {
  //         errorMessage = err.response.data.error;
  //       }
        
  //       toast.error(errorMessage);
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form submitted with data:", formData);

    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      console.log("Registration successful:", result);
      toast.success("User Registered Successfully!");
      navigate("/user-dash");
    } catch (err) {
      console.log("Registration error caught:", err);
      console.log("Error type:", typeof err);
      console.log("Error keys:", Object.keys(err || {}));
      
      // Handle different error structures
      let errorMessage = "Registration Failed!";
      
      if (typeof err === "string") {
        errorMessage = err;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (err?.error) {
        errorMessage = err.error;
      } else if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      
      console.log("Final error message to display:", errorMessage);
      
      // Try multiple ways to show the error
      toast.error(errorMessage);
      
      // Also try with a delay
      setTimeout(() => {
        toast.error(`Delayed: ${errorMessage}`);
      }, 100);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-6xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="text-black p-8 hidden md:flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Job Portal</h2>
          <p className="text-lg">Find your dream job or hire top talent now!</p>
          <img
            src="/images/job/4957136.jpg"
            alt="Register Illustration"
            className="mt-6 rounded-lg"
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Create Your Account
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              icon={<FaUser />}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
            <InputField
              icon={<FaPhoneAlt />}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            {/* <InputField
              icon={<FaCalendarAlt />}
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
            /> */}
            <InputField
              icon={<FaMapMarkerAlt />}
              name="City"
              value={formData.City}
              onChange={handleChange}
              placeholder="City / Location"
            />
            <div className="relative">
              <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
              <select
                name="Qualification"
                value={formData.Qualification}
                onChange={handleChange}
                // required
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Highest Qualification</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="Diploma">Diploma</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <textarea
            name="Skill"
            rows="2"
            placeholder="Enter your Skill (e.g., electrician, tailoring)"
            value={formData.Skill}
            onChange={handleChange}
            // required
            className="w-full pl-4 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          {/* <button 
            type="button"
            onClick={() => {
              console.log("Test toast clicked");
              toast.error("Test error message");
              toast.success("Test success message");
            }}
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-200 mb-2"
          >
            Test Toast
          </button> */}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
}) => (
  <div className="relative">
    <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      // required
      className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default Register;
