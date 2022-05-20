import React, { useState } from "react";

import { Avatar, Flex, Heading, Td, Text, Tr } from "@chakra-ui/react";

const TableRow = ({ imgSrc, name, nationality, campaign, dateJoined, taskFinished }) => {
    return (
        <Tr>
            <Td>
                <Flex align='center'>
                    <Avatar src={imgSrc}/>
                    <Flex flexDir='column' ml={4}>
                        <Heading size='sm' letterSpacing='tight'>{name}</Heading>
                        <Text fontSize='sm' color='gray'>{nationality}</Text>
                    </Flex>
                </Flex>
            </Td>
            <Td>{campaign}</Td>
            <Td isNumeric>{dateJoined}</Td>
            <Td isNumeric>{taskFinished} tasks</Td>
        </Tr>
    );
}

export default TableRow;