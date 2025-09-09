import React, { useEffect } from 'react';
import { FaBriefcase, FaUserTie, FaBullhorn, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RecruitingBanner = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = !!user;
  const isRecruiter = user?.role === 'recruiter';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleButtonClick = () => {
    if (isRecruiter) {
      navigate('/employer-dash/applications'); // Recruiters go to post job page
    } else if (isAdmin) {
      navigate('/adminpanel'); // Admins go to admin dashboard
    } else if (isLoggedIn) {
      navigate('/all-job'); // Regular users go to browse jobs page
    } else {
      navigate('/login'); // Non-logged-in users go to login page
    }
  };

  const getButtonText = () => {
    if (isRecruiter) return 'Post a Job Now';
    if (isAdmin) return 'Go to Dashboard';
    if (isLoggedIn) return 'Browse All Jobs';
    return 'Start Recruiting Now';
  };

  const getSubtitleText = () => {
    if (isRecruiter) return 'Find your perfect candidate today!';
    if (isAdmin) return 'Manage your recruitment platform';
    if (isLoggedIn) return 'Explore thousands of job opportunities';
    return 'Get started for free — no credit card required!';
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5" }} className="py-10 px-6 bg-gradient-to-br">
      <div
        className="mx-auto shadow-xl bg-white rounded-2xl p-10 text-center"
        data-aos="zoom-in"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-[#1F2937] mb-2 drop-shadow-md">
            <span className="text-[#0077B6]"> 🚀 Ready to</span> {isRecruiter ? 'Hire Top Talent?' : isAdmin ? 'Manage Hiring?' : 'Find Your Dream Job?'}
          </h2>
          <p className="text-gray-600 text-sm">
            {isRecruiter 
              ? 'Post your jobs to reach millions of active candidates'
              : isAdmin
              ? 'Manage all job postings and applications'
              : 'Access thousands of job opportunities across all sectors'}
          </p>
        </div>

        {/* Icon Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col items-center" data-aos="fade-up">
            {isRecruiter || isAdmin ? (
              <FaBullhorn className="text-4xl text-[#0077B6] mb-3" />
            ) : (
              <FaSearch className="text-4xl text-[#0077B6] mb-3" />
            )}
            <h3 className="text-lg font-semibold text-gray-800">
              {isRecruiter || isAdmin ? 'Widest Job Reach' : 'Find Your Match'}
            </h3>
            <p className="text-gray-600 text-sm text-center mt-1">
              {isRecruiter || isAdmin 
                ? 'Promote openings on multiple platforms'
                : 'Discover jobs that match your skills'}
            </p>
          </div>

          <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
            <FaBriefcase className="text-4xl text-[#0077B6] mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              {isRecruiter || isAdmin ? 'Quality Candidates' : 'Diverse Opportunities'}
            </h3>
            <p className="text-gray-600 text-sm text-center mt-1">
              {isRecruiter || isAdmin
                ? 'Connect with qualified applicants'
                : 'Explore jobs across all industries'}
            </p>
          </div>

          <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
            <FaUserTie className="text-4xl text-[#0077B6] mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              {isRecruiter || isAdmin ? 'Hiring Tools' : 'Career Growth'}
            </h3>
            <p className="text-gray-600 text-sm text-center mt-1">
              {isRecruiter || isAdmin
                ? 'Powerful tools to manage hiring'
                : 'Find jobs that help you grow'}
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <button 
            onClick={handleButtonClick}
            className="bg-[#0077B6] text-white px-6 py-2 rounded-lg hover:bg-[#005f8a] transition flex items-center justify-center mx-auto"
          >
            {getButtonText()}
            {(isLoggedIn && !isRecruiter && !isAdmin) && <FaSearch className="ml-2" />}
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          {getSubtitleText()}
        </p>
      </div>
    </div>
  );
};

export default RecruitingBanner;