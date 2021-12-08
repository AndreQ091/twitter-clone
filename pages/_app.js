import '../styles/global.css';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Head>
          <title>Twitter</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>)
}

export default MyApp
