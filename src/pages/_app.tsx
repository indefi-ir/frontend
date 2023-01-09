import type { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/globals.css';
import LayoutWrapper from '../layouts/LayoutWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  )
}
