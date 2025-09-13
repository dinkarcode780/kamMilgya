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

   const [isLoading, setIsLoading] = useState(false);

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
   setIsLoading(true);

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
    .catch((err) => toast.error(err || "Update failed!"))
     .finally(() => {
        setIsLoading(false); 
      });
    
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
                disabled={isLoading}
                // className="w-full bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition-colors duration-200 font-medium"

                className={`md:col-span-2 px-6 py-2 rounded-md shadow ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              >
                {isLoading ? "Please wait..." : "Save Changes"}
                {/* Save Changes */}
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

