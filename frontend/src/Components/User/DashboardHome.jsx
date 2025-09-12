import React, { useEffect } from "react";
import {
  FaBriefcase,
  FaHeart,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { fetchAppliedJobs } from "../../app/job/thunak";
import { useNavigate } from "react-router-dom";

// import { fetchAppliedJobs } from "../../app/job/thunak"




const DashboardHome = () => {

   const dispatch = useDispatch();
    // const user = useSelector((state) => state.auth.user);
    // const appliedJobsCount = useSelector((state) => state.job.appliedJobs.length);
  // const appliedJobsCount = user?.jobsApplied?.length || 0;
// const savedJobsCount = user?.savedJobs?.length || 0;
const user = useSelector((state) => state.auth.user);
// const appliedJobsCount = useSelector((state) => state.auth.jobsApplied.length);
// const savedJobsCount = useSelector((state) => state.auth.savedJobs.length);

const appliedJobs = useSelector((state) => state.job.appliedJobs); // from job slice
const appliedJobsCount = appliedJobs?.length || 0;

const savedJobsCount = user?.savedJobs?.length || 0;

const navigate = useNavigate();


     useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

    
    // const savedJobsCount = useSelector((state) => state.job.savedJobs.length);
    // const notificationsCount = useSelector((state) => state.notifications.count);       

  return (
    <div className="p-4 md:p-6 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Welcome Back, {user?.name || "User"}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here is a quick overview of your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div
      
        onClick={()=>navigate("/user-dash/applied-jobs")}
      
      className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 cursor-pointer">
        {/* Applied Jobs */}
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
          <FaBriefcase className="text-blue-600 text-3xl" />
          <div
          
          // onClick={()=>navigate("/user-dash/applied-jobs")}
          // onClick={()=>("/user-dash/applied-jobs")}
          className="cursor-pointer"
          
          >
            <p className="text-gray-600">Applied Jobs</p>
            <h3 className="text-xl font-bold text-gray-800">{appliedJobsCount}</h3>
          </div>
        </div>

        {/* Saved Jobs */}
        {/* <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
          <FaHeart className="text-red-500 text-3xl" />
          <div>
            <p className="text-gray-600">Saved Jobss</p>
            <h3 className="text-xl font-bold text-gray-800">{savedJobsCount}</h3>
          </div>
        </div> */}

        {/* Notifications */}
        {/* <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
          <FaBell className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-gray-600">Notifications</p>
            <h3 className="text-xl font-bold text-gray-800">{notificationsCount}</h3>
          </div>
        </div> */}
      </div>

      {/* Profile Overview */}
      {/* <div className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Profile Overview
        </h2>
        <div className="flex items-center gap-4">
          <FaUserCircle className="text-5xl text-gray-500" />
          <div>
            <p className="text-lg font-medium text-gray-800">John Doe</p>
            <p className="text-gray-600">john@example.com</p>
          </div>
        </div>
      </div> */}

      {/* Recent Activity */}
      {/* <div className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <ul className="text-gray-600 space-y-2 list-disc list-inside">
          <li>Applied for Security Guard – 2 days ago</li>
          <li>Saved Driver Job – 4 days ago</li>
          <li>Updated resume – 6 days ago</li>
        </ul>
      </div> */}
    </div>
  );
};

export default DashboardHome;
