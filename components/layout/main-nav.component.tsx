import React, { useContext } from "react";
import * as router from 'next/router';
import Link from "next/link";

import Logo from "./logo.component";

import { AuthContext } from "../../firebase/context";
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    useDisclosure,
    useColorMode,
    Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FiBell, FiBox, FiHome, FiLayers, FiUsers, FiLogIn, FiLayout } from "react-icons/fi";
import { IconType } from "react-icons";

interface NavItem {
    icon?: IconType;
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

export const NAV_ITEMS: Array<NavItem> = [
    {
        icon: FiBox,
        label: 'Our Partners',
        href: '/#partners',
    },
    {
        icon: FiBell,
        label: 'Campaigns',
        href: '/#campaigns',
    },
    {
        icon: FiLayers,   
        label: 'Features',
        href: '/#features',
    },
    {
        icon: FiUsers,
        label: 'Our Team',
        href: '/#team',
    },
];

const MainNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const nextrouter = router.useRouter();
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const isLoginSignup = nextrouter.asPath == '/login' || nextrouter.asPath == '/signup';

    const DesktopNav = () => {
        const linkColor = useColorModeValue('gray.600', 'gray.200');
        const linkHoverColor = useColorModeValue('gray.800', 'white');
      
        return (
          <Stack direction={'row'} spacing={{ base: 4, lg: 8 }}>
            { NAV_ITEMS.map((navItem) => (
              <Flex key={navItem.label} alignItems='center'>
                <Link href={navItem.href ?? '#'}>
                    <Text 
                        color={linkColor} 
                        _hover={{
                            textDecoration: 'none',
                            color: linkHoverColor,
                        }}
                        cursor='pointer'
                    > {navItem.label} </Text>
                </Link>
              </Flex>
            ))}
          </Stack>
        );
    };
      
    const MobileNav = () => {
        return (
          <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            { NAV_ITEMS.map((navItem) => (
              <MobileNavItem key={navItem.label} {...navItem} />
            ))}
          </Stack>
        );
    };
      
    const MobileNavItem = ({ icon, label, href }: NavItem) => {
        return (
          <Stack onClick={onToggle} alignItems='center' direction='row' spacing={4} px={4} py={2} borderBottomWidth={1} cursor='pointer'>
            <Icon as={icon || FiHome}></Icon>
            <Flex as={Link} href={href ?? '#'} >
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}> {label} </Text>
            </Flex>
          </Stack>
        );
    };
      
    
    
    return (
        <Box>
            <Flex
                as={'nav'} 
                bgGradient={useColorModeValue('linear(to-tr, green.50, green.50)', 'linear(to-l, gray.700, gray.700)')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'100px'}
                py={{ base: 2 }}
                px={{ base: '5%' }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: (isLoginSignup ? 'none' : 'flex'), md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>

                <Flex flex={{ base: 1, md: 'auto' }} justify={{ base: isLoginSignup ? 'start' : 'center', md: 'start' }}>
                    <Link href='/'><a><Logo /></a></Link>

                    <Flex display={isLoginSignup ? 'none' : 'flex'}>
                        <Flex display={{ base: 'none', md: 'flex' }} ml={10}><DesktopNav /></Flex>
                    </Flex>
                </Flex>

                <Stack
                    justify={'flex-end'}
                    direction={'row'}
                    flex={{ base: 1, md: 'auto' }}
                    gap={3}
                >
                    <Button onClick={toggleColorMode} display={{ base: isLoginSignup ? 'flex' : 'none', md: 'flex' }} boxShadow='md' bgColor={useColorModeValue('white', 'gray.600')}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    <Flex display={isLoginSignup ? 'none' : 'flex'}>
                        <Button bgColor='#5EDA78' color='#2a2a2a' boxShadow='md'>
                        {
                            isAuthenticated ?
                            <Link href='/dashboard'>
                                <Flex alignItems='center'>
                                    <Icon as={FiLayout}></Icon>
                                    <Text ml={3} display={{ base: 'none', md: 'flex' }}>Dashboard</Text>
                                </Flex>
                            </Link> :
                            <Link href='/login'>
                                <Flex alignItems='center'>
                                    <Icon as={FiLogIn}></Icon>
                                    <Text ml={3} display={{ base: 'none', md: 'flex' }}>Log In</Text>
                                </Flex>
                            </Link>
                        }
                        </Button>
                    </Flex>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity><MobileNav /></Collapse>
        </Box>
    );
}

export default MainNavigation;