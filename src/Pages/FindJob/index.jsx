import React, { useEffect } from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import { AllJobs, SearchJobPage } from '../../Components/FindJobUi';
import { VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const FindJob = () => {
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    useEffect(() => {
        if (role == 1) {
        } else if (role == 2) {
            navigate("/client-dashboard");
        } else {
            navigate("/login");
        }
    }, [role, navigate]);

    return (
        <HomeLayout>
            {role == 1 && (
                <VStack padding={"0 2rem"}>
                    <AllJobs />
                </VStack>
            )}
        </HomeLayout>
    );
};

export const SearchPage = () => {
    const role = useSelector((state) => state.auth.role);
    return <HomeLayout>
        {role == 1 && (
            <VStack padding={"0 2rem"} width={"full"}>
                <SearchJobPage />
            </VStack>
        )}
    </HomeLayout>
}

