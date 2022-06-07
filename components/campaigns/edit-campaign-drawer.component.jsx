import React, { useState, useRef, useEffect, useContext, Fragment } from 'react';
import _ from 'lodash';
import { Button, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormHelperText, FormLabel, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, NumberInput, NumberInputField, Switch, Text, Tooltip, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react';

import { FiItalic, FiList, FiUser, FiCalendar, FiUpload, FiGrid, FiPlus, FiStar, FiTrash2 } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import { MdHideImage, MdImage } from 'react-icons/md';

import classes from './edit-campaign-drawer.module.scss';

import { isImage } from 'components/helper';
import AddCategoryModal from './add-category-modal.component';
import AddTaskModal from './add-task-modal.component';
import { AuthContext } from '../../firebase/context';

const EditCampaignDrawer = ({ isOpen, onClose, data, categoriesList, refreshValue, setRefreshValue }) => {
    const initialRef = useRef();
    const toast = useToast();
    const { currentUser } = useContext(AuthContext);
    // console.log(data);
    const [newData, setNewData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [dataChanged, setDataChanged] = useState(false);
    const [saveIsLoading, setSaveLoading] = useState(false);

    // console.log(categoriesList);
    // For Upload File
    const fileRef = useRef();
    const [previewFile, setPreviewFile] = useState();
    const [uploadedFile, setUploadedFile] = useState([]);
	const [uploadedFileName, setUploadedFileName] = useState('');

    // For Add Category Modal
	const { isOpen: isOpenModalAddCategory, onOpen: onOpenModalAddCategory, onClose: onCloseModalAddCategory } = useDisclosure();
    const [currentTotalPoint, setCurrentTotalPoint] = useState(0);
    const [fullCategoriesList, setFullCategoriesList] = useState([]);
    const [currentCategoriesList, setCurrentCategoriesList] = useState([]);
    const listOfCategoriesId = [...data.categories.map(data => data.id)];

    // For Add Tasks Modal
	const { isOpen: isOpenModalAddTask, onOpen: onOpenModalAddTask, onClose: onCloseModalAddTask } = useDisclosure();
    const [currentTaskOrder, setCurrentTaskOrder] = useState(1);

    useEffect(() => {
        setFullCategoriesList(categoriesList);
        setCurrentCategoriesList(categoriesList.filter(category => !listOfCategoriesId.includes(category.id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriesList]);

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
        if(data) { 
            setNewData({
                ...data,
                startDate: new Date(data.startDate).toISOString().slice(0, 10),
                endDate: new Date(data.endDate).toISOString().slice(0, 10)
            });
            setPreviewFile(data.posterUrl);
            setCurrentTotalPoint(data.categories.reduce((total, {earned_experience_point}) => (total + earned_experience_point), 0));
            setCurrentTaskOrder(data.tasks.length + 1);
            setCurrentCategoriesList(categoriesList.filter(category => !listOfCategoriesId.includes(category.id)));
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        const modData = {
            ...data,
            startDate: new Date(data.startDate).toISOString().slice(0, 10),
            endDate: new Date(data.endDate).toISOString().slice(0, 10)
        }
        if (!isLoading){
            if(!_.isEqual(newData, modData) || uploadedFileName) {
				setDataChanged(true);
			} else {
				setDataChanged(false);
			}
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newData, uploadedFileName]);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setNewData({...newData, [name]: value});
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

    const handleRemoveCategory = (data, idx) => {
        setCurrentTotalPoint(currentTotalPoint - data.earned_experience_point);
        setCurrentCategoriesList([...currentCategoriesList, ...fullCategoriesList.filter(catListData => catListData.id === data.id)]);
        setNewData({...newData, categories: newData.categories.filter(category => category.id !== data.id)});
    }

    const handleRemoveLastTask = (event) => {
        event.preventDefault();
        setNewData({
            ...newData,
            tasks: newData.tasks.slice(0, -1)
        });
        setCurrentTaskOrder(currentTaskOrder - 1);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaveLoading(true);
        const previousNoOfTask = data.tasks.length;
        
        try {
            const formData  = new FormData();
            formData.append('newCampaignData', JSON.stringify(newData));
            if (uploadedFileName === '') {
                formData.append('posterChanged', 'false');
            } else {
                formData.append('posterChanged', 'true')
            }
            formData.append('uploadPoster', uploadedFile);
            formData.append('previousNoOfTask', previousNoOfTask);
            
            const response = await fetch('https://ecosense-bangkit.uc.r.appspot.com/editCampaign', {
            // const response = await fetch('http://localhost:3001/editCampaign', {
                method: 'PUT',
                body: formData,
                headers: { 'Authorization': 'Bearer ' + currentUser.idToken },
            });
            const data = await response.json();
            if (data.error) {
                setSaveLoading(false);
                toast({
                    title: 'Error!',
                    description: `${data.message}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top'
                });
            } else {
                setSaveLoading(false);
                toast({
                    title: 'Save success!',
                    description: `${data.message}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top'
                });
                setUploadedFileName('');
                onClose();
                window.location.reload();
            }
        }
        catch (error) {
            setSaveLoading(false);
            toast({
                title: 'Error!',
                description: `${error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            });
        }
    }

    const handleReset = () => {
		setNewData({
            ...data,
            startDate: new Date(data.startDate).toISOString().slice(0, 10),
            endDate: new Date(data.endDate).toISOString().slice(0, 10)
        });
        setCurrentCategoriesList(categoriesList.filter(category => !listOfCategoriesId.includes(category.id)));
        setPreviewFile(data.posterUrl);
        setUploadedFileName('');
        setCurrentTaskOrder(data.tasks.length + 1);
        setCurrentTotalPoint(data.categories.reduce(
            (total, { earned_experience_point}) => (total + earned_experience_point)
        , 0));
    }

    const handleExitWithoutSave = () => {
        handleReset();
        onClose();
    }

    return (
        <>
            <Drawer
                blockScrollOnMount={false} 
                initialFocusRef={initialRef} 
                isOpen={isOpen} 
                onClose={onClose} 
                closeOnOverlayClick={false}
                size={useBreakpointValue(["xs", "xs", "md", "lg", "xl"])}
            >
                <DrawerOverlay bg='blackAlpha.300' backdropFilter='blur(5px)'/>
                <DrawerContent width={{md: "700px", base: "100%"}}>
                    <DrawerHeader>Edit Campaign</DrawerHeader>
                    <DrawerCloseButton onClick={handleExitWithoutSave} />
                    <DrawerBody pb={6}>
                        <Text mb={6}>Edit your campaign details.</Text>

                        <FormControl mb={5} isRequired>
                            <FormLabel htmlFor="title">Campaign Title</FormLabel>
                            <InputGroup>
                                <InputLeftElement><FiItalic color='gray' /></InputLeftElement>
                                <Input 
                                    type='text' 
                                    name="title" 
                                    value={newData.title}
                                    onChange={handleChange}
                                    placeholder='My New Campaign' 
                                    focusBorderColor="blue.400" 
                                    errorBorderColor="red.400"
                                    rounded="md"
                                    maxLength={100} required
                                    ref={initialRef}
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl mt={5} mb={5} isRequired>
                            <FormLabel htmlFor="description">Campaign Description</FormLabel>
                            <InputGroup>
                                <InputLeftElement><FiList color='gray' /></InputLeftElement>
                                <Input 
                                    type='text' 
                                    name="description" 
                                    value={newData.description}
                                    onChange={handleChange}
                                    placeholder='This campaign is about...' 
                                    focusBorderColor="blue.400" 
                                    errorBorderColor="red.400"
                                    rounded="md"
                                    maxLength={255} required
                                />
                            </InputGroup>
                        </FormControl>

                        <Flex gap={5} mt={5} mb={5}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="startDate">Start Date</FormLabel>
                                <InputGroup>
                                    <InputLeftElement><FiCalendar color='gray' /></InputLeftElement>
                                    <Input 
                                        type='date' 
                                        name="startDate" 
                                        value={newData.startDate}
                                        onChange={handleChange}
                                        focusBorderColor="blue.400" 
                                        errorBorderColor="red.400"
                                        rounded="md"
                                        maxLength={255} required
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="endDate">End Date</FormLabel>
                                <InputGroup>
                                    <InputLeftElement><FiCalendar color='gray' /></InputLeftElement>
                                    <Input 
                                        type='date' 
                                        name="endDate" 
                                        value={newData.endDate}
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
                            { (!isLoading && newData.categories.length !== 0) &&
                            <Flex mt={3} mb={1} flexDir='column' gap={2}>
                            { !isLoading && newData.categories.map((data, idx) => (
                                <Flex key={idx} gap={2} alignItems='center'>
                                    <InputGroup>
                                        <InputLeftElement><FiGrid color='gray' /></InputLeftElement>
                                        <Input isReadOnly
                                            type='text' 
                                            name="campaignDescription" 
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
                                            name="campaignDescription" 
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
                            <FormLabel htmlFor="campaignTasks">Campaign Tasks (Total Task: {(!isLoading) && newData.tasks.length})</FormLabel>
                            { !isLoading && newData.tasks.length !== 0 &&
                            <Flex mt={3} mb={1} flexDir='column' gap={2}>
                            { !isLoading && newData.tasks.map((data, index) => (
                                <Flex key={index} alignItems='center' gap={3}>
                                    <Input isReadOnly type='text' value={data.order_number} width='50px'/>
                                    <Input isReadOnly value={data.name} /> 
                                    {data.require_proof ? 
                                        <Tooltip label='This task requires proof' placement='left' shouldWrapChildren>
                                            <MdImage color='green'/>
                                        </Tooltip> : 
                                        <Tooltip label='This task does not require proof' placement='left' shouldWrapChildren>
                                            <MdHideImage color='red' />
                                        </Tooltip>
                                    }
                                </Flex>
                            ))}</Flex>}
                            <ButtonGroup>
                                { !isLoading && !newData.canEditTask &&
                                    <Tooltip label='Some tasks has been completed by participants, so you cannot edit anymore.' shouldWrapChildren>
                                        <Button mt={2} isDisabled onClick={onOpenModalAddTask} leftIcon={<FiPlus />} >Add Task</Button>
                                    </Tooltip>
                                }
                                { !isLoading && newData.canEditTask &&
                                    <Fragment>
                                        <Button mt={2} onClick={onOpenModalAddTask} leftIcon={<FiPlus />} >Add Task</Button>
                                        { newData.tasks.length > 0 && 
                                            <Button colorScheme={'red'} variant='ghost' mt={2} onClick={handleRemoveLastTask} leftIcon={<FiTrash2 />} >Remove Last Task</Button>
                                        }
                                    </Fragment>
                                }
                            </ButtonGroup>
                        </FormControl>
                        
                    </DrawerBody>

                    <DrawerFooter>
                        { dataChanged ?
                            (
                                saveIsLoading ?
                                <Button isLoading colorScheme='blue' mr={3}>Save</Button> :
                                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>Save</Button>
                            )
                             :
                            <Button disabled colorScheme='blue' mr={3}>Save</Button>
                        }
                        <Button onClick={handleExitWithoutSave}>Cancel</Button>
                    </DrawerFooter>
                </DrawerContent>

                { /* MODAL FOR ADDING CATEGORY */ }
                <AddCategoryModal
                    isOpen={isOpenModalAddCategory}
                    onOpen={onOpenModalAddCategory}
                    onClose={onCloseModalAddCategory}
                    currentCategoriesList={currentCategoriesList}
                    setCurrentCategoriesList={setCurrentCategoriesList}
                    currentTotalPoint={currentTotalPoint}
                    setCurrentTotalPoint={setCurrentTotalPoint}
                    fullCategoriesList={fullCategoriesList}
                    newData={newData}
                    setNewData={setNewData}
                />
                {/* MODAL FOR ADDING TASK */}
                { !isLoading && newData.canEditTask && (
                    <AddTaskModal 
                        isOpen={isOpenModalAddTask} 
                        onOpen={onOpenModalAddTask} 
                        onClose={onCloseModalAddTask} 
                        currentTaskOrder={currentTaskOrder}
                        setCurrentTaskOrder={setCurrentTaskOrder}
                        newData={newData}
                        setNewData={setNewData}
                    />
                )}
            </Drawer>
        </>
    )
}

export default EditCampaignDrawer;