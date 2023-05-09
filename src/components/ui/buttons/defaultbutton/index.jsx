import React from "react";

import styles from "./index.module.scss";

const DefaultButton = ({ children, ...props }) => {
  const { styleType, type, onClick, disabled } = props;

  let defaultbuttonstyle;

  if (styleType === "main") {
    defaultbuttonstyle = styles.button__default__main;
  } else if (styleType === "secondary") {
    defaultbuttonstyle = styles.button__default__secondary;
  }

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={defaultbuttonstyle}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
