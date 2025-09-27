import React, { useEffect } from "react";
import { FaBriefcase, FaUserCheck, FaEye, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {  fetchMyPostedJobs } from "../../app/job/thunak";
import { fetchAdminUsers } from "../../app/admin/adminThunk";
import {useNavigate} from "react-router-dom"


const DashboardHome = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate()
  // const { postedJobs, loading } = useSelector((state) => state.job);

  // const { appliedJobs } = useSelector((state) => state.job);
  // console.log(postedJobs.length , "hadnnd dudjd");

  //  const { postedJobs, appliedJobs, loading } = useSelector((state) => state.job);
    const { postedJobs } = useSelector((state) => state.job);
  const { users } = useSelector((state) => state.admin);
    // const { employwer} = useSelector((state) => state.admin);
    const { recruiters} = useSelector((state) => state.admin);
    

//     const adminState = useSelector((state) => state.admin);
// console.log("adminState =>", adminState);

//     console.log("empp", recruiters,);
//     console.log("userrrr",users)
    



  // const appliedJobs = useSelector((state) => state.job.appliedJobs); // from job slice
  // const appliedJobsCount = appliedJobs?.length || 0;


    //    useEffect(() => {
    //   dispatch(fetchAppliedJobs());
    //    dispatch(fetchMyPostedJobs());
    // }, [dispatch]);

     useEffect(() => {
    // dispatch(fetchAppliedJobs());
    dispatch(fetchMyPostedJobs());
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  return (
  
    <div className="min-h-screen  p-4 bg-gray-100">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h1>
        <p className="text-gray-500">Here's what's happening with your job posts today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div onClick={()=>navigate("/employer-dash/manage-jobs")}   className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <FaBriefcase size={24} />
            </div>
            <div>
              <h2 className="text-gray-600">Total Jobs</h2>
<p className="text-2xl font-bold">{postedJobs?.length || 0}</p>
            </div>
          </div>
        </div>
 
        <div onClick={()=>navigate("/employer-dash/applications")} className="bg-white  p-6 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <FaUserCheck size={24} />
            </div>
            <div>
              <h2 className="text-gray-600">Applications</h2>
              <p className="text-2xl font-bold">{users?.length || 0}</p>
            </div>
          </div>
        </div>
{/* 
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
              <FaEye size={24} />
            </div>
            <div>
              <h2 className="text-gray-600">Profile Views</h2>
              <p className="text-2xl font-bold">120</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Action Button */}
      <div className="mb-6 text-right">
        {/* <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition">
          <FaPlus />
          Post New Job
        </button> */}
      </div>

      {/* Recent Applications */}
      {/* <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-left">
                <th className="p-3">Candidate</th>
                <th className="p-3">Position</th>
                <th className="p-3">Status</th>
                <th className="p-3">Applied On</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">Rahul Sharma</td>
                <td className="p-3">Electrician</td>
                <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Under Review</span></td>
                <td className="p-3">2025-06-15</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">Aman Gupta</td>
                <td className="p-3">Security Guard</td>
                <td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pending</span></td>
                <td className="p-3">2025-06-14</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">Nisha Rani</td>
                <td className="p-3">Cook</td>
                <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Shortlisted</span></td>
                <td className="p-3">2025-06-13</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardHome;
