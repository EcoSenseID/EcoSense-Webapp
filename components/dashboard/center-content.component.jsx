import React from "react";
import Image from "next/image";

import { Flex, Heading } from "@chakra-ui/react";

import classes from './center-content.module.scss';

const CenterContent = () => {
	return (
		<Flex w='55%' p='3%' bgColor='#ffffff' flexDir='column' overflow='auto' minH='100vh'>
			<Heading 
				fontWeight='normal' 
				mb={4} 
				letterSpacing='tight'
			>Welcome back, <Flex fontWeight='bold' display='inline-flex'>Ken!</Flex>
			</Heading>
		</Flex>
	);
}

export default CenterContent;