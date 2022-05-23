import Head from 'next/head';
import React from 'react';
import CampaignsAsideContent from '../../components/campaigns/campaigns-aside-content.component';
import CampaignsCenterContent from '../../components/campaigns/campaigns-center-content.component';

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar.component';

import categoriesListData from '../../dummyData/categories.data';

const CampaignsPage = ({ categoriesList }) => {
    return (
        <div>
            <Head>
                <title>EcoSense | Campaigns</title>
                <meta name="description" content="An application for environmental campaigns and plant diseases detection." />
            </Head>

            <DashboardContainer>
                <LeftNavbar page='campaigns'/>
                <CampaignsCenterContent categoriesList={categoriesList}/>
                <CampaignsAsideContent />
            </DashboardContainer>
        </div>
    )
}

export const getStaticProps = async (context) => {
    try {
        // Fetch data from an API
        // const res = await fetch(`https://ecosense-rest-api.herokuapp.com/categories`);
        // const data = await res.json();
        // let categories = await data.categories;
        // if (categories.length === 0) {
        //     categories.push(...categoriesListData);
        // }
        let categories = categoriesListData;
        return {
            props: {
                categoriesList: categories
            }, 
            revalidate: 60
        }
    }
    catch (error) {
        console.log(error);
    }
}

export default CampaignsPage;