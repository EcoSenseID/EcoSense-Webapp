import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head'

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar/left-navbar.component';
import CenterContent from '../../components/dashboard/center-content/center-content.component';
import AsideContent from '../../components/dashboard/aside-content/aside-content.component';
import { AuthContext } from '../../firebase/context';
import { useColorMode, useToast } from '@chakra-ui/react';

const Dashboard = () => {
  const [myCampaigns, setMyCampaigns] = useState<any>({
    campaignsList: [],
    isLoading: true
  });
  const [categoriesData, setCategoriesData] = useState<any>({
    categoriesList: [],
    isLoading: true
  });
  const { currentUser } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

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
    if (data.error) {
      toast({
        title: `Failed to fetch campaigns data.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
      })
      setMyCampaigns({
        ...myCampaigns,
        campaignsList: [],
        isLoading: false
      });
    } else if (!data.error) {
      toast({
        title: data.message || `Fetched campaigns data.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
      })
      setMyCampaigns({
        ...myCampaigns,
        campaignsList: data.campaigns,
        isLoading: false
      });
    }
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
    console.log(data);
    if (data.error) {
      toast({
        title: `Failed to fetch categories data.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
      })
      setCategoriesData({
        ...categoriesData,
        isLoading: false
      });
    } else {
      toast({
        title: data.message || `Fetched categories data`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
      })
      setCategoriesData({
        ...categoriesData,
        categoriesList: [...data.categoriesList],
        isLoading: false
      });
    }
    
  }

  useEffect(() => {
    if (colorMode == 'dark') toggleColorMode();
    const fetchData = async () => {
        await getMyCampaigns();
        if (categoriesData.categoriesList.length === 0) await getCategories();
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
        <AsideContent 
          campaigns={myCampaigns.campaignsList} 
          campaignsIsLoading={myCampaigns.isLoading} 
          categories={categoriesData.categoriesList} 
          categoriesIsLoading={categoriesData.isLoading}
        />
      </DashboardContainer>
    </div>
  )
}

export default Dashboard;