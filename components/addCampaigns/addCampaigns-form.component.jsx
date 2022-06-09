import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { FiItalic, FiList, FiCalendar, FiUser, FiUpload, FiStar, FiPlus, FiGrid, FiTrash2, FiChevronLeft } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import { MdImage, MdHideImage } from 'react-icons/md';

import { AuthContext } from '../../firebase/context';
import { isImage } from '../helper';

import ExitAlertDialog from './exit-alert-dialog.component';
import AddTaskDrawer from './add-task-drawer.component';
import AddCategoryDrawer from './add-category-drawer.component';

import classes from './addCampaigns-form.module.scss';

const AddCampaignForm = ({ categoriesList }) => {
    const { currentUser, isLoading } = useContext(AuthContext);
    const newCampaignInitialState = {
        campaignTitle: '',
        campaignDescription: '',
        campaignInitiator: '',
        campaignStartDate: new Date().toISOString().slice(0, 10),
        campaignEndDate: new Date().toISOString().slice(0, 10),
        campaignCategories: [],
        campaignTasks: []
    }
    const [newCampaignDetail, setNewCampaignDetail] = useState(newCampaignInitialState);
    const {
        campaignTitle,
        campaignDescription,
        campaignInitiator,
        campaignStartDate,
        campaignEndDate,
        campaignCategories,
        campaignTasks
    } = newCampaignDetail;
    const [dataChanged, setDataChanged] = useState(false);
    const [saveIsLoading, setSaveIsLoading] = useState(false);
    const toast = useToast();

    // For Upload File
    const fileRef = useRef();
    const [uploadedFile, setUploadedFile] = useState([]);
    const [previewFile, setPreviewFile] = useState();
	const [uploadedFileName, setUploadedFileName] = useState('');

    // For Add Category Modal
	const { isOpen: isOpenModalAddCategory, onOpen: onOpenModalAddCategory, onClose: onCloseModalAddCategory } = useDisclosure();
    const [currentTotalPoint, setCurrentTotalPoint] = useState(0);
    const [fullCategoriesList, setFullCategoriesList] = useState([]);
    const [currentCategoriesList, setCurrentCategoriesList] = useState([]);

    // For Add Tasks Modal
	const { isOpen: isOpenModalAddTask, onOpen: onOpenModalAddTask, onClose: onCloseModalAddTask } = useDisclosure();
    const [currentTaskOrder, setCurrentTaskOrder] = useState(1);

    // For Exit Without Saving Alert Dialog
    const { isOpen: isOpenAlertDialogExit, onOpen: onOpenAlertDialogExit, onClose: onCloseAlertDialogExit } = useDisclosure();

    useEffect(() => { 
        setCurrentCategoriesList(categoriesList);
        setFullCategoriesList(categoriesList); 
    }, [categoriesList]);

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

    useEffect(() => {
        if (!isLoading){
            // console.log('uploadedFile', uploadedFile);
            // console.log('previewFile', previewFile);
            // console.log('uploadedFileName', uploadedFileName);
            const newCampaignInitialStateWithInitiator = { ...newCampaignInitialState, campaignInitiator: currentUser.displayName };
            if(!_.isEqual(newCampaignDetail, newCampaignInitialStateWithInitiator) || uploadedFileName) {
				setDataChanged(true);
			} else {
				setDataChanged(false);
			}
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newCampaignDetail, uploadedFileName]);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setNewCampaignDetail({...newCampaignDetail, [name]: value});
    }

    const handleRemoveCategory = (data, idx) => {
        setCurrentTotalPoint(currentTotalPoint - data.earned_experience_point);
        setCurrentCategoriesList([...currentCategoriesList, ...fullCategoriesList.filter(catListData => catListData.id === data.id)]);
        setNewCampaignDetail({...newCampaignDetail, campaignCategories: campaignCategories.filter(category => category.id !== data.id)});
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
					position: 'top'
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
        // console.log(newCampaignDetail);

        if (!uploadedFile || !uploadedFileName) {
            toast({
                title: 'You should upload a poster',
                description: `Poster is a required part of the campaign!`,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })
        } else {
            setSaveIsLoading(true);
            const formData  = new FormData();
            formData.append('newCampaignData', JSON.stringify(newCampaignDetail));
            formData.append('uploadPoster', uploadedFile);
            
            // const response = await fetch('/api/campaigns', {
            //     method: 'POST',
            //     body: formData,
            //     headers: { 'Authorization': 'Bearer ' + currentUser.idToken },
            // });
            const response = await fetch('http://ecosense-bangkit.uc.r.appspot.com/addNewCampaign', {
                method: 'POST',
                body: formData,
                headers: { 'Authorization': 'Bearer ' + currentUser.idToken },
            });
            const data = await response.json();
            if (data.error) {
                setSaveIsLoading(false);
                toast({
                    title: 'Error!',
                    description: `${data.message}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
					position: 'top'
                });
            } else {
                setSaveIsLoading(false);
                toast({
                    title: 'Save success!',
                    description: `${data.message}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
					position: 'top'
                });
                setCurrentTaskOrder(1);
                setCurrentCategoriesList(fullCategoriesList);
                setCurrentTotalPoint(0);
                setNewCampaignDetail({...newCampaignInitialState, campaignInitiator: currentUser.displayName});
                setPreviewFile(null);
                setUploadedFileName('');
            }
        }
    }

    const handleReset = (event) => {
		event.preventDefault();
        setCurrentTaskOrder(1);
        setCurrentCategoriesList(fullCategoriesList);
        setCurrentTotalPoint(0);
		setNewCampaignDetail({...newCampaignInitialState, campaignInitiator: currentUser.displayName});
        setPreviewFile(null);
        setUploadedFileName('');
    }

    const router = useRouter();
    const handleExit = () => {
        dataChanged ? onOpenAlertDialogExit() : router.push('/dashboard/campaigns');
    }

    return (
        <Flex w='100%' p={['6%', '6%', '3%', '3%', '3%']} bgColor='#ffffff' flexDir='column' overflow='auto' minH='100vh'>
            <Flex alignItems={'center'} mb={10} >
                <IconButton onClick={handleExit} mr={5} icon={<FiChevronLeft />}></IconButton>
                <Heading as="div" 
                    fontWeight='normal'
                    letterSpacing='tight'
                >Add <Flex as={'span'} fontWeight='bold' display='inline-flex'>New Campaign</Flex>
                </Heading>
            </Flex>

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
                            onChange={() => {}} // Initiator can't be changed
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

                <FormControl mt={5} mb={5}>
                    <FormLabel mb={3}>Upload Poster</FormLabel>
                    { previewFile && <Image maxW={250} maxH={250} src={previewFile} alt='Poster Preview' mb={5} borderRadius={8}/>}
                    <InputGroup>
                        <Input name='uploadPoster' type='file' onChange={(event) => chooseFile(event)} ref={fileRef} placeholder='Your file' hidden />
                        <Button minW='180px' leftIcon={<FiUpload />} value={'Upload File'} onClick={() => fileRef.current.click()}>Upload Image</Button>
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
                                    name="campaignCategories" 
                                    value={data.name}
                                    onChange={() => {}} 
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
                                    name="campaignCategories" 
                                    value={data.earned_experience_point}
                                    onChange={() => {}}
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
                    { dataChanged ?
                        (
                            saveIsLoading ?
                            <Button isLoading mt={5} type="submit" variant="solid" colorScheme='green' width='100%'>Save Changes</Button> :
                            <Button mt={5} type="submit" variant="solid" colorScheme='green' width='100%'>Save Changes</Button>
                        ) :
                        <Button disabled mt={5} type="submit" variant="solid" colorScheme='green' width='100%'>Save Changes</Button>
                    }
                    { dataChanged ?
                        <Button mt={5} type='reset' variant="solid" colorScheme='gray' width='100%' onClick={handleReset}>Reset Values</Button> :
                        <Button disabled mt={5} type='reset' variant="solid" colorScheme='gray' width='100%' onClick={handleReset}>Reset Values</Button>
                    }
                </Flex>
            </form>

            {/* DRAWER FOR ADDING CATEGORIES */}
            <AddCategoryDrawer 
                isOpen={isOpenModalAddCategory}
                onOpen={onOpenModalAddCategory}
                onClose={onCloseModalAddCategory}
                currentCategoriesList={currentCategoriesList}
                setCurrentCategoriesList={setCurrentCategoriesList}
                currentTotalPoint={currentTotalPoint}
                setCurrentTotalPoint={setCurrentTotalPoint}
                fullCategoriesList={fullCategoriesList}
                newCampaignDetail={newCampaignDetail}
                setNewCampaignDetail={setNewCampaignDetail}
            />

            {/* DRAWER FOR ADDING TASK */}
            <AddTaskDrawer 
                isOpen={isOpenModalAddTask} 
                onOpen={onOpenModalAddTask} 
                onClose={onCloseModalAddTask} 
                currentTaskOrder={currentTaskOrder}
                setCurrentTaskOrder={setCurrentTaskOrder}
                newCampaignDetail={newCampaignDetail}
                setNewCampaignDetail={setNewCampaignDetail}
            />

            {/* ALERT DIALOG FOR EXIT WHEN DATA CHANGED */}
            <ExitAlertDialog 
                isOpen={isOpenAlertDialogExit} 
                onOpen={onOpenAlertDialogExit} 
                onClose={onCloseAlertDialogExit}
            />                        
        </Flex>
    )
}

export default AddCampaignForm;