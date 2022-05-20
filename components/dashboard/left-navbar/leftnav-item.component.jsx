import { Flex, Icon, Link, Text } from "@chakra-ui/react"

import classes from './leftnav-item.module.scss';

const NavItem = ({ navUrl, iconName, navName, isActive }) => {
    return (
        <Link _hover={{ textDecor: 'none' }} href={'/dashboard'+navUrl} >
            <Flex className={classes.sidebar_items}>
                <Flex display={['center', 'center', 'center', 'flex-start', 'flex-start']}>
                    <Icon as={iconName} fontSize='2xl' className={isActive && `${classes.active_icon}`} display={['none', 'none', 'flex', 'flex', 'flex']}/>
                </Flex>
                <Flex display={['flex', 'flex', 'none', 'flex', 'flex']}>
                    <Text className={isActive && `${classes.active}`} fontWeight='normal'>{navName}</Text>
                </Flex>
            </Flex>
        </Link>
    )
}

export default NavItem;