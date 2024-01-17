/* eslint-disable react/prop-types */
import { VStack } from "@chakra-ui/react";
import { Header, AuthHeader } from "../../Components/Header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const HomeLayout = (props) => {
    const token = useSelector((state) => state.auth.authtoken);
    const role = useSelector((state) => state.auth.role);
    console.log(role);
    return (
        <VStack width={"full"} spacing={0} gap={"5"}>
            {token ? <AuthHeader role={role} /> : <Header />}
            <VStack width={"85%"} gap={props.gap ? props.gap : "60px"} bg={props.bg}>
                {props.children}
            </VStack>
        </VStack>
    );
};

export default HomeLayout;

