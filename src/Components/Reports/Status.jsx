import { Card, Image, Text, VStack, HStack, Box, Button } from "@chakra-ui/react";
import { getReportData } from "../../helpers/freelancerApis";
import { useEffect, useState } from "react";

const data = [{
  "id": 0,
  "title": "Applications Sent",
  "number": 20
}, {
  "id": 4,
  "title": "Invitations Received",
  "number": 20
}, {
  "id": 1,
  "title": "Jobs Completed",
  "number": 20
}, {
  "id": 2,
  "title": "Total Hours Worked",
  "number": 20
}, {
  "id": 3,
  "title": "Gross Earnings",
  "number": 20
}
]

const Status = () => {
  const [report, setReport] = useState([]);

  const getReport = async () => {
    const response = await getReportData();
    setReport(response.body)
  }

  const { user_details, balance, stats } = report;

  useEffect(() => {
    getReport();
  }, [])

  return (
    <div className="w-full pb-24">
      <h2 className="my-6 text-[30px] font-semibold">Earnings Overview</h2>

      <HStack justifyContent={"space-between"}>
        <Card width={"400px"} backgroundColor={"#F0FDF4"} height={"10rem"} alignItems={"center"} justifyContent={"center"}>
          <p className="font-semibold text-4xl mb-2">${balance?.progress}</p>
          <p className="font-semibold text-lg capitalize">In Progress</p>
        </Card>


        <Card width={"400px"} height={"10rem"} alignItems={"center"} justifyContent={"center"}>
          <p className="font-semibold text-4xl mb-2">${balance?.review}</p>
          <p className="font-semibold text-xl capitalize">In review</p>
        </Card>

        <Card width={"400px"} height={"10rem"} alignItems={"center"} justifyContent={"center"}>
          <p className="font-semibold text-4xl mb-2">${balance?.available}</p>
          <p className="font-semibold text-lg">Available</p>
        </Card>

      </HStack>

      <h2 className="my-6 text-[30px] font-semibold">General Stats</h2>
      <HStack justifyContent={"space-between"}>
        {
          stats?.map((data) => {
            return <Card key={data.id} width={"220px"} backgroundColor={"#F0FDF4"} height={"10rem"} alignItems={"center"} justifyContent={"center"}>
              <p className="font-semibold text-4xl mb-2">{data.number}</p>
              <p className="font-semibold text-lg capitalize">{data.title}</p>
            </Card>
          })
        }
      </HStack>

      <OthersPayment />

    </div>

  );
};

export const OthersPayment = () => {
  return <div className="relative">
    <h2 className="my-6 text-[30px] font-semibold">Others Payment & Adjustment</h2>
    <div className="relative h-[25rem] border">
      <HStack spacing="4" height={"100%"}>
        {data.map((data) => (
          <Card key={data.id} width="400px" backgroundColor="#F0FDF4" height="10rem" alignItems="center" justifyContent="center">
            <p className="font-semibold text-4xl mb-2">{data.number}</p>
            <p className="font-semibold text-lg capitalize">{data.title}</p>
          </Card>
        ))}
      </HStack>

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="100"
        background="rgba(255, 255, 255, 0.8)"
        backdropFilter="blur(10px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <VStack spacing="4" width={"700px"}>
          <Image src="./images/bizzzy_logo.png" width={"250px"} />
          <Text fontSize="2xl" fontWeight="bold">
            Welcome to Bizzzy!
          </Text>
          <Text>We're excited to have you be a part of our brand new launch!</Text>
          <Text>
            Detailed reporting is coming shortly in further updates with the site. For anything you may require immediately for accounting purposes or otherwise, please feel free to ping our support department for a swift response.
          </Text>
          <Button color="var(--secondarycolor)" backgroundColor={"var(--primarycolor)"} borderRadius={"20px"} width={"150px"} _hover={{
            color: "var(--primarytext)",
            backgroundColor: "var(--secondarycolor)",
            border: "1px solid var(--primarytextcolor)"
          }}>Get In Touch</Button>
        </VStack>

      </Box>
    </div>

  </div>
}

export default Status;
