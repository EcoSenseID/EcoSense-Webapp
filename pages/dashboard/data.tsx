import Head from 'next/head';
import React from 'react';

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar/left-navbar.component';
import DataCenterContent from '../../components/data/data-center-content.component';

const DataPage = () => {
    return (
        <div>
            <Head>
                <title>EcoSense | Data</title>
                <meta name="description" content="An application for environmental campaigns and plant diseases detection." />
            </Head>

            <DashboardContainer>
                <LeftNavbar page='data'/>
                <DataCenterContent />
                <div />
            </DashboardContainer>
        </div>
    )
}

export default DataPage;