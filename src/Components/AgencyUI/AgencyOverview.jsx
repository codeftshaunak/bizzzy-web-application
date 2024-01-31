import AgencyTitle from "./AgencyTitle";
import { Text } from "@chakra-ui/react";

const AgencyOverview = ({ overview, setIsUpdate }) => {
  return (
    <>
      <div>
        <AgencyTitle
          data={overview}
          setIsUpdate={setIsUpdate}
          isValue={!!overview}
        >
          Overview
        </AgencyTitle>
        <Text>{overview}</Text>
      </div>
    </>
  );
};

export default AgencyOverview;
