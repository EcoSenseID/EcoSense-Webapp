import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, FormLabel, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { emailSignUp } from "../../firebase/firebase.util";

import { FiAtSign, FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

import classes from './signup-panel.module.scss';

const SignupPanel = () => {
    // React Hooks
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { displayName, email, password, confirmPassword } = userCredentials;

    const [displayPwd, setDisplayPwd] = useState(false);
    const [displayConfirmPwd, setDisplayConfirmPwd] = useState(false);
    const [error, setError] = useState({
        isError: false,
        errorMessage: '',
        errorDescription: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userCredentials);
        
        if (password !== confirmPassword) {
            setError({
                isError: true,
                errorMessage: `Passwords don't match`,
                errorDescription: 'Password and Confirm Password should be the same.'
            })
            setCredentials({...userCredentials, password: '', confirmPassword: '' });
            return;
        }
        emailSignUp({ displayName, email, password });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCredentials({...userCredentials, [name]: value });
    }

    return (
        <div className={classes.sign_up}>
            <h2 className={classes.title}>Create a New Account</h2>
            {/* <span className={classes.subtitle}>Sign up with your email and password</span> */}
            <HStack spacing="1" mb={5}>
                <Text color="muted">Already have an account?</Text>
                <Button variant="link" colorScheme="blue">
                    <Link href="/login">Log In</Link>
                </Button>
            </HStack>
            { error.isError && 
                <Alert status='error' borderRadius={10}>
                    <AlertIcon />
                    <Box>
                        <AlertTitle>{error.errorMessage}</AlertTitle>
                        <AlertDescription>{error.errorDescription}</AlertDescription>
                    </Box>
                </Alert>
            }
            <form onSubmit={handleSubmit} className="sign-up-form">
                <FormControl mt={5} mb={5} isRequired>
                    <FormLabel htmlFor="displayName">Name</FormLabel>
                    <InputGroup>
                        <InputLeftElement><FiUser /></InputLeftElement>
                        <Input 
                            value={displayName} 
                            onChange={handleChange} 
                            type="text" 
                            name="displayName" 
                            placeholder="Enter your name" 
                            focusBorderColor="blue.400" 
                            rounded="md"
                            required
                        />
                    </InputGroup>
                </FormControl>
                <FormControl mb={5} isRequired>
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
                <FormControl mb={5} isRequired>
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
                <FormControl mb={10} isRequired>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <InputGroup>
                        <InputLeftElement><FiLock /></InputLeftElement>
                        <Input 
                            value={confirmPassword} 
                            onChange={handleChange} 
                            type={displayConfirmPwd ? "text" : "password"} 
                            name="confirmPassword" 
                            placeholder="Enter your password again" 
                            focusBorderColor="blue.400" 
                            rounded="md"
                            required
                        />
                        <InputRightElement onClick={() => setDisplayConfirmPwd(!displayConfirmPwd)}>
                            { displayConfirmPwd ? <FiEye /> : <FiEyeOff />}
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button type="submit" variant="solid" colorScheme='green' width='100%'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignupPanel;