import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyPostedJobs, deleteJob, updateJob } from "../../app/job/thunak";
import { fetchCategories } from "../../app/categories/categorythunk";
import { fetchSubcategories } from "../../app/subcategories/subcategoryThunk";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";

const ManageJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postedJobs, loading } = useSelector((state) => state.job);

 const { categories } = useSelector((state) => state.categories);
const { subcategories } = useSelector((state) => state.subcategories);


  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
  dispatch(fetchCategories());
}, [dispatch]);

// useEffect(() => {
//   if (editingJob?.category?._id) {
//     dispatch(fetchSubcategories(editingJob.category._id));
//   }
// }, [editingJob?.category, dispatch]);

useEffect(() => {
  if (editingJob?.subcategory?._id && subcategories.length > 0) {
    // check if editingJob.subcategory exists in the fetched subcategories
    const found = subcategories.find((s) => s._id === editingJob.subcategory._id);
    if (found) {
      setEditingJob((prev) => ({
        ...prev,
        subcategory: { _id: found._id, name: found.name },
      }));
    }
  }
}, [subcategories, editingJob?.subcategory?._id]);



  useEffect(() => {
    dispatch(fetchMyPostedJobs()).then((res) => {
      console.log("DATA FROM THUNK:", res);
    });
  }, []);

  const handelDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(id)).then(() => {
        dispatch(fetchMyPostedJobs()); // Refresh list after delete
      });
    }
  };

  // const handleEditClick = (job) => {
  //   setEditingJob(job);
  //   setShowModal(true);
  // };

  const handleEditClick = (job) => {
  setEditingJob({
    ...job,
    category: job.category?._id ? job.category : { _id: job.category }, 
    // subcategory: job.subcategory?._id ? job.subcategory : { _id: job.subcategory }
  });

  // Agar category hai to uske subcategories load kar lo
  if (job.category?._id) {
    // dispatch(fetchSubcategories(job.category._id));
  }
  // setIsModalOpen(true);
  setShowModal(true);

};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingJob({ ...editingJob, [name]: value });
  };

  // const handleUpdateJob = () => {
  //   dispatch(updateJob({ id: editingJob._id, jobData: editingJob })).then(() => {
  //     setShowModal(false);
  //     dispatch(fetchMyPostedJobs());
  //   });
  // };

  const handleUpdateJob = () => {
  const jobData = {
    ...editingJob,
    skills: editingJob.skills
      ? (Array.isArray(editingJob.skills) 
          ? editingJob.skills 
          : editingJob.skills.split(",").map((s) => s.trim()))
      : [],
  };

  dispatch(updateJob({ id: editingJob._id, jobData })).then(() => {
    setShowModal(false);
    dispatch(fetchMyPostedJobs());
  });
};


  // Filter and paginate jobs
  const filteredJobs = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const base = (postedJobs || []).filter((job) =>
      (
        job?.title?.toString().toLowerCase().includes(term) ||
        job?.company?.toString().toLowerCase().includes(term) ||
        job?.location?.toString().toLowerCase().includes(term) ||
        job?.type?.toString().toLowerCase().includes(term) ||
        job?.status?.toString().toLowerCase().includes(term)
      )
    );
    return base;
  }, [postedJobs, searchTerm]);

  const pagedJobs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredJobs.slice(start, end);
  }, [filteredJobs, currentPage, pageSize]);

  useEffect(() => {
    // reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, pageSize]);

  return (
    <div className="p-6 mb-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Jobs</h1>

      {/* Search + Page size controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="relative max-w-md w-full">
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs by title, company, location, type, status..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            className="border px-2 py-1 rounded"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pagedJobs?.map((job, index) => (
            <div
              key={job._id || index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    job.status === "Open"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Company:</span> {job.company}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Location:</span> {job.location}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Job Type:</span> {job.type}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Posted:</span>{" "}
                {new Date().toDateString()}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  
                  // onClick={() => navigate(`/settings/${job._id}`)}
            onClick={() => navigate(`/jobs/${job._id}`, { replace: false })}

                 
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View Applications
                </button>

                <button
                  onClick={() => handleEditClick(job)}
                  className="px-4 py-2 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handelDelete(job._id)}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {Math.max(1, Math.ceil(filteredJobs.length / pageSize))}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            {Array.from({ length: Math.ceil(filteredJobs.length / pageSize) }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 3),
                Math.max(0, currentPage - 3) + 5
              )
              .map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 border rounded ${
                    page === currentPage ? "bg-blue-600 text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage >= Math.ceil(filteredJobs.length / pageSize)}
              onClick={() =>
                setCurrentPage((p) => Math.min(Math.ceil(filteredJobs.length / pageSize), p + 1))
              }
            >
              Next
            </button>
          </div>
        </div>
      )}

     

      {/* 📝 Edit Modal */}
{showModal && editingJob && (
  <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Job</h2>

      {/* Title & Job Post */}
      <label className="block mb-2 text-sm font-medium">Job Title</label>
      <input
        type="text"
        name="title"
        value={editingJob.title || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2 text-sm font-medium">No. of Job Post</label>
      <input
        type="number"
        name="jobpost"
        value={editingJob.jobpost || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Category & Subcategory */}
      {/* <label className="block mb-2 text-sm font-medium">Category</label>
      <input
        type="text"
        name="category"
        // value={editingJob.category || ""}
        value={editingJob.category?._id || ""}
        // onChange={handleInputChange}

        onChange={(e) => {
          handleInputChange(e);
          dispatch(fetchCategories(e.target.value));
          setEditingJob((prev) => ({ ...prev, category: "" })); // reset subcategory
        }}
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2 text-sm font-medium">Subcategory</label>
      <input
        type="text"
        name="subcategory"
        // value={editingJob.subcategory || ""}
        // value={editingJob?.subcategory?.name || ""}
        value={editingJob.category?._id || ""}
        // onChange={handleInputChange}

        onChange={(e) => {
          handleInputChange(e);
          dispatch(fetchSubcategories(e.target.value));
          setEditingJob((prev) => ({ ...prev, subcategory: "" })); // reset subcategory
        }}
        className="w-full p-2 mb-4 border rounded"
      /> */}


      {/* Category Dropdown */}
<label className="block mb-2 text-sm font-medium">Category</label>
<select
  name="category"
  value={editingJob.category?._id || ""}
  onChange={(e) => {
    const selectedCategoryId = e.target.value;
    setEditingJob((prev) => ({ ...prev, category: { _id: selectedCategoryId }, subcategory: "" }));
    // dispatch(fetchSubcategories(selectedCategoryId));
  }}
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>

{/* Subcategory Dropdown */}
{/* <label className="block mb-2 text-sm font-medium">Subcategory</label> */}
{/* <select
  name="subcategory"
  value={editingJob.subcategory?._id || ""}
  onChange={(e) =>
    setEditingJob((prev) => ({
      ...prev,
      subcategory: {
        _id: e.target.value,
        name: subcategories.find((s) => s._id === e.target.value)?.name || "",
      },
    }))
  }
  disabled={!editingJob.category?._id}
>
  <option value="">Select Subcategory</option>
  {subcategories.map((sub) => (
    <option key={sub._id} value={sub._id}>
      {sub.name}
    </option>
  ))}
</select> */}




      {/* Company & Website */}
      <label className="block mb-2 text-sm font-medium">Company</label>
      <input
        type="text"
        name="company"
        value={editingJob.company || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2 text-sm font-medium">Website</label>
      <input
        type="url"
        name="website"
        value={editingJob.website || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Location */}
      <label className="block mb-2 text-sm font-medium">Location</label>
      <input
        type="text"
        name="location"
        value={editingJob.location || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Salary */}
      <label className="block mb-2 text-sm font-medium">Minimum Salary</label>
      <input
        type="number"
        name="salaryMin"
        value={editingJob.salaryMin || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2 text-sm font-medium">Maximum Salary</label>
      <input
        type="number"
        name="salaryMax"
        value={editingJob.salaryMax || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded"
      />
      
     {/* <label className="block mb-2 text-sm font-medium">Skills (comma separated)</label> */}
{/* Skills */}
<label className="block mb-2 text-sm font-medium">Skills (comma separated)</label>
<input
  type="text"
  name="skills"
  value={Array.isArray(editingJob.skills) ? editingJob.skills.join(", ") : editingJob.skills || ""}
  onChange={handleInputChange}
  placeholder="Enter skills"
  className="w-full p-2 mb-4 border rounded"
/>


      {/* Experience */}
      <label className="block mb-2 text-sm font-medium">Experience (Years)</label>
      <input
        type="number"
        name="experience"
        value={editingJob.experience || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Phone */}
      <label className="block mb-2 text-sm font-medium">Contact Phone</label>
      <input
        type="tel"
        name="phone"
        value={editingJob.phone || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Description */}
      <label className="block mb-2 text-sm font-medium">Job Description</label>
      <textarea
        name="description"
        value={editingJob.description || ""}
        onChange={handleInputChange}
        rows="3"
        className="w-full p-2 mb-4 border rounded"
      ></textarea>

      {/* Responsibilities */}
      <label className="block mb-2 text-sm font-medium">Responsibilities</label>
      <textarea
        name="responsibilities"
        value={editingJob.responsibilities || ""}
        onChange={handleInputChange}
        rows="3"
        className="w-full p-2 mb-4 border rounded"
      ></textarea>

      {/* Requirements */}
      <label className="block mb-2 text-sm font-medium">Requirements</label>
      <textarea
        name="requirements"
        value={editingJob.requirements || ""}
        onChange={handleInputChange}
        rows="3"
        className="w-full p-2 mb-4 border rounded"
      ></textarea>

      {/* Status */}
      <label className="block mb-2 text-sm font-medium">Status</label>
      <select
        name="status"
        value={editingJob.status || "Open"}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateJob}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ManageJobs;
