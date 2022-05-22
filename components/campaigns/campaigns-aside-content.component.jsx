import React from "react"
import { Flex, Heading } from "@chakra-ui/react"

const CampaignsAsideContent = () => {
    return(
        <Flex w={['100%', '100%', '30%']} minW={[null, null, '300px', '300px', '400px']} bgColor='#f5f5f5' p='3%' flexDir='column' overflow='auto'>
            <Heading as="div" 
				fontWeight='normal' 
				mb={10} 
				letterSpacing='tight'
			>My <Flex as={'span'} fontWeight='bold' display='inline-flex'>Campaigns</Flex>
			</Heading>
            
        </Flex>
    )
}

export default CampaignsAsideContent;