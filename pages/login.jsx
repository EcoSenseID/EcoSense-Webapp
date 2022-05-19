import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout/layout-frontpage.component';
import LoginSignupContainer from '../components/login/login-signup-cont.component';

const Login = () => {
  return (
    <Layout>
      <Head>
        <title>EcoSense | Login</title>
        <meta name="description" content="Login to EcoSense | An application for environmental campaigns and plant diseases detection." />
      </Head>

      <main>
        <LoginSignupContainer />
      </main>
    </Layout>
  )
}

export default Login;