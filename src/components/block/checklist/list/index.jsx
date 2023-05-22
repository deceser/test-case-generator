import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewItem, updatedItem, toggleStatus, toggleStatusAll } from "../../../../redux/slices/itemSlice";

import { toggleEdit, onChangeItemUpdate } from "../../../../redux/slices/itemSlice";

import { useInput } from "../../../../hooks/useInput";
import { useValidation } from "../../../../hooks/useValidation";

import { validationRuleNewItem } from "../../../../utils/validation/fields";

import ChecklistItem from "../ChecklistItem";

import TextButton from "../../../ui/buttons/textbutton";
import CheckBoxUi from "../../../ui/checkbox";
import InputNewItem from "../../../ui/inputnewitem";

import PlusSvg from "../../../../assets/svg/PlusSvg";
import EyeSvg from "../../../../assets/svg/EyeSvg";
import HideEyeSvg from "../../../../assets/svg/HideEyeSvg";

import styles from "./index.module.scss";

const CheckList = ({ ...props }) => {
  const { checklistId, filteredItems, showItem, toggleShowItem } = props;

  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const isAllSelected = useSelector((state) => state.items.isAllSelected);

  const [disabledNewItem, setDisabledNewItem] = React.useState(false);

  const handleEditItem = (id) => {
    dispatch(toggleEdit({ id }));
    setDisabledNewItem(true);
  };

  const handleChangeCheckbox = (id) => {
    dispatch(toggleStatus(id));
  };

  const handleChangeAllCheckboxes = () => {
    dispatch(toggleStatusAll());
  };

  const [showInput, setShowInput] = React.useState(false);
  const refInputNewItem = React.useRef(null);
  const useInputNewItem = useInput("", false);

  const { isValid, errorMessages, validateRule, isDirty, setIsDirty, isTouched, setTouched } =
    useValidation(validationRuleNewItem);

  const onBlurItemInput = (event, id) => {
    setTouched(true);
    if (isDirty) {
      const updatedValue = event.target.value;
      const item = { id, name: updatedValue };
      dispatch(onChangeItemUpdate(item));
      validateRule(updatedValue);
    }
  };

  const handleChangeItem = (event, id) => {
    const updatedValue = event.target.value;
    const item = { id, name: updatedValue };
    dispatch(onChangeItemUpdate(item));
    setIsDirty(true);
  };

  const handleSubmitUpdateItem = (id) => {
    const item = items.find((i) => i.id === id);
    dispatch(updatedItem(item));
    setDisabledNewItem(false);
  };

  const handleNewItemBlur = () => {
    setTouched(true);
    if (isDirty) {
      validateRule(useInputNewItem.value);
    }
  };

  const handleHideInput = () => {
    setShowInput(!showInput);
    useInputNewItem.setValue("");
    setTimeout(() => {
      refInputNewItem.current.focus();
    });
  };

  const addItem = () => {
    const trimmedValue = useInputNewItem.value.trim().replace(/\n\s+/g, "\n");
    const item = { name: trimmedValue, checkListId: checklistId };
    if (!trimmedValue || trimmedValue.length < 3 || trimmedValue.length > 300) {
      setTouched(true);
      setIsDirty(true);
      validateRule(trimmedValue);
    } else {
      dispatch(addNewItem(item));
      handleHideInput();
      useInputNewItem.setValue("");
    }
  };

  const handleNewItemChange = (event) => {
    useInputNewItem.onChange(event);
    setIsDirty(true);
  };

  const shouldDisplayError = () => {
    return isDirty && isTouched && !isValid;
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
            showInput={showInput}
            disabled={disabledItem(filteredItems)}
            checked={isAllSelected}
            onChange={handleChangeAllCheckboxes}
          />
        </div>
      </div>
      <ChecklistItem
        onBlurItemInput={onBlurItemInput}
        items={filteredItems}
        showInput={showInput}
        disabledItem={disabledItem}
        handleChangeCheckbox={handleChangeCheckbox}
        handleEditItem={handleEditItem}
        handleUpdateItem={handleSubmitUpdateItem}
        handleChangeItem={handleChangeItem}
        error={
          shouldDisplayError() &&
          errorMessages.map((errorMessage, index) => <React.Fragment key={index}>{errorMessage}</React.Fragment>)
        }
      />

      <div className={showInput ? styles.newItem__visible : styles.newItem__hidden}>
        <InputNewItem
          refInputNewItem={refInputNewItem}
          addNewItem={addItem}
          items={filteredItems}
          value={useInputNewItem.value}
          handleHideInput={handleHideInput}
          onChange={handleNewItemChange}
          onBlur={handleNewItemBlur}
          // error={
          //   shouldDisplayError() &&
          //   errorMessages.map((errorMessage, index) => <React.Fragment key={index}>{errorMessage}</React.Fragment>)
          // }
        />
      </div>
      <div className={styles.checklist__bottom}>
        <div className={styles.bottom__left}>
          <TextButton styleType="visible" icon={<PlusSvg />} onClick={handleHideInput} disabled={showInput || disabledNewItem}>
            Add your item
          </TextButton>
          <TextButton
            styleType={!isAllSelected ? "visible" : "hidden"}
            onClick={toggleShowItem}
            icon={!showItem ? <HideEyeSvg /> : <EyeSvg />}
          >
            {!showItem ? "Hide disabled" : "Show disabled"}
          </TextButton>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
