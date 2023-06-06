import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiOutlineSearch} from 'react-icons/ai'

import JobItem from '../JobItem'
import FilterSection from '../FilterSection'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsListSection extends Component {
  state = {
    jobsList: [],
    searchJobsInput: '',
    apiStatus: apiStatusConstants.initial,
    employmentTypes: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  onSuccessApiCall = fetchedData => {
    const formatedData = fetchedData.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    this.setState({
      jobsList: formatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {searchJobsInput, employmentTypes, salaryRange} = this.state

    const employmentTypesString = employmentTypes.join(',')

    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?search=${searchJobsInput}&employment_type=${employmentTypesString}&minimum_package=${salaryRange}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok) {
      this.onSuccessApiCall(fetchedData)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  selectEmploymentType = event => {
    const {value, checked} = event.target
    const {employmentTypes} = this.state

    if (checked) {
      this.setState(
        prevState => ({
          employmentTypes: [...prevState.employmentTypes, value],
        }),
        this.getJobsList,
      )
    } else {
      const updatedTypes = employmentTypes.filter(
        eachType => eachType !== value,
      )

      this.setState(
        {
          employmentTypes: updatedTypes,
        },
        this.getJobsList,
      )
    }
  }

  selectSalaryRange = event => {
    const {value} = event.target
    this.setState({salaryRange: value}, this.getJobsList)
  }

  onChangeSearchJobs = event => {
    this.setState({searchJobsInput: event.target.value})
  }

  onClickSearchJobs = () => {
    this.getJobsList()
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.getJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderSearchJobsInput = mode => {
    const {searchJobsInput} = this.state
    return (
      <div className={`search-bar ${mode}`}>
        <input
          className="search-jobs-input"
          type="search"
          placeholder="Search"
          value={searchJobsInput}
          onChange={this.onChangeSearchJobs}
        />
        <button
          className="search-jobs-btn"
          type="button"
          data-testid="searchButton"
          onClick={this.onClickSearchJobs}
        >
          <AiOutlineSearch color="#f8fafc" size={20} />
        </button>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    const isJobsAvailable = jobsList.length > 0

    return isJobsAvailable ? (
      <ul className="jobs-list">
        {jobsList.map(jobDetails => (
          <JobItem key={jobDetails.id} jobDetails={jobDetails} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderJobsListView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {employmentTypes, salaryRange} = this.state
    return (
      <div className="responsive-container">
        <FilterSection
          employmentTypes={employmentTypes}
          salaryRange={salaryRange}
          selectEmploymentType={this.selectEmploymentType}
          selectSalaryRange={this.selectSalaryRange}
          renderSearchJobsInput={this.renderSearchJobsInput}
        />
        <div className="job-list-container">
          {this.renderSearchJobsInput('desktop')}
          {this.renderJobsListView()}
        </div>
      </div>
    )
  }
}

export default JobsListSection
