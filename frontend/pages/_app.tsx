/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("../components/Player"), { ssr: false });
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
      </Head>
      <div className="side-and-main">
        <Sidebar />
        <Component {...pageProps} />
      </div>

      <Player />
    </>
  );
}
export default MyApp;
