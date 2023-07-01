import Head from 'next/head';
import React from 'react';
import AdminLayout from './AdminLayout';
import DefaultLayout from './DefaultLayout';

const layouts = {
  default: DefaultLayout,
  admin: AdminLayout,
};

const WrapperLayout = (props:any) => {
  const { children } = props;
  //@ts-ignore
  const Layout = layouts[children?.type?.layout]

  const HeadContent = (
    <Head>
      <title>Trustfund</title>
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico?v=2.0' />
    </Head>
  )

  if (Layout != null) {
    return (
      <>
        {HeadContent}
        <Layout {...props}>{children}</Layout>
      </>
    )
  }

  return (
    <>
      {HeadContent}
      <DefaultLayout {...props}>{children}</DefaultLayout>
    </>
  )
}

export default WrapperLayout;

