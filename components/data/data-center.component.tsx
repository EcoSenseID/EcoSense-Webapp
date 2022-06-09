import React, { useState, useEffect, useContext } from 'react';

import { Divider, Flex, Heading, HStack, Icon, Image, Link, Select, Spinner, Stat, StatGroup, StatLabel, StatNumber, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';

import ChartOne from './chart-one.component';
import { AuthContext } from '../../firebase/context';
import { FiExternalLink } from 'react-icons/fi';
import { BiUnlink } from 'react-icons/bi';

type DataCenterProps = {
    campaigns: Array<any>,
    campaignIsLoading: boolean
}

const DataCenterContent = ({ campaigns, campaignIsLoading }: DataCenterProps) => {
    const [selectedCampaign, setSelectedCampaign] = useState<any>();
    const [selectedCampaignData, setSelectedCampaignData] = useState<any>({
        participants: [],
        completedTasks: []
    });
    const { currentUser } = useContext(AuthContext);
    const [chartIsLoading, setChartLoading] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        if (!campaignIsLoading){
            if (campaigns.length > 0) {
                setSelectedCampaign(campaigns[0]);
                setChartLoading(true);
                fetchCampaignParticipantData(campaigns[0].id);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaignIsLoading]);

    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCampaignData({
            ...selectedCampaignData,
            participants: [],
            completedTasks: []
        });
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
            setSelectedCampaignData({
                ...selectedCampaignData,
                participants: data.participants || [],
                completedTasks: data.completedTasks || []
            });
        }
        setChartLoading(false);
        console.log(data);
    }

    return (
        <Flex w='100%' p={['10%', '6%', '3%', '3%', '3%']} bgColor='#ffffff' flexDir='column' overflow='auto' minH='100vh'>
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
            </StatGroup>

            <Flex alignItems={['flex-start', 'center', 'flex-start', 'center', 'center']} flexDir={['column', 'row', 'column', 'row', 'row']} gap={[2, 5, 2, 5, 5]}>
                <Text>Choose campaign name</Text>
                <Select maxW={300} onChange={handleSelectChange} value={selectedCampaign ? selectedCampaign.id : ''} placeholder='Select a campaign name'>
                    { !campaignIsLoading && campaigns.map(data => <option key={data.id} value={data.id}>{data.title}</option>)}
                </Select>
            </Flex>

            <Flex flexDir='column'>
                <Text color='gray' fontSize='sm' mt={4}>Participant of</Text>
                <HStack alignItems='center' mb={4}>
                    <Heading fontWeight='bold' fontSize='2xl' mr={2}>{selectedCampaign ? selectedCampaign.title : 'Campaign'}</Heading>
                    { chartIsLoading && <Spinner size='sm'/> }
                </HStack>
                <ChartOne chartData={selectedCampaignData.participants}/>
            </Flex>

            <Flex mt={10} flexDir='column'>
                <Flex alignItems='center' gap={3}>
                    <Heading fontWeight='bold' fontSize='2xl' mr={2}>Campaign Completed Tasks</Heading>
                    { chartIsLoading && <Spinner size='sm'/> }
                </Flex>
                <Flex flexDir='column'>
                    <Table variant='unstyled' mt={4}>
						{ (!chartIsLoading && selectedCampaignData.completedTasks.length > 0) &&
                            <>
                            <Thead>
                                <Tr color='gray'>
                                    <Th isNumeric>User ID</Th>
                                    <Th isNumeric>#</Th>
                                    <Th>Task Name</Th>
                                    <Th>Photo</Th>
                                    <Th>Caption</Th>
                                    <Th isNumeric>Timestamp</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                { selectedCampaignData.completedTasks.map((data: any, index: React.Key | null | undefined) => (
                                    <Tr key={index}>
                                        <Td>{data.id_user}</Td>
                                        <Td>{data.order_number}</Td>
                                        <Td>{data.name}</Td>
                                        <Td>
                                            {data.photo_url !== '' ?
                                                <Link target='_blank' href={data.photo_url}><Icon as={FiExternalLink} /></Link> :
                                                <Icon as={BiUnlink} />
                                            }
                                        </Td>
                                        <Td>{data.caption}</Td>
                                        <Td>{new Date(data.timestamp).toLocaleDateString('en-US')}</Td>
                                        <Divider />
                                    </Tr>
                                ))}
                            </Tbody>
                            </>
                        }
                        { (!chartIsLoading && selectedCampaignData.completedTasks.length === 0) &&
                            <Flex p={5} flex={1} flexDir='column' justifyContent='center' h='40vh' minH={430} gap={10}>
                                <Image src='/images/empty-box-icon.webp' h={60} alt='Empty Box' objectFit='scale-down' pr={8}/>
                                <Text textAlign='center'>No data</Text>
                            </Flex>
                        }
                    </Table>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default DataCenterContent;