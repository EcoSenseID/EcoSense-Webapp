import React, { useState } from "react";

import classes from './campaigns.module.scss';

const Campaigns = () => {
    const [campaignsData, setCampaignsData] = useState([]);
    fetch(`https://${process.env.API_URL}/campaigns`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setCampaignsData(data.data.campaigns);
            console.log(campaignsData);
        })
        .catch(error => {
            console.log(error);
        })

    return (
        <section className={classes.campaigns_bg} >
            {
                campaignsData.forEach((data) => {
                    return (
                        <div>
                            <p>{data.title}</p>
                            <p>{data.description}</p>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default Campaigns;