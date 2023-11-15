/* eslint-disable react/prop-types */
import { VStack } from "@chakra-ui/react";
import { Header, AuthHeader } from "../../Components/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HomeLayout = (props) => {
    const token = useSelector((state) => state.auth.authtoken);

    return (
        <VStack width={"full"} spacing={0} gap={"5"}>
            {token ? <AuthHeader /> : <Header />}
            <VStack width={"80%"} gap={props.gap ? props.gap : "60px"} bg={props.bg}>
                {props.children}
            </VStack>
        </VStack>
    );
};

export default HomeLayout;

