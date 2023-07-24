import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updatedItem, toggleStatus, toggleStatusAll } from "src/redux/slices/itemSlice";
import { toggleEdit, onChangeItemUpdate } from "src/redux/slices/itemSlice";

import { useValidation } from "src/hooks/useValidation";
import { validationRuleChecklistItem } from "src/utils/validation/fields";
import { maxLengthChecklistItem, minLengthChecklistItem, removeSpaceLinePattern } from "src/utils/validation/validRules";

import AddNewItem from "../AddNewItem";
import ChecklistItem from "../ChecklistItem";

import TextButton from "src/components/ui/buttons/textbutton";
import CheckBoxUi from "src/components/ui/checkbox";

import PlusSvg from "src/assets/svg/PlusSvg";
import EyeSvg from "src/assets/svg/EyeSvg";
import HideEyeSvg from "src/assets/svg/HideEyeSvg";

import styles from "./index.module.scss";

const CheckList = ({ ...props }) => {
  const { checklistId, filteredItems, showItem, toggleShowItem } = props;

  const dispatch = useDispatch();
  const isAllSelected = useSelector((state) => state.items.isAllSelected);

  const [disabledNewItem, setDisabledNewItem] = React.useState(false);
  const [showNewItemInput, setShowNewItemInput] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);

  const { errorMessages, validateRule, isDirty, setIsDirty, isSpecialCondition, setSpecialCondition, resetErrors } =
    useValidation(validationRuleChecklistItem);

  const handleEditItem = (id) => {
    dispatch(toggleEdit({ id }));
    setSelectedItemId(id);

    setIsDirty(!disabledNewItem);
    setSpecialCondition(!disabledNewItem);

    setDisabledNewItem((prevDisabled) => !prevDisabled);
  };

  const doValidation = (event) => {
    const updatedValue = event.target.value;

    resetErrors();
    if (!isDirty) return;
    validateRule(updatedValue);
  };

  const handleBlurItem = async (event, id) => {
    const updatedValue = event.target.value;
    const item = { id, name: updatedValue };
    dispatch(onChangeItemUpdate(item));

    doValidation(event);
  };

  const handleFocusItem = (event) => {
    doValidation(event);
  };

  const handleChangeItem = (event, i) => {
    const updatedValue = event.target.value;
    const item = { ...i, name: updatedValue };
    dispatch(onChangeItemUpdate(item));

    if (isSpecialCondition || event.target.value.length > minLengthChecklistItem) {
      if (!isSpecialCondition) setSpecialCondition(true);
      doValidation(event);
    }
  };

  const handleSubmitUpdateItem = (i) => {
    const trimmedValue = i.name.trim().replace(removeSpaceLinePattern, "\n");
    const item = { ...i, name: trimmedValue };
    if (!trimmedValue || trimmedValue.length < minLengthChecklistItem || trimmedValue.length > maxLengthChecklistItem) {
      setIsDirty(true);
      setSpecialCondition(true);
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
      return isDirty;
    }
  };

  const disabledAllItem = () => filteredItems.some((i) => i.isEdit);

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
            checked={isAllSelected}
            showInput={showNewItemInput}
            onChange={handleChangeAllCheckboxes}
            disabled={disabledAllItem(filteredItems)}
          />
        </div>
      </div>
      <ChecklistItem
        items={filteredItems}
        showInput={showNewItemInput}
        disabledAllItem={disabledAllItem}
        handleEditItem={handleEditItem}
        handleChangeItem={handleChangeItem}
        handleBlurItem={handleBlurItem}
        handleFocusItem={handleFocusItem}
        handleUpdateItem={handleSubmitUpdateItem}
        errorMessages={errorMessages}
        shouldDisplayError={shouldDisplayError}
        handleChangeCheckbox={handleChangeCheckbox}
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
