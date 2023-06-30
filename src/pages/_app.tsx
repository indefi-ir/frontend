import type { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/globals.css';
import '../styles/override.css';
import LayoutWrapper from '../layouts/WrapperLayout';
import { ConfigProvider } from 'antd';
import { UserInfoContext } from '../components/providers';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState<any>(null);
  const item = typeof window !== "undefined" ? localStorage.getItem('role') : false;
  const role = item ? window.JSON.parse(item): null;
  const token = typeof window !== "undefined" ?  window.localStorage.getItem('token') : false;

  useEffect(()=> {
    setUserInfo(role)
  },[token])
  
  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          colorPrimary: '#4285F4',
        }
      }}
    >
      <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
      </UserInfoContext.Provider>
    </ConfigProvider>
  )
}
