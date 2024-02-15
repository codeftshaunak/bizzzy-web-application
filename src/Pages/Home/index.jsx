import React, { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
// import { Link } from 'react-router-dom';
// import { Button, HStack } from '@chakra-ui/react';
import HomeComp from "./HomeComp";
import { Footer, MVPFooter } from "../../Components/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeComponent from "../../Components/HomeComponent/HomeComponent";
import ReviewSection from "../../Components/HomeComponent/ReviewSection/ReviewSection";

const Home = () => {
  const token = useSelector((state) => state.auth.authtoken);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (role == 1) {
        navigate("/find-job");
      } else {
        navigate("/client-dashboard");
      }
    }
  }, [token, role]);

  return (
    <>
      <HomeLayout>
        {/* <HomeComp /> */}
        <HomeComponent/>
      </HomeLayout>
      <ReviewSection/>
      <Footer />
    </>
  );
};

export default Home;
