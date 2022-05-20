import React from "react";
import { Flex } from '@chakra-ui/react';

import classes from './dashboard-cont.module.scss';

const DashboardContainer = ({children}) => {
    return (
        <Flex 
            className={classes.dashboard_bg}
            h={[null, null, '100vh']}
            flexDir={['column', 'column', 'row']} 
            overflow='hidden' 
            maxW='2000px'
        >
            {children}
        </Flex>
    )
}

export default DashboardContainer;