import React from "react";

import styles from "./index.module.scss";

const CheckBoxUi = ({ ...props }) => {
  const { checked, onChange, disabled, showInput } = props;
  return (
    <label
      className={
        disabled || showInput ? styles.checkbox__disabled : styles.checkbox
      }
    >
      <input
        disabled={disabled || showInput}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CheckBoxUi;
