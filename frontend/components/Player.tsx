import React, {
  AudioHTMLAttributes,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../styles/Player.module.css";

function formatTime(seconds: number) {
  return [
    Math.floor(seconds / 60), // minutes
    Math.floor(seconds % 60), // remaining seconds
  ]
    .map((x) => x.toString())

    .map((x) => (x.length === 1 ? `0${x}` : x))
    .join(":");
}

const Player = () => {
  const tracks = [
    {
      title: "epic",
      artist: "bensound.com",
      time: 178,
      image: "",
      location: "./bensound-epic.mp3",
    },
    {
      title: "SciFi",
      artist: "bensound.com",
      time: 284,
      Image: "",
      location: "./bensound-scifi.mp3",
    },
    {
      title: "Postive Effect",
      artist: "Marc Rebillet",
      time: 42,
      image: "",
      location: "./positiveEffect.mp3",
    },
  ];

  // const currentTrackInfo = {
  //   title: "Postive Effect",
  //   artist: "Marc Rebillet",
  //   time: 42,
  //   location: "./positiveEffect.mp3",
  // };
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const soundBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef<any>(); // reference the animation

  let [trackIndex, setTrackIndex] = useState(0);
  const [currentTrackInfo, setCurrentTrackInfo] = useState(tracks[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTrackInfo.time);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      if (audioRef.current) {
        audioRef.current.play();
      }

      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      if (audioRef.current) audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    if (progressBar.current && audioRef.current) {
      if (audioRef.current.onloadeddata) {
        audioRef.current.play();
      }
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
    if (progressBar.current) {
      progressBar.current.style.setProperty(
        "--seek-before-width",
        `${
          (parseInt(progressBar.current.value) / currentTrackInfo.time) * 100
        }%`
      );
      setCurrentTime(parseInt(progressBar.current.value));
    }
  };

  useEffect(() => {
    if (audioRef.current && progressBar.current) {
      const seconds = Math.floor(audioRef.current.duration);
      progressBar.current.max = seconds.toString();
      if (isPlaying) {
        audioRef.current.play();
      }
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
    }
  }, [isPlaying]);

  return (
    <>
      <footer className={styles["player-container"]}>
        <audio
          autoPlay={true}
          ref={audioRef}
          src={currentTrackInfo.location}
          preload="metadata"
        ></audio>
        <div className={styles["player-elements"]}>
          <div>
            <h2 className={styles["song-title"]}>{currentTrackInfo.title}</h2>
            <h3 className={styles["artist"]}>{currentTrackInfo.artist}</h3>
          </div>
          <div className={styles["player-controls"]}>
            <div className={styles["player-controls-main"]}>
              <button
                className={styles["button"]}
                onClick={() => {
                  if (audioRef.current!.currentTime <= 10) {
                    audioRef.current!.currentTime = 0;
                  }
                  if (trackIndex === 0) {
                    setTrackIndex(tracks.length - 1);
                  } else {
                    setTrackIndex(trackIndex--);
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
                      setIsPlaying(false);
                      audioRef.current.currentTime = 0;
                      setTrackIndex(0);
                      setIsPlaying(true);
                    } else if (audioRef.current) {
                      setIsPlaying(false);
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
