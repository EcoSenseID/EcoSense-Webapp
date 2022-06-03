import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import classes from './category-box.module.scss';

type CategoryBoxProps = {
    data: any
}

const CategoryBox = ({ data }: CategoryBoxProps) => {
    const { name, photoUrl, colorHex } = data;

    return (
        <Flex bgColor='white' borderRadius={10} bgImage={photoUrl} className={classes.categoryBox}>
            <Flex w={8} borderLeftRadius={10} bgColor={colorHex}></Flex>
            <Flex p={3} color='white'>
                <Text fontWeight={500}>{name}</Text>
            </Flex>
        </Flex>
    )
}

export default CategoryBox;