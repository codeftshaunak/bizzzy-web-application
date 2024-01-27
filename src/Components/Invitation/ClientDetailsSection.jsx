
import CTAButton from '../../Components/CTAButton';
import { IoMdStar, IoMdTime } from 'react-icons/io';
import { Box, HStack, Text, VStack, useToast } from "@chakra-ui/react";

export const ClientDetailsSection = ({ clientDetails, status, acceptInvite, rejectInvite, setOpenModal, offer }) => {
    return (

        <VStack padding="2rem 3rem" borderRadius="10px" width="450px" alignItems="start">

            {
                offer ? <Text fontSize="xs" >Accept Job Offer For Start Your Contract!</Text> : <Text fontSize="xs" mb="15px" textAlign="center">Interested in discussing this job</Text>
            }

            <VStack>
                {
                    offer ? <>
                        <CTAButton text="Accept Offer" size="xl" padding="0.6rem 1.5rem" borderRadius="20px" background="var(--primarycolor)" color="#ffff" border="1px solid var(--primarycolor)" onClick={() => setOpenModal(true)} isDisabled={status === 1 || status === 2} />
                        <CTAButton text="Decline Offer" size="xl" padding="0.6rem 1.5rem" borderRadius="20px" border="1px solid var(--primarycolor)" hoverbg="var(--primarycolor)" hovercolor="#ffff" onClick={() => rejectInvite()} isDisabled={status === 1 || status === 2} />
                    </> : <>
                        <CTAButton text="Accept Interview" size="xl" padding="0.6rem 1.5rem" borderRadius="20px" background="var(--primarycolor)" color="#ffff" border="1px solid var(--primarycolor)" onClick={() => setOpenModal(true)} isDisabled={status === 1 || status === 2} />
                        <CTAButton text="Decline Interview" size="xl" padding="0.6rem 1.5rem" borderRadius="20px" border="1px solid var(--primarycolor)" hoverbg="var(--primarycolor)" hovercolor="#ffff" onClick={() => rejectInvite()} isDisabled={status === 1 || status === 2} />
                    </>
                }
            </VStack>

            <VStack width="100%" marginTop="0.8rem">
                <Text textAlign="left" width="full" fontWeight="600" mb={"0"}>About the client</Text>
                <HStack justifyContent="left" width="100%" gap={"0"}>
                    <HStack gap={"0"}>
                        {[1, 2, 3, 4, 5].map((index) => <Text key={index}> <IoMdStar fontSize="20px" /></Text>)}
                    </HStack>
                    <Text>(5.00) {clientDetails?.reviews?.length !== 0 ? clientDetails?.reviews?.length : ""} Reviews</Text>
                </HStack>
                <VStack justifyContent="left" width="full" alignItems="start" gap="0">
                    <Text fontWeight="bold" textAlign="left">Location</Text>
                    <Text textAlign="left" marginBottom="0">{clientDetails?.location}</Text>
                </VStack>
            </VStack>
        </VStack>
    );
};