// components/Employers.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { deleteAdminRecruiter, fetchAdminRecruiters, updateAdminRecruiter } from '../../app/admin/adminThunk';

const Employers = () => {
  const dispatch = useDispatch();
  const { recruiters, loadingRecruiters, errorRecruiters,updateStatus, deleteStatus } = useSelector((state) => state.admin);

   const [editRecruiter, setEditRecruiter] = useState(null);

   const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    industry: "",
    website: "",
    location: "",
    businessType: "",
  });
  

  useEffect(() => {
    dispatch(fetchAdminRecruiters());
  }, [dispatch, updateStatus, deleteStatus]);


   const handleEdit = (recruiter) => {

     console.log("Editing recruiter:", recruiter);
    setEditRecruiter(recruiter);
    setFormData({
      companyName: recruiter.companyName || "",
      contactEmail: recruiter.contactEmail || "",
      industry: recruiter.industry || "",
      website: recruiter.website || "",
      location: recruiter.location || "",
      businessType: recruiter.businessType || "",
    });
  };


   const handleUpdate = () => {
    dispatch(updateAdminRecruiter({ recruiterId: editRecruiter._id, payload: formData }));
    setEditRecruiter(null); // close modal
  };


   const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recruiter?")) {
      dispatch(deleteAdminRecruiter(id));
    }
  };




  // useEffect(() => {
  //   dispatch(fetchAdminRecruiters());
  // }, [dispatch]);

  const columns = [
    {
      name: 'Name',
      selector: row => row.contactPerson,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.contactEmail,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.contactPhone,
    },
    {
      name: 'Company',
      selector: row => row.companyName,
    },
    {
      name: 'Jobs Posted',
      selector: row => row.jobsPosted,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
    },
    {
      name: 'Status',
      cell: row => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:underline"
            // onClick={() => console.log('Edit:', row.id)}
             onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="text-red-600 hover:underline"
            // onClick={() => console.log('Delete:', row.id)}
               onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '56px',
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        backgroundColor: '#f9fafb',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
      },
    },
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-2xl font-bold">Employers</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New Employer
        </button> */}
      </div>

      {loadingRecruiters && <p className="text-gray-600">Loading...</p>}
      {errorRecruiters && <p className="text-red-500">{errorRecruiters}</p>}

      {!loadingRecruiters && recruiters.length > 0 && (
        <DataTable
          columns={columns}
          data={recruiters}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={customStyles}
        />
      )}


 {/* 🟢 Edit Modal */}
      {editRecruiter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Recruiter</h2>

            {Object.keys(formData).map((field) => (
              <div key={field} className="mb-3">
                <label className="block text-sm font-medium capitalize mb-1">
                  {field}
                </label>
                <input
                  type="text"
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
            ))}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditRecruiter(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-blue-600 text-white rounded"
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

export default Employers;
