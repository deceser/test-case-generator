import React from "react";

import ProgressLinks from "./NavigationLinks";
import { progressLinks } from "src/utils/data/progressbar/progressLinks";

import styles from "./index.module.scss";

const NavigationBar = () => {
  const [activeLink, setActiveLink] = React.useState("generate");

  return (
    <div className={styles.navigationBar}>
      <ProgressLinks
        progressLink={progressLinks}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
    </div>
  );
};

export default NavigationBar;
