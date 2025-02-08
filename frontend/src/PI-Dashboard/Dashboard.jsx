import React from 'react'
import Navbar from './Navbar'
import ParticipantsTrialChart from './ParticipantsTrialChart'

const Dashboard = () => {
    return (
        <div className="container-fluid mt-4">
    <Navbar />
    <div className="container d-flex flex-column align-items-center justify-content-center">
        <h1 className="my-4">Clinical Trial Dashboard</h1>
        <ParticipantsTrialChart />
        
    </div>
</div>

    )
}

export default Dashboard