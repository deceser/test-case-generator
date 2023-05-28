import React from "react";

import ChecklistItemUI from "src/components/ui/ChecklistItemUI";

import styles from "./index.module.scss";

const ItemList = ({ ...props }) => {
  const {
    items,
    showInput,
    disabledAllItem,
    handleChangeCheckbox,
    handleEditItem,
    handleChangeItem,
    handleBlurItem,
    handleFocusItem,
    handleUpdateItem,
    shouldDisplayError,
    errorMessages,
  } = props;

  return (
    <div className={styles.item}>
      {items.map((i, index) => (
        <ChecklistItemUI
          key={i.id}
          itemId={i.id}
          id={index + 1}
          value={i.name}
          showInput={showInput}
          disabledAllItem={disabledAllItem(items)}
          checked={i.isActive}
          readOnly={!i.isEdit}
          handleEditItem={() => handleEditItem(i.id)}
          onChange={(e) => handleChangeItem(e, i)}
          handleChangeCheckbox={() => handleChangeCheckbox(i.id, i.isActive)}
          onBlur={(e) => handleBlurItem(e, i.id)}
          onFocus={(e) => handleFocusItem(e)}
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
