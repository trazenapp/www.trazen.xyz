import React from "react";

export type FormCheckboxOptions = {
  label: string;
  value: string;
};

interface FormCheckboxProps {
  values: string[];
  options: FormCheckboxOptions[];
  className?: string;
  selectedIcon?: React.ReactNode;
  onChange?: (values: string[]) => void;
  maxSelected?: number;
}

const FormCheckbox = ({
  options,
  className,
  selectedIcon,
  onChange,
  values,
  maxSelected,
  ...props
}: FormCheckboxProps) => {
  const toggleValue = (val: string) => {
    if (values.includes(val)) {
      onChange?.(values.filter((v) => v !== val));
    } else {
      if (!maxSelected || values.length < maxSelected) {
        onChange?.([...values, val]);
      }
    }
  };

  return (
    <div className={`flex flex-wrap gap-4 ${className ?? ""}`}>
      {options.map((option) => {
        const isChecked = values.includes(option.value);
        const isDisabled =
          !isChecked &&
          maxSelected !== undefined &&
          values.length >= maxSelected;
        return (
          <label
            key={option.value}
            className={`
              cursor-pointer relative border rounded-full px-6 py-3 text-sm text-[#C4C4C4] font-medium transition-colors duration-200 ease-in-out w-fit flex items-center gap-x-2.5
              ${isChecked ? "border-[#430B68] bg-[#430B6833]" : "border-[#434343] bg-transparent"}
              ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <input
              type="checkbox"
              value={option.value}
              className="sr-only"
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => toggleValue(option.value)}
              {...props}
            />
            {isChecked && selectedIcon && (
              <div className="flex items-center justify-center">
                {selectedIcon}
              </div>
            )}
            {option.label}
          </label>
        );
      })}
    </div>
  );
};

export default FormCheckbox;
