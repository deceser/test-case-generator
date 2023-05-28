import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updatedItem, toggleStatus, toggleStatusAll } from "../../../../redux/slices/itemSlice";
import { toggleEdit, onChangeItemUpdate } from "../../../../redux/slices/itemSlice";

import { useValidation } from "../../../../hooks/useValidation";
import { validationRuleChecklistItem } from "../../../../utils/validation/fields";

import AddNewItem from "../AddNewItem";
import ChecklistItem from "../ChecklistItem";

import TextButton from "../../../ui/buttons/textbutton";
import CheckBoxUi from "../../../ui/checkbox";

import PlusSvg from "../../../../assets/svg/PlusSvg";
import EyeSvg from "../../../../assets/svg/EyeSvg";
import HideEyeSvg from "../../../../assets/svg/HideEyeSvg";

import styles from "./index.module.scss";

const CheckList = ({ ...props }) => {
  const { checklistId, filteredItems, showItem, toggleShowItem } = props;

  const dispatch = useDispatch();
  const isAllSelected = useSelector((state) => state.items.isAllSelected);

  const [disabledNewItem, setDisabledNewItem] = React.useState(false);
  const [showNewItemInput, setShowNewItemInput] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);

  const { isValid, errorMessages, validateRule, isDirty, setIsDirty, isTouched, setTouched, resetErrors } =
    useValidation(validationRuleChecklistItem);

  const handleEditItem = (id) => {
    dispatch(toggleEdit({ id }));
    resetErrors();
    setSelectedItemId(id);

    setDisabledNewItem((prevDisabled) => !prevDisabled);
  };

  const handleBlurItem = (event, id) => {
    setTouched(true);
    if (isDirty) {
      const updatedValue = event.target.value;
      const item = { id, name: updatedValue };
      dispatch(onChangeItemUpdate(item));
      validateRule(updatedValue);
    }
  };

  const handleChangeItem = (event, i) => {
    const updatedValue = event.target.value;
    const item = { ...i, name: updatedValue };
    dispatch(onChangeItemUpdate(item));
  };

  const handleSubmitUpdateItem = (i) => {
    const trimmedValue = i.name.trim().replace(/\n\s+/g, "\n");
    const item = { ...i, name: trimmedValue };
    if (!trimmedValue || trimmedValue.length < 3 || trimmedValue.length > 300) {
      setTouched(true);
      setIsDirty(true);
      validateRule(trimmedValue);
    } else {
      dispatch(updatedItem({ item, trimmedValue }));
      setDisabledNewItem(false);
    }
  };

  const handleChangeCheckbox = (id) => {
    dispatch(toggleStatus(id));
  };

  const handleChangeAllCheckboxes = () => {
    dispatch(toggleStatusAll());
  };

  const handleShowInput = () => {
    setShowNewItemInput(!showNewItemInput);
  };

  const shouldDisplayError = (id) => {
    if (id === selectedItemId) {
      return isDirty && isTouched && !isValid;
    }
  };

  const disabledItem = () => filteredItems.some((i) => i.isEdit);

  return (
    <div className={styles.checklist}>
      <div className={styles.checklist__top}>
        <div className={styles.top__left}>
          <span className={styles.top__left__box}>
            <h4>Id</h4>
          </span>
          <h4>Checklist items</h4>
        </div>
        <div className={styles.top__right}>
          <h4>Select all</h4>
          <CheckBoxUi
            showInput={showNewItemInput}
            disabled={disabledItem(filteredItems)}
            checked={isAllSelected}
            onChange={handleChangeAllCheckboxes}
          />
        </div>
      </div>
      <ChecklistItem
        items={filteredItems}
        showInput={showNewItemInput}
        disabledItem={disabledItem}
        handleChangeCheckbox={handleChangeCheckbox}
        handleEditItem={handleEditItem}
        handleUpdateItem={handleSubmitUpdateItem}
        handleChangeItem={handleChangeItem}
        handleBlurItem={handleBlurItem}
        errorMessages={errorMessages}
        shouldDisplayError={shouldDisplayError}
      />
      <div className={showNewItemInput ? styles.newItem__visible : styles.newItem__hidden}>
        <AddNewItem
          checklistId={checklistId}
          filteredItems={filteredItems}
          showNewItemInput={showNewItemInput}
          setShowNewItemInput={setShowNewItemInput}
        />
      </div>
      <div className={styles.checklist__bottom}>
        <div className={styles.bottom__left}>
          <TextButton
            styleType="visible"
            icon={<PlusSvg />}
            onClick={handleShowInput}
            disabled={showNewItemInput || disabledNewItem}
          >
            Add your item
          </TextButton>
          <TextButton
            styleType={!isAllSelected ? "visible" : "hidden"}
            onClick={toggleShowItem}
            icon={showItem ? <EyeSvg /> : <HideEyeSvg />}
          >
            {showItem ? "Show disabled" : "Hide disabled"}
          </TextButton>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
