import React from 'react'

import { useToast as useChakraToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useChakraToast();

  const showToast = ({ title, description, status }) => {
    toast({
      title,
      description,
      status,
      duration: 2000,
      isClosable: true,
      position:'top-right',
    });
  };

  return showToast;
};

export default useCustomToast;
