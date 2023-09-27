import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
