import React from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import ClientDashboardComponent from "../../Components/ClientDashboardUi";

const ClientDashBoard = () => {
  return (
    <>
      <HomeLayout>
        <ClientDashboardComponent />
      </HomeLayout>
    </>
  );
};

export default ClientDashBoard;
