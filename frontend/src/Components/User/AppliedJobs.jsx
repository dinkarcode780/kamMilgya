import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEye,
  FaPhoneAlt,
  FaSearch,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppliedJobs } from "../../app/job/thunak"; // ✅ correct path
import moment from "moment";
import DataTable from "react-data-table-component";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "interview scheduled": "bg-blue-100 text-blue-800",
  selected: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const { appliedJobs, loading, error } = useSelector((state) => state.job);

  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  useEffect(() => {
    if (appliedJobs) {
      const result = appliedJobs.filter((job) =>
        job.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.job?.recruiter?.companyName?.toLowerCase().includes(search.toLowerCase()) ||
        job.job?.location?.toLowerCase().includes(search.toLowerCase()) ||
        job.status?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredJobs(result);
    }
  }, [search, appliedJobs]);

  // ✅ DataTable columns
  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1, // Row numbering
      width: "70px",
    },
    {
      name: "Job Title",
      selector: (row) => row.job?.title || "N/A",
      sortable: true,
      wrap: true,
    },
    {
      name: "Company",
      selector: (row) => row.job?.recruiter?.companyName || "N/A",
      sortable: true,
      wrap: true,
    },
    {
      name: "Location",
      cell: (row) => (
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-blue-500" />
          {row.job?.location || "N/A"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[row.status?.toLowerCase()] ||
            "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Applied Date",
      cell: (row) => (
        <span className="flex items-center gap-1">
          <FaCalendarAlt className="text-gray-500" />
          {moment(row.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => setSelectedJob(row)}
          className="text-sm px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow flex items-center gap-1 whitespace-nowrap"
        >
          <FaEye /> View
        </button>
      ),
    },
  ];

  
  return (
    <div className="bg-white p-6 rounded-md shadow max-w-7xl mx-auto mt-4 mb-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        My Applied Jobs
      </h2>

      {/* ✅ Total Applied Jobs */}
      <div className="flex justify-between items-center mb-4 relative">
        {/* <p className="text-lg font-semibold text-gray-700">
          Total Applied:{" "}
          <span className="text-blue-600">{filteredJobs.length}</span>
        </p> */}
      <FaSearch className="absolute left-55 ms:-left-[75%] top-1/2 transform -translate-y-1/2 text-gray-400" />
        {/* ✅ Search Bar */}
        <input
          type="text"
          placeholder="Search jobs..."
          className="border px-3 py-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ✅ DataTable with pagination */}
      <DataTable
        columns={columns}
        data={filteredJobs}
        pagination
        highlightOnHover
        striped
        persistTableHead
        responsive
         paginationPerPage={10} // default rows per page
  paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
  
 paginationComponentOptions={{
    rowsPerPageText: `Rows per page (Total ${filteredJobs.length})`,
    rangeSeparatorText: "of", 
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  }}
      />

      {/* ✅ Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md max-w-md w-full relative shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-700">
              Recruiter Details
            </h3>
            <p>
              <span className="font-semibold">Company:</span>{" "}
              {selectedJob.job?.recruiter?.companyName}
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaPhoneAlt className="text-green-600" />
              <span className="font-semibold">Phone:</span>{" "}
              {selectedJob.job?.phone}
            </p>
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;

