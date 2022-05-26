import React from 'react';

import { Flex, Heading, Icon, Image, Stack, Tag, TagLeftIcon, Text } from '@chakra-ui/react';
import { FiUsers, FiCalendar, FiGrid } from 'react-icons/fi';
import { RiFireFill, RiTimeFill } from 'react-icons/ri';

import classes from './my-campaign-card.module.scss';

const MyCampaignCard = ({ data }) => {
    const {
        category,
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

    const dateOptions = {
        year: 'numeric', month: 'long', day: 'numeric'
    }

    return (
        <Flex boxShadow='black' className={classes.card} borderRadius={10} flexDir='column' w={320}>
            <Flex>
                <Image src={posterUrl} alt={title} w='100%' h={200} borderTopRadius={10} objectFit='cover'/>
            </Flex>
            <Flex p={5} flexDir='column'>
                <Heading size={'md'} mb={2}>{title}</Heading>
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
                    <Text>{category}</Text>
                </Flex>
                <Stack direction='row' mt={5} gap={2}>
                    { isTrending && <Tag colorScheme='red'><TagLeftIcon as={RiFireFill} />TRENDING</Tag>}
                    { isNew && <Tag colorScheme='purple'><TagLeftIcon as={RiTimeFill}/>NEW</Tag>}
                    <Flex alignItems='center' mb={1.5}>
                        <FiUsers className={classes.smallicon}/>
                        <Text>{participantsCount}</Text>
                    </Flex>
                </Stack>
            </Flex>
        </Flex>
    )
}

export default MyCampaignCard;