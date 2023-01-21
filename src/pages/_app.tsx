import type { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/globals.css';
import '../styles/antd-override.css';
import LayoutWrapper from '../layouts/WrapperLayout';
import { ConfigProvider } from 'antd';
import { UserInfoProvider } from '../components/providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#68417f',
        }
      }}
    >
      <UserInfoProvider>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </UserInfoProvider>
    </ConfigProvider>
  )
}
