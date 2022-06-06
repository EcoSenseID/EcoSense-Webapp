import React from 'react';
import Head from 'next/head'

import HomepageAbout from '../components/homepage/about.component'
import Hero from '../components/homepage/hero.component'
import ScrollUpBtn from '../components/layout/scroll-up-btn.component'
import Campaigns from '../components/homepage/campaigns.component';

import Layout from '../components/layout/layout-frontpage.component'

const HomePage = (props: any) => {
  return (
    <Layout>
      <Head>
        <title>EcoSense</title>
        <meta name="description" content="An application for environmental campaigns and plant diseases detection." />
      </Head>

      <main>
        <ScrollUpBtn />
        <Hero />
        <HomepageAbout />
        <Campaigns campaigns={props.campaigns} />
      </main>
    </Layout>
  )
}

export const getStaticProps = async () => {
  try {
      // Fetch data from an API
      const res = await fetch(`https://ecosense-bangkit.uc.r.appspot.com/trendingCampaigns`);
      const data = await res.json();
      const { campaigns } = await data;
      return {
          props: {
              campaigns: campaigns,
          }, 
          revalidate: 60,
      }
  }
  catch (error) {
      console.log(error);
      return error;
  }
}

export default HomePage;