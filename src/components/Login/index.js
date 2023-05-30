import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onSubmitFailure = errMsg => {
    this.setState({errorMsg: errMsg, showErrorMsg: true})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  onSubmitLogin = async event => {
    const {username, password} = this.state

    event.preventDefault()

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token
      this.onSubmitSuccess(jwtToken)
    } else {
      const errMsg = data.error_msg
      this.onSubmitFailure(errMsg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state

    return (
      <div className="login-bg-container">
        <form className="form-container" onSubmit={this.onSubmitLogin}>
          <img
            className="login-app-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />

          <label className="form-label" htmlFor="usernameInput">
            USERNAME
          </label>

          <input
            id="usernameInput"
            className="form-input"
            type="text"
            value={username}
            placeholder="Username"
            onChange={this.onChangeUsername}
          />

          <label className="form-label" htmlFor="passwordInput">
            PASSWORD
          </label>

          <input
            id="passwordInput"
            className="form-input"
            type="password"
            value={password}
            placeholder="Password"
            onChange={this.onChangePassword}
          />

          <button className="login-btn" type="submit">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
