import type { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/globals.css';
import '../styles/override.css';
import LayoutWrapper from '../layouts/WrapperLayout';
import { ConfigProvider } from 'antd';
import { UserInfoContext } from '../components/providers';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState<any>(null);
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
