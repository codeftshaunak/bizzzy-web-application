import React from "react";
import { Text, VStack, Box, Button, HStack } from "@chakra-ui/react";
import GigStatus from "./GigStatus";

const ManageProject = ({ setPage }) => {
  return (
    <VStack width={"100%"}>
      <HStack justifyContent={"space-between"} width={"100%"}>
        <Text fontWeight={"500"} fontSize={"20px"} color={"black"}>
          Your Gigs
        </Text>
        <Button
          className="mt-3 border"
          backgroundColor={"white"}
          height={"34px"}
          fontWeight={"400"}
          borderRadius={"25px"}
          border={"2px solid  var(--primarytextcolor)"}
          transition={"0.3s ease-in-out"}
          _hover={{
            color: "white",
            backgroundColor: "var(--primarytextcolor)",
          }}
          onClick={() => setPage(2)}
        >
          Create New Gig
        </Button>
      </HStack>
      <HStack
        width={"100%"}
        marginTop={"1rem"}
        border={"1px solid #d8d8d8"}
        borderRadius={"5px"}
      >
        <GigStatus setPage={setPage} />
      </HStack>
    </VStack>
  );
};

export default ManageProject;
