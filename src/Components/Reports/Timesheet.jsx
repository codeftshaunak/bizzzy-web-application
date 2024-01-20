import {
  Card,
  CardBody,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const TimeSheet = () => {
  return (
    <div className="my-3">
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
                        <Td className="text-[#16A34A]">Netsome Gmbh - UI Designer for mobile application</Td>
                        <Td>-</Td>
                        <Td>-</Td>
                        <Td isNumeric>-</Td>
                        <Td isNumeric>$5.00/hr</Td>
                        <Td isNumeric>$5.00/hr</Td>
                      </Tr>
                      <Tr>
                        <Td className="text-[#16A34A]">Optimum- UX/UI Designer With Service Design for Startups</Td>
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
                <h2 className="my-3 font-semibold text-[20px]">Timesheet for sep 18 - 24 (this Week )in progress</h2>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TimeSheet;
