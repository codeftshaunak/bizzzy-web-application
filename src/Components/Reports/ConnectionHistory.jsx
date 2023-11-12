import {
  Button,
  Card,
  CardBody,
  Image,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const ConnectionHistory = () => {
  return (
    <div className="my-3">
      <Card>
        <div className="w-full ">
          <h2 className="my-3 text-[24px] font-semibold">Connect History</h2>
          <div className="grid grid-cols-12">
            <div className="md:col-span-6 gap-2 col-span-12 bg-gray-50 rounded-[9px] w-[640px] h-[209px] border border-neutral-200">
              <h2 className=" text-[20px] font-semibold  ml-6 mt-3">My Balance</h2>
               <h2 className=" text-[20px] font-semibold  ml-6 mt-3">106 Connects</h2>
              <div className="text-[20px] font-semibold">
                <Button
                  colorScheme="16A34A"
                  className="ml-6 mt-3"
                  bg={"#16A34A"}
                  color={"#fff"}
                  border={"1px solid #16A34A"}
                  size="sm"
                  fontSize={"sm"}
                  w={"10rem"}
                  textTransform={"capitalize"}
                  transition={"0.3s ease-in-out"}
                >
                  Buy Connects
                </Button>

              </div>
              <Image
                    src="./images/report_card.png"
                    alt="user"
                    width="120px"
                    borderRadius="100%"
                    className="ml-auto mt-[-10] mr-10"
                  />
                                
            </div>
            <div className="md:col-span-4 col-span-12">
              <h2 className="my-3 text-[18px] font-semibold">
                Statement Period
              </h2>
              <Select placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <h2 className="my-3 text-[18px] font-semibold">Day Period</h2>
              <Select placeholder="Select option" className="mb-2">
                <option value="option1">Last 7 Days</option>
                <option value="option2">Last 20</option>
                <option value="option3">Last 30 Days</option>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardBody>
          <div className="md:flex my-3 justify-between">
            <h2 className="font-semibold text-[20px]">
              Timesheet for sep 18 - 24 (this Week )in progress
            </h2>
            <p className="font-semibold text-[#16A34A]">
              When will I get paid?
            </p>
          </div>
          <p className="text-end">
            This timesheet includes 0:00 hrs manual time ?
          </p>
          {/* table */}
          <div className="my-5">
            <Card>
              <CardBody>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Job</Th>
                        <Th>Mon 9/18</Th>
                        <Th>Tue9/18</Th>
                        <Th isNumeric>Hours</Th>
                        <Th isNumeric>Rate</Th>
                        <Th isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td className="text-[#16A34A]">
                          Netsome Gmbh - UI Designer for mobile application
                        </Td>
                        <Td>-</Td>
                        <Td>-</Td>
                        <Td isNumeric>-</Td>
                        <Td isNumeric>$5.00/hr</Td>
                        <Td isNumeric>$5.00/hr</Td>
                      </Tr>
                      <Tr>
                        <Td className="text-[#16A34A]">
                          Optimum- UX/UI Designer With Service Design for
                          Startups
                        </Td>
                        <Td>-</Td>
                        <Td isNumeric>-</Td>
                        <Td isNumeric>-</Td>
                        <Td isNumeric>$5.00/hr</Td>
                        <Td isNumeric>$5.00/hr</Td>
                      </Tr>
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td isNumeric></Td>
                        <Td isNumeric>0.00</Td>
                        <Td isNumeric>$5.00/hr</Td>
                        <Td isNumeric>$5.00/hr</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <h2 className="my-3 font-semibold text-[20px]">
                  Timesheet for sep 18 - 24 (this Week )in progress
                </h2>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ConnectionHistory;
