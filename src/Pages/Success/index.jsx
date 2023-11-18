import { HStack, Spinner, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyMail } from '../../helpers/apiRequest';

export const VerifySuccess = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const verifyMailAddress = async () => {
        setLoading(true);
        try {
          const response = await verifyMail({
            id: id,
            token: token,
          });
          setLoading(false);
          if (response.code === 200) {
            toast({
              title: response.msg,
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });
            navigate("/login");
          } else if (response.code === 401) {
            toast({
              title: response.msg,
              status: "warning",
              duration: 3000,
              isClosable: true,
              position: "top-right",
            });
          }
          console.log(response);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false); 
        }
    }

    useEffect(() => {
        verifyMailAddress();
    }, [id]);

    return (
        <HStack justifyContent={"center"} alignItems={"center"} height={"100vh"} backgroundColor={"gray.300"}>

            {
                loading && <Spinner backgroundColor={"#"} width={"3rem"} height={"3rem"} color='red' />
            }
        </HStack>
    )
}

