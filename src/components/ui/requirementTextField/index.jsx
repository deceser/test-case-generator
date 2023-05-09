import React from "react";

import SvgButton from "../buttons/svgbutton";
import CloseSvg from "../../../assets/svg/CloseSvg";

import styles from "./index.module.scss";

const TextFieldUi = ({ ...props }) => {
  const { placeholder, value, onChange, handleClearInput } = props;

  return (
    <div className={styles.wrapper__textarea}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.textarea}
      />

      <div className={!value ? styles.button__hidden : styles.button__textarea}>
        <SvgButton onClick={handleClearInput}>
          <CloseSvg />
        </SvgButton>
      </div>
    </div>
  );
};

export default TextFieldUi;
