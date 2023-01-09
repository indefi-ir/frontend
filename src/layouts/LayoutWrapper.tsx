import Head from 'next/head';
import React from 'react';
import DefaultLayout from './DefaultLayout';


const LayoutWrapper = (props:any) => {
  console.log("Props",props)
  const { children } = props;

  const HeadContent = (
    <Head>
      <title>Plutus</title>
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico?v=2.0' />
    </Head>
  )

  return (
    <>
      {HeadContent}
      <DefaultLayout {...props}>{children}</DefaultLayout>
    </>
  )
}

export default LayoutWrapper;

