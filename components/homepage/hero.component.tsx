import React from "react";
// import Image from "next/image";

import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';
import Link from "next/link";

const Hero = () => {
    return (
        <Stack minH={'90vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bgGradient: useColorModeValue('linear(to-r, green.300, green.200)', 'linear(to-r, green.700, green.600)'),
                                zIndex: -1,
                            }}
                        > The Best Partner </Text>
                        <br />
                        <Text color={useColorModeValue('green.400', 'green.300')} as={'span'}>for Green Activists and Ecologists.</Text>
                    </Heading>
                    <Text fontSize={{ base: 'md', md:'lg', lg: 'xl' }} color={'gray.500'}>
                        Save Earth, Save Lives.<br />
                        Find the best environmental campaigns and detect your plant problems here!
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <Button bg={'green.400'} color={'white'} _hover={{ bg: 'green.500' }}>
                            <Link href={'#campaigns'}>Join Campaigns</Link>
                        </Button>
                        <Button>
                            <Link href={'#features'}>See Features</Link>
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1} >
                <Flex my={{ base: 5, md: 20 }} mx={{ base: 5, md: '40px' }} mb={{ base: 10 }} maxW={1000} maxH={1000}>
                    <Image
                        alt={'Main Page Plant'}
                        objectFit={'cover'}
                        src={'/images/jan-kopriva-OHo8ST9kugw-unsplash.webp'}
                        borderRadius={20}
                    />
                </Flex>
            </Flex>
        </Stack>
    )
}

export default Hero;