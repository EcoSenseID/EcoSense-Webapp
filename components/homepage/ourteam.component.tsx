import { Avatar, AvatarBadge, Flex, Grid, Heading, Text, useColorModeValue, Image, Icon } from '@chakra-ui/react';
import React from 'react';
import { SiAndroid } from 'react-icons/si';

const teamData = [
    {
        id: 1,
        name: 'Darren Ngoh',
        univ: 'Universitas Indonesia',
        avatar: '/images/team/darren@2x.webp',
        badge: '#FF6F00',
        image: '/images/logos/google-tensorflow.svg'
    },
    {
        id: 2,
        name: 'Mirsa Salsabila',
        univ: 'Universitas Indonesia',
        avatar: '/images/team/mirsa@2x.webp',
        badge: '#FF6F00',
        image: '/images/logos/google-tensorflow.svg'
    },
    {
        id: 3,
        name: 'Deddy Romnan R.',
        univ: 'Universitas Jambi',
        avatar: '/images/team/deddy@2x.webp',
        badge: '#3DDC84',
        icon: SiAndroid
    },
    {
        id: 4,
        name: 'Rivano Ardiyan T. K.',
        univ: 'UPN "Veteran" Yogyakarta',
        avatar: '/images/team/rivano@2x.webp',
        badge: '#3DDC84',
        icon: SiAndroid
    },
    {
        id: 5,
        name: 'Kenrick Tandrian',
        univ: 'Universitas Pelita Harapan',
        avatar: '/images/team/kenrick@2x.webp',
        badge: 'blue.500',
        image: '/images/logos/google-cloud.svg'
    },
    {
        id: 6,
        name: 'Kenji Marwies',
        univ: 'Universitas Pelita Harapan',
        avatar: '/images/team/kenji@2x.webp',
        badge: 'blue.500',
        image: '/images/logos/google-cloud.svg'
    },
]

const OurTeam = () => {
    const badgeColor = useColorModeValue('white', 'gray.800');

    return (
        <Flex py='6rem' px='3rem' flexDir='column' bgGradient={useColorModeValue('linear(to-r, gray.100, gray.50)', 'linear(to-r, gray.900, gray.700)')} id='team'>
            <Flex justifyContent='space-between' mb={'5rem'} mx={{ base: 0, md: '3rem' }} flexDir={{ base: 'column', md: 'row' }} gap={4}>
                <Heading textAlign='center' color={useColorModeValue('blackAlpha.900', 'white')}>Meet Our Team!</Heading>
                <Flex justifyContent={['center', 'center', 'flex-start']} gap={[4, 5, 6]}>
                    <Image draggable={false} h={[10, 12, 14]} src='/images/logos/logo-ui.png' alt='Logo UI'/>
                    <Image draggable={false} h={[10, 12, 14]} src='/images/logos/logo-unja_.png' alt='Logo UNJA'/>
                    <Image draggable={false} h={[10, 12, 14]} src='/images/logos/logo-upnvy_.png' alt='Logo UPNVY'/>
                    <Image draggable={false} h={[10, 12, 14]} src='/images/logos/logo-uph.png' alt='Logo UPH'/>
                </Flex>
            </Flex>
            <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)',  xl: 'repeat(6, 1fr)' }} gap={8}>
                { teamData.map(data => {
                    return (
                        <Flex key={data.id} flexDir='column' alignItems='center' gap={8}>
                            <Avatar name={data.name} size='xl' src={data.avatar}>
                                <AvatarBadge as={Flex} boxSize='0.9em' bg={badgeColor} borderColor={badgeColor}>
                                    { data.icon && <Icon as={data.icon} color={data.badge} w={5} h={5} />}
                                    { data.image && <Image draggable={false} src={data.image} alt='Logo' w={5} h={5} />}
                                </AvatarBadge>
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