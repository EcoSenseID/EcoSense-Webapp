import React, { useState, useRef, useContext } from 'react';

import { Button, Flex, FormControl, FormHelperText, Heading, HStack, Icon, IconButton, Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Tag, TagLeftIcon, Text, Tooltip, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react';
import { FiUsers, FiCalendar, FiGrid, FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { RiFireFill, RiTimeFill, RiTimer2Fill } from 'react-icons/ri';

import classes from './my-campaign-card.module.scss';
import EditCampaignDrawer from './edit-campaign-drawer.component';
import { AuthContext } from '../../firebase/context';

const MyCampaignCard = ({ data, categoriesList }) => {
	const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();
    const toast = useToast();
    const {
        categories,
        description,
        endDate,
        id,
        isNew,
        isTrending,
        participantsCount,
        posterUrl,
        startDate,
        title,
    } = data;
    const { currentUser } = useContext(AuthContext);

    // FOR DELETE MODAL
    const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();
    const initialRefModalDelete = useRef();
    const [deleteModalInput, setDeleteModalInput] = useState('');
    const [deleteIsLoading, setDeleteLoading] = useState(false);

    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' }

    const handleDeleteCampaign = async () => {
        if (title === deleteModalInput) {
            setDeleteLoading(true);
            const response = await fetch(`https://ecosense-bangkit.uc.r.appspot.com/deleteCampaign?campaignId=${id}`, {
            // const response = await fetch(`http://localhost:3001/deleteCampaign?campaignId=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + currentUser.idToken },
            });
            const data = await response.json();
            if (data.error) {
                setDeleteLoading(false);
                toast({
                    title: 'Error!',
                    description: `${data.message}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top'
                });
            } else {
                setDeleteLoading(false);
                toast({
                    title: 'Delete success!',
                    description: `${data.message}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top'
                });
                onCloseModalDelete();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } else {
            toast({
                title: 'Wrong Input!',
                description: `You typed the wrong text!`,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            })
        }
    }

    return (
        <Flex boxShadow='black' className={classes.card} borderRadius={10} flexDir='column'>
            <Flex justifyContent='flex-end' position='relative'>
                <Image src={posterUrl} alt={title} w='100%' h={200} borderTopRadius={10} objectFit='cover'/>
                <Menu mt={5} placement='bottom-end'>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<FiMoreVertical />}
                        position='absolute'
                        mr={4} mt={4} p={2}
                        h='unset' minW='unset'
                    />
                    <MenuList>
                        <MenuItem variant='outline' icon={<FiEdit />} flex={1} onClick={onOpenDrawer}>Edit</MenuItem>
                        { participantsCount === 0 ? // Only can delete campaign with 0 participant
                            <MenuItem color='red' variant='outline' icon={<FiTrash2 />} flex={1} onClick={onOpenModalDelete}>Delete</MenuItem> : 
                            <Tooltip label='Campaigns with participants cannot be deleted' shouldWrapChildren>
                                <MenuItem isDisabled color='red' variant='outline' icon={<FiTrash2 />} flex={1} onClick={onOpenModalDelete}>Delete</MenuItem>
                            </Tooltip>
                        }
                    </MenuList>
                </Menu>
            </Flex>
            <Flex p={7} flexDir='column'>
                <Heading size={'md'} mb={2} noOfLines={1}>{title}</Heading>
                <Text noOfLines={4} maxH={100} mb={5}>{description}</Text>
                
                <Flex alignItems='center' mb={1.5}>
                    <FiCalendar className={classes.smallicon}/>
                    <Text fontWeight='bold'>Start</Text> 
                    <Text ml={1.5}>{new Date(startDate).toLocaleDateString("en-US", dateOptions)}</Text>
                </Flex>
                <Flex alignItems='center' mb={1.5}>
                    <FiCalendar className={classes.smallicon}/>
                    <Text fontWeight='bold'>End</Text> 
                    <Text ml={1.5}>{new Date(endDate).toLocaleDateString("en-US", dateOptions)}</Text>
                </Flex>
                <Flex alignItems='center' mb={1.5}>
                    <FiGrid className={classes.smallicon}/>
                    <Text>{categories.map(data => data.name).join(', ')}</Text>
                </Flex>
                <Stack direction='row' mt={5} gap={2}>
                    { isTrending && <Tag colorScheme='red'><TagLeftIcon as={RiFireFill} />TRENDING</Tag>}
                    { isNew && <Tag colorScheme='purple'><TagLeftIcon as={RiTimeFill}/>NEW</Tag>}
                    { ((new Date(endDate)).getTime() < (new Date()).getTime()) && <Tag colorScheme='red'><TagLeftIcon as={RiTimer2Fill}/>ENDED</Tag>}
                    <Flex alignItems='center' mb={1.5}>
                        <FiUsers className={classes.smallicon}/>
                        <Text>{participantsCount}</Text>
                    </Flex>
                </Stack>
            </Flex>
            
            <EditCampaignDrawer
                isOpen={isOpenDrawer}
                onClose={onCloseDrawer}
                data={data}
                categoriesList={categoriesList}
            />

            {/* MODAL TO MAKE SURE IF THE PERSON WANTS TO DELETE THE CAMPAIGN */}
            <Modal
                blockScrollOnMount={false} 
                initialFocusRef={initialRefModalDelete} 
                isOpen={isOpenModalDelete} 
                onClose={onCloseModalDelete} 
                closeOnOverlayClick={false} 
                size={useBreakpointValue(["xs", "xs", "md", "lg", "lg"])}
            >
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(5px)'/>
                <ModalContent>
                    <ModalHeader>Delete Campaign</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text mb={6}>Are you sure you want to delete this campaign?</Text>
                        <FormControl>
                            <Input ref={initialRefModalDelete} value={deleteModalInput} onChange={(event) => setDeleteModalInput(event.target.value)}></Input>
                            <FormHelperText>If you&apos;re sure, please type <Text as='span' fontWeight='bold'>{title}</Text></FormHelperText>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        { deleteIsLoading ?
                            <Button isLoading colorScheme='red' mr={3}>Delete</Button> :
                            <Button colorScheme='red' mr={3} onClick={handleDeleteCampaign}>Delete</Button>
                        }
                        <Button onClick={onCloseModalDelete}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default MyCampaignCard;