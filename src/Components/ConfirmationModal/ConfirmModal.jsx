import React from 'react';
import { VStack, Card, CardBody, Button, Text, Image, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ConfirmModal = ({ setOpenModal, job_id, clientDetails, jobDetails }) => {
    const navigate = useNavigate();
    return (
        <VStack
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            pointerEvents="none"
            background="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(5px)"
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    filter: "blur(10px)",
                }}
            ></div>
            <VStack
                height="100%"
                width="100%"
                justifyContent="center"
                alignItems="center"
                pointerEvents="none"
            >
                <Card
                    display="flex"
                    border={"0.1px solid gray"}
                    height="450px"
                    justifyContent="center"
                    width="40%"
                    pointerEvents="auto"
                    padding={"0.5rem 2rem"}
                >
                    <CardBody>
                        <Text fontWeight={"600"} fontSize={"1.4rem"} margin={"1rem 0"}>End contract</Text>
                        <Image src="/images/end_contract.png" width={"200px"} margin={"auto"} />
                        <Text textAlign={"center"} fontSize={"1.4rem"} margin={"1rem 0"} fontWeight={"600"}>Are you sure you want to end this contract?</Text>
                        <HStack justifyContent={"right"} marginTop={"2rem"}>
                            <Button backgroundColor={"white"} color={"var(--primarytextcolor)"} _hover={{}} onClick={() => setOpenModal(false)}>Cancel</Button>
                            <Button borderRadius={"25px"} border={"1px solid var(--primarycolor)"} color={"var(--secondarycolor)"} backgroundColor={"var(--primarytextcolor)"} _hover={{
                                color: "var(--primarytextcolor)",
                                backgroundColor: "var(--secondarycolor)"
                            }} onClick={() => {
                                navigate(`/end-contract/${job_id}`, { state: { jobDetails: jobDetails, clientDetails: clientDetails } })
                            }}>End Contract</Button>
                        </HStack>
                    </CardBody>
                </Card>
            </VStack>
        </VStack >
    )
}

export default ConfirmModal;
