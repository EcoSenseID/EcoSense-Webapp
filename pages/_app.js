import React, { useEffect } from 'react'
import Head from 'next/head'

// Page loading indicator
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

import '../styles/globals.css'
import { AuthProvider } from '../firebase/context'
import { ChakraProvider } from '@chakra-ui/react'

import app from '../firebase/firebase.util';
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import PrivateRoute from '../components/ui-custom-components/private-route';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const protectedRoutes = ['/dashboard', '/dashboard/campaigns', '/dashboard/data', '/dashboard/profile'];

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
            <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
          </Head>
          <Component {...pageProps} />
        </PrivateRoute>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp;
