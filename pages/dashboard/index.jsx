import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'

import { AuthContext } from "../../firebase/context";

import DashboardContainer from '../../components/dashboard/dashboard-cont.component';
import LeftNavbar from '../../components/dashboard/left-navbar.component';
import CenterContent from '../../components/dashboard/center-content.component';
import AsideContent from '../../components/dashboard/aside-content.component';

const Dashboard = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  if (typeof window !== 'undefined' && !user) { router.push('/login'); }

  return (
    <div>
      <Head>
        <title>EcoSense | Dashboard</title>
        <meta name="description" content="An application for environmental campaigns and plant diseases detection." />
      </Head>

      <DashboardContainer>
        <LeftNavbar page='dashboard' />
        <CenterContent />
        <AsideContent />
      </DashboardContainer>
    </div>
  )
}

export default Dashboard;