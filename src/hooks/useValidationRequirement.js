import React from "react";

export const useRequirementValidation = () => {
  const [validRequirement, setValidRequirement] = React.useState(true);
  const [errorMessages, setErrorMessages] = React.useState([]);

  const validateRequirement = (requirement) => {
    const requirementMinLength = 5;
    const requirementMaxLength = 2500;
    const requirementErrorMessage = "The requirement must be between 5 and 2500 characters.";
    const requirementRegex = /^(?!\s+$).+/;

    if (requirement.length === 0) {
      setValidRequirement(false);
      setErrorMessages(["The requirement field is required."]);
    } else if (requirement.length < requirementMinLength || requirement.length > requirementMaxLength) {
      setValidRequirement(false);
      setErrorMessages([requirementErrorMessage]);
    } else if (!requirementRegex.test(requirement)) {
      setValidRequirement(false);
      setErrorMessages([requirementErrorMessage]);
    } else {
      setValidRequirement(true);
      setErrorMessages([]);
    }
  };

  return {
    validRequirement,
    errorMessages,
    validateRequirement,
  };
};
