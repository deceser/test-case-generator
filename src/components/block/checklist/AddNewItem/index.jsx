import React from "react";
import { useDispatch } from "react-redux";

import { addNewItem } from "../../../../redux/slices/itemSlice";

import { useInput } from "../../../../hooks/useInput";
import { useValidation } from "../../../../hooks/useValidation";

import { validationRuleNewItem } from "../../../../utils/validation/fields";

import InputNewItem from "../../../ui/inputnewitem";

const AddNewItem = ({ ...props }) => {
  const { checklistId, filteredItems, setShowNewItemInput, showNewItemInput } = props;
  const dispatch = useDispatch();

  const refInputNewItem = React.useRef(null);
  const useInputNewItem = useInput("", false);

  const { isValid, errorMessages, validateRule, isDirty, setIsDirty, isTouched, setTouched, resetErrors } =
    useValidation(validationRuleNewItem);

  const handleHideInput = () => {
    setShowNewItemInput(!showNewItemInput);
    useInputNewItem.setValue("");
    setTimeout(() => {
      refInputNewItem.current.focus();
    });
    resetErrors();
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

  const handleNewItemBlur = () => {
    setTouched(true);
    if (isDirty) {
      validateRule(useInputNewItem.value);
    }
  };

  const handleNewItemChange = (event) => {
    useInputNewItem.onChange(event);
    setIsDirty(true);
  };

  const shouldDisplayError = () => {
    return isDirty && isTouched && !isValid;
  };

  return (
    <InputNewItem
      refInputNewItem={refInputNewItem}
      addNewItem={addItem}
      items={filteredItems}
      value={useInputNewItem.value}
      handleHideInput={handleHideInput}
      onChange={handleNewItemChange}
      onBlur={handleNewItemBlur}
      error={
        shouldDisplayError() &&
        errorMessages.map((errorMessage, index) => <React.Fragment key={index}>{errorMessage}</React.Fragment>)
      }
    />
  );
};

export default AddNewItem;
