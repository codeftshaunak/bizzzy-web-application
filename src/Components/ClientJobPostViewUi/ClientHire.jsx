import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState,useEffect } from "react";
import { getAllInvitedHireList, getHiredFreelancerList } from "../../helpers/jobApis";

export const ClientHire = () => {
  const [SearchResults,setSearchResults] = useState();
  const [hiredFreelancer,setHiredFreelancer] = useState();
  const [loading, setLoading] = useState(true);


  //invited for hire freelancer list
  const getInvitedHire = async() => {
    try {
      setLoading(true);
      const response = await getAllInvitedHireList();
      if (response && response) {
        setSearchResults(response);
      } else {
        console.error("API Response body is undefined");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };
  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getAllInvitedHireList();
  //     if (response && response) {
  //       setSearchResults(response);
  //     } else {
  //       console.error("API Response body is undefined");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //hired freelancer list
  const hiredFreelancerList = async () => {
    try {
      setLoading(true);
      const response = await getHiredFreelancerList();
      if (response && response) {
        setHiredFreelancer(response);
      } else {
        console.error("API Response body is undefined");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvitedHire()
  }, []);
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="overflow-hidden border rounded-lg basis-full md:basis-4/5 border-slate-300">
        <Tabs variant="unstyled">
          <TabList className="px-6 pt-4 border-b">
            <Tab className="px-0 text-black" onClick={() => getInvitedHire()}>
              Offers
            </Tab>
            <Tab className="px-0 text-black" onClick={() => hiredFreelancerList()}>
              Hired
            </Tab>
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
  );
};
