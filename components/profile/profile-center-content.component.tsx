import React, { useState, useEffect, useContext, useRef } from "react";
import _ from "lodash";

import { Avatar, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, Text, InputLeftElement, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormHelperText, InputRightElement, Tooltip, Image } from "@chakra-ui/react";
import { FiUser, FiAtSign, FiPhone, FiUpload, FiMail } from 'react-icons/fi';
import { GoVerified, GoUnverified } from 'react-icons/go';
import { FcGoogle } from 'react-icons/fc'

import classes from './profile-center-content.module.scss';
import { AuthContext } from "../../firebase/context";
import { updateUserProfile, updateUserProfilePicture, sendVerifyEmail } from "../../firebase/firebase.util";
import { isImage } from '../helper';

const ProfileCenterContent = () => {
	const { currentUser, isLoading, login } = useContext(AuthContext);
	const initialUserState = {
		userPhotoUrl: '',
		userDisplayName: '',
		userEmail: '',
		userPhoneNumber: '',
		isVerified: false,
		provider: ''
	}
	const [userDetail, setUserDetail] = useState(initialUserState);
	const [newUserDetail, setNewDetail] = useState(initialUserState);
	const [saveIsLoading, setSaveLoading] = useState(false);
	const [uploadIsLoading, setUploadLoading] = useState(false);
	const [verifyIsLoading, setVerifyLoading] = useState(false);
	const [dataChanged, setDataChanged] = useState(false);

	const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
    const [previewFile, setPreviewFile] = useState<string>();
	const [uploadedFileName, setUploadedFileName] = useState<string>('');

	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
	const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		if(!isLoading) {
			if(!_.isEqual(userDetail, newUserDetail)) {
				setDataChanged(true);
			} else {
				setDataChanged(false);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newUserDetail])

	useEffect(() => {
		if(!isLoading) {
			const loadedUserDetail = {
				userPhotoUrl: currentUser.photoURL,
				userDisplayName: currentUser.displayName,
				userEmail: currentUser.email,
				userPhoneNumber: currentUser.phoneNumber,
				isVerified: currentUser.emailVerified,
				provider: currentUser.providerData[0].providerId
			}
			setUserDetail({ ...userDetail, ...loadedUserDetail });
			setNewDetail({ ...newUserDetail, ...loadedUserDetail });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);
	
	// create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!uploadedFile) {
            setPreviewFile(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(uploadedFile);
        setPreviewFile(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedFile])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setNewDetail({ ...newUserDetail, [name]: value });
		// console.log(userDetail);
		// console.log(newUserDetail);
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setSaveLoading(true);

		// Send request to API
		const result = await updateUserProfile(newUserDetail.userDisplayName);
		setSaveLoading(false);
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
                title: 'Success!',
                description: result.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
				position: 'top'
            });
			console.log(result.user);
			login(result.user);
        }
	}

	const handleReset = (event: React.FormEvent) => {
		event.preventDefault();
		setNewDetail({ ...userDetail });
	}

	const handleUpload = async (event: React.FormEvent) => {
		event.preventDefault();
		setUploadLoading(true);
		
		// Send request to API
		const result = await updateUserProfilePicture(uploadedFile!);
		setUploadLoading(false);
		
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
                title: 'Uploaded!',
                description: result.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
				position: 'top'
            });
			login(result.user);
            setUploadedFile(undefined);
            onClose();
        }
	}
	
	const chooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if(e.target.files![0]) {
            const extCheckResult = isImage(e.target.files![0].name);
            if(!extCheckResult.isImage){
                toast({
                    title: 'Wrong file format',
                    description: `We don't accept ${extCheckResult.format} file. Please only upload image!`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
					position: 'top'
                });
                return;
            }
        } else {
            return;
        }
		setUploadedFile(e.target.files![0]);
		setUploadedFileName(e.target.files![0].name);
	}

	const handleVerify = async (event: React.FormEvent) => {
		event.preventDefault();
		setVerifyLoading(true);

		// Send Request to API
		const result = await sendVerifyEmail();
		setVerifyLoading(false);

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
        }
	}

	return (
		<Flex w={['100%', '100%', '60%', '60%', '55%']} p={['6%', '6%', '3%', '3%', '3%']} bgColor='#ffffff' flexDir='column' overflow='auto' minH='100vh'>
			<Heading as="div" 
				fontWeight='normal' 
				mb={10} 
				letterSpacing='tight'
			>Account <Flex as={'span'} fontWeight='bold' display='inline-flex'>Settings</Flex>
			</Heading>
			<Flex flexDir='column'>
				<Flex alignItems='center'>
					<Avatar size='xl' my={2} src={userDetail.userPhotoUrl}/>
					<Flex flexDir={'column'} ml={8}>
						<Text fontWeight='bold' fontSize='2xl' mb={3}>
							<Flex as={'span'} display='inline-flex'>{userDetail.userDisplayName}</Flex>
						</Text>
						<Button onClick={onOpen}>Change Profile Picture</Button>
					</Flex>
				</Flex>

				<form onSubmit={handleSubmit}>
					<FormControl mt={5} mb={5}>
						<FormLabel htmlFor="userDisplayName">Name</FormLabel>
						<InputGroup>
							<InputLeftElement><FiUser /></InputLeftElement>
							<Input 
								value={newUserDetail.userDisplayName} 
								onChange={handleChange} 
								type="text" 
								name="userDisplayName" 
								placeholder="No name" 
								focusBorderColor="blue.400" 
								errorBorderColor="red.400"
								rounded="md"
								required
							/>
						</InputGroup>
					</FormControl>

					<FormControl mt={5} mb={5}>
						<FormLabel htmlFor="userEmail">Email</FormLabel>
						<InputGroup>
							<InputLeftElement><FiAtSign /></InputLeftElement>
							<Input 
								value={newUserDetail.userEmail} 
								onChange={handleChange} 
								type="text" 
								name="userEmail" 
								placeholder="No email" 
								focusBorderColor="blue.400" 
								errorBorderColor="red.400"
								rounded="md"
								required isReadOnly
							/>
							{
								userDetail.isVerified ?
								<Tooltip borderRadius={4} mt={-4} hasArrow label="Email Verified">
									<InputRightElement><GoVerified className={classes.verified_logo}/></InputRightElement>
								</Tooltip> :
								<Tooltip borderRadius={4} mt={-4} hasArrow label="Email Not Verified">
									<InputRightElement><GoUnverified className={classes.unverified_logo}/></InputRightElement>
								</Tooltip>
							}
						</InputGroup>
						<FormHelperText >
							{ userDetail.provider == 'google.com' &&
								<Flex gap={2} justifyContent={'flex-end'} alignItems={'center'}><FcGoogle /> Logged in with Google Account</Flex>
							}
							{ userDetail.provider == 'password' &&
								<Flex gap={2} justifyContent={'flex-end'} alignItems={'center'}><FiMail color="green" /> Logged in with Email and Password</Flex>
							}
						</FormHelperText>
						{ !userDetail.isVerified && 
							( !verifyIsLoading ?
								<Button onClick={handleVerify}>Send Verification Email</Button> :
								<Button isLoading onClick={handleVerify}>Send Verification Email</Button>
							)
						}
					</FormControl>

					<FormControl mt={5} mb={5}>
						<FormLabel htmlFor="userPhoneNumber">Phone Number</FormLabel>
						<InputGroup>
							<InputLeftElement><FiPhone /></InputLeftElement>
							<Input 
								value={newUserDetail.userPhoneNumber} 
								onChange={handleChange} 
								type="text" 
								name="userPhoneNumber" 
								placeholder="No phone number" 
								focusBorderColor="blue.400" 
								errorBorderColor="red.400"
								rounded="md"
								required isReadOnly
							/>
						</InputGroup>
					</FormControl>

					<Flex gap={5}>
						{ (dataChanged) ?
							(saveIsLoading ?
							<Button isLoading mt={5} variant="solid" colorScheme='green' width='100%'></Button> :
							<Button mt={5} type="submit" variant="solid" colorScheme='green' width='100%'>Save Changes</Button>) :
							<Button disabled mt={5} type="submit" variant="solid" colorScheme='green' width='100%'>Save Changes</Button>
						}
						{ (dataChanged) ?
							<Button mt={5} type='reset' variant="solid" colorScheme='gray' width='100%' onClick={handleReset}>Reset Values</Button> :
							<Button disabled mt={5} type='reset' variant="solid" colorScheme='gray' width='100%'>Reset Values</Button>
						}
					</Flex>
				</form>
			</Flex>

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
                    <ModalHeader>Change Profile Picture</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text mb={6}>Choose your file for the new profile picture.</Text>
                        <FormControl>
                            <FormLabel>New Profile</FormLabel>
							{ previewFile && <Image maxW={100} maxH={100} src={previewFile} alt='Poster Preview' mb={5} borderRadius={8}/>}
                            <InputGroup>
                                <Input type='file' onChange={(event) => chooseFile(event)} ref={fileRef} placeholder='Your file' hidden />
								<Button ref={initialRef} leftIcon={<FiUpload />} value={'Upload File'} onClick={() => fileRef.current.click()}>Upload Image</Button>
                            </InputGroup>
							<Flex mt={2} width='100%' overflow='hidden'>
								<Text className={classes.truncated}>
									{uploadedFileName && <Text as='span' fontWeight={'bold'}>File name: </Text>}
									{uploadedFileName}
								</Text>
							</Flex>
							<FormHelperText>Max size: 10MB</FormHelperText>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        { uploadIsLoading ? 
                            <Button isLoading colorScheme='blue' mr={3}>Upload</Button> :
                            <Button colorScheme='blue' mr={3} onClick={handleUpload} >Upload</Button>
                        }
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
		</Flex>
	);
}

export default ProfileCenterContent;

