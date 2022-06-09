import { As, Flex, Heading, Icon, Link } from "@chakra-ui/react"

import classes from './leftnav-item.module.scss';

type NavItemProps = {
    navUrl: string,
    iconName: As<any> | undefined,
    navName: string,
    isActive: any
}

const NavItem = ({ navUrl, iconName, navName, isActive }: NavItemProps) => {
    return (
        <Link _hover={{ textDecor: 'none' }} href={'/dashboard' + navUrl} >
            <Flex className={classes.sidebar_items} gap={4} alignItems='center'>
                <Flex display={['center', 'center', 'center', 'flex-start', 'flex-start']}>
                    <Icon as={iconName} fontSize='2xl' className={isActive && `${classes.active_icon}`} display={['none', 'none', 'flex', 'flex', 'flex']}/>
                </Flex>
                <Flex display={['flex', 'flex', 'none', 'flex', 'flex']}>
                    <Heading fontSize='lg' className={isActive && `${classes.active}`} fontWeight='normal'>{navName}</Heading>
                </Flex>
            </Flex>
        </Link>
    )
}

export default NavItem;