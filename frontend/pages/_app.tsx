/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useRef, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("../components/Player"), { ssr: false });
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  const sampleTracks = [
    {
      title: "epic",
      artist: "bensound.com",
      time: 178,
      image: "/1.jpg",
      location: "./bensound-epic.mp3",
    },
    {
      title: "SciFi",
      artist: "bensound.com",
      time: 284,
      image: "/2.jpg",
      location: "./bensound-scifi.mp3",
    },
    {
      title: "Postive Effect",
      artist: "Marc Rebillet",
      time: 42,
      image: "/3.jpg",
      location: "./positiveEffect.mp3",
    },
  ];
  const [tracks, setTracks] = useState(sampleTracks);
  let [trackIndex, setTrackIndex] = useState(0);
  const [currentTrackInfo, setCurrentTrackInfo] = useState(sampleTracks[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <>
      <Head>
        <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
      </Head>
      <div className="side-and-main">
        <Sidebar />
        <Component
          {...pageProps}
          tracks={tracks}
          setTracks={setTracks}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
        />
      </div>
      <audio
        autoPlay={true}
        ref={audioRef}
        src={currentTrackInfo.location}
        preload="metadata"
      ></audio>
      <Player
        tracks={tracks}
        setTracks={setTracks}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
        sampleTracks={sampleTracks}
        currentTrackInfo={currentTrackInfo}
        setCurrentTrackInfo={setCurrentTrackInfo}
        audioRef={audioRef}
      />
    </>
  );
}
export default MyApp;
