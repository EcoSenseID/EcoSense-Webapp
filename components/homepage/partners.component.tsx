import React from "react";
import { Flex, Grid, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

const SupportedBy = () => {
    return (
        <Flex 
            minH={100} 
            bgGradient={useColorModeValue('linear(to-r, green.100, green.50)', 'linear(to-r, green.100, green.50)')} 
            px={['10px', '10px', '70px', '120px', '140px']} 
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
            <Grid gap={[4, 6, 12]} templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} alignItems='center' justifyItems='center'>
                <Image draggable={false} h={[6, 8, 10]} src='/images/google-logo.png' alt='Logo Google'/>
                <Image draggable={false} h={[5, 7, 9]} src='/images/logo-bangkit.png' alt='Logo Bangkit'/>
                <Image draggable={false} h={[10, 12, 14]} src='/images/km.png' alt='Logo Kampus Merdeka'/>
                <Link href={'https://genbinesia.or.id/'}>
                    <a target='_blank'><Image draggable={false} h={[6, 8, 10]} src='/images/genbinesia.png' alt='Logo Genbinesia' cursor='pointer' /></a>
                </Link>
            </Grid>
        </Flex>
    );
}

export default SupportedBy;