import React, { useState, useEffect } from 'react';

import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

const CampaignsCenterContent = ({ myCampaigns }) => {
    // const [myCampaignsList, setMyCampaignsList] = useState([]);

    // useEffect(() => {
    //     setMyCampaignsList(myCampaigns);
    // }, [myCampaigns]);

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

            <Flex>
                { myCampaigns && myCampaigns.map((data, idx) => (
                    <Text key={idx}>{data.name}</Text>
                ))}
            </Flex>
        </Flex>
    )
}

export default CampaignsCenterContent;