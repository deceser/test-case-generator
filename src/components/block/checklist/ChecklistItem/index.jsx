import React from "react";

import { useDispatch } from "react-redux";

import { addNewItem, updatedItem, toggleStatus, toggleStatusAll, onChangeItemUpdate } from "../../../../redux/slices/itemSlice";

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
    onBlurItemInput,
    error,
  } = props;

  // ---

  const dispatch = useDispatch();

  const dispatchToUpdateItemObject = (event, id) => {
    dispatch(
      onChangeItemUpdate({
        ...items.find((x) => x.id === id),
        name: event.target.value,
      })
    );
  };

  const onFocusItem = (event, id) => {
    dispatchToUpdateItemObject(event, id);
  };
  const onChangeItem = (event, id) => {
    dispatchToUpdateItemObject(event, id);
  };
  const onBlurItem = (event, id) => {
    dispatchToUpdateItemObject(event, id);
    validateItem();
  };

  // ---

  const validateItem = () => {};

  // ---

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
          // onChange={(e) => handleChangeItem(e, i.id)}
          // onBlur={(e) => onBlurItemInput(e, i.id)}
          onFocus={(e) => onFocusItem(e, i.id)}
          onChange={(e) => onChangeItem(e, i.id)}
          onBlur={(e) => onBlurItem(e, i.id)}
          handleChangeCheckbox={() => handleChangeCheckbox(i.id, i.isActive)}
          handleClearNewData={() => handleEditItem(i.id)}
          handleUpdateItem={() => handleUpdateItem(i.id)}
          error={error}
        />
      ))}
    </div>
  );
};

export default ItemList;
