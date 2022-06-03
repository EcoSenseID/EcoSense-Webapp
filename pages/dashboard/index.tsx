import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head'

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar/left-navbar.component';
import CenterContent from '../../components/dashboard/center-content/center-content.component';
import AsideContent from '../../components/dashboard/aside-content/aside-content.component';
import { AuthContext } from '../../firebase/context';

const Dashboard = () => {
  const [myCampaigns, setMyCampaigns] = useState<any>({
    campaignsList: [],
    isLoading: true
  });
  const [categoriesList, setCategoriesList] = useState<Array<any>>([]);
  const { currentUser } = useContext(AuthContext);

  const getMyCampaigns = async () => {
    const response = await fetch(`/api/campaigns?displayName=${currentUser.displayName}`, {
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

  const getCategories = async () => {
    const response = await fetch('/api/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.idToken
        },
    });
    const data = await response.json();
    // console.log(data);
    setCategoriesList([...categoriesList, ...data.categoriesList]);
  }

  useEffect(() => {
    const fetchData = async () => {
        await getMyCampaigns();
        if (categoriesList.length === 0) await getCategories();
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>EcoSense | Dashboard</title>
        <meta name="description" content="An application for environmental campaigns and plant diseases detection." />
      </Head>

      <DashboardContainer>
        <LeftNavbar page='dashboard' />
        <CenterContent campaigns={myCampaigns.campaignsList} campaignsIsLoading={myCampaigns.isLoading} />
        <AsideContent campaigns={myCampaigns.campaignsList} campaignsIsLoading={myCampaigns.isLoading} categories={categoriesList} />
      </DashboardContainer>
    </div>
  )
}

export default Dashboard;