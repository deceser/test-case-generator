import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import SvgButton from "../buttons/svgbutton";
import EditSvg from "../../../assets/svg/EditSvg";
import CheckSvg from "../../../assets/svg/CheckSvg";
import CloseSvg from "../../../assets/svg/CloseSvg";
import CheckBoxUi from "../checkbox";

import styles from "./index.module.scss";

const ChecklistItemUI = ({ children, ...props }) => {
  const {
    id,
    value,
    onChange,
    handleEditItem,
    readOnly,
    checked,
    handleChangeCheckbox,
    handleDeleteItem,
    handleUpdateItem,
  } = props;

  const typeStyleItem = [styles.item__wrapper];

  if (!checked) {
    typeStyleItem.push(styles.item__disabled);
  }

  return (
    <div className={typeStyleItem.join(" ")}>
      <span className={styles.item__id}>{id}</span>
      <TextareaAutosize
        minRows={1}
        maxRows={2}
        maxLength={300}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={styles.item}
        placeholder="Type your item here..."
      />
      {readOnly ? (
        <div className={styles.item__buttons}>
          <SvgButton onClick={handleEditItem}>
            <EditSvg />
          </SvgButton>
          <CheckBoxUi checked={checked} onChange={handleChangeCheckbox} />
        </div>
      ) : (
        <div className={styles.item__buttons}>
          <SvgButton
            disabled={value.length < 3 ? true : false}
            onClick={handleUpdateItem}
          >
            <CheckSvg />
          </SvgButton>
          <SvgButton onClick={handleDeleteItem}>
            <CloseSvg />
          </SvgButton>
        </div>
      )}
    </div>
  );
};

export default ChecklistItemUI;
