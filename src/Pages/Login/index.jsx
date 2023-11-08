import React, { useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { BsEye, BsEyeSlash } from 'react-icons/bs'; // For the show/hide password functionality
import CTAButton from '../../Components/CTAButton';
import { BsFacebook, BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Divider from '../../Components/Divider/Divider';
import { VStack, Flex, Box, Input, HStack, IconButton, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'; // Import Chakra-UI components
import OnbardingCardLayout from '../../Layouts/CardLayout/OnbardingCardLayout';
import { signIn } from '../../helpers/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../redux/authSlice/authSlice'; // Import your actions

const Login = ({ setPage }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const iconsStyle = {
        fontSize: '1.5rem',
        padding: '0.4rem',
        width: '110px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        border: '1px solid var(--bordersecondary)',
        borderRadius: '6px',
        backgroundColor: 'var(--secondarycolor)',
    };

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    console.log(formData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await signIn(formData);
        if (response.code === 200) {
            const { role, token } = response.body;
            dispatch(setAuthData({ role, token })); // Dispatch the action to set the role and token
            localStorage.setItem("token", token);
            localStorage.setItem("role", role)
            toast({
                title: response.msg,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            navigate("/onboarding");
        } else if (response.code === 403) {
            toast({
                title: response.msg,
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            // navigate("/login")
        } else if (response.code === 405) {
            toast({
                title: response.msg,
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            navigate("/login");
        }
    };



    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <OnbardingCardLayout title="Login to Bizzzy">
            <br />
            <VStack width="100%" gap={7}>
                <Flex
                    border="1px solid var(--bordersecondary)"
                    borderRadius="5px"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    padding="0rem 0.4rem"
                >
                    <CiUser style={{ fontSize: '1.3rem', marginRight: '0.1rem' }} />
                    <Input
                        type="text"
                        name="email"
                        placeholder="Username Or Email"
                        value={formData.email}
                        onChange={handleChange}
                        fontSize="1rem"
                        width="100%"
                        border="none"
                        variant="unstyled"
                        padding="0.5rem 0.5rem"
                    />
                </Flex>
                <Flex
                    border="1px solid var(--bordersecondary)"
                    borderRadius="5px"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    padding="0rem 0rem 0 0.6rem"
                >
                    <BsEye style={{ fontSize: '1.2rem', marginRight: '0.1rem' }} />
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        variant="unstyled"
                        fontSize="1rem"
                        padding="0.5rem 0.5rem"
                        border={"none"}
                    />
                    <IconButton
                        aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                        icon={showPassword ? <BsEyeSlash /> : <BsEye />}
                        onClick={toggleShowPassword}
                    />
                </Flex>
                <CTAButton
                    text="Continue with Email"
                    bg="var(--primarycolor)"
                    color="#fff"
                    fontWeight="500"
                    height="2.5rem"
                    borderRadius="5px"
                    fontSize="1rem"
                    onClick={(e) => handleLogin(e)}
                />
                <Divider text="Or" dwidth="180px" />
                <HStack justifyContent="space-between" width="100%">
                    <Box style={iconsStyle} color="#3789f4">
                        <BsFacebook />
                    </Box>
                    <Box style={iconsStyle}>
                        <FcGoogle />
                    </Box>
                    <Box style={iconsStyle}>
                        <BsApple />
                    </Box>
                </HStack>
            </VStack>
            <br />
            <br />
            <div>
                <Divider text="Don't have a Bizzzy account?" dwidth="60px" />
                <br />
                <CTAButton fontSize="1rem" text="Sign Up" border="1px solid var(--bordersecondary)" bg="var(--secondarycolor)" width="100%" onClick={() => navigate("/signup")} />
            </div>
        </OnbardingCardLayout>
    );
};

export default Login;
