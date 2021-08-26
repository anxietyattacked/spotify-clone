import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import styles from "../styles/MobileNav.module.css";

const MobileNav = () => {
  return (
    <div className={styles["sidebar-container"]}>
      <div>
        <div className={styles["sidebar-text-container"]}>
          <div className={styles["sidebar-textdiv"]}>
            <Link href="/" passHref>
              <button aria-label="home" className={styles["sidebar-textdiv"]}>
                <Icon
                  className={`iconify ${styles["sidebar-icon"]}`}
                  icon="ci-home-fill"
                ></Icon>
                <h1 className={styles["sidebar-text"]}>Home</h1>
              </button>
            </Link>
          </div>
          <div className={styles["sidebar-textdiv"]}>
            <Link href="/visualizer" passHref>
              <button
                aria-label="Visualizer"
                className={styles["sidebar-textdiv"]}
              >
                <Icon
                  className={`iconify ${styles["sidebar-icon"]}`}
                  icon="mdi:piano"
                ></Icon>

                <a>
                  <h1 className={styles["sidebar-text"]}>Visualizer</h1>
                </a>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
