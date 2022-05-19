import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'

import { AuthContext } from "../firebase/context";

import DashboardContainer from '../components/dashboard/dashboard-cont.component';

const Dashboard = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  if (typeof window !== 'undefined' && !user) {
    router.push('/login');
  }

  return (
    <div>
      <Head>
        <title>EcoSense | Dashboard</title>
        <meta name="description" content="An application for environmental campaigns and plant diseases detection." />
      </Head>

      <main>
        <DashboardContainer />
      </main>
    </div>
  )
}

export default Dashboard;