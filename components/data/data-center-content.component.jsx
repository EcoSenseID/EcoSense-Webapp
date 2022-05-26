import React from 'react';

import { Flex, Heading, Select, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react';

import ChartOne from './../dashboard/center-content/chart-one.component';

const DataCenterContent = () => {
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

            <StatGroup borderColor='blackAlpha.500' borderWidth={1} p={5} borderRadius={5} maxW='70%' mb={8}>
                <Stat>
                    <StatLabel>Total Participant</StatLabel>
                    <StatNumber>1,670</StatNumber>
                    <StatHelpText><StatArrow type='increase' />23.36%</StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>Completed Tasks</StatLabel>
                    <StatNumber>560</StatNumber>
                    <StatHelpText><StatArrow type='decrease' />32.61%</StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>Incomplete Campaigns</StatLabel>
                    <StatNumber>354</StatNumber>
                    <StatHelpText><StatArrow type='increase' />12.68%</StatHelpText>
                </Stat>
            </StatGroup>

            <Flex alignItems='center'>
                <Text mr={5}>Choose campaign name</Text>
                <Select maxW={300}>
                    <option>Save the Earth</option>
                    <option>Android Party!</option>
                    <option>10 Days of Yoga</option>
                    <option>Starts with You</option>
                </Select>
            </Flex>

            <Flex maxW='70%' flexDir='column'>
                <ChartOne />
            </Flex>
        </Flex>
    )
}

export default DataCenterContent;