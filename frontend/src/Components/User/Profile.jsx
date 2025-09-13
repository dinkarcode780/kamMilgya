

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../app/user/userThunks";
import { setUser } from "../../app/auth/authSlice";



const Profile = () => {
  // const user = useSelector((state) => state.auth.user);
  // const user = useSelector((state) => state.user.user);
  const authUser = useSelector((state) => state.auth.user);
const updatedUser = useSelector((state) => state.user.user);

// const [User , setUser] = useState(null)

const user = updatedUser || authUser;

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});
   const [imageFile, setImageFile] = useState(null);

     const [isLoading, setIsLoading] = useState(false);

  if (!user) return <div className="text-center mt-10">Loading user data...</div>;

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

   const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setImageFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(updateUserProfile({ userId: user._id, payload: formData }))
  //     .unwrap()
  //     .then(() => {
  //       toast.success("Profile updated successfully!");
  //       setIsEditing(false);
  //     })
  //     .catch((err) => {
  //       toast.error(err || "Update failed!");
  //     });
  // };


  const handleSubmit = (e) => {
  e.preventDefault();
   setIsLoading(true);

  const formPayload = new FormData();

  for (const key in formData) {
  if (formData[key] !== undefined && formData[key] !== null) {
    if (Array.isArray(formData[key])) {
      formData[key].forEach(val => formPayload.append(key, val));
    } else {
      formPayload.append(key, formData[key]);
    }
  }
}


  if (imageFile) {
    formPayload.append("image", imageFile);
  }

  dispatch(updateUserProfile({ userId: user._id, payload: formPayload }))
    .unwrap()
    .then(() => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    })
    .catch((err) => {
      toast.error(err || "Update failed!");
    })
     .finally(() => {
        setIsLoading(false); 
      });
    
};


  useEffect(() => {
  if (user) {
    setFormData(user);
  }
}, [user]);


  useEffect(() => {
  if (updatedUser) {
    dispatch(setUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }
}, [updatedUser, dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 py-6 px-6 text-white text-center flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-semibold">User Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium shadow hover:bg-gray-100"
        >
          {isEditing ? "Cancel" : "Update Profile"}
        </button>
      </div>

      <div className="p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          {user.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-600 shadow"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-blue-600 flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        {!isEditing ? (
          // --------- Display Mode ---------
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <Detail label="Full Name" value={user.name} />
            <Detail label="Email" value={user.email} />
            <Detail label="Phone Number" value={user.phone} />
            <Detail label="Gender" value={user.gender} />
            <Detail label="Qualification" value={user.Qualification} />
            <Detail
              label="Skills"
              value={user.Skill?.length ? user.Skill.join(", ") : "N/A"}
            />
            <Detail label="Address" value={user.address} />
            <Detail label="Have Two-Wheeler" value={user.vehicle ? "Yes" : "No"} />
            <Detail label="Have Driving License" value={user.license ? "Yes" : "No"} />

            {user.resume && (
              <div className="md:col-span-2">
                <p className="font-medium">Resume</p>
                <a
                  href={user.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  View Resume
                </a>
              </div>
            )}
          </div>
        ) : (
          // --------- Edit Mode ---------
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"
          >
            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
            <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
            <Input label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
            <Input
              label="Qualification"
              name="Qualification"
              value={formData.Qualification}
              onChange={handleChange}
            />
            <Input
              label="Skills (comma separated)"
              name="Skill"
              value={formData.Skill}
              onChange={(e) =>
                setFormData({ ...formData, Skill: e.target.value.split(",") })
              }
            />
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} />

               {/* <Input label="Two-Wheeler" name="vehicle" value={formData.vehicle} onChange={handleChange} /> */}
             
             <div>

              {/* <Detail label="Have Two-Wheeler" value={user.vehicle ? "Yes" : "No"} />
            <Detail label="Have Driving License" value={user.license ? "Yes" : "No"} /> */}
              <label className="block font-medium text-sm text-gray-600 mb-1">
                Profile Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>


            <button
              type="submit"
               disabled={isLoading}
              // className="md:col-span-2 bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
              className={`md:col-span-2 px-6 py-2 rounded-md shadow ${
    isLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 text-white hover:bg-blue-700"
  }`}
            >
              {isLoading ? "Please wait…" : "Save Changes"}
              {/* Save Changes */}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <label className="block font-medium text-sm text-gray-600 mb-1">{label}</label>
    <div className="border border-gray-300 rounded px-3 py-2 bg-gray-50">
      {value || "N/A"}
    </div>
  </div>
);

const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block font-medium text-sm text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>
);

export default Profile;
