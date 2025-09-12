// // components/AdminUsers.jsx
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DataTable from "react-data-table-component";
// import { deleteUserByAdmin, fetchAdminUsers, updateUserByAdmin } from "../../app/admin/adminThunk";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaSearch } from "react-icons/fa";

// const Candidates = () => {
//   const dispatch = useDispatch();
//   const { users, loadingUsers, errorUsers, updateStatus } = useSelector(
//     (state) => state.admin
//   );

//   const { user: currentUser } = useSelector((state) => state.auth);
  
//   const [editUser, setEditUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     role: "",
//   });

//   useEffect(() => {
//     dispatch(fetchAdminUsers());
//   }, [dispatch, updateStatus]);

//   const handleEdit = (user) => {

//      console.log("Editing user:", user);
//     setEditUser(user);
//     setFormData({
//       name: user.name || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       role: user.role || "",
//     });
//   };

//   // const handleUpdate = () => {
//   //   dispatch(updateUserByAdmin({ userId: editUser._id, paload: formData }));
//   // };

//     const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const handleUpdate = () => {
//   //   if (!editUser) return;
//   //   dispatch(updateUserByAdmin({ userId: editUser._id, payload: formData }));
//   //   setEditUser(null); // close edit mode after update
//   // };

// //   const handleUpdate = () => {
// //   if (!editUser) return;
// //   dispatch(updateUserByAdmin({ userId: editUser._id, payload: formData }))
// //     .unwrap()
// //     .then(() => {
// //       setEditUser(null); // ✅ sirf success hone pe band karo
// //     })
// //     .catch((err) => {
// //       console.error("Update failed", err);
// //     });
// // };


// const handleUpdate = () => {
//   if (!editUser) return;

//   const payload = {};
//   if (formData.name !== editUser.name) payload.name = formData.name;
//   if (formData.email !== editUser.email) payload.email = formData.email;
//   if (formData.phone !== editUser.phone) payload.phone = formData.phone;
//   if (formData.role !== editUser.role) payload.role = formData.role;

//   if (Object.keys(payload).length === 0) {
//     toast.info("No changes detected ⚠️");
//     return;
//   }

//   dispatch(updateUserByAdmin({ userId: editUser._id, payload }))
//     .unwrap()
//     .then(() => {
//       toast.success("User updated successfully ✅");
//       setEditUser(null);
//     })
//     .catch((err) => {
//       toast.error(err?.message || "Update failed ❌");
//       console.error("Update failed", err);
//     });
// };


// // const handleDelete = (userId) => {
// //   if (window.confirm("Are you sure you want to delete this user?")) {
// //     dispatch(deleteUserByAdmin(userId))
// //   }
// // };

//   const handleDelete = (userId) => {
//   if (window.confirm("Are you sure you want to delete this user?")) {
//     dispatch(deleteUserByAdmin(userId))
//       .unwrap()
//       .then((res) => {
//         toast.success(res.message || "User deleted successfully ✅");
//       })
//       .catch((err) => {
//         toast.error(err || "Failed to delete user ❌");
//       });
//   }
// };

// // Filter users based on search term
// const filteredUsers =
// users
//   .filter(user => user._id !== currentUser?._id) 
// users.filter(user => 
//   user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
// );



//   const columns = [
//     {
//       name: "S/N",
//       cell: (row, index) => index + 1,
//       width: "60px",
//       center: true,
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//     },
//     {
//       name: "Role",
//       selector: (row) => row.role,
//       sortable: true,
//     },
//     // {
//     //   name: "Status",
//     //   cell: (row) => (
//     //     <span
//     //       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//     //         row.status === "Active"
//     //           ? "bg-green-100 text-green-800"
//     //           : "bg-red-100 text-red-800"
//     //       }`}
//     //     >
//     //       {row.status}
//     //     </span>
//     //   ),
//     // },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex gap-2">      
//           <button
//             className="text-blue-600 hover:underline"
//             // onClick={() => console.log("Edit", row.id)}
//             onClick={()=>handleEdit(row)}
//           >
//             Edit
//           </button>
//           <button
//             className="text-red-600 hover:underline"
//             // onClick={() => console.log("Delete", row.id)}
//              onClick={() => handleDelete(row._id)}
//           >
//             Delete

//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];

//   return (
//     <div className="p-6">
//       {/* <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">All Users</h2>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Add User
//         </button>
//       </div> */}

//       {/* Search Bar */}
//       <div className="mb-4  relative">
//           <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search users by name, email, role, or phone..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//       </div>

//       {loadingUsers && <p>Loading users...</p>}
//       {errorUsers && <p className="text-red-600">{errorUsers}</p>}

//       {!loadingUsers && filteredUsers?.length > 0 && (
//         <div className="bg-white rounded shadow p-4">
//           <DataTable
//             columns={columns}
//             data={filteredUsers}
//             pagination
//             highlightOnHover
//             striped
//             responsive
//           />
//         </div>
//       )}

//       {!loadingUsers && filteredUsers?.length === 0 && searchTerm && (
//         <div className="bg-white rounded shadow p-4 text-center">
//           <p className="text-gray-500">No users found matching "{searchTerm}"</p>
//         </div>
//       )}



// {editUser && (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//     <div className="bg-white p-6 rounded-lg w-96">
//       <h2 className="text-xl font-bold mb-4">Edit User</h2>

//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Name"
//         className="border p-2 w-full mb-2 rounded"
//       />
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//         className="border p-2 w-full mb-2 rounded"
//       />
//       <input
//         type="text"
//         name="phone"
//         value={formData.phone}
//         onChange={handleChange}
//         placeholder="Phone"
//         className="border p-2 w-full mb-2 rounded"
//       />
//       {/* <select
//         name="role"
//         value={formData.role}
//         onChange={handleChange}
//         className="border p-2 w-full mb-2 rounded"
//       >
//         <option value="">Select Role</option>
//         <option value="user">User</option>
//         <option value="recruiter">Recruiter</option>
//         <option value="admin">Admin</option>
//       </select> */}

//       <div className="flex justify-end gap-2">
//         <button
//           onClick={handleUpdate}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Save
//         </button>
//         <button
//           onClick={() => setEditUser(null)}
//           className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// )}


//  <ToastContainer position="top-right" autoClose={3000} />




//     </div>
//   );
// };

// export default Candidates;


// components/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { deleteUserByAdmin, fetchAdminUsers, updateUserByAdmin } from "../../app/admin/adminThunk";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa";

const Candidates = () => {
  const dispatch = useDispatch();
  const { users, loadingUsers, errorUsers, updateStatus } = useSelector(
    (state) => state.admin
  );

  const { user: currentUser } = useSelector((state) => state.auth);
  
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch, updateStatus]);

  const handleEdit = (user) => {

     console.log("Editing user:", user);
    setEditUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "",
    });
  };

  // const handleUpdate = () => {
  //   dispatch(updateUserByAdmin({ userId: editUser._id, paload: formData }));
  // };

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleUpdate = () => {
  //   if (!editUser) return;
  //   dispatch(updateUserByAdmin({ userId: editUser._id, payload: formData }));
  //   setEditUser(null); // close edit mode after update
  // };

//   const handleUpdate = () => {
//   if (!editUser) return;
//   dispatch(updateUserByAdmin({ userId: editUser._id, payload: formData }))
//     .unwrap()
//     .then(() => {
//       setEditUser(null); // ✅ sirf success hone pe band karo
//     })
//     .catch((err) => {
//       console.error("Update failed", err);
//     });
// };


const handleUpdate = () => {
  if (!editUser) return;

  const payload = {};
  if (formData.name !== editUser.name) payload.name = formData.name;
  if (formData.email !== editUser.email) payload.email = formData.email;
  if (formData.phone !== editUser.phone) payload.phone = formData.phone;
  if (formData.role !== editUser.role) payload.role = formData.role;

  if (Object.keys(payload).length === 0) {
    toast.info("No changes detected ⚠️");
    return;
  }

  dispatch(updateUserByAdmin({ userId: editUser._id, payload }))
    .unwrap()
    .then(() => {
      toast.success("User updated successfully ✅");
      setEditUser(null);
    })
    .catch((err) => {
      toast.error(err?.message || "Update failed ❌");
      console.error("Update failed", err);
    });
};


// const handleDelete = (userId) => {
//   if (window.confirm("Are you sure you want to delete this user?")) {
//     dispatch(deleteUserByAdmin(userId))
//   }
// };

  const handleDelete = (userId) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    dispatch(deleteUserByAdmin(userId))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "User deleted successfully ✅");
      })
      .catch((err) => {
        toast.error(err || "Failed to delete user ❌");
      });
  }
};

// Filter users based on search term
// const filteredUsers =
// users
//   .filter(user => user._id !== currentUser?._id) 
// users.filter(user => 
//   user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
// );

// Filter users based on search term
const filteredUsers = users
  ?.filter(user => user._id !== currentUser?._id) // exclude current user
  .filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );




  const columns = [
    {
      name: "S/N",
      cell: (row, index) => index + 1,
      width: "60px",
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    // {
    //   name: "Status",
    //   cell: (row) => (
    //     <span
    //       className={`px-2 py-1 rounded-full text-xs font-semibold ${
    //         row.status === "Active"
    //           ? "bg-green-100 text-green-800"
    //           : "bg-red-100 text-red-800"
    //       }`}
    //     >
    //       {row.status}
    //     </span>
    //   ),
    // },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">      
          <button
            className="text-blue-600 hover:underline"
            // onClick={() => console.log("Edit", row.id)}
            onClick={()=>handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="text-red-600 hover:underline"
            // onClick={() => console.log("Delete", row.id)}
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

  return (
    <div className="p-6">
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Users</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add User
        </button>
      </div> */}

      {/* Search Bar */}
      <div className="mb-4  relative">
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search users by name, email, role, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {loadingUsers && <p>Loading users...</p>}
      {errorUsers && <p className="text-red-600">{errorUsers}</p>}

      {!loadingUsers && filteredUsers?.length > 0 && (
        <div className="bg-white rounded shadow p-4">
          <DataTable
            columns={columns}
            data={filteredUsers}
            pagination
            highlightOnHover
            striped
            responsive
            paginationPerPage={10} // default rows per page
  paginationRowsPerPageOptions={[5, 10, 20, 50, 100, filteredUsers.length]} 
          />
        </div>
      )}

      {!loadingUsers && filteredUsers?.length === 0 && searchTerm && (
        <div className="bg-white rounded shadow p-4 text-center">
          <p className="text-gray-500">No users found matching "{searchTerm}"</p>
        </div>
      )}



{editUser && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white p-6 rounded-lg  w-96 ">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full mb-2 rounded"
     
         
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 w-full mb-2 rounded"
      />
      {/* <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
      >
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="recruiter">Recruiter</option>
        <option value="admin">Admin</option>
      </select> */}

      <div className="flex justify-end gap-2">
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
        <button
          onClick={() => setEditUser(null)}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


 <ToastContainer position="top-right" autoClose={3000} />




    </div>
  );
};

export default Candidates;
