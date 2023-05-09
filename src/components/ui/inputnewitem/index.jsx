import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import SvgButton from "../buttons/svgbutton";
import CheckSvg from "../../../assets/svg/CheckSvg";
import CloseSvg from "../../../assets/svg/CloseSvg";

import styles from "./index.module.scss";

const ItemUi = ({ children, ...props }) => {
  const {
    value,
    onChange,
    addNewItem,
    handleHideInput,
    items,
    refInputNewItem,
  } = props;

  return (
    <div className={styles.input__wrapper}>
      <span className={styles.item__id}>{items.length + 1}</span>
      <TextareaAutosize
        ref={refInputNewItem}
        minRows={1}
        maxRows={2}
        maxLength={300}
        value={value}
        onChange={onChange}
        className={styles.input__item}
        placeholder="Type your item here..."
      />
      <div className={styles.input__buttons}>
        <SvgButton
          disabled={value.length < 3}
          onClick={addNewItem}
          type="submit"
        >
          <CheckSvg />
        </SvgButton>
        <SvgButton onClick={handleHideInput}>
          <CloseSvg />
        </SvgButton>
      </div>
    </div>
  );
};

export default ItemUi;
