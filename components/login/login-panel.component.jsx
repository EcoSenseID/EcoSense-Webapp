import React, { useState } from "react";
import { useRouter } from 'next/router';

import classes from './login-panel.module.scss';

import { emailLogIn, logInWithGoogle } from "../../firebase/firebase.util";
import { Button, Divider, FormControl, FormLabel, HStack, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Text } from "@chakra-ui/react";

import { FiAtSign, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc'

const LoginPanel = () => {
    // React Hooks
    const [displayPwd, setDisplayPwd] = useState(false);
    const [userCredentials, setCredentials] = useState({ 
        email: '', 
        password: '' 
    });
    const { email, password } = userCredentials;
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await emailLogIn(email, password);
        if (res.status == 200) {
            router.push('/dashboard');
        } else {
            alert(res.message);
        }
    }

    const handleSubmitGoogle = async() => {
        const res = await logInWithGoogle();
        if (res.status == 200) {
            router.push('/dashboard');
        } else {
            alert(res.message);
        }
    }

    const handleChange = (event) => {
        const { value, name } = event.target;

        setCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className={classes.log_in}>
            <h2 className={classes.title}>Log in to your account</h2>
            {/* <span className={classes.subtitle}>Log in with your email and password.</span> */}
            <HStack spacing="1">
                <Text color="muted">Don&apos;t have an account?</Text>
                <Button variant="link" colorScheme="blue">
                    <Link href="/signup">Sign up</Link>
                </Button>
            </HStack>

            <form onSubmit={handleSubmit}>
                <FormControl mt={10} mb={5} isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <InputGroup>
                        <InputLeftElement><FiAtSign /></InputLeftElement>
                        <Input 
                            value={email} 
                            onChange={handleChange} 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            focusBorderColor="blue.400" 
                            rounded="md"
                            required
                        />
                    </InputGroup>
                </FormControl>
                <FormControl mb={10} isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                        <InputLeftElement><FiLock /></InputLeftElement>
                        <Input 
                            value={password} 
                            onChange={handleChange} 
                            type={displayPwd ? "text" : "password"} 
                            name="password" 
                            placeholder="Enter your password" 
                            focusBorderColor="blue.400" 
                            rounded="md"
                            required
                        />
                        <InputRightElement onClick={() => setDisplayPwd(!displayPwd)}>
                            { displayPwd ? <FiEye /> : <FiEyeOff />}
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Button type="submit" variant="solid" colorScheme='green' width='100%'>Log In</Button>

                <Stack mt={6} spacing="6">
                    <HStack>
                    <Divider />
                    <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                        or continue with
                    </Text>
                    <Divider />
                    </HStack>
                    <Button type="button" variant="solid" colorScheme='gray' width='100%' onClick={handleSubmitGoogle}>
                        <Icon as={FcGoogle} mr={2}></Icon>
                        Google Account
                    </Button>
                </Stack>

                {/* <div className={classes.buttons}>
                    <CustomButton type="submit">Log In</CustomButton>
                    <CustomButton type="button" isgooglesignin="true" onClick={handleSubmitGoogle}>Google Log In</CustomButton>
                </div> */}
            </form>
        </div>
    )
}

export default LoginPanel;