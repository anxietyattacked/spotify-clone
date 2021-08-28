/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useRef, useState } from "react";
import { Audio, AudioListener } from "three";
import Head from "next/head";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("../components/Player"), { ssr: false });
import Sidebar from "../components/Sidebar";
import useWindowDimensions from "../utils/useWindowDimensions";
import MobileNav from "../components/MobileNav";

function MyApp({ Component, pageProps }: AppProps) {
  interface tracksType {
    title: string;
    artist: string;
    time: number;
    image: string;
    location: string;
  }

  const sampleTracks = [
    {
      title: "Epic",
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
      title: "The Business (Paul Gannon Remix)",
      artist: "Tiësto",
      time: 219,
      image: "/3.jpg",
      location: "./Tiësto - The Business (Paul Gannon Remix).mp3",
    },
  ];
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<tracksType[]>(sampleTracks);
  let [trackIndex, setTrackIndex] = useState(0);

  const [currentTrackInfo, setCurrentTrackInfo] = useState(
    sampleTracks[trackIndex]
  );
  const window = useWindowDimensions();
  let isMobile = (window.width as number) <= 768;

  let audioRef = useRef<HTMLAudioElement>(null);
  let listenerRef = useRef<AudioListener>();
  let soundRef = useRef<Audio<GainNode>>();
  useEffect(() => {
    listenerRef.current = new AudioListener();
    soundRef.current = new Audio(listenerRef.current);
    soundRef.current.setMediaElementSource(
      audioRef.current as HTMLAudioElement
    );
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = false;
    }
  }, [isPlaying]);
  return (
    <>
      {!isMobile ? <Sidebar /> : null}

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
        isMobile={isMobile}
      />

      <audio
        muted={true}
        ref={audioRef}
        src={currentTrackInfo.location}
        preload="metadata"
      >
        <source />
      </audio>
      {isMobile ? <MobileNav /> : null}
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
        isMobile={isMobile}
        soundRef={soundRef}
        listenerRef={listenerRef}
      />
    </>
  );
}
export default MyApp;
