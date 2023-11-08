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
        Joe Doe
        </Text>
        <Text px={10} marginBottom={"0"} textAlign={"center"} fontSize={"sm"}>
        Customer Experience Consultant
        </Text>
      </VStack>
      <VStack gap={"0"} w="100%">
        <Button colorScheme="16A34A" bg={'#16A34A'} color={'#fff'} size="sm" isFullWidth fontSize={'sm'} w={"100%"}>
          Message
        </Button>
      </VStack>
    </VStack>
  );
};

export default ClientProfileCard;
