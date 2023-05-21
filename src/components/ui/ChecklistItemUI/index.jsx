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
    showInput,
    disabled,
    handleChangeCheckbox,
    handleClearNewData,
    handleUpdateItem,
  } = props;

  const textareaRef = React.useRef(null);

  const handleEditButtonClick = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      const textLength = textarea.value.length;
      textarea.setSelectionRange(textLength, textLength);
    }

    handleEditItem();
  };

  const typeStyleItem = [styles.inputItemChecklist];

  if (readOnly && !checked) {
    typeStyleItem.push(styles.disabled);
  } else if (!readOnly) {
    typeStyleItem.push(styles.active);
  } else {
    typeStyleItem.push(styles.inputItemChecklist);
  }

  return (
    <div className={typeStyleItem.join(" ")}>
      <span className={styles.item__id}>{id}</span>
      <TextareaAutosize
        minRows={1}
        maxLength={300}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={styles.item}
        placeholder="Type your item here..."
      />

      {readOnly ? (
        <div className={styles.item__buttons}>
          <SvgButton
            disabled={showInput || disabled}
            onClick={handleEditButtonClick}
          >
            <EditSvg />
          </SvgButton>
          <CheckBoxUi
            disabled={showInput || disabled}
            checked={checked}
            onChange={handleChangeCheckbox}
          />
        </div>
      ) : (
        <div className={styles.item__buttons}>
          <SvgButton disabled={value.length < 3} onClick={handleUpdateItem}>
            <CheckSvg />
          </SvgButton>
          <SvgButton onClick={handleClearNewData}>
            <CloseSvg />
          </SvgButton>
        </div>
      )}
    </div>
  );
};

export default ChecklistItemUI;
