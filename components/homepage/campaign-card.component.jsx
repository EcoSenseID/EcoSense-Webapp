import Image from "next/image";
import React from "react";

import classes from './campaign-card.module.scss';

const CampaignCard = ({ posterUrl, title }) => {
    return (
        <div className={classes.card}>
            <div className={classes.card_img}>
                <Image src={posterUrl} alt="Poster" layout={'fill'} objectFit="cover" ></Image>
            </div>
            <h3 className={classes.card_title}>{title}</h3> 
        </div>
    );
}
export default CampaignCard;