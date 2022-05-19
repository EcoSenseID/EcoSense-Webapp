import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Avatar, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import {
	FiHome,
	FiPieChart,
	FiDollarSign,
	FiBox
} from 'react-icons/fi'

import { logOutFirebase } from "../../firebase/firebase.util";

import classes from "./left-navbar.module.scss";

const LeftNavbar = () => {
	const router = useRouter();

	const handleLogOut = async () => {
        const res = await logOutFirebase();
        if (res.status == 200) {
            router.push('/');
        } else {
            alert(res.message);
        }
    }

	return (
		<Flex
			w='15%'
			flexDir='column'
			alignItems='center'
			backgroundColor='rgba(2, 15, 4, .75)'
			color='#fff'
		>
			<Flex flexDir='column' justifyContent='space-between' height='100vh'>
				<Flex flexDir='column' as='nav'>
					<Heading
						mt={50}
						mb={100}
						fontSize='4xl'
						alignSelf='center'
						letterSpacing='tight'
					>Eco.</Heading>
					<Flex flexDir='column' align='flex-start' justifyContent='center'>
						<Flex className={classes.sidebar_items}>
							<Link href='/'>
								<Icon as={FiHome} fontSize='2xl' className={classes.active_icon} />
							</Link>
							<Link href='' _hover={{ textDecor: 'none' }}>
								<Text className={classes.active}>Home</Text>
							</Link>
						</Flex>
						<Flex className={classes.sidebar_items}>
							<Link href='/'>
								<Icon as={FiPieChart} fontSize='2xl' />
							</Link>
							<Link href='' _hover={{ textDecor: 'none' }}>
								<Text>Data</Text>
							</Link>
						</Flex>
						<Flex className={classes.sidebar_items}>
							<Link href='/'>
								<Icon as={FiDollarSign} fontSize='2xl' />
							</Link>
							<Link href='' _hover={{ textDecor: 'none' }}>
								<Text>Donation</Text>
							</Link>
						</Flex>
						<Flex className={classes.sidebar_items}>
							<Link href='/'>
								<Icon as={FiBox} fontSize='2xl' />
							</Link>
							<Link href='' _hover={{ textDecor: 'none' }}>
								<Text>Campaigns</Text>
							</Link>
						</Flex>
					</Flex>
				</Flex>
				<Flex flexDir='column' alignItems='center' mb={10} mt={5}>
					<Avatar my={2} src={'https://randomuser.me/api/portraits/men/1.jpg'}/>
					<Text textAlign='center'>Ken Tandrian</Text>
					<Button onClick={handleLogOut} colorScheme='red' mt={4} variant='outline'>Log Out</Button>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default LeftNavbar;