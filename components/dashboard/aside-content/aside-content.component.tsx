import React from "react";

import { Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Skeleton, Stat, StatGroup, StatLabel, StatNumber, } from "@chakra-ui/react";
import { FiSearch, FiBell } from 'react-icons/fi';
import CategoryBox from "./category-box.component";

type AsideContentProps = {
    categories: Array<any>, 
    campaigns: Array<any>, 
    campaignsIsLoading: boolean
}

const AsideContent = ({ categories, campaigns, campaignsIsLoading }: AsideContentProps) => {
    return (
        <Flex w={['100%', '100%', '30%']} minW={[null, null, '300px', '300px', '400px']} bgColor='#f5f5f5' p='3%' flexDir='column' overflow='auto'>
            <Flex alignContent='center'>
                <InputGroup bgColor='#fff' mb={4} border='none' borderColor='#fff' borderRadius='10px' mr={2}>
                    <InputLeftElement><FiSearch color='gray' /></InputLeftElement>
                    <Input type='text' placeholder='Search feature coming soon ~' borderRadius='10px' />
                </InputGroup>
                <IconButton icon={<FiBell />} fontSize='sm' bgColor='#fff' borderRadius='50%' p='10px' aria-label={""} />
                <Flex width={30} h={25} bgColor='#bd4a4a' borderRadius='50%' color='#fff' align='center' justifyContent='center' ml={-3} mt={-2} zIndex={100} fontSize='xs'>
                    1
                </Flex>
            </Flex>

            <Flex my={6} justifyContent='space-between'>
                <Heading letterSpacing="tight" fontSize='2xl'>Campaign Categories</Heading>
            </Flex>

            <Flex flexDir='column' gap={4}>
                { categories.length == 0 ?
                    Array.from({ length: 5 }, (_, _i) => <Skeleton height='48px' w='100%' borderRadius='10' />) :
                    categories.map((data, _idx) => <CategoryBox key={data.id} data={data} />)
                }
            </Flex>

            <Flex mt={14} justifyContent='space-between' alignItems='center'>
                <Heading letterSpacing="tight" fontSize='2xl'>Your Stats</Heading>
            </Flex>

            { campaignsIsLoading ? 
                <Skeleton height='100px' width='100%' borderRadius={10} mt={5}/> :
                <StatGroup borderColor='blackAlpha.500' borderWidth={1} p={5} borderRadius={10} mt={5}>
                    <Stat>
                        <StatLabel>Total Campaign</StatLabel>
                        <StatNumber>{ (campaigns && campaigns.length) || 0 }</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Total Participants</StatLabel>
                        <StatNumber>{ (campaigns.reduce((total, data) => total + data.participantsCount, 0)) }</StatNumber>
                    </Stat>
                </StatGroup>
            }
        </Flex>
    )
}

export default AsideContent;