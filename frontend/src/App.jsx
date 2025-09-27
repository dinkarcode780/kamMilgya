import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Home/Footer";

import RecruitingSection from "./Components/Home/RecruitingSection";
import ApplyJob from "./pages/ApplyJob";
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./Components/ScrollToTop";
import PostJobPage from "./pages/PostJobPage";
import ViewJob from "./pages/ViewJob";
import EmployerDash from "./pages/EmployerDash";
import UserDash from "./pages/UserDash";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import UserList from './Components/UserList'
import EmployerRegister from "./pages/EmployerRegister";
import Forgot from "./pages/Forgot";
import RegisterLogin from "./pages/RegisterLogin";
import Dashboard from "./Components/admin/Dashboard";
import JobCategories from "./Components/Home/JobCategories";
import CategoryJobsPage from "./Components/Home/CategoryJobsPage";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentUser } from "./app/auth/authThunks";
import ProtectedRoute from "./Components/Protected/ProtectedRoute";
import Aboute from "./pages/Aboute";
import Settings from "./Components/Employer/Settings";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import JobDetails from "./Components/Employer/JobDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Employers from "./Components/admin/Employers";
import Candidates from "./Components/admin/Candidates";
import JobPosts from "./Components/admin/JobPosts";
// import Employers from "./Components/admin/Employers";
// Add more pages as needed

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(s => s.auth.user)


  useEffect(() => {
    // dispatch(fetchCurrentUser());
  }, [dispatch]);

  //  <Route element={<ProtectedRoute allowedRoles={['user', 'recruiter', 'admin']} />}>
  //   <Route path="/dashboard" element={<Dashboard />} />
  // </Route>

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-[#E9EEFF] min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            {/* <Route path="/userlist" element={<UserList />} /> */}

            {/* public route */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/all-job" element={<ViewJob />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/about" element={<Aboute/>} />
            <Route path="/terms" element={<TermsAndConditions />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/employeLogin" element={<RegisterLogin />} />
            <Route path="/employerRegister" element={<EmployerRegister />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/apply" element={<ApplyJob />} />
  <Route path="/settings/:jobId" element={<Settings />} />

  <Route path="/jobdetails/:jobId" element={<JobDetails />} />


            {/* <Route path="/jobs/category/:categoryName" element={<CategoryJobsPage />} /> */}
            <Route path="/jobs/category/:categoryName" element={<CategoryJobsPage />} />

            <Route path="/recruiting" element={<RecruitingSection />} />
{/* 
             <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
              <Route path="/employer-dash/*" element={<EmployerDash />} />
              <Route path="/post-job" element={<PostJobPage />} />
            </Route>  */}
           <Route path="/employer-dash/*" element={<EmployerDash />} />
             <Route path="/post-job" element={<PostJobPage />} /> 
            

              {/* Employers page */}
           <Route path="/total-employers" element={<Employers />} />

           <Route path="/total-canditates" element={<Candidates />} />

           <Route path="/total-activejob" element={<JobPosts />} />



            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path="/user-dash/*" element={<UserDash />} />
            </Route>
             {/* <Route path="/user-dash/*" element={<UserDash />} /> */}

            {/* protected route */}
            {/* <Route path="/employer-dash/*" element={<EmployerDash />} />
              <Route path="/post-job" element={<PostJobPage />} /> */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/adminpanel" element={<Dashboard />} />
              <Route path="/" element={<JobCategories />} />
            </Route>

            {/* Add more <Route /> elements here for other pages */}
          </Routes>
        </div>
    <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
};

export default App;


