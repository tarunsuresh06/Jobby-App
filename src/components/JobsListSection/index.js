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

    const {searchJobsInput, employmentTypes} = this.state

    const employmentTypesString = employmentTypes.join(',')

    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?search=${searchJobsInput}&employment_type=${employmentTypesString}`

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
      console.log(fetchedData)
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

  onChangeSearchJobs = event => {
    this.setState({searchJobsInput: event.target.value})
  }

  onClickSearchJobs = () => {
    this.getJobsList()
  }

  renderSearchJobsInput = () => {
    const {searchJobsInput} = this.state
    return (
      <div className="input-box">
        <input
          className="search-jobs-input"
          type="text"
          placeholder="Search"
          value={searchJobsInput}
          onChange={this.onChangeSearchJobs}
        />
        <button
          className="search-jobs-btn"
          type="button"
          onClick={this.onClickSearchJobs}
        >
          <AiOutlineSearch color="#f8fafc" size={20} />
        </button>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    return (
      <>
        {this.renderSearchJobsInput()}
        <ul className="jobs-list">
          {jobsList.map(jobDetails => (
            <JobItem key={jobDetails.id} jobDetails={jobDetails} />
          ))}
        </ul>
      </>
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
      case 'SUCCESS':
        return this.renderJobsList()
      case 'IN_PROGRESS':
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    const {employmentTypes} = this.state
    return (
      <div className="responsive-container">
        <FilterSection
          employmentTypes={employmentTypes}
          selectEmploymentType={this.selectEmploymentType}
        />
        {this.renderJobsListView()}
      </div>
    )
  }
}

export default JobsListSection
