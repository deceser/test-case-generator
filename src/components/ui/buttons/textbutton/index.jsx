import React from "react";

import styles from "./index.module.scss";

const TextButton = ({ children, ...props }) => {
  const { icon, onClick, disabled } = props;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.button__text}
    >
      <span className={styles.icon}>{icon}</span>
      {children}
    </button>
  );
};

export default TextButton;
