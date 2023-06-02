import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    profileImgUrl: '',
    name: '',
    shortBio: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()

    if (response.ok) {
      this.handleSuccessProfile(data)
    } else {
      this.handleFailureProfile()
    }
  }

  onClickRetryProfile = () => {
    this.getProfileDetails()
  }

  handleSuccessProfile = data => {
    this.setState({
      profileImgUrl: data.profile_details.profile_image_url,
      name: data.profile_details.name,
      shortBio: data.profile_details.short_bio,
      apiStatus: apiStatusConstants.success,
    })
  }

  handleFailureProfile = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  renderInProgressProfileView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderFailureProfileView = () => (
    <button
      className="retry-btn"
      type="button"
      onClick={this.onClickRetryProfile}
    >
      Retry
    </button>
  )

  renderSuccessProfileView = () => {
    const {profileImgUrl, name, shortBio} = this.state

    return (
      <div className="profile-card">
        <img className="profile-img" src={profileImgUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessProfileView()
      case 'FAILURE':
        return this.renderFailureProfileView()
      case 'IN_PROGRESS':
        return this.renderInProgressProfileView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-bg-container">{this.renderProfileView()}</div>
    )
  }
}

export default Profile
