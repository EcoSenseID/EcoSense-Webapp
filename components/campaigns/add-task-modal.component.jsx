import React, { useState, useRef } from 'react';

import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Switch, Text, useBreakpointValue } from '@chakra-ui/react';
import { FiItalic } from 'react-icons/fi';

const AddTaskModal = ({ isOpen, onClose, currentTaskOrder, setCurrentTaskOrder, newData, setNewData }) => {
    const initialRef = useRef();
    const [addTaskData, setAddTaskData] = useState({
        name: '',
        order_number: 1,
        require_proof: true
    });

    const handleChangeTaskName = (event) => {
        const { value } = event.target;
        setAddTaskData({
            ...addTaskData,
            order_number: parseInt(currentTaskOrder),
            name: value
        });
    }

    const handleChangeRequireProof = (event) => {
        event.preventDefault();
        setAddTaskData({
            ...addTaskData,
            order_number: parseInt(currentTaskOrder),
            require_proof: event.target.checked
        });
    }

    const handleAddTask = (event) => {
        if (addTaskData.name === '') {
            toast({
                title: 'Create a Task!',
                description: `Task name cannot be empty.`,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            });
        } else {
            console.log('event', event);
            console.log('addTaskData', addTaskData);
            setNewData({
                ...newData,
                tasks: [ ...newData.tasks, addTaskData ]
            });
            setCurrentTaskOrder(currentTaskOrder + 1);
            setAddTaskData({
                ...addTaskData,
                name: '',
                order_number: parseInt(currentTaskOrder),
                require_proof: true
            });
            onClose();
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
            <ModalContent width={{md: "700px", base: "100%"}}>
                <ModalHeader>Add Campaign Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text mb={6}>Create a new task for this campaign.</Text>
                    <FormControl mb={6}>
                        <FormLabel htmlFor='category'>Task Name</FormLabel>
                        <InputGroup>
                                <InputLeftElement><FiItalic /></InputLeftElement>
                                <Input type='text' placeholder='My New Task' value={addTaskData.name} onChange={handleChangeTaskName} ref={initialRef}/>
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
                        <Switch id='email-alerts'defaultChecked value={addTaskData.require_proof} onChange={handleChangeRequireProof}/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleAddTask}>Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddTaskModal;