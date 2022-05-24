import React, { useState, useEffect, useContext, useRef } from 'react';

import { Button, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormHelperText, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Switch, Text, Tooltip, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react';
import { FiItalic, FiList, FiCalendar, FiUser, FiUpload, FiStar, FiPlus, FiGrid, FiTrash2 } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import { MdImage, MdHideImage } from 'react-icons/md';

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
    const toast = useToast();

    // For Upload File
    const fileRef = useRef();
    const [uploadedFile, setUploadedFile] = useState([]);
    const [previewFile, setPreviewFile] = useState();
	const [uploadedFileName, setUploadedFileName] = useState('');

    // For Add Category Modal
	const { isOpen: isOpenModalAddCategory, onOpen: onOpenModalAddCategory, onClose: onCloseModalAddCategory } = useDisclosure();
    const initialRefModalAddCategory = useRef();
    const [currentTotalPoint, setCurrentTotalPoint] = useState(0);
    const [currentCategoriesList, setCurrentCategoriesList] = useState(categoriesList);
    const [addCategoryData, setAddCategoryData] = useState({
        id_category: '',
        earned_experience_point: 0
    });

    // For Add Tasks Modal
	const { isOpen: isOpenModalAddTask, onOpen: onOpenModalAddTask, onClose: onCloseModalAddTask } = useDisclosure();
    const initialRefModalAddTask = useRef();
    const [addTaskData, setAddTaskData] = useState({
        name: '',
        order_number: 1,
        require_proof: true
    });
    const [currentTaskOrder, setCurrentTaskOrder] = useState(1);

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
    }, [uploadedFile]);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setNewCampaignDetail({...newCampaignDetail, [name]: value});
    }

    const handleAddCategory = (event) => {
        if (addCategoryData.id_category !== '' && addCategoryData.earned_experience_point !== 0) {
            const idCategory = parseInt(addCategoryData.id_category);
            const categoryName = categoriesList.find(data => data.id === idCategory).name;
            const earnedExperiencePoint = parseInt(addCategoryData.earned_experience_point);
            const colorHex = categoriesList.find(data => data.id === idCategory).colorHex;
            setNewCampaignDetail({
                ...newCampaignDetail,
                campaignCategories: [
                    ...newCampaignDetail.campaignCategories, 
                    {
                        id: idCategory,
                        name: categoryName,
                        earned_experience_point: earnedExperiencePoint,
                        color_hex: colorHex
                    }
                ]
            });
            setCurrentTotalPoint(currentTotalPoint + earnedExperiencePoint);
            setCurrentCategoriesList(currentCategoriesList.filter(data => data.id !== idCategory));
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

    const handleRemoveCategory = (data, idx) => {
        setCurrentTotalPoint(currentTotalPoint - data.earned_experience_point);
        setCurrentCategoriesList([...currentCategoriesList, ...categoriesList.filter(catListData => catListData.id === data.id)]);
        setNewCampaignDetail({...newCampaignDetail, campaignCategories: campaignCategories.filter(category => category.id !== data.id)});
    }

    const handleAddTask = (event) => {
        if (addTaskData.name === '') {
            toast({
                title: 'Create a Task!',
                description: `Task name cannot be empty.`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } else {
            console.log('event', event);
            console.log('addTaskData', addTaskData);
            setNewCampaignDetail({
                ...newCampaignDetail,
                campaignTasks: [
                    ...campaignTasks, 
                    addTaskData
                ]
            });
            setCurrentTaskOrder(currentTaskOrder + 1);
            setAddTaskData({
                ...addTaskData,
                name: '',
                order_number: parseInt(currentTaskOrder),
                require_proof: true
            });
            onCloseModalAddTask();
        }
    }

    const handleChangeTaskNameModal = (event) => {
        const { value } = event.target;
        setAddTaskData({
            ...addTaskData,
            order_number: parseInt(currentTaskOrder),
            name: value
        });
    }

    const handleChangeRequireProofModal = (event) => {
        event.preventDefault();
        setAddTaskData({
            ...addTaskData,
            order_number: parseInt(currentTaskOrder),
            require_proof: event.target.checked
        });
    }

    const handleRemoveLastTask = (event) => {
        event.preventDefault();
        setNewCampaignDetail({
            ...newCampaignDetail,
            campaignTasks: campaignTasks.slice(0, -1)
        });
        setCurrentTaskOrder(currentTaskOrder - 1);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(newCampaignDetail);

        const response = await fetch('/api/campaigns', {
            method: 'POST',
            body: JSON.stringify({
                newCampaignData: newCampaignDetail
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.idToken
            },
        });
        const data = await response.json();
        console.log(data);
    }

    const handleReset = (event) => {
		event.preventDefault();
        setCurrentTaskOrder(1);
        setCurrentCategoriesList(categoriesList);
        setCurrentTotalPoint(0);
		setNewCampaignDetail({...newCampaignInitialState, campaignInitiator: currentUser.displayName});
	}

    return (
        <Flex w='100%' p={['6%', '6%', '3%', '3%', '3%']} bgColor='#ffffff' flexDir='column' overflow='auto' minH='100vh'>
            <Heading as="div" 
				fontWeight='normal' 
				mb={10} 
				letterSpacing='tight'
			>Add <Flex as={'span'} fontWeight='bold' display='inline-flex'>New Campaign</Flex>
			</Heading>

            <form className={classes.form} onSubmit={handleSubmit}>
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
                    <FormLabel htmlFor="campaignCategories">Campaign Categories (Total Point: {currentTotalPoint})</FormLabel>
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
                                    rounded="md" required
                                />
                                <InputRightElement><FaCircle color={`${data.color_hex}`}/></InputRightElement>
                            </InputGroup>
                            <InputGroup maxW={'38%'} >
                                <InputLeftElement><FiStar color='gray' /></InputLeftElement>
                                <Input isReadOnly
                                    type='text' 
                                    name="campaignDescription" 
                                    value={data.earned_experience_point}
                                    onChange={() => {}}
                                    placeholder='This campaign is about...' 
                                    focusBorderColor="blue.400" 
                                    errorBorderColor="red.400"
                                    rounded="md" required
                                />
                                <IconButton ml={2} icon={<FiTrash2 />} onClick={() => handleRemoveCategory(data, idx)}></IconButton>
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
                    <FormLabel htmlFor="campaignTasks">Campaign Tasks (Total Task: {campaignTasks.length})</FormLabel>
                    { campaignTasks.length !== 0 &&
                    <Flex mt={3} mb={1} flexDir='column' gap={2}>
                    { campaignTasks.map((data, index) => (
                        <Flex key={index} alignItems='center' gap={3}>
                            <Input isReadOnly type='text' value={data.order_number} width='50px'/>
                            <Input isReadOnly value={data.name} /> 
                            {data.require_proof ? 
                                <Tooltip label='This task requires proof' shouldWrapChildren>
                                    <MdImage color='green'/>
                                </Tooltip> : 
                                <Tooltip label='This task does not require proof' shouldWrapChildren>
                                    <MdHideImage color='red' />
                                </Tooltip>
                            }
                        </Flex>
                    ))}</Flex>}
                    <ButtonGroup>
                        <Button mt={2} onClick={onOpenModalAddTask} leftIcon={<FiPlus />} >Add Task</Button>
                        { campaignTasks.length > 0 &&
                            <Button colorScheme={'red'} variant='ghost' mt={2} onClick={handleRemoveLastTask} leftIcon={<FiTrash2 />} >Remove Last Task</Button>
                        }
                    </ButtonGroup>
                </FormControl>

                <Flex gap={5}>
                    <Button mt={5} type="submit" variant="solid" colorScheme='green' width='100%'>Save Changes</Button>
                    <Button mt={5} type='reset' variant="solid" colorScheme='gray' width='100%' onClick={handleReset}>Reset Values</Button>
                </Flex>
            </form>

            {/* DRAWER FOR ADDING CATEGORIES */}
            <Drawer 
                blockScrollOnMount={false} 
                initialFocusRef={initialRefModalAddCategory} 
                isOpen={isOpenModalAddCategory} 
                onClose={onCloseModalAddCategory} 
                closeOnOverlayClick={false} 
                size={useBreakpointValue(["xs", "xs", "md", "lg", "lg"])}
            >
                <DrawerOverlay bg='blackAlpha.300' backdropFilter='blur(5px)'/>
                <DrawerContent>
                    <DrawerHeader>Add Campaign Category</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody pb={6}>
                        <Text mb={6}>Choose a category and set the experience point.</Text>
                        <FormControl mb={6}>
                            <FormLabel htmlFor='category'>Category</FormLabel>
							<Select value={addCategoryData.id_category} onChange={handleChangeSelectAddCategoryModal} ref={initialRefModalAddCategory} name='category' icon={<FiGrid color='grey' />} placeholder='Select a campaign category'>
                                { currentCategoriesList.map((data) => (
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='category'>Experience Point</FormLabel>
							<NumberInput value={addCategoryData.earned_experience_point} step={5}  name='earned_experience_point' onChange={handleChangeNumberAddCategoryModal} defaultValue={100 - currentTotalPoint} min={0} max={100 - currentTotalPoint}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormHelperText mb={6}>All categories&apos; XP points of a single campaign should only add up to 100 points.</FormHelperText>
                        </FormControl>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleAddCategory}>Save</Button>
                        <Button onClick={onCloseModalAddCategory}>Cancel</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* DRAWER FOR ADDING TASK */}
            <Drawer
                blockScrollOnMount={false} 
                initialFocusRef={initialRefModalAddTask} 
                isOpen={isOpenModalAddTask} 
                onClose={onCloseModalAddTask} 
                closeOnOverlayClick={false}
                size={useBreakpointValue(["xs", "xs", "md", "lg", "lg"])}
            >
                <DrawerOverlay bg='blackAlpha.300' backdropFilter='blur(5px)'/>
                <DrawerContent width={{md: "700px", base: "100%"}}>
                    <DrawerHeader>Add Campaign Task</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody pb={6}>
                        <Text mb={6}>Create a new task for this campaign.</Text>
                        <FormControl mb={6}>
                            <FormLabel htmlFor='category'>Task Name</FormLabel>
							<InputGroup>
                                    <InputLeftElement><FiItalic /></InputLeftElement>
                                    <Input type='text' placeholder='My New Task' value={addTaskData.name} onChange={handleChangeTaskNameModal} ref={initialRefModalAddTask}/>
                            </InputGroup>
                        </FormControl>

                        <FormControl mb={6}>
                            <FormLabel htmlFor='category'>Task Order (auto)</FormLabel>
							<NumberInput isReadOnly value={currentTaskOrder} name='earned_experience_point' onChange={() => {}} defaultValue={currentTaskOrder} min={currentTaskOrder} max={currentTaskOrder}>
                                <NumberInputField />
                            </NumberInput>
                        </FormControl>

                        <FormControl display='flex' alignItems='center' justifyContent='space-between'>
                            <FormLabel htmlFor='email-alerts' mb='0'>
                                Require Proof?
                            </FormLabel>
                            <Switch id='email-alerts'defaultChecked value={addTaskData.require_proof} onChange={handleChangeRequireProofModal}/>
                        </FormControl>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleAddTask}>Save</Button>
                        <Button onClick={onCloseModalAddTask}>Cancel</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}

export default CampaignsCenterContent;