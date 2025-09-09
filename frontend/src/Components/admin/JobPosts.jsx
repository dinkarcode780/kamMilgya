// const JobPosts = () => {
//   const jobPosts = [
//     { id: 1, title: 'Frontend Developer', company: 'Tech Corp', applications: 12, status: 'Active' },
//     { id: 2, title: 'UI Designer', company: 'Design Studio', applications: 8, status: 'Active' },
//     { id: 3, title: 'Backend Engineer', company: 'Tech Corp', applications: 5, status: 'Closed' },
//   ];

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Job Posts</h2>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Create New Job Post
//         </button>
//       </div>
      
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {jobPosts.map(job => (
//               <tr key={job.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{job.company}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{job.applications}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                     ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {job.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
//                   <button className="text-red-600 hover:text-red-900">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default JobPosts;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllJobsAdmin, deleteJob, updateJob } from "../../app/job/thunak";

// const JobPosts = () => {
//   const dispatch = useDispatch();
//   const { allJobsAdmin = [], loading } = useSelector((state) => state.job);

//   useEffect(() => {
//     dispatch(fetchAllJobsAdmin());
//   }, [dispatch]);

//   // Delete job handler
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this job?")) {
//       dispatch(deleteJob(id)).then(() => dispatch(fetchAllJobsAdmin()));
//     }
//   };

//   // Edit job handler (simple example: toggle isActive)
//   const handleEdit = (job) => {
//     const updatedJob = { ...job, isActive: !job.isActive };
//     dispatch(updateJob({ id: job._id, jobData: updatedJob })).then(() =>
//       dispatch(fetchAllJobsAdmin())
//     );
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Job Posts</h2>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Create New Job Post
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-6">Loading...</td>
//               </tr>
//             ) : allJobsAdmin.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-6">No jobs found.</td>
//               </tr>
//             ) : (
//               allJobsAdmin.map((job) => (
//                 <tr key={job._id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{job.recruiter?.companyName || job.recruiter?.name || "N/A"}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{job.applications?.length || 0}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${job.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                       {job.isActive ? "Active" : "Disabled"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => alert(JSON.stringify(job, null, 2))}>View</button>
//                     <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => handleEdit(job)}>Edit</button>
//                     <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(job._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default JobPosts;




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobsAdmin, deleteJob, updateJob } from "../../app/job/thunak";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPosts = () => {
  const dispatch = useDispatch();
  const { allJobsAdmin = [], loading } = useSelector((state) => state.job);

  // Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchAllJobsAdmin());
  }, [dispatch]);

  // Reset page if data changes and current page is out of range
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil((allJobsAdmin?.length || 0) / pageSize));
    if (currentPage > totalPages) setCurrentPage(1);
  }, [allJobsAdmin, pageSize]);

  // Delete job handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(id))
        .then(() => {
          dispatch(fetchAllJobsAdmin());
          toast.success("Job deleted successfully!");
        })
        .catch(() => toast.error("Failed to delete job"));
    }
  };

  // Open edit modal
  const handleEdit = (job) => {
    setEditJob(job);
    setEditModalOpen(true);
  };

  // Update job handler
  const handleUpdateJob = (e) => {
    e.preventDefault();
    // Send only safe, editable fields to backend
    const jobData = {
      title: editJob.title,
      isActive: !!editJob.isActive,
    };
    dispatch(updateJob({ id: editJob._id, jobData }))
      .then(() => {
        setEditModalOpen(false);
        dispatch(fetchAllJobsAdmin());
        toast.success("Job updated successfully!");
      })
      .catch(() => toast.error("Failed to update job"));
  };

  // Responsive actions: hide on small screens, show on hover
  const actionCellClass =
    "px-6 py-4 whitespace-nowrap";

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Jobs</h2>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create New Job Post
        </button> */}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600">
          Showing active jobs first
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>Rows per page:</span>
          <select
            className="border px-2 py-1 rounded"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">Loading...</td>
              </tr>
            ) : allJobsAdmin.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6">No jobs found.</td>
              </tr>
            ) : (
              // Sort: Active first, then by title
              (() => {
                const sorted = [...allJobsAdmin].sort((a, b) => {
                  if (a.isActive === b.isActive) {
                    return (a.title || "").localeCompare(b.title || "");
                  }
                  return a.isActive ? -1 : 1;
                });
                const start = (currentPage - 1) * pageSize;
                const end = start + pageSize;
                return sorted.slice(start, end);
              })().map((job) => (
                <tr key={job._id} className="group hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.recruiter?.companyName || job.recruiter?.name || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.applications?.length || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${job.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {job.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className={actionCellClass}>
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="px-3 py-1 text-xs sm:text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                        onClick={() => alert(JSON.stringify(job, null, 2))}
                      >
                        View
                      </button>
                      <button
                        className="px-3 py-1 text-xs sm:text-sm border border-yellow-600 text-yellow-700 rounded hover:bg-yellow-50"
                        onClick={() => handleEdit(job)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 text-xs sm:text-sm border border-red-600 text-red-600 rounded hover:bg-red-50"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {allJobsAdmin.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {Math.max(1, Math.ceil(allJobsAdmin.length / pageSize))}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            {Array.from({ length: Math.ceil(allJobsAdmin.length / pageSize) }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 3),
                Math.max(0, currentPage - 3) + 5
              )
              .map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 border rounded ${
                    page === currentPage ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage >= Math.ceil(allJobsAdmin.length / pageSize)}
              onClick={() => setCurrentPage((p) => Math.min(Math.ceil(allJobsAdmin.length / pageSize), p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded shadow-lg w-full max-w-md"
            onSubmit={handleUpdateJob}
          >
            <h3 className="text-xl font-bold mb-4">Edit Job</h3>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              className="border px-3 py-2 rounded w-full mb-4"
              value={editJob.title}
              onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
              required
            />
            <label className="block mb-2">Status</label>
            <select
              className="border px-3 py-2 rounded w-full mb-4"
              value={editJob.isActive ? "Active" : "Disabled"}
              onChange={(e) =>
                setEditJob({ ...editJob, isActive: e.target.value === "Active" })
              }
            >
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
            {/* Add more fields as needed */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-300"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default JobPosts;