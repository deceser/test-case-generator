import React from "react";

import ChecklistItemUI from "../../../ui/item";

import styles from "./index.module.scss";

const ItemList = ({ ...props }) => {
  const {
    items,
    handleChangeCheckbox,
    handleDeleteItem,
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
          checked={i.isActive}
          readOnly={!i.isEdit}
          handleEditItem={() => handleEditItem(i.id)}
          onChange={(e) => handleChangeItem(e, i)}
          handleChangeCheckbox={() => handleChangeCheckbox(i.id, i.isActive)}
          handleDeleteItem={() => handleDeleteItem(i.id)}
          handleUpdateItem={() => handleUpdateItem(i.id)}
        />
      ))}
    </div>
  );
};

export default ItemList;
