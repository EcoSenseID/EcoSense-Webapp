import { Flex, Heading, Icon, IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { IoEarth } from 'react-icons/io5';

const factData = [
    {
        imgSrc: 'https://static.dw.com/image/59640175_101.jpg',
        name: 'Our Risk of Global Warming',
        desc: "Southeast Asia is among the world's most at-risk regions when it comes to the impact of global warming. The UN Intergovernmental Panel on Climate Change (IPCC) warned in its most recent report that the region is facing rising sea levels, heat waves, droughts and increasingly intense rainstorms.",
        source: 'DW (2021)'
    },
    {
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Aral_Sea_1989-2008.jpg/1280px-Aral_Sea_1989-2008.jpg',
        name: 'The Dried Sea: Aral Sea',
        desc: 'Once the fourth largest lake in the world, the Aral Sea has dried up. As a result, fisheries and the communities that depended on them collapsed. The increasingly salty water became polluted with fertilizer and pesticides. The blowing dust from the exposed lakebed, contaminated with agricultural chemicals, became a public health hazard.',
        source: 'NASA (2018)'
    },
    {
        imgSrc: 'https://scx2.b-cdn.net/gfx/news/2020/centralkalim.jpg',
        name: 'Indonesia Wildfires',
        desc: "In 2020, approximately 0.29 million hectares of land were burnt due to forest fire in Indonesia, significantly decreased in comparison to previous years. Forest fires in Indonesia typically take place in Borneo, almost 100 thousand hectares of land were burnt in South Borneo in 2018.",
        source: 'Statista (2021)'
    }
]

const SaveTheEarth = () => {
    const [currentOrder, setCurrentOrder] = useState(0);

    return (
        <Flex 
            alignItems='center' 
            py='6rem' 
            px={{ base: '3rem', sm: '4rem', lg: '10rem' }} 
            flexDir={{ base: 'column', md: 'row' }} 
            bgGradient={useColorModeValue('linear(to-b, gray.100, gray.300)', 'linear(to-b, gray.800, gray.700)')}
            justifyContent='space-between'
        >
            <Flex flexDir='column' gap={4} mr={{ base: 0, md: '100px' }} mb={{ base: 50, md: 0 }}>
                <Flex gap={4} justifyContent={{ base: 'center', md: 'left' }}>
                    <Icon color={useColorModeValue('darkred', 'red.500')} w={10} h={10} as={IoEarth}></Icon>
                    <Heading color={useColorModeValue('darkred', 'red.500')} >Earth is in Danger!</Heading>
                </Flex>
                <Text textAlign={{ base: 'center', md: 'left' }}>Our daily actions might be harmful to the Earth. <br/> Let&quot;s save the Earth together, and it starts from you!</Text>
            </Flex>

            <Flex flexDir='column' >
                <Flex bgColor='white' borderRadius={10} boxShadow='md' flexDir='column' gap={1} maxW={700}>
                    <Image borderTopRadius={10}  objectFit='cover' maxH={{ base: 150, md: 250 }} alt='The Aral Sea' src={factData[currentOrder].imgSrc}></Image>
                    <Flex p={8} flexDir='column' gap={4} >
                        <Heading color={'blackAlpha.900'} fontSize={{ base: 'md', md: 'xl' }}>{factData[currentOrder].name}</Heading>
                        <Text 
                            color={'blackAlpha.900'} 
                            fontSize={{ base: 'xs', md: 'sm' }}
                            noOfLines={{ base: 9, sm: 4, md: 7 }}
                        >{factData[currentOrder].desc}</Text>
                        <Text color={'blackAlpha.900'} fontSize='xs' fontWeight='bold'>Source: {factData[currentOrder].source}</Text>
                    </Flex>
                    
                </Flex>

                <Flex gap={5} justifyContent='center' mt={5}>
                    <IconButton 
                        disabled={currentOrder === 0 ? true : false} 
                        icon={<FiArrowLeft />} 
                        aria-label={""} 
                        left={0} top={0} 
                        onClick={() => setCurrentOrder(currentOrder - 1)}
                    />
                    <IconButton 
                        disabled={currentOrder === factData.length-1 ? true : false} 
                        icon={<FiArrowRight />} 
                        aria-label={""} 
                        right={0} top={0}
                        onClick={() => setCurrentOrder(currentOrder + 1)}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SaveTheEarth;