import { Avatar, AvatarBadge, Flex, Grid, Heading, Text, useColorModeValue, Image } from '@chakra-ui/react';
import React from 'react';

const teamData = [
    {
        id: 1,
        name: 'Darren Ngoh',
        univ: 'Universitas Indonesia',
        avatar: '/images/team/darren@2x.png',
        badge: 'red.500'
    },
    {
        id: 2,
        name: 'Mirsa Salsabila',
        univ: 'Universitas Indonesia',
        avatar: '/images/team/mirsa@2x.png',
        badge: 'red.500'
    },
    {
        id: 3,
        name: 'Deddy Romnan R.',
        univ: 'Universitas Jambi',
        avatar: '/images/team/deddy@2x.png',
        badge: 'green.500'
    },
    {
        id: 4,
        name: 'Rivano Ardiyan T. K.',
        univ: 'UPN "Veteran" Yogyakarta',
        avatar: '/images/team/rivano@2x.png',
        badge: 'green.500'
    },
    {
        id: 5,
        name: 'Kenrick Tandrian',
        univ: 'Universitas Pelita Harapan',
        avatar: '/images/team/kenrick@2x.png',
        badge: 'blue.500'
    },
    {
        id: 6,
        name: 'Kenji Marwies',
        univ: 'Universitas Pelita Harapan',
        avatar: '/images/team/kenji@2x.png',
        badge: 'blue.500'
    },
]

const OurTeam = () => {
    return (
        <Flex py='6rem' px='3rem' flexDir='column' bgGradient={useColorModeValue('linear(to-r, gray.100, gray.50)', 'linear(to-r, gray.900, gray.700)')} id='team'>
            <Flex justifyContent='space-between' mb={'5rem'} mx={{ base: 0, md: '3rem' }} flexDir={{ base: 'column', md: 'row' }} gap={4}>
                <Heading textAlign='center' color={useColorModeValue('blackAlpha.900', 'white')}>Meet Our Team!</Heading>
                <Flex justifyContent={['center', 'center', 'flex-start']} gap={[4, 5, 6]}>
                    <Image draggable={false} h={[10, 12, 14]} src='/images/logo-ui.png' alt='Logo UI'/>
                    <Image draggable={false} h={[10, 12, 14]} src='/images/logo-unja_.png' alt='Logo UNJA'/>
                    <Image draggable={false} h={[10, 12, 14]} src='/images/logo-upnvy_.png' alt='Logo UPNVY'/>
                    <Image draggable={false} h={[10, 12, 14]} src='/images/logo-uph.png' alt='Logo UPH'/>
                </Flex>
            </Flex>
            <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)',  xl: 'repeat(6, 1fr)' }} gap={8}>
                { teamData.map(data => {
                    return (
                        <Flex key={data.id} flexDir='column' alignItems='center' gap={8}>
                            <Avatar name={data.name} size='xl' src={data.avatar}>
                                <AvatarBadge boxSize='0.8em' bg={data.badge} borderWidth='0.12em' />
                            </Avatar>
                            <Flex flexDir='column' gap={2} alignItems='center'>
                                <Heading size={{ base: 'sm', md: 'md' }} textAlign='center'>{data.name}</Heading>
                                <Text fontSize={{ base: 'xs', md: 'sm' }} textAlign='center'>{data.univ}</Text>
                            </Flex>
                        </Flex>
                    )
                })}
            </Grid>
        </Flex>
    )
}

export default OurTeam;