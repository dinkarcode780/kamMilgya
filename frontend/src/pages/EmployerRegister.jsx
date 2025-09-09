import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { employeRegister } from "../app/Employe/thunkemploye";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaBuilding,
  FaGlobe,
  FaIndustry,
  FaMapMarkerAlt,
  FaClipboardList
} from "react-icons/fa";
import { useEffect } from "react";

const EmployerRegister = () => {
  const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state.auth || {});
  // const { user: recruiter } = useSelector((state) => state.auth);
const { user: recruiterData, isLoading: loading, error } = useSelector(
  (state) => state.employe
);

const recruiter = recruiterData?.user;


  // const Navigate = useNavigate();
   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    industry: "",
    website: "",
    location: "",
    companySize: "",
    contactPerson: "",
    email: "",
    contactPhone: "",
    password: "",
    confirmPassword: "",
    hiringNeeds: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     toast.error("Passwords do not match!");
  //     return;
  //   }

  //   try {
  //     const resultAction = await dispatch(employeRegister(formData));

  //     if (employeRegister.fulfilled.match(resultAction)) {
  //       toast.success("Recruiter Registered Successfully!");
  //       Navigate("/employer-dash");
  //     } else {
  //       const errorMsg = resultAction.payload?.message || "Registration failed";
  //       toast.error(errorMsg);
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };


//   useEffect(() => {
//   if (recruiter?.role === "recruiter") {
//     Navigate("/employer-dash");
//   }
// },[recruiter, Navigate]);

const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));

      const resultAction = await dispatch(employeRegister(payload));

      if (employeRegister.fulfilled.match(resultAction)) {
        toast.success("Recruiter Registered Successfully!");  
        navigate("/employer-dash");
      } else {
        toast.error(resultAction.payload?.message || "Registration failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };


  useEffect(() => {
    if (recruiter?.role === "recruiter") {
      navigate("/employer-dash");
    }
  }, [recruiter, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-5xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="text-black p-8 hidden md:flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Employer Registration</h2>
          <p className="text-lg">Find your next best talent today!</p>
          <img
            src="/images/employer-register.jpg"
            alt="Employer Illustration"
            className="mt-6 rounded-lg"
          />
        </div>

        {/* Right Side Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Register as an Employer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField icon={<FaBuilding />} type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" />
            <InputField icon={<FaIndustry />} type="text" name="businessType" value={formData.businessType} onChange={handleChange} placeholder="Business Type" />
            <InputField icon={<FaIndustry />} type="text" name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry Type" />
            <InputField icon={<FaGlobe />} type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Company Website" />
            <InputField icon={<FaMapMarkerAlt />} type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Head Office Location" />
            <InputField icon={<FaClipboardList />} type="number" name="companySize" value={formData.companySize} onChange={handleChange} placeholder="Company Size (e.g., 50-100 employees)" />
            <InputField icon={<FaUser />} type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Contact Person Name" />
            <InputField icon={<FaEnvelope />} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Contact Email" />
            <InputField icon={<FaPhoneAlt />} type="number" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="Contact Phone" />
          </div>

          <input
            aria-label="Hiring Needs"
            name="hiringNeeds"
            placeholder="Briefly describe your hiring needs"
            value={formData.hiringNeeds}
            onChange={handleChange}

            type="number"
            className="w-full pl-4 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField icon={<FaLock />} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <InputField icon={<FaLock />} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/employeLogin" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ icon, type = "text", name, value, onChange, placeholder = "" }) => (
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

export default EmployerRegister;
