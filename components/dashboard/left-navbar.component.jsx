import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../firebase/context";

import { 
	Avatar, 
	Button, 
	Flex, 
	Text, 
	Image, 
	AlertDialog, 
	AlertDialogOverlay, 
	AlertDialogContent, 
	AlertDialogHeader, 
	AlertDialogBody, 
	AlertDialogFooter,
	useDisclosure
} from "@chakra-ui/react";
import {
	FiHome,
	FiPieChart,
	FiUser,
	FiBox,
	FiLogOut
} from 'react-icons/fi'

import { logOutFirebase } from "../../firebase/firebase.util";

import classes from "./left-navbar.module.scss";
import NavItem from "./left-navbar/leftnav-item.component";

const LeftNavbar = ({ page }) => {
	const router = useRouter();
	const { user } = useContext(AuthContext);
	const [userPhoto, setUserPhoto] = useState('https://randomuser.me/api/portraits/men/1.jpg');
	const [userName, setUserName] = useState('User');
	const { isOpen, onOpen, onClose } = useDisclosure()
  	const cancelRef = React.useRef()

	useEffect(() => {
		if(user && user.photoURL) setUserPhoto(user.photoURL);
		if(user && user.displayName) setUserName(user.displayName);
	}, [user]);

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
			w={['100%', '100%', '10%', '15%', '15%']}
			flexDir='column'
			alignItems='center'
			backgroundImage='rgba(2, 15, 4, .75)'
			color='#fff'
			className={classes.leftnav_cont}
		>
			<Flex flexDir='column' justifyContent='space-between' height={[null, null, '100vh']}>
				<Flex flexDir='column' as='nav'>
					<Image src='/images/EcoSense LogoType@2x.png' alt='Logo EcoSense' mt={50}
						mb={[25, 50, 100]} alignSelf='center' 
						width={['150px', '150px', '0', '100px', '140px']}
						display={['inline-flex', 'inline-flex', 'none', 'inline-flex', 'inline-flex']} />
					<Image src='/images/EcoSense-logo-png.png' alt='Logo EcoSense' mt={50}
						mb={[25, 50, 100]} alignSelf='center' 
						width={['0', '0', '50%', '0', '0']}
						display={['none', 'none', 'inline-flex', 'none', 'none']} />
					<Flex 
						flexDir={['row', 'row', 'column', 'column', 'column']} 
						align={['center', 'center', 'center', 'flex-start', 'flex-start']} 
						justifyContent='center' gap={'1.2rem'}
					>
						<NavItem navUrl='/' iconName={FiHome} navName='Home' isActive={page === 'dashboard'} />
						<NavItem navUrl='/campaigns' iconName={FiBox} navName='Campaigns' isActive={page === 'campaigns'} />
						<NavItem navUrl='/data' iconName={FiPieChart} navName='Data' isActive={page === 'data'} />
						<NavItem navUrl='/profile' iconName={FiUser} navName='Profile' isActive={page === 'profile'} />
					</Flex>
				</Flex>
				<Flex flexDir={['row', 'row', 'column', 'column', 'column']} alignItems='center' mb={10} mt={5} justifyContent='center' align='center'>
					<Flex flexDir='column' alignItems='center' >
						<Avatar my={2} src={userPhoto}/>
						<Text as="div" display={['none', 'none', 'none', 'none', 'inline-flex']} textAlign='center'>{userName}</Text>
					</Flex>
					<Button rightIcon={<FiLogOut />} onClick={onOpen} colorScheme='red' mt={[0, 0, 4, 4, 4]} ml={[4, 4, 0, 0, 0]} variant='outline'>
						<Text display={['inline-flex', 'inline-flex', 'none', 'none', 'inline-flex']}>Log Out</Text>
					</Button>
					<AlertDialog
						isOpen={isOpen}
						leastDestructiveRef={cancelRef}
						onClose={onClose}
					>
						<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader fontSize='lg' fontWeight='bold'>Log Out</AlertDialogHeader>
							<AlertDialogBody>Are you sure you want to log out?</AlertDialogBody>

							<AlertDialogFooter>
								<Button ref={cancelRef} onClick={onClose}>
									Go Back
								</Button>
								<Button colorScheme='red' onClick={handleLogOut} ml={3}>
									Log Out
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
						</AlertDialogOverlay>
					</AlertDialog>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default LeftNavbar;