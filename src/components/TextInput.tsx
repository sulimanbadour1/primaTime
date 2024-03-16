import React, { forwardRef, ChangeEvent, FocusEvent } from "react";
import { TiDelete } from "react-icons/ti";

interface TextInputProps {
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { value = "", onChange, disabled, error, onFocus, onBlur, onClear },
    ref
  ) => {
    return (
      <div className="relative flex flex-col space-y-4 justify-center items-center">
        <div className="relative">
          <input
            title="input-text"
            aria-label="input-text"
            type="text"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={
              error
                ? "input-text bg-white border border-red-500 rounded-md px-4 py-2 w-80 text-black focus:outline-none"
                : disabled
                ? "input-text bg-gray-200 border border-gray-300 rounded-md px-4 py-2 w-80 text-black cursor-not-allowed"
                : "input-text bg-white border border-gray-300 rounded-md px-4 py-2 w-80 text-black focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
            }
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref}
            placeholder="Type here..."
          />
          {value && !disabled && (
            <TiDelete
              onClick={onClear}
              className="text-[34px] text-slate-800 absolute bottom-1 right-1 items-center justify-center flex cursor-pointer opacity-55 hover:opacity-100"
            />
          )}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
    );
  }
);

TextInput.displayName = "TextInput"; // It's good practice to set a displayName when using forwardRef

export default TextInput;
