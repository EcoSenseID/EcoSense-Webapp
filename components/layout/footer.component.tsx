import React from 'react';
// import Image from 'next/image';
// import { IoLogoFacebook, IoLogoTwitter, IoMail, IoLogoYoutube, IoLogoInstagram } from "react-icons/io5";

// import classes from './footer.module.scss';
import { 
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VisuallyHidden,
    chakra,
    useColorModeValue,
    Image,
    Heading,
    Flex, 
} from '@chakra-ui/react';
import { FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { NAV_ITEMS } from './main-nav.component';

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading fontWeight={'700'} fontSize={'lg'} mb={2}>
      {children}
    </Heading>
  );
};

const SocialButton = ({ children, label, href,}: { children: React.ReactNode; label: string; href: string; }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer = () => {
    return (
        <Box
            bgGradient={useColorModeValue('linear(to-b, green.100, green.50)', 'linear(to-l, gray.900, gray.900)')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Container as={Stack} maxW={'7xl'} py={14} px={{ base: 14, md: 4 }}>
                <SimpleGrid templateColumns={{ base: '1fr', md: '5fr 2fr 3fr', lg: '4fr 1fr 2fr', xl: '4fr 1fr 1fr' }} minChildWidth='unset' gap={{ base: 8, md: 16 }}>
                    <Stack spacing={6} flex={1}>
                        <Box>
                            <Image 
                                src={useColorModeValue(`/images/EcoSense LogoType-1@2x.png`, `/images/EcoSense LogoType@2x.png`)} 
                                height={'80px'} 
                                alt={'Logo EcoSense'}
                            />
                        </Box>
                        <Text fontSize={{ base: 'sm', md: 'md' }}>
                            Creating a bridge for environmental activists in raising awareness about environmental health problems to the general public and to help them implement an environmentally friendly lifestyle more effectively and efficiently together.
                        </Text>
                    </Stack>
                    <Stack align={'flex-start'} flex={1} display={{ base: 'none', md: 'flex' }}>
                        <ListHeader>EcoSense</ListHeader>
                        { NAV_ITEMS.map((data) => <Link key={data.label} href={data.href}>{data.label}</Link>)}
                    </Stack>

                    <Stack align={'flex-start'} flex={1}>
                        <ListHeader>Try EcoSense Now!</ListHeader>
                        <Flex gap={{ base: 4, md: 2 }} flexDir={{ base: 'row', md: 'column' }}>
                            <Image w={{ base: 100, sm: 150, md: 200 }} draggable='false' src='/images/app-store-badge.png' alt='App Store'/>
                            <Image w={{ base: 100, md: 200 }} draggable='false' src='/images/play-store-badge.png' alt='Play Store' />
                        </Flex>
                    </Stack>
                </SimpleGrid>
            </Container>

            <Box
                borderTopWidth={1.5}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.300', 'gray.700')}
                pb={2}
                px={{ base: 10, md: 4 }}
            >
                <Container
                    as={Stack}
                    maxW={'7xl'}
                    py={8}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ md: 'space-between' }}
                    align={{ md: 'center' }}
                >
                    <Text textAlign={{ base: 'center', md: 'left' }} fontSize={{ base: 'xs', md: 'md' }}>© 2022 EcoSense - Bangkit Academy 2022. All rights reserved</Text>
                    <Stack direction={'row'} spacing={6} justifyContent='center'>
                        <SocialButton label={'Twitter'} href={'#'}>
                        <FaTwitter />
                        </SocialButton>
                        <SocialButton label={'Email'} href={'mailto:ecosense.id@gmail.com'}>
                        <FaEnvelope />
                        </SocialButton>
                        <SocialButton label={'Instagram'} href={'#'}>
                        <FaInstagram />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}

export default Footer;