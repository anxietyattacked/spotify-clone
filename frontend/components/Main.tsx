import React from "react";
import styles from "../styles/Main.module.css";

const Main = () => {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["playlist-title-container"]}>
        <h2>Playlist</h2>
        <h1>PlayList Title</h1>
        <p>description</p>
        <p>playlist info summary</p>
      </div>
      <div></div>
    </div>
  );
};

export default Main;
