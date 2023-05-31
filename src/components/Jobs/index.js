import {Component} from 'react'

import Header from '../Header'
import JobsListSection from '../JobsListSection'

import './index.css'

class Jobs extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <JobsListSection />
        </div>
      </>
    )
  }
}

export default Jobs
