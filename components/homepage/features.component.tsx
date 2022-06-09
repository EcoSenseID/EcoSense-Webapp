import { Flex, Heading, useColorModeValue, Image, Avatar, LightMode, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import classes from './features.module.scss';

const featureData = [
    {
        id: 1,
        name: 'Plant Disease Recognition',
        desc: 'Detect 38 Different Plant Diseases based on leaf image (from Apple to Tomatos)'
    },
    {
        id: 2,
        name: 'Gamified Environmental Campaign',
        desc: 'Get more experience points by becoming one of the changemakers and joining more campaigns!'
    },
    {
        id: 3,
        name: 'Easy Authentication',
        desc: 'Login with email or Google account, edit display name & profile picture.'
    }
]

const Features = () => {
    const [selected, setSelected] = useState(1);

    return (
        <LightMode>
            <Flex alignItems='center' py='6rem' px='3rem' flexDir='column' bgGradient={useColorModeValue('linear(to-r, green.100, green.50)', 'linear(to-r, green.100, green.50)')} id='features'>
                <Heading mb={{ base: '2rem', md: '5rem' }} textAlign='center' color={useColorModeValue('blackAlpha.900', 'blackAlpha.900')}>Our Features</Heading>

                <Flex maxW='7xl' flexDir={{ base: 'column-reverse', md: 'row' }} flex={1}>
                    <Flex display={{ base: 'none', md: 'flex' }} width={{ base: '100%', md: '50%' }} flexDir='column' gap={5} alignItems='center' justifyContent='center'>
                        { featureData.map(data => (
                            <Flex key={data.id} className={classes.featurebox} gap={5} bgColor={selected === data.id ? 'white': ''} py={5} px={8} borderRadius={10} boxShadow={selected === data.id ? 'md': ''} onClick={() => setSelected(data.id)} cursor='pointer'>
                                <Avatar name={data.id.toString()} bgColor={'green.700'} size={{ base: 'sm', md: 'md' }}></Avatar>
                                <Flex flexDir='column' gap={2}>
                                    <Heading color={'blackAlpha.900'} size={{ base: 'sm', md: 'md' }}>{data.name}</Heading>
                                    <Text fontSize={{ base: 'sm', md: 'md' }} color={'blackAlpha.900'} >{data.desc}</Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                    <Flex display={{ base: 'flex', md: 'none' }} flexDir='column' gap={6}>
                        <Flex justifyContent='space-evenly'>
                            { featureData.map((data) => 
                                <Avatar 
                                    bgColor={selected == data.id ? 'green.700' : 'gray.400'} 
                                    key={data.id} 
                                    name={data.id.toString()} 
                                    size='md'
                                    onClick={() => setSelected(data.id)}
                                    className={classes.avatarNum}
                                ></Avatar>
                            )}      
                        </Flex>
                        <Flex gap={2} flexDir='column' bgColor={'white'} py={5} px={8} borderRadius={10} boxShadow={'md'} width='100%' flex={1}>
                            <Heading color={'blackAlpha.900'} size={{ base: 'sm', md: 'md' }}>{featureData.filter(data => data.id === selected)[0].name}</Heading>
                            <Text fontSize={{ base: 'xs', md: 'md' }} color={'blackAlpha.900'} >{featureData.filter(data => data.id === selected)[0].desc}</Text>
                        </Flex>
                    </Flex>

                    <Flex width={{ base: '100%', md: '50%' }} justifyContent='center' mb={{ base: 10, md: 0 }} flex={1}>
                        <Image className={classes.image} visibility={selected === 1 ? 'visible' : 'hidden'} display={selected === 1 ? 'flex' : 'none'} draggable='false' alt='iphone' src='/images/phone/Asset 8@2x.png' maxH='500'></Image>
                        <Image className={classes.image} visibility={selected === 2 ? 'visible' : 'hidden'} display={selected === 2 ? 'flex' : 'none'} draggable='false' alt='iphone' src='/images/phone/Asset 9@2x.png' maxH='500'></Image>
                        <Image className={classes.image} visibility={selected === 3 ? 'visible' : 'hidden'} display={selected === 3 ? 'flex' : 'none'} draggable='false' alt='iphone' src='/images/phone/Asset 10@2x.png' maxH='500'></Image>
                    </Flex>
                </Flex>
            </Flex>
        </LightMode>
    )
}

export default Features;