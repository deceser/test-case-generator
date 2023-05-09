import React from "react";

import styles from "./index.module.scss";

const CheckBoxUi = ({ ...props }) => {
  const { checked, onChange } = props;
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CheckBoxUi;
