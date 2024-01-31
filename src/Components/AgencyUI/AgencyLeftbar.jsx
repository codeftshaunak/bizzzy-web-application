import React from "react";
import { VStack } from "@chakra-ui/react";
import AgencyTitle from "./AgencyTitle";
import AgencyOverview from "./AgencyOverview";
import AgencyServices from "./AgencyServices";
import AgencyPortfolio from "./AgencyPortfolio";
import AgencyWorkHistory from "./AgencyWorkHistory";
import AgencyMemburs from "./AgencyMemburs";

const AgencyLeftbar = ({ agency, setIsUpdate }) => {
  const { agency_overview } = agency || [];
  return (
    <VStack
      alignItems={"flex-start"}
      width={"75%"}
      borderRight={"0.1px solid black"}
      gap={"5"}
    >
      <AgencyOverview overview={agency_overview} setIsUpdate={setIsUpdate} />
      <AgencyServices agency={agency} setIsUpdate={setIsUpdate} />
      <AgencyPortfolio setIsUpdate={setIsUpdate} />
      <AgencyWorkHistory setIsUpdate={setIsUpdate} />
      <AgencyMemburs setIsUpdate={setIsUpdate} />
    </VStack>
  );
};

export default AgencyLeftbar;
