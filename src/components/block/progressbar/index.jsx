import React from "react";

import ProgressLinks from "./ProgressLinks";
import { progressLinks } from "../../../utils/data/progressbar/progressLinks";

import styles from "./index.module.scss";

const ProgressBar = () => {
  const [activeLink, setActiveLink] = React.useState("generate");

  return (
    <div className={styles.progressBar}>
      <ProgressLinks progressLink={progressLinks} activeLink={activeLink} setActiveLink={setActiveLink} />
    </div>
  );
};

export default ProgressBar;
