import Head from 'next/head';
import React from 'react';

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar.component';
import ProfileCenterContent from '../../components/profile/profile-center-content.component'

const ProfilePage = () => {
    return (
        <div>
            <Head>
                <title>EcoSense | Profile</title>
                <meta name="description" content="An application for environmental campaigns and plant diseases detection." />
            </Head>

            <DashboardContainer>
                <LeftNavbar page='profile'/>
                <ProfileCenterContent />
                <div />
            </DashboardContainer>
        </div>
    )
}

export default ProfilePage;