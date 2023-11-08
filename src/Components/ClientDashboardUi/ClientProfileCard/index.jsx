import { Button, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ClientProfileCard = () => {
  return (
    <VStack color="var(--primarytext)" gap={"5"}>
      <Image
        src="./images/user.jpeg"
        alt="user"
        width="80px"
        borderRadius="100%"
      />

      <VStack gap={"0"}>
        <Text fontSize="1.2rem" marginBottom={"2"} fontWeight={"bold"}>
          Sasheen M.
        </Text>
        <Text marginBottom={"0"} textAlign={"center"} fontSize={"small"}>
          Customer Experience Consultant
        </Text>
      </VStack>
      <VStack gap={"0"} w="100%">
        <Button colorScheme="green" size="sm" isFullWidth w={"100%"}>
          Message
        </Button>
      </VStack>
    </VStack>
  );
};

export default ClientProfileCard;
