import React from "react";

import styles from "./index.module.scss";

const ParagraphUi = ({ children }) => {
  return <p className={styles.paragraphui}>{children}</p>;
};

export default ParagraphUi;
