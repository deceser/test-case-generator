import React from "react";

export const useValidation = (validationSettings) => {
  const [isValid, setIsValid] = React.useState(true);
  const [errorMessages, setErrorMessages] = React.useState([]);

  const validateRule = (value, customErrorMessages = []) => {
    const regex = /^(?!\s+$).+/;

    const { minLength, maxLength, errorMessage } = validationSettings;

    if (value.length === 0) {
      setIsValid(false);
      setErrorMessages(["The requirement field is required.", ...customErrorMessages]);
    } else if (value.length < minLength || value.length > maxLength) {
      setIsValid(false);
      setErrorMessages([errorMessage, ...customErrorMessages]);
    } else if (!regex.test(requirement)) {
      setIsValid(false);
      setErrorMessages([errorMessage, ...customErrorMessages]);
    } else {
      setIsValid(true);
      setErrorMessages([...customErrorMessages]);
    }
  };

  return {
    isValid,
    errorMessages,
    validateRule,
  };
};
