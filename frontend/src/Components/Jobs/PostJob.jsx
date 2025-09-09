import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";

import { fetchCategories } from "../../app/categories/categorythunk";
import { fetchSubcategories } from "../../app/subcategories/subcategoryThunk";
import { createJobPostOrderThunk } from "../../app/payment/Paymenthunk";

const PostJob = () => {
  const dispatch = useDispatch();
  const { recruiter } = useSelector((state) => state.auth);
  const token = recruiter?.token || localStorage.getItem("token");
  const navigate = useNavigate();

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
  const [formData, setFormData] = useState({
    title: "",
    jobpost: "",
    category: "",
    subcategory: "",
    company: "",
    website: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    experience: "",
    deadline: "",
    description: "",
    responsibilities: "",
    requirements: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { categories, loading: catLoading } = useSelector((state) => state.categories);
  const { subcategories, loading: subLoading } = useSelector((state) => state.subcategories);

  useEffect(() => {
    dispatch(fetchCategories());
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, [dispatch]);

  // useEffect(() => {
  //   if (formData.category) {
  //     dispatch(fetchSubcategories(formData.category));
  //   }
  // }, [formData.category, dispatch]);
  useEffect(() => {
  if (formData.category) {
    dispatch(fetchSubcategories(formData.category));
  }
}, [formData.category, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = recruiter?.token || localStorage.getItem("token");
    try {
      // Step 1: Create Razorpay order
      const orderResponse = await dispatch(
        createJobPostOrderThunk({ data: formData, token })
      ).unwrap();

    const options = {
  key: razorpayKey, // ✅ Use your Razorpay key,
  amount: orderResponse.order.amount,
  currency: orderResponse.order.currency,
  name: "Kammilgya Jobs",
  description: "Job Post Payment",
  order_id: orderResponse.order.id, // ✅ IMPORTANT

  handler: async function (response) {
    console.log("🧾 Razorpay Response:", response); // ✅ Check this first

    const jobData = {
      ...formData,
      jobpost: Number(formData.jobpost),
      experience: Number(formData.experience),
      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),
      phone: Number(formData.phone),
      subCategory: formData.subcategory,
      recruiter: recruiter?._id,
    };

    try {
      await axios.post("/api/payment/job-post/verify", {
        razorpay_order_id: response.razorpay_order_id,       // ✅ Must exist
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,     // ✅ Must exist
        jobData,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Job posted successfully!");
      navigate("/all-job");
    } catch (error) {
      console.error("❌ Payment verification failed:", error);
      toast.error("Payment verification failed.");
    }
  },
  prefill: {
    name: recruiter?.name || "",
    email: recruiter?.email || "",
    contact: formData.phone || "",
  },
  theme: { color: "#0077B6" },
};


      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Payment initiation failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white shadow-xl rounded-xl mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center text-[#0077B6] mb-8">
        Post a New Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title & Post Count */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Job Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              No. of Job Post
            </label>
            <input
              type="number"
              name="jobpost"
              value={formData.jobpost}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., 101"
            />
          </div>
        </div>

        {/* Category & Subcategory */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
              disabled={catLoading}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Subcategory
            </label>
            {/* <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              disabled={!formData.category || subLoading}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select> */}

            <select
  name="subcategory"
  value={formData.subcategory}
  onChange={handleChange}
  disabled={!formData.category || subLoading}
>
  <option value="">Select Subcategory</option>
  {subcategories.map((sub) => (
    <option key={sub._id} value={sub._id}>
      {sub.name}
    </option>
  ))}
</select>

          </div>
        </div>

        {/* Experience & Company */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Experience (Years)
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., 2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Company Name
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              // required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Company Inc."
            />
          </div>
        </div>

        {/* Website & Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="https://company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              // required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., Delhi, India"
            />
          </div>
        </div>

        {/* Deadline & Phone */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div> */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Contact Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., +1234567890"
              required
            />
          </div>
        </div>

        {/* Salary Range */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Minimum Salary
            </label>
            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., 30000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Maximum Salary
            </label>
            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="e.g., 60000"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Job Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            // required
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="Provide a detailed description of the job role..."
          ></textarea>
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Responsibilities
          </label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="List the responsibilities expected from the candidate..."
          ></textarea>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Requirements
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
            placeholder="List qualifications, skills, and experience needed..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting || catLoading || subLoading}
            className={`bg-[#0077B6] text-white font-medium py-3 px-6 rounded-md hover:bg-[#023E8A] transition duration-300 ${
              isSubmitting || catLoading || subLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isSubmitting ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;