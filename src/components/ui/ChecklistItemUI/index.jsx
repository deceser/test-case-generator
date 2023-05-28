import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import SvgButton from "../buttons/svgbutton";
import EditSvg from "src/assets/svg/EditSvg";
import CheckSvg from "src/assets/svg/CheckSvg";
import CloseSvg from "src/assets/svg/CloseSvg";
import CheckBoxUi from "../checkbox";

import styles from "./index.module.scss";

const ChecklistItemUI = ({ children, ...props }) => {
  const {
    id,
    itemId,
    value,
    onChange,
    onBlur,
    onFocus,
    handleEditItem,
    readOnly,
    checked,
    showInput,
    disabledAllItem,
    handleChangeCheckbox,
    handleClearNewData,
    handleUpdateItem,
    errorMessages,
    shouldDisplayError,
  } = props;

  const checklistItemRef = React.useRef(null);

  const handleEditButtonClick = () => {
    if (checklistItemRef.current) {
      const textarea = checklistItemRef.current;
      textarea.disabled = !readOnly;
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
  } else if (disabledAllItem) {
    typeStyleItem.push(styles.disabled);
  } else {
    typeStyleItem.push(styles.inputItemChecklist);
  }

  return (
    <>
      <div className={typeStyleItem.join(" ")}>
        <span className={styles.item__id}>{id}</span>
        <TextareaAutosize
          disabled={readOnly}
          minRows={1}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={styles.item}
          placeholder="Type your item here..."
          ref={checklistItemRef}
        />
        {readOnly ? (
          <div className={styles.item__buttons}>
            <SvgButton disabled={showInput || disabledAllItem} onClick={handleEditButtonClick}>
              <EditSvg />
            </SvgButton>
            <CheckBoxUi
              disabled={showInput || disabledAllItem}
              checked={checked}
              onChange={handleChangeCheckbox}
            />
          </div>
        ) : (
          <div className={styles.item__buttons}>
            <SvgButton onClick={handleUpdateItem}>
              <CheckSvg />
            </SvgButton>
            <SvgButton onClick={handleClearNewData}>
              <CloseSvg />
            </SvgButton>
          </div>
        )}
      </div>
      {shouldDisplayError(itemId) && (
        <>
          {errorMessages?.map((errorMessage, index) => (
            <span className={styles.error__message} key={index}>
              {errorMessage}
            </span>
          ))}
        </>
      )}
    </>
  );
};

export default ChecklistItemUI;
