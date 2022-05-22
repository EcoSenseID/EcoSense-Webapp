import React, { useState, useEffect, useContext, useRef } from "react";
import getConfig from 'next/config';

import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { FiLock, FiLoader, FiEye, FiEyeOff } from 'react-icons/fi';
import { changePassword } from "../../firebase/firebase.util";
import { AuthContext } from "../../firebase/context";

const { publicRuntimeConfig } = getConfig();

const ProfileAsideContent = () => {
    const [newPasswords, setNewPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const { oldPassword, newPassword, confirmNewPassword } = newPasswords;
    const [isLoading, setLoading] = useState(false);
    const [displayNewPwd, setDisplayNewPwd] = useState(false);
    const [displayConfirmNewPwd, setDisplayConfirmNewPwd] = useState(false);

    const [displayOldPwd, setDisplayOldPwd] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();
    const { currentUser } = useContext(AuthContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPasswords({...newPasswords, [name]: value });
    }

    const handleSubmitNewPassword = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast({
                title: `Passwords don't match.`,
                description: "Password and Confirm Password should be the same.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setLoading(true);
        const result = await changePassword(oldPassword, newPassword);
        setLoading(false);
        if (result.error) {
            toast({
                title: result.errorDetail.name,
                description: result.errorDetail.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        } else {
            toast({
                title: 'Password changed.',
                description: result.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            setNewPasswords({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
        }
    }

    return (
        <Flex w={['100%', '100%', '30%']} minW={[null, null, '300px', '300px', '400px']} bgColor='#f5f5f5' p='3%' flexDir='column' overflow='auto'>
            <Heading as="div" fontWeight='bold' mb={5} letterSpacing='tight'>Security</Heading>
            <Text mb={5}>Manage your account&apos;s security settings, like your password and two-factor authentication preferences.</Text>
            <Box bgColor='white' borderRadius={10} padding={7} mb={5}>
                <Heading mb={2} fontSize='xl' >Password</Heading>
                <Text>Your primary account password.</Text>
                { currentUser.providerData[0].providerId == 'password' ?
                    <Button leftIcon={<FiLock />} mt={5} variant="outline" colorScheme='red' width='100%' onClick={onOpen}>Change Password</Button> :
                    <Button disabled leftIcon={<FiLock />} mt={5} variant="outline" colorScheme='red' width='100%' onClick={onOpen}>Change Password</Button>
                }
            </Box>
            <Box bgColor='white' borderRadius={10} padding={7} mb={5}>
                <Heading mb={2} fontSize='xl' >Google Authenticator</Heading>
                <Text>Enable two-factor authentication.</Text>
                <Button leftIcon={<FiLoader />} mt={5} disabled variant="outline" colorScheme='green' width='100%'>Coming Soon</Button>
            </Box>
            <Divider borderColor={'blackAlpha.300'} mb={5}/>
            <Box>
                <Heading as="div" fontSize='xl' fontWeight='bold' mb={3} letterSpacing='tight'>About EcoSense</Heading>
                <Text>EcoSense Admin v{publicRuntimeConfig?.version} - Made with ❤️ by EcoSense Team. </Text>
            </Box>

            <Modal 
                blockScrollOnMount={false} 
                initialFocusRef={initialRef} 
                isOpen={isOpen} 
                onClose={onClose} 
                closeOnOverlayClick={false} 
                isCentered
                size='sm'
                motionPreset='scale'
            >
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(5px)'/>
                <ModalContent>
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mb={6}>
                            <FormLabel>Old Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement><FiLock /></InputLeftElement>
                                <Input name="oldPassword" type={displayOldPwd ? 'text' : 'password'} ref={initialRef} value={oldPassword} onChange={handleChange} placeholder='Your old password' />
                                <InputRightElement onClick={() => setDisplayOldPwd(!displayOldPwd)}>
                                    { displayOldPwd ? <FiEye /> : <FiEyeOff />}
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Text mb={6}>Enter your new password twice.</Text>
                        <FormControl mb={6}>
                            <FormLabel>New Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement><FiLock /></InputLeftElement>
                                <Input name="newPassword" type={displayNewPwd ? 'text' : 'password'} value={newPassword} onChange={handleChange} placeholder='Your new password' />
                                <InputRightElement onClick={() => setDisplayNewPwd(!displayNewPwd)}>
                                    { displayNewPwd ? <FiEye /> : <FiEyeOff />}
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirm New Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement><FiLock /></InputLeftElement>
                                <Input name='confirmNewPassword' type={displayConfirmNewPwd ? 'text' : 'password'} value={confirmNewPassword} onChange={handleChange} placeholder='Your new password again' />
                                <InputRightElement onClick={() => setDisplayConfirmNewPwd(!displayConfirmNewPwd)}>
                                    { displayConfirmNewPwd ? <FiEye /> : <FiEyeOff />}
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        { isLoading ? 
                            <Button isLoading colorScheme='red' mr={3}>Change</Button> :
                            <Button colorScheme='red' mr={3} onClick={handleSubmitNewPassword}>Change</Button>
                        }
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default ProfileAsideContent;