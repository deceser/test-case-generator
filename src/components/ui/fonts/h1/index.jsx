import React from "react";

import styles from "./index.module.scss";

const H1Ui = ({ children }) => {
  return <h1 className={styles.h1ui}>{children}</h1>;
};

export default H1Ui;
