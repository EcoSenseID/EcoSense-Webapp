import React, { useState } from "react";
import { Avatar, AvatarGroup, Box, Button, Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, Link, Text } from "@chakra-ui/react";

import { FiSearch, FiBell, FiArrowRight } from 'react-icons/fi';

import campaignDummyData from './aside-content/campaign.data';

import classes from './aside-content.module.scss';
import CampaignCard from "../homepage/campaign-card.component";

const AsideContent = () => {
    const [value, setValue] = useState(1);

    return (
        <Flex w={['100%', '100%', '30%']} minW={[null, null, '300px', '300px', '400px']} bgColor='#f5f5f5' p='3%' flexDir='column' overflow='auto'>
            <Flex alignContent='center'>
                <InputGroup bgColor='#fff' mb={4} border='none' borderColor='#fff' borderRadius='10px' mr={2}>
                    <InputLeftElement><FiSearch color='gray' /></InputLeftElement>
                    <Input type='text' placeholder='Search feature coming soon ~' borderRadius='10px' />
                </InputGroup>
                <IconButton icon={<FiBell />} fontSize='sm' bgColor='#fff' borderRadius='50%' p='10px' />
                <Flex width={30} h={25} bgColor='#bd4a4a' borderRadius='50%' color='#fff' align='center' justifyContent='center' ml={-3} mt={-2} zIndex={100} fontSize='xs'>
                    1
                </Flex>
            </Flex>
            <Flex my={7} justifyContent='space-between' alignItems='center'>
                <Heading letterSpacing="tight" fontSize='2xl'>My Campaigns</Heading>
                <Link href="/dashboard/campaigns">
                    <IconButton icon={<FiArrowRight />} colorScheme='blackAlpha' bgColor='#034b15' color='#fff' borderRadius={10}></IconButton>
                </Link>
            </Flex>
            
            { value == 1 &&
                <CampaignCard className={classes.dash_card} {...campaignDummyData[0]}/>
            }
            { value == 2 &&
                <CampaignCard className={classes.dash_card} {...campaignDummyData[1]}/>
            }
            { value == 3 &&
                <CampaignCard className={classes.dash_card} {...campaignDummyData[2]}/>
            }
            <Flex justifyContent='center' mt={7}>
                <Button className={classes.cardnav} bgColor={value == 1 ? "gray.600" : "gray.400"} onClick={() => setValue(1)} size='xs' mx={1}/>
                <Button className={classes.cardnav} bgColor={value == 2 ? "gray.600" : "gray.400"} onClick={() => setValue(2)} size='xs' mx={1}/>
                <Button className={classes.cardnav} bgColor={value == 3 ? "gray.600" : "gray.400"} onClick={() => setValue(3)} size='xs' mx={1}/>
            </Flex>

            <Flex flexDir='column' my={4}>
                <Flex justify='space-between' mb={2}>
                    <Text>Total Campaign</Text>
                    <Text fontWeight='bold'>2</Text>
                </Flex>
                <Flex justify='space-between' mb={2}>
                    <Text>Total Participants</Text>
                    <Text fontWeight='bold'>256</Text>
                </Flex>
            </Flex>

            <Heading letterSpacing='tight' size='md' my={4}>Most Active Participants</Heading>
            <Flex>
                <AvatarGroup size='md' max={5}>
                    <Avatar src='https://randomuser.me/api/portraits/men/2.jpg' />
                    <Avatar src='https://randomuser.me/api/portraits/women/3.jpg' />
                    <Avatar src='https://randomuser.me/api/portraits/men/4.jpg' />
                    <Avatar src='https://randomuser.me/api/portraits/women/5.jpg' />
                    <Avatar src='https://randomuser.me/api/portraits/men/6.jpg' />
                    <Avatar src='https://randomuser.me/api/portraits/women/7.jpg' />
                    <Avatar src='https://randomuser.me/api/portraits/men/8.jpg' />
                    <Avatar src='https://randomuser.me/api/portraits/women/9.jpg' />
                    <Avatar src='https://randomuser.me/api/portraits/men/10.jpg' />
                </AvatarGroup>
            </Flex>
        </Flex>
    )
}

export default AsideContent;