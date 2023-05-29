import React from "react";
import { useDispatch } from "react-redux";

import { addNewItem } from "src/redux/slices/itemSlice";

import { useInput } from "src/hooks/useInput";
import { useValidation } from "src/hooks/useValidation";

import { validationRuleNewItem } from "src/utils/validation/fields";

import InputNewItem from "src/components/ui/inputNewItem";

const AddNewItem = ({ ...props }) => {
  const { checklistId, filteredItems, setShowNewItemInput, showNewItemInput } = props;
  const dispatch = useDispatch();

  const refInputNewItem = React.useRef(null);
  const useInputNewItem = useInput("", false);

  const { errorMessages, validateRule, isDirty, setIsDirty, isSpecialCondition, setSpecialCondition, resetErrors } =
    useValidation(validationRuleNewItem);

  React.useEffect(() => {
    if (showNewItemInput && refInputNewItem.current) {
      refInputNewItem.current.focus();
      setIsDirty(true);
      validateRule(validationRuleNewItem);
    }
  }, [showNewItemInput]);

  const doValidation = (event) => {
    useInputNewItem.onChange(event);
    const updatedValue = event.target.value;
    if (!isDirty && !isSpecialCondition) return;
    validateRule(updatedValue);
  };

  const handleNewItemFocus = (event) => {
    useInputNewItem.onChange(event);
    if (event.target.value.length < 1);
    doValidation(event);
  };

  const handleNewItemChange = (event) => {
    useInputNewItem.onChange(event);
    if ((isSpecialCondition && event.target.value.length < 300) || (isSpecialCondition && event.target.value.length > 3)) {
      if (!isSpecialCondition) setSpecialCondition(true);
      doValidation(event);
    }
  };

  const handleNewItemBlur = (event) => {
    useInputNewItem.onChange(event);
    if (event.target.value.length < 1 || 3) {
      setSpecialCondition(true);
      return;
    }
    setSpecialCondition(false);
    doValidation(event);
  };

  // -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const handleOnMouseOut = () => {
    console.log("handleOnMouseOut");
    setIsDirty(true);
    setSpecialCondition(true);
  };

  const handleOnMouseOver = () => {
    console.log("handleOnMouseOver");
    setIsDirty(false);
    setSpecialCondition(false);
  };

  // -=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const handleHideInput = () => {
    setShowNewItemInput(!showNewItemInput);
    useInputNewItem.setValue("");

    resetErrors();
    setIsDirty(false);
    setSpecialCondition(false);
  };

  const addItem = () => {
    const trimmedValue = useInputNewItem.value.trim().replace(/\n\s+/g, "\n");
    const item = { name: trimmedValue, checkListId: checklistId };
    if (!trimmedValue || trimmedValue.length < 3 || trimmedValue.length > 300) {
      setIsDirty(true);
      setSpecialCondition(true);
      validateRule(trimmedValue);
    } else {
      dispatch(addNewItem(item));
      handleHideInput();
    }
  };

  const shouldDisplayError = () => {
    return isDirty;
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
      onFocus={handleNewItemFocus}
      error={
        shouldDisplayError() &&
        errorMessages.map((errorMessage, index) => <React.Fragment key={index}>{errorMessage}</React.Fragment>)
      }
    />
  );
};

export default AddNewItem;
