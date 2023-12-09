import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeLayout from '../../Layouts/HomeLayout';
import MyJobsComponentUi from '../../Components/MyJobsComponentUi';

const MyJobPage = () => {
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    console.log(role, 'role--')

    return (
        <>
            <HomeLayout>
                {
                    role == 1 ? <MyJobsComponentUi /> : navigate("/find-job")
                }
            </HomeLayout>
        </>
    )
}

export default MyJobPage