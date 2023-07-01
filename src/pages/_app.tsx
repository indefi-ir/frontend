// @ts-ignore

import type { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/globals.css';
import '../styles/override.css';
import LayoutWrapper from '../layouts/WrapperLayout';
import { ConfigProvider } from 'antd';
import { UserInfoContext } from '../components/providers';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState<any>({
    role: null,
    id: ""
  });
  const roleItem = typeof window !== "undefined" ? localStorage.getItem('role') : false;
  const role = roleItem ? window.JSON.parse(roleItem) : null;

  let id = "";
  if (role === "Company") {
    let idItem = typeof window !== "undefined" ? localStorage.getItem('id') : false;
    id = idItem ? window.JSON.parse(idItem) : null;
  }

  const token = typeof window !== "undefined" ? window.localStorage.getItem('token') : false;

  useEffect(() => {
    setUserInfo({
      role: role,
      id: id
    })
  }, [token])

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          colorPrimary: '#4285F4',
        }
      }}
    >
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </UserInfoContext.Provider>
    </ConfigProvider>
  )
}
