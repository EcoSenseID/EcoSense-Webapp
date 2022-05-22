import Head from 'next/head';
import React from 'react';
import CampaignsAsideContent from '../../components/campaigns/campaigns-aside-content.component';
import CampaignsCenterContent from '../../components/campaigns/campaigns-center-content.component';

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar.component';

const CampaignsPage = () => {
    return (
        <div>
            <Head>
                <title>EcoSense | Campaigns</title>
                <meta name="description" content="An application for environmental campaigns and plant diseases detection." />
            </Head>

            <DashboardContainer>
                <LeftNavbar page='campaigns'/>
                <CampaignsCenterContent />
                <CampaignsAsideContent />
            </DashboardContainer>
        </div>
    )
}

export default CampaignsPage;