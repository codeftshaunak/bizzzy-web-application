import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import AvatarImg from "../../assets/avatar.jpeg";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Button,
  Stack,
} from "@chakra-ui/react";
import ClientNavbar from "../ClientNavbar";
export const ClientHiringComponent = () => {
  return (
    <div className="w-full md:px-8 md:py-6">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-[#374151] ">
            Your Dashboard
          </h2>
          <p className="text-lg font-normal text-[#374151] ">Joe doe</p>
        </div>
      </div>

      <ClientNavbar />

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="overflow-hidden border rounded-lg basis-full md:basis-4/5 border-slate-300">
          <Tabs variant="unstyled">
            <TabList className="px-6 pt-4 border-b">
              <Tab className="px-0 text-black">Offers</Tab>
              <Tab className="px-0 text-black">Hired</Tab>
            </TabList>
            <TabIndicator
              height="2px"
              borderRadius="1px"
              color={"#000"}
              className=" bg-fg-brand"
            />
            <TabPanels>
              <TabPanel>
                <div className="h-[196px] px-8 pt-8 pb-4 flex justify-center items-center ">
                  <p>You don’t have any hires yet</p>
                </div>
              </TabPanel>
              <TabPanel>
                <p>Hired!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientHiringComponent;
