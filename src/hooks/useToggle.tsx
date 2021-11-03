import React from "react";

export const useToggle = (
  defaultValue: boolean
): [boolean, (inputValue?: boolean | undefined) => void] => {
  const [value, setValue] = React.useState(defaultValue);

  const toggleValue = React.useCallback((inputValue?: boolean) => {
    setValue((currentValue) =>
      typeof inputValue === "boolean" ? inputValue : !currentValue
    );
  }, []);

  return [value, toggleValue];
};
