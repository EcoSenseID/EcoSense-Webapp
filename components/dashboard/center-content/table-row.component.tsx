import React from "react";

import { Avatar, Flex, Heading, Td, Text, Tr } from "@chakra-ui/react";

type TableRowProps = {
    data: {
        categories: Array<any>,
        description: string,
        endDate: string,
        id: number,
        isNew: boolean,
        isTrending: boolean,
        participantsCount: number,
        posterUrl: string,
        startDate: string,
        tasks: Array<any>,
        title: string
    }
}

const TableRow = ({ data }: TableRowProps) => {
    const dateOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: 'short', day: 'numeric' };
    return (
        <Tr>
            <Td>
                <Flex align='center'>
                    <Avatar src={data.posterUrl}/>
                    <Flex flexDir='column' ml={4}>
                        <Heading size='sm' letterSpacing='tight'>{data.title}</Heading>
                        <Text fontSize='sm' color='gray'>
                            {(new Date(data.startDate)).toLocaleDateString('en-US', dateOptions)} - {(new Date(data.endDate)).toLocaleDateString('en-US', dateOptions)}
                        </Text>
                    </Flex>
                </Flex>
            </Td>
            <Td>{data.categories.map(category => category.name).join(', ')}</Td>
            <Td isNumeric>{data.tasks.length}</Td>
            <Td isNumeric>{data.participantsCount}</Td>
        </Tr>
    );
}

export default TableRow;