import React from "react";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className={styles["sidebar-container"]}>
      <div>
        <div className={styles["sidebar-text-container"]}>
          <div className={styles["sidebar-textdiv"]}>
            <span
              className={`iconify ${styles["sidebar-icon"]}`}
              data-icon="ci-home-fill"
              data-inline="false"
            ></span>
            <h1 className={styles["sidebar-text"]}>Home</h1>
          </div>
          <div className={styles["sidebar-textdiv"]}>
            <span
              className={`iconify ${styles["sidebar-icon"]}`}
              data-icon="carbon-search"
              data-inline="false"
            ></span>
            <h1 className={styles["sidebar-text"]}>Search</h1>
          </div>
          <div className={styles["sidebar-textdiv"]}>
            <span
              className={`iconify ${styles["sidebar-icon"]}`}
              data-icon="bx-bx-library"
              data-inline="false"
            ></span>
            <h1 className={styles["sidebar-text"]}>Library</h1>
          </div>
        </div>
      </div>
      <div className={styles["sidebar-textdiv"]}>
        <span
          className={`iconify ${styles["sidebar-icon"]}`}
          data-icon="ant-design:plus-square-filled"
          data-inline="false"
        ></span>
        <h1 className={`${styles["sidebar-text"]}`}>Create Playlist</h1>
        <Link href="/viz" passHref>
          <a className={`${styles["sidebar-text"]}`}>Visualizer</a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
