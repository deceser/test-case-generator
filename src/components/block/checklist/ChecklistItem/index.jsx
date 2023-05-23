import React from "react";

import ChecklistItemUI from "../../../ui/ChecklistItemUI";

import styles from "./index.module.scss";

const ItemList = ({ ...props }) => {
  const {
    items,
    showInput,
    disabledItem,
    handleChangeCheckbox,
    handleEditItem,
    handleChangeItem,
    handleBlurItem,
    handleUpdateItem,
    shouldDisplayError,
    errorMessages,
  } = props;

  console.log(errorMessages);

  return (
    <div className={styles.item}>
      {items.map((i, index) => (
        <ChecklistItemUI
          key={i.id}
          itemId={i.id}
          id={index + 1}
          value={i.name}
          showInput={showInput}
          disabled={disabledItem(items)}
          checked={i.isActive}
          readOnly={!i.isEdit}
          handleEditItem={() => handleEditItem(i.id)}
          onChange={(e) => handleChangeItem(e, i)}
          handleChangeCheckbox={() => handleChangeCheckbox(i.id, i.isActive)}
          onBlur={(e) => handleBlurItem(e, i.id)}
          handleClearNewData={() => handleEditItem(i.id)}
          handleUpdateItem={() => handleUpdateItem(i)}
          shouldDisplayError={() => shouldDisplayError(i.id)}
          errorMessages={errorMessages}
        />
      ))}
    </div>
  );
};

export default ItemList;
