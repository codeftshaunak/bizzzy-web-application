import React, { useEffect, useState } from "react";
import { VStack, HStack } from "@chakra-ui/react";
import AgencyProfileHeader from "./AgencyProfileHeader";
import AgencyBody from "./AgencyBody";
import { getAgency } from "../../helpers/agencyApis";

const AgencyProfile = () => {
  const [agency, setAgency] = useState({});
  const [isUpdate, setIsUpdate] = useState(null);
  const getAgencyDetails = async () => {
    const response = await getAgency();
    setAgency(response);
  };

  useEffect(() => {
    getAgencyDetails();
  }, [isUpdate]);

  return (
    <VStack width={"100%"}>
      <AgencyProfileHeader agency={agency} setIsUpdate={setIsUpdate} />
      <AgencyBody agency={agency} setIsUpdate={setIsUpdate} />
    </VStack>
  );
};

export default AgencyProfile;
