import React, { useState, useEffect, useContext } from 'react';
import CampaignsCenterContent from '../../components/campaigns/campaigns-center-content.component';

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar/left-navbar.component';
import { AuthContext } from '../../firebase/context';

const CampaignsPage = () => {
    const [myCampaigns, setMyCampaigns] = useState<Array<any>>([]);
    const [fullCategoriesList, setCategoriesList] = useState<Array<any>>([]);
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
        setMyCampaigns(data.campaigns);
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
        setCategoriesList([...fullCategoriesList, ...data.categoriesList]);
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