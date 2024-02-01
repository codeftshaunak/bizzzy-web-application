import React, { useState } from "react";
import { HStack, Text, Box, VStack } from "@chakra-ui/react";
import { RiEdit2Fill } from "react-icons/ri";
import AgencyTitle from "./AgencyTitle";
import { MdLocationPin } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { AgencyUpdatedModal } from "./ProfileUpdated";

const AgencyRightBar = ({ agency, setAgency }) => {
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [value, setValue] = useState(null);
  const { agency_hourlyRate, agency_location, agency_companyInfo } =
    agency || {};

  const handleUpdate = (type, value) => {
    setIsModal(true);
    setIsModalType(type);
    setValue(value);
  };
  return (
    <>
      <VStack
        width={"250px"}
        alignItems={"flex-start"}
        justifyContent={"right"}
        marginX={"auto"}
      >
        <Text fontSize={"1.3rem"} fontWeight={"600"}>
          Your Agency Activity
        </Text>
        <Box position={"relative"} mb={"1rem"}>
          <Text> Hourly Rate</Text>
          <Text fontSize={"1.3rem"} fontWeight={"600"}>
            ${agency_hourlyRate}
          </Text>
          <VStack
            backgroundColor={"white"}
            position={"absolute"}
            top={"0"}
            right={"-10"}
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
            onClick={() => handleUpdate("Hourly Rate", agency_hourlyRate)}
          >
            <RiEdit2Fill fontSize={"15px"} />
          </VStack>
        </Box>

        <Box position={"relative"} mb={"1rem"}>
          <Text> Total Completed Job</Text>
          <Text fontSize={"1.3rem"} fontWeight={"600"}>
            0
          </Text>
        </Box>

        <Box position={"relative"} mb={"1rem"}>
          <AgencyTitle
            setAgency={setAgency}
            isValue={!!agency_location?.country}
          >
            Office Location
          </AgencyTitle>
          <Box>
            {!!agency_location?.country && (
              <HStack>
                <MdLocationPin fontSize={"1.2rem"} />
                <Text>
                  {agency_location?.street}, {agency_location?.state}
                </Text>
              </HStack>
            )}
            {/* <HStack>
              <IoTime />
              <Text>6:00 Am, 23 Jan 2024</Text>
            </HStack> */}
          </Box>
        </Box>

        <VStack gap={"10px"} alignItems={"flex-start"}>
          <AgencyTitle isHide={true}>Company Information</AgencyTitle>
          <VStack gap={"10px"} alignItems={"flex-start"}>
            <HStack>
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
                onClick={() =>
                  handleUpdate("Agency Size", agency_companyInfo?.agency_size)
                }
              >
                {agency_companyInfo?.agency_size ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus fontSize={"25px"} />
                )}
              </VStack>
              <Text fontSize={"1rem"} fontWeight={"600"}>
                Add Your Agency Size
              </Text>
            </HStack>
            <HStack>
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
                onClick={() => handleUpdate("Founded")}
              >
                {agency_companyInfo?.agency_foundedYear ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus fontSize={"25px"} />
                )}
              </VStack>
              <Text fontSize={"1rem"} fontWeight={"600"}>
                Add Year Agency Founded
              </Text>
            </HStack>
            <HStack>
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
                onClick={() => handleUpdate("Client")}
              >
                {agency_companyInfo?.agency_focus ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus fontSize={"25px"} />
                )}
              </VStack>
              <Text fontSize={"1rem"} fontWeight={"600"}>
                Add Client You Focus
              </Text>
            </HStack>
            <HStack>
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
                onClick={() => handleUpdate("Language")}
              >
                {agency_companyInfo?.agency_language ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus fontSize={"25px"} />
                )}
              </VStack>
              <Text fontSize={"1rem"} fontWeight={"600"}>
                Add Language
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
      {isModal && (
        <AgencyUpdatedModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={modalType}
          setAgency={setAgency}
          data={value}
        />
      )}
    </>
  );
};

export default AgencyRightBar;
