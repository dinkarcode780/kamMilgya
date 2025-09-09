import React from 'react'
import Slider from '../Components/Home/Slider'
import JobCategories from '../Components/Home/JobCategories'
import CustomerTestimonials from '../Components/Home/CustomerTestimonials'
import JobSearchLanding from '../Components/Home/JobSearchLanding'
import RecruitingBanner from '../Components/Home/RecruitingSection'
import FeaturedJobs from '../Components/Home/FeaturedJobs'
// import    Aboute from './Aboute'



const HomePage = () => {
  return (
    <div>
      <Slider/>
      <JobCategories/>
    <FeaturedJobs/>
    <CustomerTestimonials />
    <JobSearchLanding/>
    {/* <Aboute/> */}
    <RecruitingBanner/>
    </div>
  )
}

export default HomePage