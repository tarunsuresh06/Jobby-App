import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props

  const onClickFindJobs = () => {
    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="content-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews find your job that fits your abilities and
            potential.
          </p>
          <button
            className="find-jobs-btn"
            type="button"
            onClick={onClickFindJobs}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
