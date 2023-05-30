import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = () => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
  }

  return (
    <nav className="header-container">
      <img
        className="nav-logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />

      <ul className="nav-list">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>

      <button className="logout-btn" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Header
