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
    handleUpdateItem,
  } = props;

  return (
    <div className={styles.item}>
      {items.map((i, index) => (
        <ChecklistItemUI
          key={i.id}
          id={index + 1}
          value={i.name}
          showInput={showInput}
          disabled={disabledItem(items)}
          checked={i.isActive}
          readOnly={!i.isEdit}
          handleEditItem={() => handleEditItem(i.id)}
          onChange={(e) => handleChangeItem(e, i)}
          handleChangeCheckbox={() => handleChangeCheckbox(i.id, i.isActive)}
          handleClearNewData={() => handleEditItem(i.id)}
          handleUpdateItem={() => handleUpdateItem(i.id)}
        />
      ))}
    </div>
  );
};

export default ItemList;
