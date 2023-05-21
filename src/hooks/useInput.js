import React from "react";

export const useInput = (initialValue, shouldSave = true) => {
  const [value, setValue] = React.useState(() => {
    const savedValue = shouldSave ? localStorage.getItem("inputValue") : null;
    return savedValue || initialValue;
  });

  const onChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (shouldSave) {
      localStorage.setItem("inputValue", newValue);
    }
  };

  const clearInput = () => {
    if (shouldSave) {
      localStorage.removeItem("inputValue");
      setValue("");
    }
  };

  return React.useMemo(
    () => ({
      value,
      setValue,
      onChange,
      clearInput,
    }),
    [value, setValue, onChange, clearInput],
  );
};
