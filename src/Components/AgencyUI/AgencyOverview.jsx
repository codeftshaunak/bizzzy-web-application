import AgencyTitle from "./AgencyTitle";
import { Text } from "@chakra-ui/react";

const AgencyOverview = ({ overview }) => {
  return (
    <>
      <div>
        <AgencyTitle isValue={false} data={overview}>
          Overview
        </AgencyTitle>
        <Text>{overview}</Text>
      </div>
    </>
  );
};

export default AgencyOverview;
