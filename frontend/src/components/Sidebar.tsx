import React from "react";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  return (
    <div className={styles["sidebar-container"]}>
      <div>
        <div className={styles["logoDiv"]}>
          <Icon
            className={`iconify ${styles["titleIcon"]}`}
            icon="bi:spotify"
          ></Icon>
          <h1 className={styles["title"]}>Spotify</h1>
        </div>
        <div className={styles["sidebar-text-container"]}>
          <div className={styles["sidebar-textdiv"]}>
            <Link href="/" passHref>
              <button className={styles["sidebar-button"]}>
                <Icon
                  className={`iconify ${styles["sidebar-icon"]}`}
                  icon="ci-home-fill"
                ></Icon>

                <h1 className={styles["sidebar-text"]}>Home</h1>
              </button>
            </Link>
          </div>
          {/* <div className={styles["sidebar-textdiv"]}>
            <Icon
              className={`iconify ${styles["sidebar-icon"]}`}
              icon="carbon-search"
            ></Icon>
            <h1 className={styles["sidebar-text"]}>Search</h1>
          </div>
          <div className={styles["sidebar-textdiv"]}>
            <Icon
              className={`iconify ${styles["sidebar-icon"]}`}
              icon="bx-bx-library"
            ></Icon>
            <h1 className={styles["sidebar-text"]}>Library</h1>
          </div> */}
          <div className={styles["sidebar-textdiv"]}>
            <Link href="/visualizer" passHref>
              <button className={styles["sidebar-button"]}>
                <Icon
                  className={`iconify ${styles["sidebar-icon"]}`}
                  icon="mdi:piano"
                ></Icon>

                <h1 className={styles["sidebar-text"]}>Visualizer</h1>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className={styles["sidebar-textdiv"]}>
        <Icon
          className={`iconify ${styles["sidebar-icon"]}`}
          icon="ant-design:plus-square-filled"
        ></Icon>
        <h1 className={`${styles["sidebar-text"]}`}>Create Playlist</h1>
      </div> */}
    </div>
  );
};

export default Sidebar;
