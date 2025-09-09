import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Back to Home */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-[#009688]">Kammil Gya</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-[#009688] px-3 py-2 text-sm font-medium"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main About Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative bg-[#009688] py-16 px-6 sm:py-20 sm:px-12 lg:px-16">
            <div className="absolute inset-0 bg-gradient-to-r from-[#009688] to-[#009688] opacity-90"></div>
            <div className="relative max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                About KammilGya
              </h1>
              <p className="mt-3 text-xl text-blue-100">
                Connecting talent with opportunity through innovative technology
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="px-6 py-12 sm:px-12 lg:px-16">
            <div className="prose prose-lg max-w-none text-gray-700">
              {/* Introduction */}
              <section className="mb-12">
                <p className="text-lg leading-7">
                  KammilGya is revolutionizing the way professionals and companies connect. 
                  Our platform combines advanced matching algorithms with human insight to 
                  create meaningful employment relationships that last.
                </p>
              </section>

              {/* Mission and Vision */}
              <section className="mb-12 grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold text-[#009688] mb-4">Our Mission</h2>
                  <p>
                    To empower individuals and organizations by creating the most efficient, 
                    transparent, and rewarding job matching platform in the industry.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold text-[#009688] mb-4">Our Vision</h2>
                  <p>
                    A world where everyone finds work they love and companies build teams 
                    that drive exceptional results.
                  </p>
                </div>
              </section>

              {/* What We Do */}
              <section className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">What We Do</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "For Job Seekers",
                      content: "Personalized job recommendations, application tracking, and career resources to help you find your ideal role.",
                      icon: "👨‍💼"
                    },
                    {
                      title: "For Employers",
                      content: "Access to qualified candidates, streamlined hiring tools, and market insights to build your perfect team.",
                      icon: "🏢"
                    },
                    {
                      title: "Our Technology",
                      content: "AI-powered matching that goes beyond keywords to understand skills, culture fit, and growth potential.",
                      icon: "🤖"
                    }
                  ].map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Team CTA */}
              <section className="bg-gray-50 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Thousands of Successful Matches</h2>
                <p className="mb-6 max-w-2xl mx-auto">
                  Whether you're looking for your next career opportunity or your next star employee, 
                  kammil Gya makes the process simple, efficient, and effective.
                </p>
                <Link 
                
                  to="/" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#009688] hover:hover:bg-[#549e96] transition duration-200"
                >
                  {/* Get Started */}
                  <h1>Home</h1>
                </Link>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;