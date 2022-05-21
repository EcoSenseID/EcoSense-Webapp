import Image from "next/image";
import React from "react";

import classes from './campaign-card.module.scss';

const CampaignCard = ({ posterUrl, title, description }) => {
    return (
        <div className={classes.card}>
            <div className={classes.card_img}>
                <Image src={posterUrl} alt="Poster" layout={'fill'} objectFit="cover"></Image>
            </div>
            <div className={classes.card_text}>
                <h3 className={classes.card_title}>{title}</h3> 
                <p className={classes.card_desc}>{description}</p>
            </div>
        </div>
    );
}
export default CampaignCard;