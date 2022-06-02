import React, { useState, useEffect } from 'react';

import { Box, Button, Flex, Heading, HStack, Link, Skeleton, SkeletonCircle, SkeletonText, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

import MyCampaignCard from './my-campaign-card.component';

const CampaignsCenterContent = ({ myCampaigns, categoriesList }) => {
    const [myCampaignsList, setMyCampaignsList] = useState(undefined);
    const [campaignsIsLoading, setCampaignsLoading] = useState(true);
    
    useEffect(() => {
        setMyCampaignsList(myCampaigns);
        if (myCampaignsList !== undefined) setCampaignsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myCampaigns]);

    return (
        <Flex w='100%' p={['6%', '6%', '3%', '3%', '3%']} bgColor='#ffffff' flexDir='column' overflow='auto' minH='100vh'>
            <Flex alignContent='center' justifyContent='space-between'>
                <Heading as="div" 
                    fontWeight='normal' 
                    mb={10} 
                    letterSpacing='tight'
                >My <Flex as={'span'} fontWeight='bold' display='inline-flex'>Campaigns</Flex>
                </Heading>

                <Link style={{ textDecoration: 'none' }} href='/dashboard/addCampaign'><Button colorScheme='green' leftIcon={<FiPlus />}>New Campaign</Button></Link>
            </Flex>
            { campaignsIsLoading ?
                <HStack flexDir='row' gap={5}>
                    <Box boxShadow='lg' bg='white' width={320} height={470} borderRadius={10}>
                        <Skeleton height='200px' />
                        <Box p={6}>
                            <Skeleton height='30px' /> <SkeletonText  mt='4' noOfLines={6} spacing='4' />
                        </Box>
                    </Box>
                    <Box boxShadow='lg' bg='white' width={320} height={470} mt={0}>
                        <Skeleton height='200px' />
                        <Box p={6}>
                            <Skeleton height='30px' /> <SkeletonText  mt='4' noOfLines={6} spacing='4' />
                        </Box>
                    </Box>
                    <Box boxShadow='lg' bg='white' width={320} height={470}>
                        <Skeleton height='200px' />
                        <Box p={6}>
                            <Skeleton height='30px' /> <SkeletonText  mt='4' noOfLines={6} spacing='4' />
                        </Box>
                    </Box>
                </HStack>
                :
                ( myCampaignsList.length === 0 ?
                    <Text>You don&apos;t have any campaign.</Text> :
                    <Flex flexDir='row' gap={5}>
                        { myCampaignsList && myCampaignsList.map(data => (
                            <MyCampaignCard key={data.id} data={data} categoriesList={categoriesList}/>
                        ))}
                    </Flex>    
                )
            }
        </Flex>
    )
}

export default CampaignsCenterContent;