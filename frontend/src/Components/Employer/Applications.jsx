

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios";
import { fetchAdminUsers } from "../../app/admin/adminThunk";

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

  const { users, loading, error } = useSelector((state) => state.admin);

  console.log(jobId, "Job ID from URL");
  

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Job Applications</h1>

      {loading ? (
        <p className="text-blue-600">Loading applications...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Applicant Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Skill
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {users?.map((applicant) => (
                <tr key={applicant._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {applicant?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {applicant?.Skill || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {applicant.status || "Pending"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => viewHandler(applicant?._id)}
                      className="px-3 py-1 mt-2 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
