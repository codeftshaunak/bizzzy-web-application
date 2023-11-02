import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout';
import Login from '../Login';
// import { ClientSignUp, FreelancerSignUp } from '../SignUp';
import Process from './Process';

const Onboarding = () => {
    const [page, setPage] = useState(1);
    return (
        <>
            {/* {page === 1 && <Login setPage={setPage} />} */}
            {/* {page === 1 && <Verify setPage={setPage} />} */}
            {
                page === 1 &&
                <HomeLayout>
                    <Process setPageU={setPage} />
                </HomeLayout>

            }
        </>

    )
}

export default Onboarding;
