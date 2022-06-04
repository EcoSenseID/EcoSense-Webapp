import React, { useState, useEffect } from 'react';

import { Flex, Heading, Select, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react';

import ChartOne from './chart-one.component';

const DataCenterContent = ({ campaigns, campaignIsLoading }) => {
    const [selectedCampaign, setSelectedCampaign] = useState('');

    useEffect(() => {
        if (!campaignIsLoading) setSelectedCampaign(campaigns[0].title || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaignIsLoading]);

    const handleSelectChange = (event) => setSelectedCampaign(event.target.value);

    return (
        <Flex w='100%' p={['6%', '6%', '3%', '3%', '3%']} bgColor='#ffffff' flexDir='column' overflow='auto' minH='100vh'>
            <Flex alignContent='center' justifyContent='space-between'>
                <Heading as="div" 
                    fontWeight='normal' 
                    mb={10} 
                    letterSpacing='tight'
                >Campaign <Flex as={'span'} fontWeight='bold' display='inline-flex'>Data</Flex>
                </Heading>
            </Flex>

            <StatGroup borderColor='blackAlpha.500' p={5} borderRadius={5} mb={8} bgColor='gray.100' boxShadow='md'>
                <Stat>
                    <StatLabel>Total Participant</StatLabel>
                    <StatNumber>{ !campaignIsLoading && (campaigns.reduce((total, data) => total + data.participantsCount, 0)) }</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Total Campaigns</StatLabel>
                    <StatNumber>{ (campaigns && campaigns.length) || 0 }</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Completed Tasks</StatLabel>
                    <StatNumber>354</StatNumber>
                </Stat>
            </StatGroup>

            <Flex alignItems='center'>
                <Text mr={5}>Choose campaign name</Text>
                <Select maxW={300} onChange={handleSelectChange} value={selectedCampaign}>
                    { !campaignIsLoading && campaigns.map(data => <option key={data.id} value={data.title}>{data.title}</option>)}
                </Select>
            </Flex>

            <Flex flexDir='column'>
                <Text color='gray' fontSize='sm' mt={4}>Participant of</Text>
                <Text fontWeight='bold' fontSize='2xl' mb={4}>{selectedCampaign}</Text>
                <ChartOne />
            </Flex>
        </Flex>
    )
}

export default DataCenterContent;