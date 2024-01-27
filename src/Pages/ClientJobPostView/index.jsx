import React from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { ClientJobPostViewComponent } from "../../Components/ClientJobPostViewUi";

const ClientJobPostView = () => {
  return (
    <>
      <HomeLayout>
        <ClientJobPostViewComponent />
      </HomeLayout>
    </>
  );
};

export default ClientJobPostView;
