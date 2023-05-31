import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <li className="job-item">
      <div className="job-item-header">
        <img className="job-item-img" src={companyLogoUrl} alt={title} />
        <div className="job-header-content">
          <h1 className="job-title">{title}</h1>
          <AiFillStar color="#fbbf24" size={16} />
          <span className="job-info-text">{rating}</span>
        </div>
      </div>

      <div className="job-info">
        <div>
          <BsFillBriefcaseFill size={16} />
          <span className="job-info-text">{location}</span>
          <MdLocationOn size={16} />
          <span className="job-info-text">{employmentType}</span>
        </div>
        <p className="job-package">{packagePerAnnum}</p>
      </div>

      <hr />

      <div className="job-body">
        <p className="job-body-heading">Description</p>
        <p className="job-description">{jobDescription}</p>
      </div>
    </li>
  )
}

export default JobItem