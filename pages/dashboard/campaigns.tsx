import { useToast } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import CampaignsCenterContent from '../../components/campaigns/campaigns-center-content.component';

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar/left-navbar.component';
import { AuthContext } from '../../firebase/context';

const CampaignsPage = () => {
    const [myCampaigns, setMyCampaigns] = useState<Array<any>>([]);
    const [fullCategoriesList, setCategoriesList] = useState<Array<any>>([]);
    const { currentUser } = useContext(AuthContext);
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
            setMyCampaigns([]);
        } else if (!data.error) {
            toast({
              title: data.message || `Fetched campaigns data.`,
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'bottom-right'
            })
            setMyCampaigns(data.campaigns);
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
        // console.log(data);
        if (data.error) {
            toast({
              title: `Failed to fetch categories data.`,
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'bottom-right'
            })
            setCategoriesList([...fullCategoriesList]);
        } else if (!data.error) {
            // toast({
            //   title: data.message || `Fetched categories data.`,
            //   status: 'success',
            //   duration: 5000,
            //   isClosable: true,
            //   position: 'bottom-right'
            // })
            setCategoriesList([...fullCategoriesList, ...data.categoriesList]);
        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            await getMyCampaigns();
            if (fullCategoriesList.length === 0) await getCategories();
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DashboardContainer>
            <LeftNavbar page='campaigns'/>
            <CampaignsCenterContent 
                myCampaigns={myCampaigns} 
                categoriesList={fullCategoriesList}
            />
        </DashboardContainer>
    )
}

export default CampaignsPage;