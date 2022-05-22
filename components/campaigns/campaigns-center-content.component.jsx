import React, { useState, useEffect, useContext, useRef } from 'react';

import { Button, Checkbox, CheckboxGroup, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react';
import { FiItalic, FiList, FiCalendar, FiUser, FiUpload, FiStar } from 'react-icons/fi';
import { AuthContext } from '../../firebase/context';

const CampaignsCenterContent = () => {
    const { currentUser } = useContext(AuthContext);
    const [newCampaignDetail, setNewCampaignDetail] = useState({
        campaignTitle: '',
        campaignDescription: '',
        campaignInitiator: '',
        campaignStartDate: new Date().toISOString().slice(0, 10),
        campaignEndDate: new Date().toISOString().slice(0, 10),
        campaignCategories: [],
        campaignTasks: [],
        photoURL: ''
    });
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
    const [uploadedFile, setUploadedFile] = useState({});
	const [uploadedFileName, setUploadedFileName] = useState('');

    useEffect(() => {
        setNewCampaignDetail({...newCampaignDetail, campaignInitiator: currentUser.displayName })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setNewCampaignDetail({...newCampaignDetail, [name]: value});
    }

    const handleCheckboxChange = (event) => {
        setNewCampaignDetail({...newCampaignDetail, campaignCategories: event});
    }

    const chooseFile = (e) => {
		e.preventDefault();
		setUploadedFile(e.target.files[0]);
		setUploadedFileName(e.target.files[0].name);
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
                    <FormLabel>Upload Poster</FormLabel>
                    <InputGroup>
                        <Input type='file' onChange={(event) => chooseFile(event)} ref={fileRef} placeholder='Your file' hidden />
                        <Button leftIcon={<FiUpload />} value={'Upload File'} onClick={() => fileRef.current.click()}>Upload Image</Button>
                        <Text isTruncated noOfLines={1} mt={2} ml={5}>{uploadedFileName}</Text>
                    </InputGroup>
                    <FormHelperText>Max size: 10MB</FormHelperText>
                </FormControl>

                <FormControl mt={5} mb={5} isRequired>
                    <FormLabel htmlFor="campaignCategories">Campaign Categories</FormLabel>
                    <CheckboxGroup colorScheme='green' defaultValue={[]} value={campaignCategories} onChange={handleCheckboxChange}>
                        <Stack spacing={[2, 5]} direction={['column', 'row']}>
                            <Checkbox value='Water Pollution'>Water Pollution</Checkbox>
                            <Checkbox value='Air Pollution'>Air Pollution</Checkbox>
                            <Checkbox value='Food Waste'>Food Waste</Checkbox>
                            <Checkbox value='Plastic Free'>Plastic Free</Checkbox>
                            <Checkbox value='Energy Efficiency'>Energy Efficiency</Checkbox>
                        </Stack>
                    </CheckboxGroup>
                </FormControl>
                { campaignCategories.map((data) => {
                    return (<FormControl key={0} mt={5} mb={5} isRequired>
                        <FormLabel htmlFor="campaignCategoriesValue">Experience Points for {data} (Max: 100)</FormLabel>
                        <InputGroup>
                            <InputLeftElement><FiStar color='gray' /></InputLeftElement>
                            <Input 
                                type='range' min={0} max={100}
                                name="campaignCategoriesValue"
                                focusBorderColor="blue.400" 
                                errorBorderColor="red.400"
                                rounded="md"
                                maxLength={255} required
                            />
                        </InputGroup>
                    </FormControl>)
                })}
            </form>
        </Flex>
    )
}

export default CampaignsCenterContent;