import Head from 'next/head'
import Image from 'next/image'

import HomepageAbout from '../components/homepage/about.component'
import Hero from '../components/homepage/hero.component'
import Footer from '../components/layout/footer.component'
import ScrollUpBtn from '../components/layout/scroll-up-btn.component'
import Campaigns from '../components/homepage/campaigns.component';

const HomePage = (props) => {
  return (
    <div>
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
    </div>
  )
}

export const getStaticProps = async (context) => {
  try {
      // Fetch data from an API
      const res = await fetch(`https://ecosense-rest-api.herokuapp.com/campaign`);
      const data = await res.json();
      const campaigns = await data.campaigns;
      return {
          props: {
              campaigns: campaigns
          }, 
          revalidate: 100
      }
  }
  catch (error) {
      console.log(error);
  }
}

export default HomePage;