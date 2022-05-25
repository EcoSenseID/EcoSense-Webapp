import Head from 'next/head';
import React, { useState, useEffect, useContext } from 'react';
import CampaignsCenterContent from '../../components/campaigns/campaigns-center-content.component';

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar.component';

import categoriesListData from '../../dummyData/categories.data';
import { AuthContext } from '../../firebase/context';

const CampaignsPage = () => {
    const [fullCategoriesList, setCategoriesList] = useState([]);
    const { currentUser } = useContext(AuthContext);

    const getCategories = async () => {
        const response = await fetch('/api/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.idToken
            },
        });
        const data = await response.json();
        setCategoriesList([...fullCategoriesList, ...data.categoriesList]);
    }

    useEffect(() => {
        if (fullCategoriesList.length === 0) getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Head>
                <title>EcoSense | Campaigns</title>
                <meta name="description" content="An application for environmental campaigns and plant diseases detection." />
            </Head>

            <DashboardContainer>
                <LeftNavbar page='campaigns'/>
                <CampaignsCenterContent categoriesList={fullCategoriesList}/>
                <div />
            </DashboardContainer>
        </div>
    )
}

export default CampaignsPage;