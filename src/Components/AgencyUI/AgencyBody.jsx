import React from "react";
import { Box } from "@chakra-ui/react";
import AgencyLeftbar from "./AgencyLeftbar";
import AgencyRightBar from "./AgencyRightBar";

const AgencyBody = ({ agency, setIsUpdate }) => {
  return (
    <AgencyBodyLayout>
      <Box
        display={"flex"}
        width={"95%"}
        paddingY={"20px"}
        position={"relative"}
      >
        <AgencyLeftbar agency={agency} setIsUpdate={setIsUpdate} />
        <AgencyRightBar agency={agency} setIsUpdate={setIsUpdate} />
      </Box>
    </AgencyBodyLayout>
  );
};

export const AgencyBodyLayout = ({ children }) => {
  return (
    <Box
      width={"90%"}
      display={"flex"}
      justifyContent={"center"}
      className="shadow-sm border p-4"
    >
      {children}
    </Box>
  );
};

export default AgencyBody;
