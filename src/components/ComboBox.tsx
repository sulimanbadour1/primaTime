import React, { useState, useEffect, useRef } from "react";
import { University } from "../types";
import { useUniversities } from "../utils/useUniversities";
import TextInput from "./TextInput";

interface ComboBoxProps {
  onChange: (value: string) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({ onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(
    null
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Track if the input is focused
  const comboBoxRef = useRef<HTMLDivElement>(null);

  const {
    data: universities,
    isLoading,
    isError,
  } = useUniversities(isFocused && !inputValue ? " " : inputValue);

  useEffect(() => {
    // Display the dropdown when the component is focused
    setIsDropdownVisible(isFocused);
  }, [isFocused, inputValue]);

  const handleSelectUniversity = (universityName: string) => {
    setSelectedUniversity(universityName);
    setIsDropdownVisible(false);
    setIsFocused(false); // Remove focus when a selection is made
    setInputValue(universityName);
    onChange(universityName);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      setIsDropdownVisible(false);
    }, 200);
  };

  return (
    <div className="relative" ref={comboBoxRef}>
      <TextInput
        value={selectedUniversity || inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setSelectedUniversity(null);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClear={() => {
          setInputValue("");
          setSelectedUniversity(null);
          setIsDropdownVisible(false);
        }}
      />
      {isDropdownVisible && (
        // Dropdown list
        <div
          className="absolute bg-slate-800 border border-slate-200 rounded overflow-y-auto z-10 px-4 py-2"
          style={{ width: "100%", maxHeight: "300px" }}
        >
          {isLoading ? (
            <div className="text-slate-200 font-semibold">Loading...</div>
          ) : isError ? (
            <div className="text-red-500">Error loading data</div>
          ) : (universities || []).length > 0 ? (
            universities?.map((university: University) => (
              <div
                key={university.name}
                onClick={() => handleSelectUniversity(university.name)}
                className="p-2.5 cursor-pointer hover:bg-gray-600 text-white border-b border-slate-200 transition duration-150 ease-in-out truncate"
              >
                {university.name}
              </div>
            ))
          ) : (
            <div className="text-white text-sm">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
