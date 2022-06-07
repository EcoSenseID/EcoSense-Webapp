import React from 'react';
import { Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import { FiCalendar, FiGrid, FiUsers } from 'react-icons/fi';

type CampaignDatacardProps = {
    data: any
}

const CampaignDatacard = ({ data }: CampaignDatacardProps) => {
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

    return (
        <Flex bgColor='white' borderRadius={5} flexDir='column' boxShadow='md'>
            <Image src={data.posterUrl} alt='Poster' w='100%' h={100} borderTopRadius={10} objectFit='cover' />
            <Flex p={5} flexDir='column' >
                <Heading size={'md'} mb={2} noOfLines={1}>{data.title}</Heading>
                {/* <Text noOfLines={4} maxH={100} mb={5}>{data.description}</Text> */}

                <Flex alignItems='center' mb={1.5}>
                    <Icon as={FiCalendar} mr='10px' /> 
                    <Text>{new Date(data.startDate).toLocaleDateString("en-US", dateOptions)} - {new Date(data.endDate).toLocaleDateString("en-US", dateOptions)}</Text>
                </Flex>
                <Flex alignItems='center' mb={1.5}>
                    <Icon as={FiGrid} mr='10px' />
                    <Text>{data.categories.map((category: { name: string; }) => category.name).join(', ')}</Text>
                </Flex>
                <Flex alignItems='center' mb={1.5}>
                    <Icon as={FiUsers} mr='10px' />
                    <Text>{data.participantsCount}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default CampaignDatacard;