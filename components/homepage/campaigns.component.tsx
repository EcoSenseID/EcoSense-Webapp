import React from "react";
import CampaignCard from "./campaign-card.component";

import classes from './campaigns.module.scss';

type CampaignsProps = {
    campaigns: Array<any>
}

const Campaigns = ({ campaigns }: CampaignsProps) => {
    const campaignsData = campaigns;
    return (
        <section className={classes.campaigns_bg} id='campaigns'>
            <h2 className={classes.section_title}>Join the Campaigns!</h2>
            <div className={classes.campaign_grid}>
                {
                    campaignsData.map((data) => (
                        <CampaignCard key={data.id} {...data} />
                    ))
                }
            </div>
        </section>
    )
}



export default Campaigns;