import React from 'react';
import { Box, Flex, Grid, Heading, Image, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import CampaignDatacard from './campaign-datacard.component';

type DataAsideProps = {
    campaigns: Array<any>,
    campaignIsLoading: boolean
}

const DataAside = ({ campaigns, campaignIsLoading }: DataAsideProps) => {
    return (
        <Flex w={['100%', '100%', '30%']} minW={[null, null, '300px', '300px', '400px']} bgColor='#f5f5f5' p={['10%', '6%', '3%', '3%', '3%']} flexDir='column' overflow='auto'>
            <Flex flexDir='column'>
                <Heading as="div" fontWeight='bold' mb={5} letterSpacing='tight'>Stats</Heading>
                <Text mb={5}>A summary of your campaigns statistics.</Text>
            </Flex>
            
            { campaignIsLoading ?
                <Box height='380px' width='100%' borderRadius='10px' bgColor='white' boxShadow='md'>
                    <Skeleton height='100px' borderTopRadius='10px' mb='8px'/>
                    <Box p={6}>
                        <Skeleton height='20px' />
                        <SkeletonText noOfLines={6} spacing='4'/>
                    </Box>
                </Box>
                : 
                ( campaigns.length > 0 ?
                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(1, 1fr)']} gap={5}>
                        { campaigns.map(data => <CampaignDatacard key={data.id} data={data} />) }
                    </Grid> :
                    <Flex p={5} flex={1} flexDir='column' justifyContent='center' h='40vh' minH={430} gap={10}>
                        <Image src='/images/empty-box-icon.png' h={60} alt='Empty Box' objectFit='scale-down' pr={8}/>
                        <Text textAlign='center'>You have no campaigns.</Text>
                    </Flex>
                )
            }
        </Flex>
    )
}

export default DataAside;