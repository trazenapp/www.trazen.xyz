import React, { KeyboardEvent, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { X } from "lucide-react";

interface InputListProps {
  value?: string[];
  onChange: (items: string[]) => void;
  className?: string;
  maxItems?: number;
}

const InputList = ({
  value = [],
  onChange,
  className = "",
  maxItems,
}: InputListProps) => {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    const val = inputValue.trim();

    if (!val) return;

    if (value.includes(val)) {
      setInputValue("");
      return;
    }

    if (maxItems && value.length >= maxItems) {
      setInputValue("");
      return;
    }

    onChange([...value, val]);
    setInputValue("");
  };

  const removeItem = (index: number) => {
    const newItems = value.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-3.5">
      <Input
        type="email"
        id="email"
        className="border-[#434343] rounded-[8px] py-[19px] px-4"
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
        disabled={maxItems ? value.length >= maxItems : false}
      />
      {value.length > 0 ? (
        <div className="border border-[#430B68] rounded-[8px] p-3.5 w-full flex gap-x-3.5 gap-y-2 items-center flex-wrap">
          {value.map((item, index) => (
            <div
              key={item}
              className="bg-[#383838] flex gap-x-2.5 p-2.5 rounded-[4px]"
            >
              <p className="font-sans text-sm font-normal">{item}</p>
              <Button
                className="bg-transparent p-0"
                onClick={() => removeItem(index)}
              >
                <X size={12} />
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default InputList;
