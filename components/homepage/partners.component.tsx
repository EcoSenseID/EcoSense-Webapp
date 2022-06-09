import React from "react";
import { Flex, Grid, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

const SupportedBy = () => {
    return (
        <Flex 
            minH={100} 
            bgGradient={useColorModeValue('linear(to-r, green.100, green.50)', 'linear(to-r, green.100, green.50)')} 
            px={{ base: '10px', md: '60px', lg: '120px' }} 
            py='60px' 
            justifyContent='space-between' 
            alignItems='center'
            gap={8}
            flexDir={{ base: 'column', lg: 'row' }}
            id='partners'
        >
            <Flex>
                <Heading color={'green.700'}>Our Partners</Heading>
            </Flex>
            <Grid gap={[4, 4, 10]} templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }} alignItems='center' justifyItems='center'>
                <Image draggable={false} h={[6, 7, 10]} src='/images/logos/google-logo.png' alt='Logo Google'/>
                <Image draggable={false} h={[5, 6, 9]} src='/images/logos/logo-bangkit.png' alt='Logo Bangkit'/>
                <Image draggable={false} h={[8, 10, 14]} src='/images/logos/km.png' alt='Logo Kampus Merdeka'/>
                <Link href={'https://genbinesia.or.id/'}>
                    <a target='_blank'><Image draggable={false} h={[6, 7, 10]} src='/images/logos/genbinesia.png' alt='Logo Genbinesia' cursor='pointer' /></a>
                </Link>
            </Grid>
        </Flex>
    );
}

export default SupportedBy;