import { Component } from "react";

import Header from '../Header'

import './index.css'

class Home extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="home-bg-container">
                    <div className="content-container">
                        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
                        <p className="home-description">
                            Millions of people are searching for jobs, salary information, company
                            reviews find your job that fits your abilities and potential.
                        </p>
                        <button className="find-jobs-btn" type="button">
                            Find Jobs
                        </button>
                    </div>
                </div>
            </>

        )
    }
}

export default Home