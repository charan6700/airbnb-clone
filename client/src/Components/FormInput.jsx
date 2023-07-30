import { useState } from "react";

export default function FormInput({
  labelText,
  inputValue,
  setInputValue,
  isLast,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={
        "relative w-full" +
        (isFocused ? " black-shadow rounded-lg" : "") +
        (!isLast ? " border-b border-neutral-400" : "")
      }
    >
      <label htmlFor="addressInput" className="relative w-full">
        <div
          className={
            "absolute top-3 left-3 pointer-events-none font-[375] text-neutral-500" +
            (isFocused || inputValue
              ? " input-label-selected"
              : " input-label-unselected")
          }
        >
          {labelText}
        </div>
        <div className="flex">
          <input
            type="text"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full outline-none mt-5 mx-3 mb-3"
            id="addressInput"
            value={inputValue}
            onChange={(ev) => {
              setInputValue(ev.target.value);
            }}
          />
        </div>
      </label>
    </div>
  );
}
