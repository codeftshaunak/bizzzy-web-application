import React, { useEffect } from 'react'
import HomeLayout from '../../Layouts/HomeLayout';
// import { Link } from 'react-router-dom';
// import { Button, HStack } from '@chakra-ui/react';
import HomeComp from './HomeComp';
import { HomeFooter } from '../../Components/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const token = useSelector((state) => state.auth.authtoken);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            if (role == 1) {
                navigate("/find-job")
            } else {
                navigate("/client-dashboard")
            }
        }
    }, [token, role])

    return (
        <>
            <HomeLayout>
                <HomeComp />
            </HomeLayout>
            <HomeFooter />
        </>

    )
}

export default Home;
