import { Flex } from "@chakra-ui/react";
import React from "react";

import classes from './aside-content.module.scss';

const AsideContent = () => {
    return (
        <Flex w='35%' bgColor='#f5f5f5' p='3%' flexDir='column' overflow='auto'>
            Welcome to Your Dashboard Content!
        </Flex>
    )
}

export default AsideContent;