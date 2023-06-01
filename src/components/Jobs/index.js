import Header from '../Header'
import JobsListSection from '../JobsListSection'

import './index.css'

const Jobs = () => (
  <>
    <Header />
    <div className="jobs-bg-container">
      <JobsListSection />
    </div>
  </>
)

export default Jobs
