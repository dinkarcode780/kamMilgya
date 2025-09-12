// import React, { useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   FaMapMarkerAlt,
//   FaClock,
//   FaBriefcase,
//   FaStar,
//   FaFire,
//   FaPhone,
//   FaArrowLeft,
//   FaMoneyBillWave,
//   FaUserTie
// } from 'react-icons/fa';
// import { fetchJobs } from '../app/job/thunak';

// const JobDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { allJobs: jobs, loading, error } = useSelector((state) => state.job);

//   // Fetch jobs if not already loaded
//   useEffect(() => {
//     if (jobs.length === 0) {
//       dispatch(fetchJobs());
//     }
//   }, [dispatch, jobs.length]);

//   // Find the job with matching ID
//   const job = jobs.find(job => job._id === id);

//   if (loading) {
//     return <div className="text-center py-10">Loading job details...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-500">{error}</div>;
//   }

//   if (!job) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <Link to="/" className="flex items-center text-blue-600 mb-6">
//           <FaArrowLeft className="mr-2" /> Back to Jobs
//         </Link>
//         <div className="text-center py-10">Job not found</div>
//       </div>
//     );
//   }

//   // ... rest of your component remains the same ...
//   return (
//     // ... your existing JSX ...
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* <Link to="/jobs" className="flex items-center text-blue-600 mb-6">
//         <FaArrowLeft className="mr-2" /> Back to Jobs
//       </Link> */}

//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         {/* Job Header */}
//         <div className="p-6 border-b">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
//               <p className="text-lg text-gray-600 mt-1">{job.company}</p>
//             </div>
//             <div className="flex space-x-2">
//               {job.featured && (
//                 <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
//                   <FaStar className="mr-1" /> Featured
//                 </span>
//               )}
//               {job.urgent && (
//                 <span className="flex items-center bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
//                   <FaFire className="mr-1" /> Urgent
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Job Details */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="space-y-4">
//               <div className="flex items-start">
//                 <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3" />
//                 <div>
//                   <h3 className="font-semibold text-gray-700">Location</h3>
//                   <p className="text-gray-600">{job.location}</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <FaMoneyBillWave className="text-blue-500 mt-1 mr-3" />
//                 <div>
//                   <h3 className="font-semibold text-gray-700">Salary</h3>
//                   <p className="text-gray-600">
//                     ₹{job.salaryMin} - ₹{job.salaryMax}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <FaUserTie className="text-blue-500 mt-1 mr-3" />
//                 <div>
//                   <h3 className="font-semibold text-gray-700">Experience</h3>
//                   <p className="text-gray-600">
//                     {job.experience || 'Fresher'}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-start">
//                 <FaBriefcase className="text-blue-500 mt-1 mr-3" />
//                 <div>
//                   <h3 className="font-semibold text-gray-700">jobpost</h3>
//                   <p className="text-gray-600">{job.jobpost}</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <FaClock className="text-blue-500 mt-1 mr-3" />
//                 <div>
//                   <h3 className="font-semibold text-gray-700">Posted</h3>
//                   <p className="text-gray-600">
//                     {new Date(job.createdAt).toLocaleDateString('en-IN', {
//                       day: 'numeric',
//                       month: 'long',
//                       year: 'numeric',
//                     })}
//                   </p>
//                 </div>
//               </div>

//               {/* {job.phone && (
//                 <div className="flex items-start">
//                   <FaPhone className="text-blue-500 mt-1 mr-3" />
//                   <div>
//                     <h3 className="font-semibold text-gray-700">Contact</h3>
//                     <a
//                       href={`tel:${job.phone}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       {job.phone}
//                     </a>
//                   </div>
//                 </div>
//               )} */}
//             </div>
//           </div>

//           {/* Job Description */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Job Description
//             </h2>
//             <div className="prose max-w-none text-gray-700">
//               {job.description || 'No description provided.'}
//             </div>
//           </div>

//           {/* Requirements */}
//           {job.requirements && (
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Requirements
//               </h2>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 {job.requirements.split('\n').map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Responsibilities */}
//           {job.responsibilities && (
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Responsibilities
//               </h2>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 {job.responsibilities.split('\n').map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Apply Button */}
//           <div className="flex justify-center mt-8">
//             <a
//               href={`tel:${job.phone}`}
//               className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
//             >
//               <FaPhone className="mr-2" /> Call Now
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDetail;


import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaStar,
  FaFire,
  FaPhone,
  FaArrowLeft,
  FaMoneyBillWave,
  FaUserTie
} from 'react-icons/fa';
import { fetchJobs, applyJob } from '../app/job/thunak';
import axios from '../config/axios';

const JobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allJobs: jobs, loading, error } = useSelector((state) => state.job);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  // Application state
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setMobile] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch jobs if not already loaded
  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobs.length]);

  // Find the job with matching ID
  const job = jobs.find(job => job._id === id);

  const handleApply = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (token) {
  
       if (user?.role === "admin") {
      alert("Admin can't apply job");
      return;
    }
    if (user?.role === "recruiter") {
      alert("Recruiter can't apply job");
      return;
    }


      dispatch(applyJob(id))
        .unwrap()
        .then(() => {
          alert('✅ Applied Successfully');
          setAppliedJobs((prev) => [...prev, id]);
        })
        .catch((err) => {
           console.log("Full error ===>", err);
          const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user?.role === "admin") {
    alert("❌ Admin can't apply job");
  } else if (user?.role === "recruiter") {
    alert("❌ Recruiter can't apply job");
  } else {
     let errorMsg =
      err?.error ||                 // 👈 direct error object
      err?.response?.data?.error || 
      err?.response?.data?.message ||
      err?.message ||
      "Unknown error";

    alert(errorMsg);
    // alert("⚠️ Something went wrong: " + (err?.message || err));
  }
        });
    } else {
      setIsOpen(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/loginphone', { name, phone });
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setIsOpen(false);
      setName('');
      setMobile('');

      // Apply to job after login
      handleApply(e);
    } catch (err) {
      alert('Login Failed');
      console.log(err);
    }
  };

  const handleClose = () => setIsOpen(false);

  if (loading) {
    return <div className="text-center py-10">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="flex items-center text-blue-600 mb-6">
          <FaArrowLeft className="mr-2" /> Back to Jobs
        </Link>
        <div className="text-center py-10">Job not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-blue-600 mb-6">
        <FaArrowLeft className="mr-2" /> Back to Home
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Job Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
              <p className="text-lg text-gray-600 mt-1">{job.company}</p>
            </div>
            <div className="flex space-x-2">
              {job.featured && (
                <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                  <FaStar className="mr-1" /> Featured
                </span>
              )}
              {job.urgent && (
                <span className="flex items-center bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
                  <FaFire className="mr-1" /> Urgent
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-700">Location</h3>
                  <p className="text-gray-600">{job.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaMoneyBillWave className="text-blue-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-700">Salary</h3>
                  <p className="text-gray-600">
                    ₹{job.salaryMin} - ₹{job.salaryMax}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaUserTie className="text-blue-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-700">Experience</h3>
                  <p className="text-gray-600">
                    {job.experience || 'Fresher'}
                  </p>
                </div>
              </div>

               {/* Phone (optional) */}
      {job.phone && (
        <div className="flex items-start">
          <FaPhone className="text-blue-500 mt-1 mr-3" />
          <div>
            <h3 className="font-semibold text-gray-700">Phone</h3>
            <a href={`tel:${job.phone}`} className="text-blue-600 hover:underline">
              {job.phone}
            </a>
          </div>
        </div>
      )}

   {/* Website (optional) */}
      {job.website && (
        <div className="flex items-start">
          <FaBriefcase className="text-blue-500 mt-1 mr-3" />
          <div>
            <h3 className="font-semibold text-gray-700">Website</h3>
            <a href={job.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              {job.website}
            </a>
          </div>
        </div>
      )}

            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <FaBriefcase className="text-blue-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-700">Job Post</h3>
                  <p className="text-gray-600">{job.jobpost}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaClock className="text-blue-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-700">Posted</h3>
                  <p className="text-gray-600">
                    {new Date(job.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Job Description
            </h2>
            <div className="prose max-w-none text-gray-700">
              {job.description || 'No description provided.'}
            </div>
          </div>

          {/* Requirements */}
          {job.requirements && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Requirements
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.requirements.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Responsibilities */}
          {job.responsibilities && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Responsibilities
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.responsibilities.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply Button */}
            <div className="flex justify-center mt-8">
              {appliedJobs.includes(job._id) ? (
                <a
                  href={`tel:${job.phone}`}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                >
                  <FaPhone className="mr-2" /> {job.phone || "Call Now"}
                </a>
              ) : (
                <button
                  onClick={handleApply}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 w-full md:w-auto"
                >
                  Apply Now
                </button>
              )}
            </div>
        </div>
      </div>

      {/* Login Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              Login to Apply
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Mobile Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  placeholder="Enter mobile number"
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Login & Apply
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;