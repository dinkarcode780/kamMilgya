import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchApplicationsByJobId, fetchJobByIdd } from "../../app/job/thunak";

// const JobDetails = () => {
//   const { jobId } = useParams();
//   const dispatch = useDispatch();

//   const { applicationsByJobId, loading, error } = useSelector(
//     (state) => state.job || {}
//   );

//   const job = applicationsByJobId?.[0]?.job || {};

//   console.log("Job data", job);

//   useEffect(() => {
//     if (jobId) {
//       dispatch(fetchApplicationsByJobId(jobId)).catch((err) =>
//         console.error("Error while fetching applications:", err)
//       );
//     }
//   }, [jobId, dispatch]);

//   return (
//     <div className="container mx-auto p-6">
//       {/* ✅ Job Details Card */}
//       <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border">
//         <h2 className="text-2xl font-bold text-blue-700 mb-3">
//           {job.title || "Job Title Not Available"}
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//           <p>
//             <strong>🏢 Company:</strong> {job.company || "N/A"}
//           </p>
//           <p>
//             <strong>📍 Location:</strong> {job.location || "N/A"}
//           </p>
//           <p>
//             <strong>📂 Category:</strong>{" "}
//            {job.category?.name || "N/A"}
//           </p>
//           <p>
//             <strong>📂 Subcategory:</strong>{" "}
//             {job.subCategory || "N/A"}
//           </p>
//           <p>
//             <strong>💼 Experience:</strong> {job.experience || "N/A"} years
//           </p>
//           <p>
//             <strong>💰 Salary:</strong> ₹{job.salaryMin || "0"} - ₹
//             {job.salaryMax || "0"}
//           </p>
//           <p>
//             <strong>🌐 Website:</strong> {job.website || "N/A"}
//           </p>
//           <p>
//             <strong>📞 Phone:</strong> {job.phone || "N/A"}
//           </p>
//         </div>
//         <div className="mt-4">
//           <p>
//             <strong>📝 Description:</strong> {job.description || "N/A"}
//           </p>
//           <p>
//             <strong>✅ Responsibilities:</strong>{" "}
//             {job.responsibilities || "N/A"}
//           </p>
//           {/* <p>
//             <strong>📌 Requirements:</strong> {job.requirements || "N/A"}
//           </p> */}
//          <p className="mb-0">
//   <strong>💡 Requirements:</strong>{" "}
//   {Array.isArray(job.skills) && job.skills.length > 0
//     ? job.skills.join(", ")
//     : "None"}
// </p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDetails;



const JobDetails = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  // const { applicationsByJobId, loading, error } = useSelector(
  //   (state) => state.job || {}
  // );

    const { applicationsByJobId, jobDetails, loading, error } = useSelector(
    (state) => state.job || {}
  );
  // Get job from the first application
  // const job = applicationsByJobId?.[0]?.job || {};


  // useEffect(() => {
  //   if (jobId) {
  //     dispatch(fetchApplicationsByJobId(jobId)).catch((err) =>
  //       console.error("Error while fetching applications:", err)
  //     );
  //   }
  // }, [jobId, dispatch]);

   useEffect(() => {
    if (jobId) {
      dispatch(fetchApplicationsByJobId(jobId));
      dispatch(fetchJobByIdd(jobId)); // ✅ alag se job details bhi fetch karo
    }
  }, [jobId, dispatch]);

  // Add debug output to see what data you're getting
  console.log("Full applications data:", applicationsByJobId);
  console.log("Job data:", jobDetails);

   if (loading) return <div>Loading job details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!jobDetails) return <div>No job found</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border">
        <h2 className="text-2xl font-bold text-blue-700 mb-3">
          {jobDetails?.title || "Job Title Not Available"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><strong>🏢 Company:</strong> {jobDetails?.company || "N/A"}</p>
          <p><strong>📍 Location:</strong> {jobDetails?.location || "N/A"}</p>
          <p><strong>📂 Category:</strong> {jobDetails?.category?.name || jobDetails?.category || "N/A"}</p>
          {/* <p><strong>📂 Subcategory:</strong> {jobDetails?.subCategory || "N/A"}</p> */}
          <p><strong>💼 Experience:</strong> {jobDetails?.experience || "N/A"} years</p>
          <p><strong>💰 Salary:</strong> ₹{jobDetails?.salaryMin || "0"} - ₹{jobDetails?.salaryMax || "0"}</p>
          <p><strong>🌐 Website:</strong> {jobDetails?.website || "N/A"}</p>
          <p><strong>📞 Phone:</strong> {jobDetails?.phone || "N/A"}</p>
        </div>
        <div className="mt-4">
          <p><strong>📝 Description:</strong> {jobDetails?.description || "N/A"}</p>
          <p><strong>✅ Responsibilities:</strong> {jobDetails?.responsibilities || "N/A"}</p>
          <p className="mb-0">
            <strong>💡 Requirements:</strong>{" "}
            {Array.isArray(jobDetails?.skills) && jobDetails?.skills.length > 0
              ? jobDetails?.skills.join(", ")
              : jobDetails?.requirements || "None"}
          </p>
        </div>
        
        {/* Debug section - remove in production */}
        {/* <details className="mt-4">
          <summary className="cursor-pointer">Debug Info</summary>
          <pre className="bg-gray-100 p-2 mt-2 overflow-auto">
            {JSON.stringify({ applicationsByJobId, jobDetails }, null, 2)}
          </pre>
        </details> */}
      </div>
    </div>
  );
};

export default JobDetails;
