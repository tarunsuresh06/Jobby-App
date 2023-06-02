import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props

  const {
    id,
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
      <Link to={`/jobs/${id}`} className="job-item-link">
        <div className="job-item-header">
          <img
            className="job-item-img"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="job-header-content">
            <h1 className="job-title">{title}</h1>
            <div className="responsive-box">
              <AiFillStar color="#fbbf24" size={16} />
              <span className="job-info-text">{rating}</span>
            </div>
          </div>
        </div>

        <div className="job-info">
          <div className="responsive-box">
            <div className="responsive-box">
              <MdLocationOn size={16} />
              <p className="job-info-text">{location}</p>
            </div>

            <div className="responsive-box">
              <BsFillBriefcaseFill size={16} />
              <p className="job-info-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-package">{packagePerAnnum}</p>
        </div>

        <hr />

        <div className="job-body">
          <p className="job-body-heading">Description</p>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
