import { Flex, Grid, Heading, IconButton, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import CampaignCard from "./campaign-card.component";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from './campaigns.module.scss';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type CampaignsProps = {
    campaigns: Array<any>
}

const Campaigns = ({ campaigns }: CampaignsProps) => {
    const campaignsData = campaigns;
    const [currentOrder, setCurrentOrder] = useState(0);
    
    return (
        <Flex className={classes.campaigns_bg} bgGradient={useColorModeValue('linear(to-b, gray.100, gray.50)', 'linear(to-r, gray.900, gray.700)')} id='campaigns'>
            <Heading className={classes.section_title} color={useColorModeValue('blackAlpha.900', 'white')}>Join the Campaigns!</Heading>
            <Flex display={{ base: 'none', xl: 'grid' }} >
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)' ,'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={8}>
                    {
                        campaignsData.slice(currentOrder, currentOrder+3).map((data) => (
                            <CampaignCard key={data.id} {...data} />
                        ))
                    }
                </Grid>
                <Flex gap={5} justifyContent='center' mt={5}>
                    <IconButton 
                        disabled={currentOrder === 0 ? true : false} 
                        icon={<FiArrowLeft />} 
                        aria-label={""} 
                        left={0} top={0} 
                        onClick={() => setCurrentOrder(currentOrder - 1)}
                    />
                    <IconButton 
                        disabled={currentOrder === campaignsData.length-3 ? true : false} 
                        icon={<FiArrowRight />} 
                        aria-label={""} 
                        right={0} top={0}
                        onClick={() => setCurrentOrder(currentOrder + 1)}
                    />
                </Flex>
            </Flex>
            <Flex display={{ base: 'none', md: 'grid', xl: 'none' }} >
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)' ,'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={8}>
                    {
                        campaignsData.slice(currentOrder, currentOrder+2).map((data) => (
                            <CampaignCard key={data.id} {...data} />
                        ))
                    }
                </Grid>
                <Flex gap={5} justifyContent='center' mt={5}>
                    <IconButton 
                        disabled={currentOrder === 0 ? true : false} 
                        icon={<FiArrowLeft />} 
                        aria-label={""} 
                        left={0} top={0} 
                        onClick={() => setCurrentOrder(currentOrder - 1)}
                    />
                    <IconButton 
                        disabled={currentOrder === campaignsData.length-2 ? true : false} 
                        icon={<FiArrowRight />} 
                        aria-label={""} 
                        right={0} top={0}
                        onClick={() => setCurrentOrder(currentOrder + 1)}
                    />
                </Flex>
            </Flex>
            <Flex display={{ base: 'grid', md: 'none' }} >
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)' ,'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={8}>
                    {
                        campaignsData.slice(currentOrder, currentOrder+1).map((data) => (
                            <CampaignCard key={data.id} {...data} />
                        ))
                    }
                </Grid>
                <Flex gap={5} justifyContent='center' mt={5}>
                    <IconButton 
                        disabled={currentOrder === 0 ? true : false} 
                        icon={<FiArrowLeft />} 
                        aria-label={""} 
                        left={0} top={0} 
                        onClick={() => setCurrentOrder(currentOrder - 1)}
                    />
                    <IconButton 
                        disabled={currentOrder === campaignsData.length-1 ? true : false} 
                        icon={<FiArrowRight />} 
                        aria-label={""} 
                        right={0} top={0}
                        onClick={() => setCurrentOrder(currentOrder + 1)}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}



export default Campaigns;