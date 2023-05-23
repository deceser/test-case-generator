import React from "react";

import SvgButton from "../buttons/svgbutton";
import CloseSvg from "../../../assets/svg/CloseSvg";

import styles from "./index.module.scss";

const TextFieldUi = ({ ...props }) => {
  const {
    placeholder,
    value,
    onChange,
    onBlur,
    handleClearInput,
    disabled,
    error,
    refRequireInput,
  } = props;

  return (
    <div className={styles.wrapper__textarea}>
      <textarea
        ref={refRequireInput}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={styles.textarea}
      />
      <span className={styles.error__message}>{error}</span>
      <div className={!value || disabled ? styles.button__hidden : styles.button__textarea}>
        <SvgButton disabled={disabled} onClick={handleClearInput}>
          <CloseSvg />
        </SvgButton>
      </div>
    </div>
  );
};

export default TextFieldUi;
