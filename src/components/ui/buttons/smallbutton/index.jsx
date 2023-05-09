import React from "react";

import styles from "./index.module.scss";

const SmallButton = ({ children, ...props }) => {
  const { styleType, onClick, disabled } = props;

  let smallbuttonstyle;

  if (styleType === "main") {
    smallbuttonstyle = styles.button__small__main;
  } else if (styleType === "secondary") {
    smallbuttonstyle = styles.button__small__secondary;
  }

  return (
    <button onClick={onClick} disabled={disabled} className={smallbuttonstyle}>
      {children}
    </button>
  );
};

export default SmallButton;
