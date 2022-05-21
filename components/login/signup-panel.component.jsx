import React, { useState } from "react";
import { useRouter } from 'next/router';

import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, FormLabel, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Link, ScaleFade, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { FiAtSign, FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

import { emailSignUp } from "../../firebase/firebase.util";
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
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({
        isError: true,
        errorMessage: '',
        errorDescription: ''
    });
    const toast = useToast();
    const router = useRouter();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(userCredentials);
        setError({ ...error, isError: false, errorMessage: '', errorDescription: '' });
        
        if (password !== confirmPassword) {
            setError({
                ...error,
                isError: true,
                errorMessage: `Passwords don't match`,
                errorDescription: 'Password and Confirm Password should be the same.'
            });
            setCredentials({...userCredentials, password: '', confirmPassword: '' });
            return;
        } else {
            setLoading(true);
            const result = await emailSignUp({ displayName, email, password });
            setLoading(false);
            if (result.error) {
                setError({
                    ...error,
                    isError: true,
                    errorMessage: result.errorDetail.name,
                    errorDescription: result.errorDetail.message
                });
                return;
            } else {
                toast({
                    title: 'Account created.',
                    description: "Now, please log in with your new account.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                router.push('/login');
                setCredentials({...userCredentials, displayName: '', email: '', password: '', confirmPassword: '' });
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({...userCredentials, [name]: value });
    }
    
    return (
        <div className={classes.sign_up}>
            <h2 className={classes.title}>Create a New Account</h2>
            <HStack spacing="1" mb={5}>
                <Text color="muted">Already have an account?</Text>
                <Button variant="link" colorScheme="blue">
                    <Link href="/login">Log In</Link>
                </Button>
            </HStack>

            { error.isError && error.errorMessage != '' && 
                <ScaleFade in={true} reverse={true}>
                    <Alert status='error' borderRadius={10} mb={5} mt={5}>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>{error.errorMessage}</AlertTitle>
                            <AlertDescription>{error.errorDescription}</AlertDescription>
                        </Box>
                    </Alert>
                </ScaleFade>
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
                <FormControl mb={7} isRequired>
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
                
                { isLoading ? 
                    <Button isLoading mt={7} variant="solid" colorScheme='green' width='100%'>Sign Up</Button> :
                    <Button mt={7} type='submit' variant="solid" colorScheme='green' width='100%'>Sign Up</Button>
                }
            </form>
        </div>
    )
}

export default SignupPanel;