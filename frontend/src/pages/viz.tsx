import dynamic from "next/dynamic";
import React, { useRef, useEffect } from "react";

const Visual = dynamic(() => import("../components/Visual"), { ssr: false });
import styles from "../styles/Viz.module.css";

interface Props {
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  listenerRef: any;
  soundRef: any;
}
const Viz: React.FC<Props> = ({
  isPlaying,
  audioRef,
  listenerRef,
  soundRef,
}) => {
  return (
    <div className={styles.vizPage}>
      <Visual
        isPlaying={isPlaying}
        audioRef={audioRef}
        listenerRef={listenerRef}
        soundRef={soundRef}
      />
    </div>
  );
};

export default Viz;
