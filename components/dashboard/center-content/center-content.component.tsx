import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../firebase/context";

import { Button, Divider, Flex, Heading, Link, Skeleton, SkeletonCircle, SkeletonText, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FiArrowRight } from 'react-icons/fi';

import TableRow from "./table-row.component";

type CenterContentProps = {
	campaigns: Array<any>,
	campaignsIsLoading: boolean
}

const CenterContent = ({ campaigns, campaignsIsLoading }: CenterContentProps) => {
	const { currentUser } = useContext(AuthContext);
    const dateOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: 'short', day: 'numeric' };

	const [firstName, setFirstName] = useState('User');
	useEffect(() => {
		if(currentUser && currentUser.displayName) setFirstName(currentUser.displayName.split(' ')[0]);
	}, [currentUser]);

	console.log(campaigns);

	return (
		<Flex w={['100%', '100%', '60%', '60%', '55%']} p={['10%', '6%', '3%', '3%', '3%']} bgColor='#ffffff' flexDir='column' overflow='auto' minH='100vh'>
			<Heading as="div" fontWeight='normal' mb={4} letterSpacing='tight'>
				Welcome back, <Flex as={'span'} fontWeight='bold' display='inline-flex'>{firstName}!</Flex>
			</Heading>

			<Flex justifyContent='space-between' alignItems='center' mt={8} mb={4}>
				<Flex alignItems='flex-end'>
					<Heading as='h2' size='lg' letterSpacing='tight' lineHeight='90%'>Your Campaigns</Heading>
					<Text fontSize='small' color='gray' ml={4}>per { (new Date()).toLocaleDateString('en-US', dateOptions) }</Text>
				</Flex>
				<Link href="/dashboard/campaigns" style={{ textDecoration: 'none' }}>
                    <Button rightIcon={<FiArrowRight />} colorScheme='blackAlpha' bgColor='#034b15' color='#fff' borderRadius={8} aria-label={""}>More</Button>
                </Link>
			</Flex>
			<Flex flexDir='column'>
				<Flex overflow='auto' flexDir='column'>
					<Table variant='unstyled' mt={4}>
						<Thead>
							<Tr color='gray'>
								<Th>Campaign Name</Th>
								<Th>Categories</Th>
								<Th isNumeric>Number of Tasks</Th>
								<Th isNumeric>Participant Count</Th>
							</Tr>
						</Thead>
						{ campaignsIsLoading ? 
							Array.from({ length: 5 }, (_, _i) =>
								<Tbody>
									<Tr minH='80px'>
										<Td><Flex align='center'>
											<SkeletonCircle minH='48px' minW='48px'/>
											<Flex flexDir='column' ml={4} flex={1} gap={2}>
												<Skeleton height={2} width='100%'/>
												<Skeleton height={2} width='100%' />
											</Flex>
										</Flex></Td>
										<Td><SkeletonText noOfLines={1} /></Td>
										<Td><SkeletonText noOfLines={1} /></Td>
										<Td><SkeletonText noOfLines={1} /></Td>
									</Tr>
								</Tbody>
							) :
							<Tbody>
								{campaigns.map((data) => (
									<TableRow key={data.id} data={data} />
								))}
							</Tbody>
						}
					</Table>
					<Divider />
				</Flex>
			</Flex>
		</Flex>
	);
}

export default CenterContent;