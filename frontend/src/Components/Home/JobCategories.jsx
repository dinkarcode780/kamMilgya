import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchCategories , fetchJobsByCategoryName } from "../../app/categories/categorythunk";
// import { fetchJobsByCategoryName } from "../../app/job/thunak"; // ✅ job filter thunk

const DUMMY_IMAGE = "/images/job/worker.png";

const JobCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, error, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
    
const handleCategoryClick = (category) => {
  // fetch jobs
  dispatch(fetchJobsByCategoryName(category.name));

  // navigate using name, not ID
  navigate(`/jobs/category/${category.name}`);
};

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ backgroundColor: "#F5F5F5" }} className="p-6 py-10">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-extrabold text-[#1F2937] mb-4 drop-shadow-md">
          <span className="text-[#009688]">Explore Job Categories for</span>{" "}
          Skilled & Unskilled Workers
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {categories?.map((cat) => (
          <div
            key={cat._id}
            onClick={() => handleCategoryClick(cat)} // ✅ category passed
            style={{ border: "1px solid #b5ccfa" }}
            className="flex flex-col items-center justify-center gap-2 text-center px-4 py-5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer bg-white hover:bg-blue-50"
          >
            <img
              src={cat.image || DUMMY_IMAGE}
              alt={cat.name}
              className="w-10 h-10 object-cover"
            />
            <span className="text-sm font-medium text-gray-800">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;
