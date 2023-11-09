import React from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import ClientDashboardComponent from "../../Components/ClientDashboardUi";
import { useSelector } from "react-redux";

const ClientDashBoard = () => {
  const role = useSelector((state) => state.auth.role);
  console.log(role);
  return (
    <>
      <HomeLayout>
        <ClientDashboardComponent />
      </HomeLayout>
    </>
  );
};

export default ClientDashBoard;
