import type { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/globals.css';
import '../styles/antd-override.css';
import LayoutWrapper from '../layouts/WrapperLayout';
import { ConfigProvider } from 'antd';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#04b085',
            fontFamily: 'IranSans',
        }
      }}
    >
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ConfigProvider>
  )
}
