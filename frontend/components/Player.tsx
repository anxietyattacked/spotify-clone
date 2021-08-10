import React, {
  AudioHTMLAttributes,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../styles/Player.module.css";
import Image from "next/image";

function formatTime(seconds: number) {
  return [
    Math.floor(seconds / 60), // minutes
    Math.floor(seconds % 60), // remaining seconds
  ]
    .map((x) => x.toString())

    .map((x) => (x.length === 1 ? `0${x}` : x))
    .join(":");
}
interface Props {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  tracks: {
    title: string;
    artist: string;
    time: number;
    image: string;
    location: string;
  }[];
  setTracks: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        artist: string;
        time: number;
        image: string;
        location: string;
      }[]
    >
  >;
  trackIndex: number;
  setTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  sampleTracks: {
    title: string;
    artist: string;
    time: number;
    image: string;
    location: string;
  }[];
  currentTrackInfo: {
    title: string;
    artist: string;
    time: number;
    image: string;
    location: string;
  };
  setCurrentTrackInfo: React.Dispatch<
    React.SetStateAction<{
      title: string;
      artist: string;
      time: number;
      image: string;
      location: string;
    }>
  >;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const Player: React.FC<Props> = ({
  isPlaying,
  setIsPlaying,
  tracks,
  setTracks,
  trackIndex,
  setTrackIndex,
  currentTrackInfo,
  setCurrentTrackInfo,
  audioRef,
}) => {
  const progressBar = useRef<HTMLInputElement>(null);
  const soundBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef<any>();

  const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(50);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              // Automatic playback started!
              // Show playing UI.
              animationRef.current = requestAnimationFrame(whilePlaying);
            })
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
            });
        }
      }
    } else {
      if (audioRef.current) audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    if (progressBar.current && audioRef.current) {
      progressBar.current.value = audioRef.current.currentTime.toString();
      changePlayerCurrentTime();
    }

    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    if (audioRef.current && progressBar.current) {
      audioRef.current.currentTime = parseInt(progressBar.current.value);
      changePlayerCurrentTime();
    }
  };
  const changePlayerCurrentTime = () => {
    if (progressBar.current && audioRef.current) {
      progressBar.current.style.setProperty(
        "--seek-before-width",
        `${
          (parseInt(progressBar.current.value) / audioRef.current.duration) *
          100
        }%`
      );
      setCurrentTime(parseInt(progressBar.current.value));
    }
  };

  useEffect(() => {
    if (audioRef.current && progressBar.current) {
      const seconds = Math.floor(audioRef.current.duration);
      progressBar.current.max = seconds.toString();
      // if (isPlaying) {
      //   const playPromise = audioRef.current.play();
      //   if (playPromise !== undefined) {
      //     playPromise
      //       .then((_) => {
      //         // Automatic playback started!
      //         // Show playing UI.
      //       })
      //       .catch((error) => {
      //         // Auto-play was prevented
      //         // Show paused UI.
      //         cancelAnimationFrame(animationRef.current);
      //       });
      //   }
      // }
    }
    setCurrentTrackInfo(tracks[trackIndex]);
    audioRef.current!.volume = volume / 100;
  }, [
    audioRef?.current?.onloadedmetadata,
    audioRef?.current?.readyState,
    volume,
    trackIndex,
  ]);
  useEffect(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.autoplay = false;
      if (currentTime == currentTrackInfo.time) {
        console.log("ended");
      }
    } else if (audioRef.current && isPlaying) {
      const playPromise = audioRef.current.play();
      if (currentTime == currentTrackInfo.time) {
        setIsPlaying(false);
        audioRef.current.currentTime = 0;
        if (trackIndex === tracks.length - 1) {
          setTrackIndex(0);
        } else {
          setTrackIndex(trackIndex + 1);
        }
        setIsPlaying(true);
      }
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            // Automatic playback started!
            // Show playing UI.
            animationRef.current = requestAnimationFrame(whilePlaying);
          })
          .catch((error) => {
            // Auto-play was prevented
            // Show paused UI.
            // cancelAnimationFrame(animationRef.current);
          });
      }
    }
  }, [isPlaying, audioRef, currentTrackInfo.location, currentTime]);

  return (
    <>
      <footer className={styles["player-container"]}>
        <div className={styles["player-elements"]}>
          <div className={styles.infoDiv}>
            <div className={styles.albumArt}>
              <Image
                src={currentTrackInfo.image}
                alt="album art"
                width={60}
                height={60}
              />
            </div>
            <div className={styles.textDiv}>
              <h2 className={styles["song-title"]}>{currentTrackInfo.title}</h2>
              <h3 className={styles["artist"]}>{currentTrackInfo.artist}</h3>
            </div>
          </div>
          <div className={styles["player-controls"]}>
            <div className={styles["player-controls-main"]}>
              <button
                className={styles["button"]}
                onClick={() => {
                  // if (audioRef.current!.currentTime <= 10) {
                  //   audioRef.current!.currentTime = 0;
                  // }
                  if (trackIndex === 0 && audioRef.current) {
                    if (isPlaying) {
                      setIsPlaying(false);
                      audioRef.current.currentTime = 0;
                      setTrackIndex(tracks.length - 1);
                      setIsPlaying(true);
                    } else if (!isPlaying) {
                      audioRef.current.currentTime = 0;
                      setTrackIndex(tracks.length - 1);
                      setIsPlaying(true);
                    }
                  } else if (audioRef.current && isPlaying) {
                    setIsPlaying(false);
                    audioRef.current.currentTime = 0;
                    setTrackIndex(trackIndex - 1);
                    setIsPlaying(true);
                  } else if (audioRef.current && !isPlaying) {
                    audioRef.current.currentTime = 0;
                    setTrackIndex(trackIndex - 1);
                    setIsPlaying(true);
                  }
                }}
              >
                <span
                  className={`iconify ${styles["player-skip-back"]}`}
                  data-icon="bi-skip-start-fill"
                  data-inline="false"
                ></span>
              </button>
              <button className={styles["button"]} onClick={togglePlayPause}>
                {!isPlaying ? (
                  <span
                    className={`iconify ${styles["player-play"]}`}
                    data-icon="bi-play-circle-fill"
                    data-inline="false"
                  ></span>
                ) : (
                  <span
                    className={`iconify ${styles["player-play"]}`}
                    data-icon="bi-pause-circle-fill"
                    data-inline="false"
                  ></span>
                )}
              </button>
              <button
                className={styles["button"]}
                onClick={async () => {
                  {
                    if (trackIndex === tracks.length - 1 && audioRef.current) {
                      if (isPlaying) {
                        setIsPlaying(false);
                        audioRef.current.currentTime = 0;
                        setTrackIndex(0);
                        setIsPlaying(true);
                      }
                      if (!isPlaying) {
                        audioRef.current.currentTime = 0;
                        setTrackIndex(0);
                        setIsPlaying(true);
                      }
                    } else if (audioRef.current && isPlaying) {
                      setIsPlaying(false);
                      audioRef.current.currentTime = 0;
                      setTrackIndex(trackIndex + 1);
                      setIsPlaying(true);
                    } else if (audioRef.current && !isPlaying) {
                      audioRef.current.currentTime = 0;
                      setTrackIndex(trackIndex + 1);
                      setIsPlaying(true);
                    }
                  }
                }}
              >
                <span
                  className={`iconify ${styles["player-skip-forward"]}`}
                  data-icon="bi-skip-end-fill"
                  data-inline="false"
                ></span>
              </button>
            </div>
            <div className={styles["player-controls-bar"]}>
              <p className={`iconify ${styles["player-time"]}`}>
                {formatTime(currentTime)}
              </p>
              <input
                onChange={changeRange}
                ref={progressBar}
                type="range"
                min={0}
                defaultValue={0}
                step={0.5}
                className={styles["progressBar"]}
                id="myRange"
              ></input>
              <p className={`iconify ${styles["player-time"]}`}>
                {currentTrackInfo
                  ? formatTime(currentTrackInfo.time)
                  : formatTime(0)}
              </p>
            </div>
          </div>
          <div className={styles["player-sound-controls"]}>
            <span
              className={`iconify ${styles["player-sound"]}`}
              data-icon="bi-volume-down"
              data-inline="false"
            ></span>
            <input
              ref={soundBar}
              onChange={(event) => {
                if (soundBar.current) {
                  setVolume(parseInt(event.target.value));
                  soundBar.current.style.setProperty(
                    "--seek-before-width",
                    `${parseInt(soundBar.current.value)}%`
                  );
                }
              }}
              type="range"
              min={0}
              step={1}
              className={styles["sound-slider"]}
              id="soundRange"
            ></input>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Player;
