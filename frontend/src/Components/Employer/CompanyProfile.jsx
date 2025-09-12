import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCurrentRecruiter } from "../../app/auth/authThunks";
import { updateRecruiterProfile } from "../../app/Employe/thunkemploye";


const CompanyProfile = () => {
  const dispatch = useDispatch();
  const authRecruiter = useSelector((state) => state.auth.recruiter);


  const recruiter = authRecruiter;

  console.log(recruiter, "helloo");

  const updatedRecruiter = useSelector((state) => state.auth.updatedRecruiter);


  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(recruiter || {});
  const [logoFile, setLogoFile] = useState(null);

  const fetchDataAfterUpdate = () => {
    dispatch(fetchCurrentRecruiter());
  };

  useEffect(() => {
    dispatch(fetchCurrentRecruiter());
  }, [dispatch]);

  useEffect(() => {
    if (recruiter) setFormData(recruiter);
  }, [recruiter]);

  if (!recruiter)
    return <div className="p-6 text-center">Loading recruiter data...</div>;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setLogoFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const formPayload = new FormData();

  for (const key in formData) {
    if (key === "companyLogo") continue;
    if (formData[key] !== undefined && formData[key] !== null) {
      formPayload.append(key, formData[key]);
    }
  }

  if (logoFile) formPayload.append("companyLogo", logoFile);

  dispatch(
    updateRecruiterProfile({
      recruiterId: recruiter._id,
      payload: formPayload,
    })
  )
    .unwrap()
    .then(() => {
      toast.success("Company profile updated successfully!");
      setIsEditing(false);
      fetchDataAfterUpdate();
    })
    .catch((err) => toast.error(err || "Update failed!"));
};

// const handleSubmit = (e) => {
//   e.preventDefault();

//   const formPayload = new FormData();
//   for (const key in formData) {
//     if (key === "companyLogo") continue;
//     formPayload.append(key, formData[key]);
//   }

//   if (logoFile) {
//     console.log("Uploading file:", logoFile);
//     formPayload.append("companyLogo", logoFile);
//   }

//   dispatch(updateRecruiterProfile({
//     recruiterId: recruiter._id,
//     payload: formPayload
//   }));
// };

  return (
    <div
    className="space-y-8 text-gray-700 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide"
    //  className="max-w-4xl mx-auto mt-8 mb-10 shadow-lg rounded-lg overflow-hidden"
     >
      <div className="bg-blue-600 py-6 px-6 text-white text-center flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-semibold">Company Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium shadow hover:bg-gray-100"
        >
          {isEditing ? "Cancel" : "Update Profile"}
        </button>
      </div>

      <div className="p-6 min-h-screen">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          {recruiter.companyLogo ?(
            <img
              className="rounded-full w-32 h-32 object-cover border-4 border-gray-200"
              src={formData.companyLogo}
              alt="Company Logo"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 border-4 border-gray-200">
              No Logo
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <Detail label="Contact Person" value={recruiter.contactPerson} />
            <Detail label="Company Name" value={recruiter.companyName} />
            <Detail label="Phone" value={recruiter.contactPhone} />
            <Detail label="Email" value={recruiter.email} />
            <Detail label="Website" value={recruiter.website} />
            <Detail label="Industry" value={recruiter.industry} />
            <Detail label="Location" value={recruiter.location} />
            <Detail label="About Company" value={recruiter.about} />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            // className="space-y-8 text-gray-700"
            // className="space-y-8 text-gray-700 max-h-[500px] overflow-y-auto pr-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
              />
              <Input
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
              <Input
                label="Phone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
              <Input
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="mt-8">
              <label className="block font-medium text-sm text-gray-600 mb-2">
                About Company
              </label>
              <textarea
                name="about"
                value={formData.about || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Tell us about your company..."
              />
            </div>

            <div className="mt-8">
              <label className="block font-medium text-sm text-gray-600 mb-2">
                Company Logo
              </label>
              <input
                type="file"
                name="companyLogo"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Upload a square image for best results</p>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <label className="block font-medium text-sm text-gray-600 mb-2">
      {label}
    </label>
    <div className="border border-gray-300 rounded px-3 py-2 bg-gray-50 min-h-[42px] flex items-center">
      {value || "N/A"}
    </div>
  </div>
);

const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block font-medium text-sm text-gray-600 mb-2">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

export default CompanyProfile;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { fetchCurrentRecruiter } from "../../app/auth/authThunks";
// import { updateRecruiterProfile } from "../../app/Employe/thunkemploye";

// const CompanyProfile = () => {
//   const dispatch = useDispatch();
//   const recruiter = useSelector((state) => state.auth.recruiter);

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [logoFile, setLogoFile] = useState(null);
//   const [logoPreview, setLogoPreview] = useState(null);

//   useEffect(() => {
//     dispatch(fetchCurrentRecruiter());
//   }, [dispatch]);

//   useEffect(() => {
//     if (recruiter) {
//       setFormData(recruiter);
//       setLogoPreview(recruiter.companyLogo || null);
//     }
//   }, [recruiter]);

//   if (!recruiter) return <div>Loading recruiter data...</div>;

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setLogoFile(files[0]);
//       setLogoPreview(URL.createObjectURL(files[0]));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = new FormData();

//     Object.keys(formData).forEach((key) => {
//       if (
//         key !== "companyLogo" &&
//         formData[key] !== undefined &&
//         formData[key] !== null
//       ) {
//         payload.append(key, formData[key]);
//       }
//     });

//     if (logoFile) payload.append("companyLogo", logoFile);

//     try {
//       await dispatch(
//         updateRecruiterProfile({ recruiterId: recruiter._id, payload })
//       ).unwrap();
//       toast.success("Profile updated successfully!");
//       setIsEditing(false);
//       dispatch(fetchCurrentRecruiter());
//     } catch (err) {
//       toast.error(err || "Update failed!");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow rounded">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Company Profile</h2>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           {isEditing ? "Cancel" : "Edit Profile"}
//         </button>
//       </div>

//       <div className="flex flex-col items-center mb-6">
//         <img
//           src={logoPreview || "https://via.placeholder.com/150"}
//           alt="Company Logo"
//           className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
//         />
//       </div>

//       {isEditing ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="companyName"
//             value={formData.companyName || ""}
//             onChange={handleChange}
//             placeholder="Company Name"
//             className="w-full border px-3 py-2 rounded"
//           />

//           <input
//           type="text"
//             label="Contact Person"
//             name="contactPerson"
//             value={formData.contactPerson}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//           />


//           <input
//             type="text"
//             name="industry"
//             value={formData.industry || ""}
//             onChange={handleChange}
//             placeholder="Industry"
//             className="w-full border px-3 py-2 rounded"
//           />
//           <input
//             type="text"
//             name="website"
//             value={formData.website || ""}
//             onChange={handleChange}
//             placeholder="Website"
//             className="w-full border px-3 py-2 rounded"
//           />
//           <input
//             type="file"
//             name="companyLogo"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-green-600 text-white rounded"
//           >
//             Save Changes
//           </button>
//         </form>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Detail label="Company Name" value={formData.companyName} />
//           <Detail label="Industry" value={formData.industry} />
//           <Detail label="Website" value={formData.website} />
//         </div>
//       )}
//     </div>
//   );
// };

// const Detail = ({ label, value }) => (
//   <div>
//     <h3 className="font-semibold">{label}</h3>
//     <p>{value || "N/A"}</p>
//   </div>
// );

// export default CompanyProfile;
