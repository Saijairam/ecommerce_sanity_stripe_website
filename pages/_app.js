import React from 'react';
import '../styles/globals.css';

import Layout from '../components/Layout'

import {StateContext} from '../context/StateContext.js';
import {Toaster} from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
    </Layout>
    </StateContext>
  )
  
}

export default MyApp