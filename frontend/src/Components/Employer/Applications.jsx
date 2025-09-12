

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios";
import { fetchAdminUsers } from "../../app/admin/adminThunk";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";

import {
  createPhoneViewOrderThunk,
  createPhoneViewOrderThunkk,
  verifyPhoneViewPaymentThunk,
  verifyPhoneViewPaymentThunkk,
} from "../../app/payment/Paymenthunk";

const Applications = () => {
  const dispatch = useDispatch();
  // react app env variable for Razorpay key
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  const { id: jobId } = useParams(); // Job ID from URL
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { users, loading, error } = useSelector((state) => state.admin);

  
  console.log(jobId, "Job ID from URL");
  
  console.log("hii",fetchAdminUsers)

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

// const viewHandler = async (userId) => {
//   try {
//     if (!userId) throw new Error("User ID missing");

//     const orderRes = await dispatch(
//       createPhoneViewOrderThunk({ userId, payload: {} })
//     );

//     if (createPhoneViewOrderThunk.rejected.match(orderRes)) {
//       throw new Error("Failed to create phone view order");
//     }

//     const { orderId, amount, currency } = orderRes.payload;

//     const options = {
//       key: razorpayKey,
//       amount,
//       currency,
//       name: "Phone View Payment",
//       description: "Pay to unlock applicant details",
//       order_id: orderId,
//       handler: function (response) {
//         const user = users.find((u) => u._id === userId);
//         if (user) {
//           setSelectedUser(user);
//           setShowPopup(true);
//         } else {
//           alert("User details not found.");
//         }
//       },
//       theme: { color: "#3399cc" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (err) {
//     console.error("viewHandler error:", err);
//     alert(err.message || "Something went wrong");
//   }
// };

 const viewHandler = async (userId) => {
    try {
      if (!userId) throw new Error("User ID missing");

      // Step 1: Create Razorpay order from backend
      const orderRes = await dispatch(
        createPhoneViewOrderThunkk({ userId })
      );

      if (createPhoneViewOrderThunk.rejected.match(orderRes)) {
        throw new Error("Failed to create phone view order");
      }

      const { order, price } = orderRes.payload; // order.amount is in paise

      // Step 2: Configure Razorpay
      const options = {
        key: razorpayKey,
        amount: order.amount, // ✅ already in paise
        currency: order.currency,
        name: "Phone View Payment",
        description: `Pay ₹${price} to unlock applicant details`,
        order_id: order.id,
        handler: async function (response) {
  try {
    await dispatch(
      verifyPhoneViewPaymentThunkk({ userId, response })
    ).unwrap();

    const user = users.find((u) => u._id === userId);
    if (user) {
      setSelectedUser(user);
      setShowPopup(true);
    } else {
      alert("User details not found.");
    }
  } catch (err) {
    console.error("Payment verification failed:", err);
    alert("Payment verification failed. Please try again.");
  }
}
,
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("viewHandler error:", err);
      alert(err.message || "Something went wrong");
    }
  };

  // Search filter for applicants
  const filteredApplicants = (users || []).filter((applicant) => {
    const term = searchTerm.toLowerCase();
    return (
      applicant?.name?.toString().toLowerCase().includes(term) ||
      applicant?.Skill?.toString().toLowerCase().includes(term) ||
      applicant?.status?.toString().toLowerCase().includes(term) ||
      applicant?.email?.toString().toLowerCase().includes(term)
    );
  });


  const columns = [
    {
      name: "S/N",
      width: "70px",
      center: true,
      cell: (row, index) => index + 1,
    },
    {
      name: "Applicant Name",
      selector: (row) => row?.name || "Unknown",
      sortable: true,
      wrap: true,
    },
    {
      name: "Skill",
      selector: (row) => row?.Skill || "N/A",
      sortable: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => row?.status || "Pending",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => viewHandler(row?._id)}
          className="px-3 py-1 mt-2 bg-green-500 text-white text-xs rounded hover:bg-green-600"
        >
          View Detail
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div 
    
    className="p-6 bg-gray-100 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide  "
    // className="p-6 h-scree overflow-y-scroll"

    
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Job Applications</h1>

      {/* Search Bar */}
      <div className="mb-4 relative max-w-md">
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search applicants..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <p className="text-blue-600">Loading applications...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <div className="bg-white shadow rounded-lg">
          <DataTable
            columns={columns}
            data={filteredApplicants}
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent={
              searchTerm
                ? `No applicants found matching "${searchTerm}"`
                : "No applicants found"
            }
             paginationPerPage={10} 
  paginationRowsPerPageOptions={[5, 10, 20, 50, 100, `Total ${filteredApplicants.length}`]}
          />
        </div>
      )}

      {/* ✅ User Details Popup */}
      {showPopup && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm   z-50">
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">User Details</h2>
            <p><strong>Name:</strong> {selectedUser?.name}</p>
            <p><strong>Email:</strong> {selectedUser?.email}</p>
            <p><strong>Phone:</strong> {selectedUser?.phone}</p>
            {/* Add more fields as needed */}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
