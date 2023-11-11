import { Card, CardBody } from "@chakra-ui/react";

const Status = () => {
  return (
    <div className="w-full">
      <h2 className="my-3 text-[24px] font-semibold">Overview</h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="md:col-span-3 col-span-12">
          <Card bg="#F0FDF4">
            <CardBody>
              <p className="font-semibold">In Progress</p>
              <p className="font-semibold">$35.00</p>
            </CardBody>
          </Card>
        </div>
        <div className="md:col-span-3 col-span-12">
          <Card className="hover:bg-[#F0FDF4]">
            <CardBody>
              <p className="font-semibold">In review</p>
              <p className="font-semibold">$35.00</p>
            </CardBody>
          </Card>
        </div>
        <div className="md:col-span-3 col-span-12">
          <Card className="hover:bg-[#F0FDF4]">
            <CardBody>
              <p className="font-semibold">Pending</p>
              <p className="font-semibold">$35.00</p>
            </CardBody>
          </Card>
        </div>
        <div className="md:col-span-3 col-span-12">
          <Card className="hover:bg-[#F0FDF4]">
            <CardBody>
              <p className="font-semibold">Available</p>
              <p className="font-semibold">$35.00</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Status;
