import Head from 'next/head'
import Image from 'next/image'
import LoginSignupContainer from '../components/login/login-signup-cont.component';

const Login = () => {
  return (
    <div>
      <Head>
        <title>EcoSense | Login</title>
        <meta name="description" content="Login to EcoSense | An application for environmental campaigns and plant diseases detection." />
      </Head>

      <main>
        <LoginSignupContainer />
      </main>
    </div>
  )
}

export default Login;