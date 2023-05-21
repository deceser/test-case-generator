import React from "react";

import styles from "./index.module.scss";

const TextButton = ({ children, ...props }) => {
  const { icon, onClick, disabled, styleType } = props;

  let textbuttonstyle;

  if (styleType === "visible") {
    textbuttonstyle = styles.button__text;
  } else if (styleType === "hidden") {
    textbuttonstyle = styles.button__text__hidden;
  }

  return (
    <button onClick={onClick} disabled={disabled} className={textbuttonstyle}>
      <span className={styles.icon}>{icon}</span>
      {children}
    </button>
  );
};

export default TextButton;
