import React from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import ClientDashboardComponent from "../../Components/ClientDashboardUi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ClientDashBoard = () => {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  return (
    <>
      <HomeLayout>
        {
          role == 2 ? <ClientDashboardComponent /> : navigate("/find-job")
        }
      </HomeLayout>
    </>
  );
};

export default ClientDashBoard;
