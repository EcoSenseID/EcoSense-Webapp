import React, { useState, useEffect, useContext } from 'react';

import { Flex, Heading, HStack, Select, Spinner, Stat, StatGroup, StatLabel, StatNumber, Text, useToast } from '@chakra-ui/react';

import ChartOne from './chart-one.component';
import { AuthContext } from '../../firebase/context';

type DataCenterProps = {
    campaigns: Array<any>,
    campaignIsLoading: boolean
}

const DataCenterContent = ({ campaigns, campaignIsLoading }: DataCenterProps) => {
    const [selectedCampaign, setSelectedCampaign] = useState<any>();
    const [selectedCampaignParticipant, setSelectedCampaignParticipant] = useState<Array<any>>([]);
    const { currentUser } = useContext(AuthContext);
    const [chartIsLoading, setChartLoading] = useState<boolean>(true);
    const toast = useToast();

    useEffect(() => {
        if (!campaignIsLoading){
            if (campaigns.length > 0) {
                setSelectedCampaign(campaigns[0]);
                fetchCampaignParticipantData(campaigns[0].id);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaignIsLoading]);

    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCampaignParticipant([]);
        setChartLoading(true);
        setSelectedCampaign(campaigns.filter(campaign => campaign.id === parseInt(event.target.value))[0]);
        await fetchCampaignParticipantData(parseInt(event.target.value));
    }

    const fetchCampaignParticipantData = async (id: number) => {
        const response = await fetch(`/api/campaignParticipants?campaignId=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.idToken
            },
        });
        const data = await response.json();
        // console.log(data);
        if (data.error) {
            toast({
                title: 'Error!',
                description: `Failed to fetch data.`,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top'
            });
        } else {
            setSelectedCampaignParticipant(data.participants ? data.participants : []);
        }
        setChartLoading(false);
    }

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
                    <StatNumber>{ (!campaignIsLoading && (campaigns.reduce((total, data) => total + data.participantsCount, 0))) || 0}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Total Campaigns</StatLabel>
                    <StatNumber>{ (campaigns && campaigns.length) || 0 }</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Completed Tasks</StatLabel>
                    <StatNumber>0</StatNumber>
                </Stat>
            </StatGroup>

            <Flex alignItems='center'>
                <Text mr={5}>Choose campaign name</Text>
                <Select maxW={300} onChange={handleSelectChange} value={selectedCampaign ? selectedCampaign.id : ''} placeholder='Select a campaign name'>
                    { !campaignIsLoading && campaigns.map(data => <option key={data.id} value={data.id}>{data.title}</option>)}
                </Select>
            </Flex>

            <Flex flexDir='column'>
                <Text color='gray' fontSize='sm' mt={4}>Participant of</Text>
                <HStack alignItems='center' mb={4}>
                    <Text fontWeight='bold' fontSize='2xl' mr={2}>{selectedCampaign ? selectedCampaign.title : 'Campaign'}</Text>
                    { chartIsLoading && <Spinner size='sm'/> }
                </HStack>
                <ChartOne chartData={selectedCampaignParticipant}/>
            </Flex>
        </Flex>
    )
}

export default DataCenterContent;