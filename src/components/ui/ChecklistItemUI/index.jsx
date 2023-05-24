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
    itemId,
    value,
    onChange,
    onBlur,
    handleEditItem,
    readOnly,
    checked,
    showInput,
    disabled,
    handleChangeCheckbox,
    handleClearNewData,
    handleUpdateItem,
    errorMessages,
    shouldDisplayError,
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
    <>
      <div className={typeStyleItem.join(" ")}>
        <span className={styles.item__id}>{id}</span>
        <TextareaAutosize
          autoFocus
          minRows={1}
          maxLength={300}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          className={styles.item}
          placeholder="Type your item here..."
          ref={textareaRef}
        />
        {readOnly ? (
          <div className={styles.item__buttons}>
            <SvgButton disabled={showInput || disabled} onClick={handleEditButtonClick}>
              <EditSvg />
            </SvgButton>
            <CheckBoxUi disabled={showInput || disabled} checked={checked} onChange={handleChangeCheckbox} />
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
