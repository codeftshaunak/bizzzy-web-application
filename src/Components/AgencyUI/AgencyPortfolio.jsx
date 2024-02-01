import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import AgencyTitle from "./AgencyTitle";

const AgencyPortfolio = () => {
  return (
    <Box width={"100%"}>
      <AgencyTitle>Projects</AgencyTitle>
      <Box marginTop={"20px"}>
        <Image
          src="./images/404not-added.png"
          width={"150px"}
          display={"block"}
          margin={"auto"}
        ></Image>
        <Text fontSize={"1.3rem"} textAlign={"center"} fontWeight={"600"}>
          You haven't added your project!
        </Text>
        <Text fontSize={"1rem"} textAlign={"center"}>
          Add your best build for attract visitors!!!
        </Text>
      </Box>
    </Box>
  );
};

export default AgencyPortfolio;
