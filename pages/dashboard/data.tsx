import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar/left-navbar.component';
import DataCenterContent from '../../components/data/data-center.component';
import DataAside from 'components/data/data-aside.component';
import { AuthContext } from '../../firebase/context';

const DataPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [myCampaigns, setMyCampaigns] = useState<any>({
        campaignsList: [],
        isLoading: true
    });

    const getMyCampaigns = async () => {
        const response = await fetch(`/api/campaigns`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.idToken
            },
        });
        const data = await response.json();
        // console.log(data);
        setMyCampaigns({
          ...myCampaigns,
          campaignsList: data.campaigns,
          isLoading: false
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            await getMyCampaigns();
        }
        fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Head>
                <title>EcoSense | Data</title>
                <meta name="description" content="An application for environmental campaigns and plant diseases detection." />
            </Head>

            <DashboardContainer>
                <LeftNavbar page='data'/>
                <DataCenterContent campaigns={myCampaigns.campaignsList} campaignIsLoading={myCampaigns.isLoading} />
                <DataAside campaigns={myCampaigns.campaignsList} campaignIsLoading={myCampaigns.isLoading} />
            </DashboardContainer>
        </div>
    )
}

export default DataPage;