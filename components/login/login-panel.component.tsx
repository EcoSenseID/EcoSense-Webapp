import React, { useState } from "react";
import { useRouter } from 'next/router';

import classes from './login-panel.module.scss';

import { emailLogIn, logInWithGoogle, forgotPassword } from "../../firebase/firebase.util";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Divider, FormControl, FormLabel, HStack, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ScaleFade, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";

import { FiAtSign, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc'

const LoginPanel = () => {
    // React Hooks
    const [displayPwd, setDisplayPwd] = useState(false);
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;
    const [emailForgot, setEmailForgot] = useState('');
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const [isLoading, setLoading] = useState(false);
    const [isGoogleLoading, setGoogleLoading] = useState(false);
    const [isForgotLoading, setForgotLoading] = useState(false);
    const [error, setError] = useState({
        isError: true,
        errorMessage: '',
        errorDescription: ''
    });
    const toast = useToast();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError({ ...error, isError: false, errorMessage: '', errorDescription: '' });
        setLoading(true);

        // Send Request to API
        const result = await emailLogIn(email, password);
        setLoading(false);
        if (result.error) {
            setError({
                ...error,
                isError: true,
                errorMessage: result.errorDetail.name,
                errorDescription: result.errorDetail.message
            });
        } else {
            // console.log(result.message);
            toast({
                title: 'Login Success.',
                description: "Enjoy your visit~",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top'
            });
            router.push('/dashboard');
            setCredentials({ email: '', password: '' });
        }
    }

    const handleSubmitGoogle = async (event: React.FormEvent) => {
        event.preventDefault();
        setError({ ...error, isError: false, errorMessage: '', errorDescription: '' });
        setGoogleLoading(true);

        //Send request to API
        const result = await logInWithGoogle();
        setGoogleLoading(false);
        if (result.error) {
            setError({
                ...error,
                isError: true,
                errorMessage: result.errorDetail.name,
                errorDescription: result.errorDetail.message
            });
        } else {
            toast({
                title: 'Google Login Success.',
                description: result.message + " Enjoy your visit~",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top'
            });
            router.push('/dashboard');
            setCredentials({ email: '', password: '' });
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    const handleChangeEmailForgot = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailForgot(event.target.value);
    }

    const handleSubmitForgot = async (event: React.FormEvent) => {
        event.preventDefault();
        setForgotLoading(true);

        // Send request to API
        const result = await forgotPassword(emailForgot);
        setForgotLoading(false);
        // console.log(result);
        if (result.error) {
            toast({
                title: result.errorDetail.name,
                description: result.errorDetail.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            });
        } else {
            toast({
                title: 'Sent!',
                description: result.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top'
            });
            setEmailForgot('');
            onClose();
        }
    }

    return (
        <div className={classes.log_in}>
            <h2 className={classes.title}>Log in to your account</h2>
            <HStack spacing="1" mb={5}>
                <Text color="muted">Don&apos;t have an account?</Text>
                <Button variant="link" colorScheme="blue">
                    <Link href="/signup">Sign up</Link>
                </Button>
            </HStack>
            { error.isError && error.errorMessage != '' && 
                <ScaleFade in={true} reverse={true}>
                    <Alert status='error' borderRadius={10} mt={5} mb={5}>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>{error.errorMessage}</AlertTitle>
                            <AlertDescription>{error.errorDescription}</AlertDescription>
                        </Box>
                    </Alert>
                </ScaleFade>
            }

            <form onSubmit={handleSubmit}>
                <FormControl mt={5} mb={5} isRequired>
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
                <HStack spacing="1" mb={5} justify='flex-end'>
                    <Button variant="link" colorScheme="blue" onClick={onOpen}>
                        <Text>Forgot your password?</Text>
                    </Button>
                </HStack>

                { isLoading ?
                    <Button isLoading mt={5} variant="solid" colorScheme='green' width='100%'>Log In</Button> :
                    <Button mt={5} type="submit" variant="solid" colorScheme='green' width='100%'>Log In</Button>
                }

                <Stack mt={7} spacing="6">
                    <HStack>
                    <Divider />
                    <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                        or continue with
                    </Text>
                    <Divider />
                    </HStack>
                    { isGoogleLoading ?
                        <Button isLoading type="button" variant="solid" colorScheme='gray' width='100%' onClick={handleSubmitGoogle}>
                            <Icon as={FcGoogle} mr={2}></Icon>
                            Google Account
                        </Button> :
                        <Button type="button" variant="solid" colorScheme='gray' width='100%' onClick={handleSubmitGoogle}>
                            <Icon as={FcGoogle} mr={2}></Icon>
                            Google Account
                        </Button>
                    }
                </Stack>
            </form>

            <Modal 
                blockScrollOnMount={false} 
                initialFocusRef={initialRef} 
                isOpen={isOpen} 
                onClose={onClose} 
                closeOnOverlayClick={false} 
                isCentered
                size='xs'
                motionPreset='scale'
            >
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(5px)'/>
                <ModalContent>
                    <ModalHeader>Reset Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text mb={6}>Enter your email address to receive instructions to reset your password.</Text>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                                <InputLeftElement><FiAtSign /></InputLeftElement>
                                <Input type='email' ref={initialRef} value={emailForgot} onChange={handleChangeEmailForgot} placeholder='Your email' />
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        { isForgotLoading ? 
                            <Button isLoading colorScheme='blue' mr={3}>Send</Button> :
                            <Button colorScheme='blue' mr={3} onClick={handleSubmitForgot}>Send</Button>
                        }
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default LoginPanel;