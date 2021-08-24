/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useRef, useState } from "react";
import { Audio, AudioListener } from "three";
import Head from "next/head";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("../components/Player"), { ssr: false });
import Sidebar from "../components/Sidebar";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
function SafeHydrate({ children }: any) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}
function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://48p1r2roz4.sse.codesandbox.io",
    cache: new InMemoryCache(),
  });

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
    {
      title: "The Business (Paul Gannon Remix)",
      artist: "Tiësto",
      time: 219,
      image: "/3.jpg",
      location: "./Tiësto - The Business (Paul Gannon Remix).mp3",
    },
    {
      title: "Bury the Light",
      artist: "Casey Edwards",
      time: 582,
      image: "/3.jpg",
      location:
        "./Bury the Light - Vergil's battle theme from Devil May Cry 5 Special Edition.mp3",
    },
  ];
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState(sampleTracks);
  let [trackIndex, setTrackIndex] = useState(0);

  const [currentTrackInfo, setCurrentTrackInfo] = useState(sampleTracks[0]);
  // const audio = new Audio()
  let audioRef = useRef<HTMLAudioElement>(null!);
  // const audioContext = useRef(new window.AudioContext());
  let listenerRef = useRef<AudioListener>(null!);
  let soundRef = useRef<Audio<GainNode>>(null!);
  useEffect(() => {
    listenerRef.current = new AudioListener();
    soundRef.current = new Audio(listenerRef.current);
    soundRef.current.setMediaElementSource(audioRef.current);

    return () => {};
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <Head>
          <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
        </Head>

        <Sidebar />
        <SafeHydrate>
          <Component
            {...pageProps}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            tracks={tracks}
            setTracks={setTracks}
            trackIndex={trackIndex}
            setTrackIndex={setTrackIndex}
            audioRef={audioRef}
            listenerRef={listenerRef}
            soundRef={soundRef}
          />
        </SafeHydrate>
        <audio
          ref={audioRef}
          src={currentTrackInfo.location}
          preload="metadata"
        >
          <source />
        </audio>
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          tracks={tracks}
          setTracks={setTracks}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
          sampleTracks={sampleTracks}
          currentTrackInfo={currentTrackInfo}
          setCurrentTrackInfo={setCurrentTrackInfo}
          audioRef={audioRef}
        />
      </ApolloProvider>
    </>
  );
}
export default MyApp;
