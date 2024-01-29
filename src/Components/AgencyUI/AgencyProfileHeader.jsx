import React, { useState } from "react";
import {
  HStack,
  Image,
  VStack,
  Box,
  Text,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { RiEdit2Fill, RiDeleteBin2Fill } from "react-icons/ri";
import { AgencyBodyLayout } from "./AgencyBody";
import { useCookies } from "react-cookie";
import { AgencyUpdatedModal } from "./ProfileUpdated";

const AgencyProfileHeader = ({ agency }) => {
  const {
    agency_name,
    agency_tagline,
    agency_coverImage,
    agency_profileImage,
  } = agency;
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const activeagency = cookies.activeagency;
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [modalData, setModalData] = useState(null);

  const handleUpdate = (type, data) => {
    setIsModal(true);
    setIsModalType(type);
    setModalData(data);
  };
  return (
    <>
      <VStack width={"100%"} position={"relative"}>
        <VStack width={"100%"} position={"relative"}>
          {agency_coverImage ? (
            <Image
              src={agency_coverImage}
              alt="cover image"
              className="shadow"
              height={"350px"}
              width={"100%"}
              objectFit={"cover"}
              filter={"brightness(80%)"}
              borderRadius={"20px"}
            />
          ) : (
            <Image
              src="./images/agency_cover.png"
              alt="cover image"
              className="shadow"
              height={"350px"}
              width={"100%"}
              objectFit={"cover"}
              filter={"brightness(80%)"}
              borderRadius={"10px"}
            />
          )}
          <HStack
            fontSize={"2.5rem"}
            position={"absolute"}
            transform={"translate(-50%, -50%)"}
            top={"50%"}
            left={"50%"}
          >
            <VStack
              backgroundColor={"white"}
              borderRadius={"50%"}
              width={"50px"}
              height={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
              transition={"0.6s ease-in-out"}
              cursor={"pointer"}
              _hover={{
                border: "2px solid var(--primarycolor)",
                backgroundColor: "transparent",
                color: "var(--primarycolor)",
              }}
            >
              <RiEdit2Fill fontSize={"25px"} />
            </VStack>
            <VStack
              backgroundColor={"white"}
              borderRadius={"50%"}
              width={"50px"}
              height={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
              transition={"0.6s ease-in-out"}
              cursor={"pointer"}
              _hover={{
                border: "2px solid var(--primarycolor)",
                backgroundColor: "transparent",
                color: "var(--primarycolor)",
              }}
            >
              <RiDeleteBin2Fill cursor={"pointer"} fontSize={"25px"} />
            </VStack>
          </HStack>
        </VStack>

        <AgencyBodyLayout>
          <HStack justifyContent={"space-between"} width={"100%"}>
            <HStack width={"100%"}>
              <HStack position={"relative"}>
                {agency_profileImage ? (
                  <Image
                    src={agency_profileImage}
                    width={"100px"}
                    height={"100px"}
                    objectFit={"cover"}
                    borderRadius={"5px"}
                    boxShadow={"0.5px 0.5px 0.5px 0.5px gray"}
                  />
                ) : (
                  <Avatar
                    name={agency_name}
                    width={"100px"}
                    height={"100px"}
                    borderRadius={"10px"}
                  />
                )}
                <VStack
                  backgroundColor={"white"}
                  position={"absolute"}
                  bottom={"0px"}
                  right={"0px"}
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
                >
                  <RiEdit2Fill fontSize={"15px"} />
                </VStack>
              </HStack>

              <VStack alignItems={"flex-start"} lineHeight={"1.3rem"}>
                <HStack>
                  <Text fontSize={"2rem"} fontWeight={"600"}>
                    {agency_name}
                  </Text>
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
                    onClick={() => handleUpdate("Agency Name", agency_name)}
                  >
                    <RiEdit2Fill fontSize={"15px"} />
                  </VStack>
                </HStack>

                <HStack>
                  <Text fontSize={"1.1rem"}>{agency_tagline}</Text>
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
                      handleUpdate("Agency Tagline", agency_tagline)
                    }
                  >
                    <RiEdit2Fill fontSize={"15px"} />
                  </VStack>
                </HStack>
              </VStack>
            </HStack>

            <Button
              onClick={() => setCookie("activeagency", false)}
              backgroundColor={"var(--primarycolor)"}
              width={"210px"}
              border={"2px solid white"}
              color={"white"}
              borderRadius={"25px"}
              transition={"0.6s ease-in-out"}
              _hover={{
                background: "transparent",
                border: "2px solid var(--primarycolor)",
                color: "black",
              }}
            >
              Switch Your Profile
            </Button>
          </HStack>
        </AgencyBodyLayout>
      </VStack>
      {isModal && (
        <AgencyUpdatedModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={modalType}
          data={modalData}
        />
      )}
    </>
  );
};

export default AgencyProfileHeader;
