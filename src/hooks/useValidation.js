import React from "react";

export const useValidation = (validationSettings) => {
  const [isValid, setIsValid] = React.useState(true);
  const [errorMessages, setErrorMessages] = React.useState([]);
  const [isDirty, setIsDirty] = React.useState(false);
  const [isTouched, setTouched] = React.useState(false);

  const validateRule = (value, customErrorMessages = []) => {
    const regex = /^(?!\s+$).+/;

    const { minLength, maxLength, errorMessage, required } = validationSettings;

    if (value.length === 0) {
      setIsValid(false);
      setErrorMessages([required, ...customErrorMessages]);
    } else if (value.length < minLength || value.length > maxLength) {
      setIsValid(false);
      setErrorMessages([errorMessage, ...customErrorMessages]);
    } else if (!regex.test(value)) {
      setIsValid(false);
      setErrorMessages([errorMessage, ...customErrorMessages]);
    } else {
      setIsValid(true);
      setErrorMessages([...customErrorMessages]);
    }
  };

  const resetErrors = () => {
    setErrorMessages([]);
  };

  return {
    isValid,
    errorMessages,
    validateRule,
    isDirty,
    setIsDirty,
    isTouched,
    setTouched,
    resetErrors,
  };
};
