import React from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import ClientDashboardComponent from "../../Components/ClientJobPostViewUi";

const ClientDashboard = () => {
  return (
    <>
      <HomeLayout>
        <ClientDashboardComponent />
      </HomeLayout>
    </>
  );
};

export default ClientDashboard;
