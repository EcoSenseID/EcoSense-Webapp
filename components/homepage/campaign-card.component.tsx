import { Flex, Heading, LightMode, Tag, TagLeftIcon, Text, Image } from "@chakra-ui/react";
// import Image from "next/image";
import React from "react";
import { RiTimeFill } from "react-icons/ri";

import classes from './campaign-card.module.scss';

type CampaignCardProps = {
    posterUrl: string,
    title: string,
    description: string
}

const CampaignCard = ({ posterUrl, title, description }: CampaignCardProps) => {
    return (
        <Flex className={classes.card} boxShadow='lg' minH={{ base: '250px', md: 'unset' }}>
            <Flex className={classes.card_img}>
                <Image src={posterUrl} minW={{ base: '100%', md: '100%' }} minH={{ base: '100%', md: '100%' }} alt="Poster" objectFit="cover"></Image>
            </Flex>
            <Flex className={classes.card_text} flexDir='column'>
                <Heading size='md' className={classes.card_title} noOfLines={1}>{title}</Heading> 
                <Text className={classes.card_desc} noOfLines={5}>{description}</Text>
                <Flex mt={4}>
                    { true && <LightMode><Tag colorScheme='purple'><TagLeftIcon as={RiTimeFill}/>NEW</Tag></LightMode>}
                </Flex>
            </Flex>
        </Flex>
    );
}
export default CampaignCard;