import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import SvgButton from "../buttons/svgbutton";
import CheckSvg from "src/assets/svg/CheckSvg";
import CloseSvg from "src/assets/svg/CloseSvg";

import styles from "./index.module.scss";

const InputNewItem = ({ children, ...props }) => {
  const {
    value,
    onChange,
    addNewItem,
    handleHideInput,
    items,
    refInputNewItem,
    error,
    onBlur,
    onFocus,
  } = props;

  return (
    <div className={styles.input__container}>
      <div className={styles.input__wrapper}>
        <span className={styles.item__id}>{items.length + 1}</span>
        <TextareaAutosize
          ref={refInputNewItem}
          minRows={1}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={styles.input__item}
          placeholder="Type your item here..."
        />
        <div className={styles.input__buttons}>
          <SvgButton onClick={addNewItem}>
            <CheckSvg />
          </SvgButton>
          <SvgButton onClick={handleHideInput}>
            <CloseSvg />
          </SvgButton>
        </div>
      </div>
      <span className={styles.error__message}>{error}</span>
    </div>
  );
};

export default InputNewItem;
