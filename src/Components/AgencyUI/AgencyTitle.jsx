import React, { useState } from "react";
import { Text, HStack, VStack } from "@chakra-ui/react";
import { RiEdit2Fill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { AgencyUpdatedModal } from "./ProfileUpdated";

const AgencyTitle = ({ children, isValue, data, setIsUpdate }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <HStack>
        <Text fontSize={"1.3rem"} fontWeight={"600"} marginBottom={"0px"}>
          {children}
        </Text>
        {isValue && (
          <VStack
            backgroundColor={"white"}
            borderRadius={"50%"}
            width={"30px"}
            border={"1px solid var(--primarycolor)"}
            height={"30px"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.6s ease-in-out"}
            cursor={"pointer"}
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => setIsModal(true)}
          >
            <RiEdit2Fill fontSize={"15px"} />
          </VStack>
        )}
        {!isValue && (
          <VStack
            backgroundColor={"white"}
            borderRadius={"50%"}
            width={"30px"}
            border={"1px solid var(--primarycolor)"}
            height={"30px"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.6s ease-in-out"}
            cursor={"pointer"}
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => setIsModal(true)}
          >
            <FiPlus fontSize={"25px"} />
          </VStack>
        )}
      </HStack>
      {isModal && (
        <AgencyUpdatedModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={children}
          data={data}
          setIsUpdate={setIsUpdate}
        />
      )}
    </>
  );
};

export default AgencyTitle;
