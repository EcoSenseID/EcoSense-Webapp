import React, { useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { useSystemTheme } from '../hooks/useSystemTheme';

// Page loading indicator
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

import '../styles/globals.scss'
import { AuthProvider } from '../firebase/context'
import { ChakraProvider } from '@chakra-ui/react'

import app from '../firebase/firebase.util';
import { getAnalytics, logEvent } from "firebase/analytics";
import PrivateRoute from '../components/ui-custom-components/private-route';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  const protectedRoutes = [
    '/dashboard', '/dashboard/campaigns', '/dashboard/data', '/dashboard/profile', '/dashboard/addCampaign'
  ];
  const theme = useSystemTheme() || 'dark';

  useEffect(() => {
    if (typeof window != undefined) {
      const analytics = getAnalytics(app);
      logEvent(analytics, 'login');
      logEvent(analytics, 'search');
      logEvent(analytics, 'select_content');
      logEvent(analytics, 'share');
      logEvent(analytics, 'sign_up');
    }
  }, []);

  return (
    <ChakraProvider>
      <AuthProvider>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          <Head>
            {/* General Title */}
            <title>EcoSense</title>
            <meta name='description' content='An application for environmental campaigns and plant diseases detection.' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel="apple-touch-icon" sizes="180x180" href={`/favicon/apple-touch-icon-dark.png`} />
            <link rel="icon" type="image/png" sizes="32x32" href={`/favicon/favicon-${theme}-32x32.png`} />
            <link rel="icon" type="image/png" sizes="16x16" href={`/favicon/favicon-${theme}-16x16.png`} />
            <link rel="manifest" href={`/favicon/site-${theme}.webmanifest`} />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab-dark.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#ffc40d" />
            <meta name="theme-color" content="#ffffff" />
          </Head>
          <Component {...pageProps} />
        </PrivateRoute>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp;
