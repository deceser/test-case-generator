import React from "react";

export const useValidation = (validationRules) => {
  const [isValid, setIsValid] = React.useState(true);
  const [isDirty, setIsDirty] = React.useState(false);
  const [isSpecialCondition, setSpecialCondition] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState([]);

  const validateRule = (value) => {
    const regex = /^(?!\s+$).+/;

    const { minLength, maxLength, errorMessage, required } = validationRules;

    setIsValid(true);
    setErrorMessages([]);

    if (value.length < 1) {
      setIsValid(false);
      setErrorMessages([required]);
      return;
    }

    if (value.length < minLength || value.length > maxLength) {
      setIsValid(false);
      setErrorMessages([errorMessage]);
      return;
    }

    if (!regex.test(value)) {
      setIsValid(false);
      setErrorMessages([errorMessage]);
      return;
    }
  };

  const resetErrors = () => {
    setErrorMessages([]);
  };

  return {
    isValid,
    errorMessages,
    setErrorMessages,
    validateRule,
    isDirty,
    setIsDirty,
    isSpecialCondition,
    setSpecialCondition,
    resetErrors,
  };
};
