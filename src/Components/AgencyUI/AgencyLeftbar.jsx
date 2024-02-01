import React from "react";
import { VStack } from "@chakra-ui/react";
import AgencyTitle from "./AgencyTitle";
import AgencyOverview from "./AgencyOverview";
import AgencyServices from "./AgencyServices";
import AgencyWorkHistory from "./AgencyWorkHistory";
import AgencyMemburs from "./AgencyMemburs";
import AgencyProjects from "./AgencyPorjects";

const AgencyLeftbar = ({ agency, setAgency }) => {
  const { agency_overview } = agency || [];
  return (
    <VStack
      alignItems={"flex-start"}
      width={"75%"}
      borderRight={"0.1px solid black"}
      gap={"5"}
    >
      <AgencyOverview overview={agency_overview} setAgency={setAgency} />
      <AgencyServices agency={agency} setAgency={setAgency} />
      <AgencyProjects setAgency={setAgency} agency={agency} />
      <AgencyWorkHistory setAgency={setAgency} />
      <AgencyMemburs setAgency={setAgency} />
    </VStack>
  );
};

export default AgencyLeftbar;
