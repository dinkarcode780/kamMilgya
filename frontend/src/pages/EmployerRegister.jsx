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
  FaClipboardList,
} from "react-icons/fa";
import { useEffect } from "react";

const EmployerRegister = () => {
  const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state.auth || {});
  // const { user: recruiter } = useSelector((state) => state.auth);
  
  const {
    user: recruiterData,
    isLoading: loading,
    error,
  } = useSelector((state) => state.employe);

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

  const requiredFields = ["companyName", "email", "contactPhone", "password"];
  const isFormValid = requiredFields.every(
    (field) => formData[field] && formData[field].toString().trim() !== ""
  );

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

  //   useEffect(() => {
  //   if (recruiter?.role === "recruiter") {
  //     navigate("/employer-dash");
  //   }
  // }, [recruiter, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.companyName ||
      !formData.email ||
      !formData.contactPhone ||
      !formData.password
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!formData.email) {
      toast.error("Eamil are required fields");
      return;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(formData.contactPhone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        payload.append(key, value)
      );

      const resultAction = await dispatch(employeRegister(payload));

      if (employeRegister.fulfilled.match(resultAction)) {
        toast.success("Recruiter Registered Successfully!");
        navigate("/employer-dash");
      } else {
        //   const errorMsg =
        //   resultAction.payload?.message || "Registration failed. Please try again.";
        // toast.error(errorMsg);

        toast.error(resultAction.payload?.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      //  toast.error(err.message || "Something went wrong");
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
            src="data:image/png;base64,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"
            alt="Employer Illustration"
            className="mt-6 rounded-lg"
          />
        </div>

        {/* Right Side Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Register as an Employer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              icon={<FaBuilding />}
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              required
            />
            <InputField
              icon={<FaIndustry />}
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              placeholder="Business Type"
            />
            <InputField
              icon={<FaIndustry />}
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Industry Type"
            />
            <InputField
              icon={<FaGlobe />}
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Company Website"
            />
            <InputField
              icon={<FaMapMarkerAlt />}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Head Office Location"
            />
            <InputField
              icon={<FaClipboardList />}
              type="number"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              placeholder="Company Size (e.g., 50-100 employees)"
            />
            <InputField
              icon={<FaUser />}
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Contact Person Name"
            />
            <InputField
              icon={<FaEnvelope />}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Contact Email"
              required
            />
            <InputField
              icon={<FaPhoneAlt />}
              type="number"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="Contact Phone"
              required
              //              maxLength={10}
              // pattern="\d{10}"
              // title="Phone number must be exactly 10 digits"
            />
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
            <InputField
              icon={<FaLock />}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <InputField
              icon={<FaLock />}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            //  disabled={loading}
            // className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={!isFormValid || loading}
            className={`w-full font-semibold py-2 rounded-md transition duration-200
    ${
      isFormValid
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
          >
             {loading ? "Please wait..." : "Register"}
            {/* {loading ? "Registering..." : "Register"} */}
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

export default EmployerRegister;
