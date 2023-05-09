import React from "react";

import styles from "./index.module.scss";

const SvgButton = ({ children, ...props }) => {
  const { onClick, disabled } = props;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.svg__button}
    >
      {children}
    </button>
  );
};

export default SvgButton;
