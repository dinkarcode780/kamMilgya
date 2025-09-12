import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { deleteAdminRecruiter, fetchAdminRecruiters, updateAdminRecruiter } from '../../app/admin/adminThunk';
import { FaSearch } from 'react-icons/fa';

const Employers = () => {
  const dispatch = useDispatch();
  const { recruiters, loadingRecruiters, errorRecruiters,updateStatus, deleteStatus } = useSelector((state) => state.admin);

   const [editRecruiter, setEditRecruiter] = useState(null);
   const [searchTerm, setSearchTerm] = useState("");

   const [formData, setFormData] = useState({
    name:"",
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

  //   useEffect(() => {
  //   dispatch(fetchAdminRecruiters());
  // }, [dispatch]);


//   useEffect(() => {
//   if (updateStatus === "success" || deleteStatus === "success") {
//     dispatch(fetchAdminRecruiters());
//   }
// }, [dispatch, updateStatus, deleteStatus]);


   const handleEdit = (recruiter) => {

     console.log("Editing recruiter:", recruiter);
    setEditRecruiter(recruiter);
    setFormData({
       contactPerson: recruiter.contactPerson || "",
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
    setEditRecruiter(null); 
  };


   const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recruiter?")) {
      dispatch(deleteAdminRecruiter(id));
    }
  };

  // Filter recruiters based on search term
  const filteredRecruiters = recruiters.filter(recruiter => 
    recruiter.contactPerson?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    recruiter.contactEmail?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    recruiter.name?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    recruiter.companyName?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    recruiter.contactPhone?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    recruiter.industry?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    recruiter.location?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    recruiter.businessType?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );




  // useEffect(() => {
  //   dispatch(fetchAdminRecruiters());
  // }, [dispatch]);

  const columns = [
    {
      name: 'S/N',
      cell: (row, index) => index + 1,
      width: '60px',
      center: true,
    },
    {
      name: 'Name',
      selector: row => row.contactPerson,
      sortable: true,
      wrap: true,
      
    },
    {
      name: 'Email',
      selector: row => row.contactEmail,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Phone',
      selector: row => row.contactPhone,
      wrap: true,
    },
    {
      name: 'Company',
      selector: row => row.companyName,
      wrap: true,
    },
    {
      // name: 'Jobs Posted',
      // selector: row => row.jobsPosted,
      // sortable: true,
      // wrap: true,
  //  name: 'Jobs Posted',
  // selector: row => row.jobs?.length || 0,
  // sortable: true,
  // wrap: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
    },
    // {
    //   name: 'Status',
    //   cell: row => (
    //     <span
    //       className={`px-2 py-1 rounded-full text-xs font-semibold ${
    //         row.status === 'Active'
    //           ? 'bg-green-100 text-green-800'
    //           : 'bg-red-100 text-red-800'
    //       }`}
    //     >
    //       {row.status}
    //     </span>
    //   ),
    // },
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
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employers</h2>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New Employer
        </button> */}
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative ">
         <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search employers by name, email, company, phone, industry, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      

      {loadingRecruiters && <p className="text-gray-600">Loading...</p>}
      {errorRecruiters && <p className="text-red-500">{errorRecruiters}</p>}

      {!loadingRecruiters && filteredRecruiters.length > 0 && (
        // <DataTable
        //   columns={columns}
        //   data={filteredRecruiters}
        //   pagination
        //   highlightOnHover
        //   striped
        //   responsive
        //   customStyles={customStyles}
        // />
        <DataTable
  columns={columns}
  data={filteredRecruiters}
  pagination
  highlightOnHover
  striped
  responsive
  customStyles={customStyles}
  paginationPerPage={10} 
  paginationRowsPerPageOptions={[5, 10, 20, 50, 100, `Total ${filteredRecruiters.length}`]}
/>

      )}

      {!loadingRecruiters && filteredRecruiters.length === 0 && searchTerm && (
        <div className="bg-white rounded shadow p-4 text-center">
          <p className="text-gray-500">No employers found matching "{searchTerm}"</p>
        </div>
      )}


 {/* 🟢 Edit Modal */}
      {editRecruiter && (
        <div className="fixed inset-0 flex items-center justify-center   bg-black bg-opacity-40 px-4">
          <div 
          className="bg-white p-6 rounded-lg w-full md:w-96 max-h-[80vh] flex flex-col overflow-y-auto  scrollbar-hide"
          // className="bg-white p-6 rounded-lg w-96"
          >
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
