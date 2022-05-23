import React, { useState, useEffect, useContext, useRef } from 'react';

import { Button, Flex, FormControl, FormHelperText, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { FiItalic, FiList, FiCalendar, FiUser, FiUpload, FiStar, FiPlus, FiGrid } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';

import { AuthContext } from '../../firebase/context';
import { isImage } from '../helper';

import classes from './campaigns-center-content.module.scss';

const CampaignsCenterContent = ({ categoriesList }) => {
    const { currentUser } = useContext(AuthContext);
    const newCampaignInitialState = {
        campaignTitle: '',
        campaignDescription: '',
        campaignInitiator: '',
        campaignStartDate: new Date().toISOString().slice(0, 10),
        campaignEndDate: new Date().toISOString().slice(0, 10),
        campaignCategories: [],
        campaignTasks: [],
        photoURL: ''
    }
    const [newCampaignDetail, setNewCampaignDetail] = useState(newCampaignInitialState);
    const {
        campaignTitle,
        campaignDescription,
        campaignInitiator,
        campaignStartDate,
        campaignEndDate,
        campaignCategories,
        campaignTasks,
        photoURL
    } = newCampaignDetail;

    const fileRef = useRef();
    const toast = useToast();
    const [uploadedFile, setUploadedFile] = useState([]);
    const [previewFile, setPreviewFile] = useState();
	const [uploadedFileName, setUploadedFileName] = useState('');
    const [currentTotalPoint, setCurrentTotalPoint] = useState(0);
    const [currentCategoriesList, setCurrentCategoriesList] = useState(categoriesList);

    // For Add Category Modal
	const { isOpen: isOpenModalAddCategory, onOpen: onOpenModalAddCategory, onClose: onCloseModalAddCategory } = useDisclosure();
    const initialRefModalAddCategory = useRef();
    const [addCategoryData, setAddCategoryData] = useState({
        id_category: '',
        earned_experience_point: 0
    });

    // For Add Tasks Modal
	const { isOpen: isOpenModalAddTask, onOpen: onOpenModalAddTask, onClose: onCloseModalAddTask } = useDisclosure();
    const initialRefModalAddTask = useRef();
    const [addTaskData, setAddTaskData] = useState({});

    useEffect(() => {
        setNewCampaignDetail({...newCampaignDetail, campaignInitiator: currentUser.displayName })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!uploadedFile || uploadedFile.length === 0) {
            setPreviewFile(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(uploadedFile);
        setPreviewFile(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedFile])

    const handleChange = (event) => {
        const { value, name } = event.target;
        setNewCampaignDetail({...newCampaignDetail, [name]: value});
    }

    const handleAddCategory = (event) => {
        if (addCategoryData.id_category !== '' && addCategoryData.earned_experience_point !== 0) {
            const id = parseInt(addCategoryData.id_category);
            const categoryName = categoriesList.find(data => data.id === id).name;
            const color = categoriesList.find(data => data.id === id).color_hex;
            setNewCampaignDetail({
                ...newCampaignDetail,
                campaignCategories: [
                    ...campaignCategories, 
                    {
                        id_category: addCategoryData.id_category,
                        name: categoryName,
                        earned_experience_point: addCategoryData.earned_experience_point,
                        color_hex: color
                    }
                ]
            });
            setCurrentTotalPoint(currentTotalPoint + addCategoryData.earned_experience_point);
            setCurrentCategoriesList(currentCategoriesList.filter(data => data.id !== id));
            setAddCategoryData({ id_category: 0, earned_experience_point: 0 });
            onCloseModalAddCategory();
        } else {
            if(addCategoryData.id_category === '') {
                toast({
                    title: 'Choose a Category!',
                    description: `Category cannot be empty.`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            } else if (addCategoryData.earned_experience_point === 0) {
                toast({
                    title: 'Add Experience Point!',
                    description: `Experience Point cannot be empty.`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
            return;
        }
    }

    const handleChangeSelectAddCategoryModal = (event) => {
        const { value } = event.target;
        setAddCategoryData({ ...addCategoryData, id_category: value });
    }

    const handleChangeNumberAddCategoryModal = (event) => {
        const value = event;
        setAddCategoryData({ ...addCategoryData, earned_experience_point: value });
    }

    const handleAddTask = (event) => {
        console.log(event);
    }

    const handleChangeSelectAddTaskModal = (event) => {
        const { value } = event.target;
        console.log(value);
    }

    const handleChangeNumberAddTaskModal = (event) => {
        const value = event;
        console.log(value);
    }

    const chooseFile = (e) => {
		e.preventDefault();
        if(e.target.files[0]) {
            const extCheckResult = isImage(e.target.files[0].name);
            if(!extCheckResult.isImage){
                toast({
                    title: 'Wrong file format',
                    description: `We don't accept ${extCheckResult.format} file. Please only upload image!`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
                return;
            }
        } else {
            return;
        }
		setUploadedFile(e.target.files[0]);
		setUploadedFileName(e.target.files[0].name);
	}

    const handleReset = (event) => {
		event.preventDefault();
		setNewCampaignDetail({...newCampaignInitialState, campaignInitiator: currentUser.displayName});
	}

    return (
        <Flex w={['100%', '100%', '60%', '60%', '55%']} p={['6%', '6%', '3%', '3%', '3%']} bgColor='#ffffff' flexDir='column' overflow='auto' minH='100vh'>
            <Heading as="div" 
				fontWeight='normal' 
				mb={10} 
				letterSpacing='tight'
			>Add <Flex as={'span'} fontWeight='bold' display='inline-flex'>New Campaign</Flex>
			</Heading>

            <form>
                <FormControl mb={5} isRequired>
                    <FormLabel htmlFor="campaignTitle">Campaign Title</FormLabel>
                    <InputGroup>
                        <InputLeftElement><FiItalic color='gray' /></InputLeftElement>
                        <Input 
                            type='text' 
							name="campaignTitle" 
                            value={campaignTitle}
                            onChange={handleChange}
                            placeholder='My New Campaign' 
                            focusBorderColor="blue.400" 
                            errorBorderColor="red.400"
                            rounded="md"
                            maxLength={100} required
                        />
                    </InputGroup>
                </FormControl>
                
                <FormControl mt={5} mb={5} isRequired>
                    <FormLabel htmlFor="campaignDescription">Campaign Description</FormLabel>
                    <InputGroup>
                        <InputLeftElement><FiList color='gray' /></InputLeftElement>
                        <Input 
                            type='text' 
							name="campaignDescription" 
                            value={campaignDescription}
                            onChange={handleChange}
                            placeholder='This campaign is about...' 
                            focusBorderColor="blue.400" 
                            errorBorderColor="red.400"
                            rounded="md"
                            maxLength={255} required
                        />
                    </InputGroup>
                </FormControl>

                <FormControl mt={5} mb={5} isRequired>
                    <FormLabel htmlFor="campaignInitiator">Initiator</FormLabel>
                    <InputGroup>
                        <InputLeftElement><FiUser color='gray' /></InputLeftElement>
                        <Input 
                            type='text' 
							name="campaignInitiator" 
                            value={campaignInitiator}
                            onChange={handleChange}
                            placeholder='EcoSense' 
                            focusBorderColor="blue.400" 
                            errorBorderColor="red.400"
                            rounded="md"
                            maxLength={255} isReadOnly
                        />
                    </InputGroup>
                </FormControl>

                <Flex gap={5} mt={5} mb={5}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="campaignStartDate">Start Date</FormLabel>
                        <InputGroup>
                            <InputLeftElement><FiCalendar color='gray' /></InputLeftElement>
                            <Input 
                                type='date' 
                                name="campaignStartDate" 
                                value={campaignStartDate}
                                onChange={handleChange}
                                focusBorderColor="blue.400" 
                                errorBorderColor="red.400"
                                rounded="md"
                                maxLength={255} required
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="campaignEndDate">End Date</FormLabel>
                        <InputGroup>
                            <InputLeftElement><FiCalendar color='gray' /></InputLeftElement>
                            <Input 
                                type='date' 
                                name="campaignEndDate" 
                                value={campaignEndDate}
                                onChange={handleChange}
                                focusBorderColor="blue.400" 
                                errorBorderColor="red.400"
                                rounded="md"
                                maxLength={255} required
                            />
                        </InputGroup>
                    </FormControl>
                </Flex>

                <FormControl mt={5} mb={5} isRequired>
                    <FormLabel mb={3}>Upload Poster</FormLabel>
                    { previewFile && <Image maxW={250} maxH={250} src={previewFile} alt='Poster Preview' mb={5} borderRadius={8}/>}
                    <InputGroup>
                        <Input type='file' onChange={(event) => chooseFile(event)} ref={fileRef} placeholder='Your file' hidden />
                        <Button minW='150px' leftIcon={<FiUpload />} value={'Upload File'} onClick={() => fileRef.current.click()}>Upload Image</Button>
                        <Flex mt={2} ml={3} width='100%' overflow='hidden'>
                            <Text className={classes.truncated}>
                                {uploadedFileName && <Text as='span' fontWeight={'bold'}>File name: </Text>}
                                {uploadedFileName}
                            </Text>
                        </Flex>
                    </InputGroup>
                    <FormHelperText>Max size: 10MB</FormHelperText>
                </FormControl>

                <FormControl mt={5} mb={5} isRequired>
                    <FormLabel htmlFor="campaignCategories">Campaign Categories</FormLabel>
                    { campaignCategories.length !== 0 &&
                    <Flex mt={3} mb={1} flexDir='column' gap={2}>
                    { campaignCategories.map((data, idx) => (
                        <Flex key={idx} gap={2} alignItems='center'>
                            <InputGroup>
                                <InputLeftElement><FiGrid color='gray' /></InputLeftElement>
                                <Input isReadOnly
                                    type='text' 
                                    name="campaignDescription" 
                                    value={data.name}
                                    onChange={() => {}}
                                    placeholder='This campaign is about...' 
                                    focusBorderColor="blue.400" 
                                    errorBorderColor="red.400"
                                    rounded="md"
                                    maxLength={255} required
                                />
                                <InputRightElement><FaCircle color={`${data.color_hex}`}/></InputRightElement>
                            </InputGroup> Point:
                            <InputGroup>
                                <InputLeftElement><FiStar color='gray' /></InputLeftElement>
                                <Input isReadOnly
                                    type='text' 
                                    name="campaignDescription" 
                                    value={data.earned_experience_point}
                                    onChange={() => {}}
                                    placeholder='This campaign is about...' 
                                    focusBorderColor="blue.400" 
                                    errorBorderColor="red.400"
                                    rounded="md"
                                    maxLength={255} required
                                />
                            </InputGroup>
                        </Flex>
                    ))}</Flex> }
                    { currentTotalPoint == 100 ?
                        <Tooltip hasArrow label='Maximum experience point (100) reached' shouldWrapChildren mt='3'>
                            <Button mt={2} isDisabled leftIcon={<FiPlus />} >Add Category</Button>
                        </Tooltip>
                         :
                        <Button mt={2} onClick={onOpenModalAddCategory} leftIcon={<FiPlus />} >Add Category</Button>
                    }
                </FormControl>

                <FormControl mt={5} mb={5} isRequired>
                    <FormLabel htmlFor="campaignTasks">Campaign Tasks</FormLabel>
                    <Button mt={2} onClick={onOpenModalAddTask} leftIcon={<FiPlus />} >Add Tasks</Button>
                </FormControl>

                <Flex gap={5}>
                    <Button mt={5} type="submit" variant="solid" colorScheme='green' width='100%'>Save Changes</Button>
                    <Button mt={5} type='reset' variant="solid" colorScheme='gray' width='100%' onClick={handleReset}>Reset Values</Button>
                </Flex>
            </form>

            {/* MODAL FOR ADDING CATEGORIES */}
            <Modal 
                blockScrollOnMount={false} 
                initialFocusRef={initialRefModalAddCategory} 
                isOpen={isOpenModalAddCategory} 
                onClose={onCloseModalAddCategory} 
                closeOnOverlayClick={false} 
                isCentered
                size='xs'
                motionPreset='scale'
            >
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(5px)'/>
                <ModalContent>
                    <ModalHeader>Add Campaign Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text mb={6}>Choose a category and set the experience point.</Text>
                        <FormControl mb={6}>
                            <FormLabel htmlFor='category'>Category</FormLabel>
							<Select value={addCategoryData.id_category} onChange={handleChangeSelectAddCategoryModal} ref={initialRefModalAddCategory} name='category' icon={<FiGrid />} placeholder='Select a campaign category'>
                                { currentCategoriesList.map((data) => (
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='category'>Experience Point</FormLabel>
							<NumberInput value={addCategoryData.earned_experience_point} name='earned_experience_point' onChange={handleChangeNumberAddCategoryModal} defaultValue={100 - currentTotalPoint} min={0} max={100 - currentTotalPoint}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormHelperText mb={6}>All categories&apos; XP points of a single campaign should only add up to 100 points.</FormHelperText>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleAddCategory}>Save</Button>
                        <Button onClick={onCloseModalAddCategory}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* MODAL FOR ADDING CATEGORIES */}
            <Modal 
                blockScrollOnMount={false} 
                initialFocusRef={initialRefModalAddTask} 
                isOpen={isOpenModalAddTask} 
                onClose={onCloseModalAddTask} 
                closeOnOverlayClick={false} 
                isCentered
                size='xs'
                motionPreset='scale'
            >
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(5px)'/>
                <ModalContent>
                    <ModalHeader>Add Campaign Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text mb={6}>Create a Task for this Campaign</Text>
                        <FormControl mb={6}>
                            <FormLabel htmlFor='category'>Task Name</FormLabel>
							<Select value={addTaskData.id_category} onChange={handleChangeSelectAddTaskModal} ref={initialRefModalAddTask} name='category' icon={<FiGrid />} placeholder='Select a task category'>
                                { currentCategoriesList.map((data) => (
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='category'>Task Order</FormLabel>
							<NumberInput value={addTaskData.earned_experience_point} name='earned_experience_point' onChange={handleChangeNumberAddTaskModal} defaultValue={100 - currentTotalPoint} min={0} max={100 - currentTotalPoint}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleAddTask}>Save</Button>
                        <Button onClick={onCloseModalAddTask}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default CampaignsCenterContent;