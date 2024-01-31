import React from 'react'
import AgencyTitle from './AgencyTitle'
import AgencyFreelancerCard from './AgencyFreelancerCard'

const AgencyMemburs = () => {
    return (
        <div className='w-[300px]'>
            <AgencyTitle>Your Agency Members</AgencyTitle>
            <AgencyFreelancerCard />
        </div>
    )
}

export default AgencyMemburs
