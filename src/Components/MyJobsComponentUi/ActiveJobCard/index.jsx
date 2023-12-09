import { Button, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { IoBagOutline } from "react-icons/io5";

const ActiveJobCard = ({ job }) => {
  const { jobtitle, budget, jobtype } = job;

  return (
    <div className="border p-4 m-2 rounded">
      <div className="flex items-center justify-center">
        <IoBagOutline className="text-[1.8rem]" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold ">{jobtitle}</h3>
        <p className="text-sm text-gray-700">{jobtype}</p>
        <p className="text-sm text-gray-700">{budget}</p>
      </div>
    </div>
  );
};

export default ActiveJobCard;
