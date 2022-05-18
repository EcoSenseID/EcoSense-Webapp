import Head from 'next/head'
import Image from 'next/image'
import HomepageAbout from '../components/homepage/about.component'
import Hero from '../components/homepage/hero.component'
import Footer from '../components/layout/footer.component'
import ScrollUpBtn from '../components/layout/scroll-up-btn.component'

const Home = () => {
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
      </main>
    </div>
  )
}

export default Home;