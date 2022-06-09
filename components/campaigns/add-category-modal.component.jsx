import React, { useState, useRef } from 'react';
import { Button, FormControl, FormHelperText, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, useBreakpointValue, useToast } from '@chakra-ui/react';

import { FiGrid } from 'react-icons/fi';

const AddCategoryModal = ({ isOpen, onClose, fullCategoriesList, currentCategoriesList, setCurrentCategoriesList, currentTotalPoint, setCurrentTotalPoint, newData, setNewData }) => {
    const initialRef = useRef();
    const toast = useToast();
    const [addCategoryData, setAddCategoryData] = useState({
        id_category: '',
        earned_experience_point: 0
    });
    // console.log('currentCategoriesList', currentCategoriesList);
    // console.log('fullCategoriesList', fullCategoriesList);

    const handleChangeSelect = (event) => {
        const { value } = event.target;
        setAddCategoryData({ ...addCategoryData, id_category: value });
    }

    const handleChangeNumber = (event) => {
        const value = event;
        setAddCategoryData({ ...addCategoryData, earned_experience_point: value });
    }

    const handleAddCategory = (event) => {
        if (addCategoryData.id_category !== '' && addCategoryData.earned_experience_point !== 0) {
            const idCategory = parseInt(addCategoryData.id_category);
            const categoryName = fullCategoriesList.find(data => data.id === idCategory).name;
            const earnedExperiencePoint = parseInt(addCategoryData.earned_experience_point);
            const colorHex = fullCategoriesList.find(data => data.id === idCategory).colorHex;
            setNewData({
                ...newData,
                categories: [
                    ...newData.categories, 
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
            onClose();
        } else {
            if(addCategoryData.id_category === '') {
                toast({
                    title: 'Choose a Category!',
                    description: `Category cannot be empty.`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                });
            } else if (addCategoryData.earned_experience_point === 0) {
                toast({
                    title: 'Add Experience Point!',
                    description: `Experience Point cannot be empty.`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: "top"
                });
            }
            return;
        }
    }

    return (
        <Modal 
            blockScrollOnMount={false} 
            initialFocusRef={initialRef} 
            isOpen={isOpen} 
            onClose={onClose} 
            closeOnOverlayClick={false} 
            size={useBreakpointValue(["xs", "xs", "md", "lg", "lg"])}
        >
            <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(5px)'/>
            <ModalContent>
                <ModalHeader>Add Campaign Category</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text mb={6}>Choose a category and set the experience point.</Text>
                    <FormControl mb={6}>
                        <FormLabel htmlFor='category'>Category</FormLabel>
                        <Select value={addCategoryData.id_category} onChange={handleChangeSelect} ref={initialRef} name='category' icon={<FiGrid color='grey' />} placeholder='Select a campaign category'>
                            { currentCategoriesList && currentCategoriesList.map((data) => (
                                <option key={data.id} value={data.id}>{data.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='category'>Experience Point</FormLabel>
                        <NumberInput value={addCategoryData.earned_experience_point} step={5}  name='earned_experience_point' onChange={handleChangeNumber} defaultValue={100 - currentTotalPoint} min={0} max={100 - currentTotalPoint}>
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
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>   
        </Modal>
    );
}

export default AddCategoryModal;