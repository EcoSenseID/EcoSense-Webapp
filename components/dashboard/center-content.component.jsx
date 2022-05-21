import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../firebase/context";

import { Divider, Flex, Heading, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FiCalendar, FiChevronUp, FiChevronDown } from 'react-icons/fi';

import classes from './center-content.module.scss';
import ChartOne from "./center-content/chart-one.component";

import { tableDummyData } from "./center-content/table-rows.data";
import TableRow from "./center-content/table-row.component";

const CenterContent = () => {
	const [display, setDisplay] = useState('hide');
	const { currentUser } = useContext(AuthContext);

	const [firstName, setFirstName] = useState('User');
	useEffect(() => {
		if(currentUser && currentUser.displayName) setFirstName(currentUser.displayName.split(' ')[0]);
	}, [currentUser]);

	return (
		<Flex w={['100%', '100%', '60%', '60%', '55%']} p={['6%', '6%', '3%', '3%', '3%']} bgColor='#ffffff' flexDir='column' overflow='auto' minH='100vh'>
			<Heading as="div" 
				fontWeight='normal' 
				mb={4} 
				letterSpacing='tight'
			>Welcome back, <Flex as={'span'} fontWeight='bold' display='inline-flex'>{firstName}!</Flex>
			</Heading>
			<ChartOne />
			<Flex justifyContent='space-between' mt={8}>
				<Flex alignItems='flex-end'>
					<Heading as='h2' size='lg' letterSpacing='tight' lineHeight='90%'>New Participants</Heading>
					<Text fontSize='small' color='gray' ml={4}>May 20, 2022</Text>
				</Flex>
				<IconButton icon={<FiCalendar />} />
			</Flex>
			<Flex flexDir='column'>
				<Flex overflow='auto'>
					<Table variant='unstyled' mt={4}>
						<Thead>
							<Tr color='gray'>
								<Th>Participant Name</Th>
								<Th>Campaign Name</Th>
								<Th isNumeric>Date Joined</Th>
								<Th isNumeric>Task Finished</Th>
							</Tr>
						</Thead>
						<Tbody>
							{display == 'show' ?
								<>
									{tableDummyData.map((data) => (
										<TableRow key={data.id} {...data} />
									))}
								</> :
								<>
									{tableDummyData.slice(0, 3).map((data) => (
										<TableRow key={data.id} {...data} />
									))}
								</>
							}
						</Tbody>
					</Table>
				</Flex>
				<Flex alignItems='center'>
					<Divider />
					<IconButton icon={display == 'show' ? <FiChevronUp /> : <FiChevronDown />} 
						onClick={() => display == 'show' ? setDisplay('hide') : setDisplay('show')}
					/>
					<Divider />
				</Flex>
			</Flex>
		</Flex>
	);
}

export default CenterContent;