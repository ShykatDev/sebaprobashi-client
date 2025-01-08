"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const PasswordTextInput = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <label htmlFor={props.label} className="font-semibold text-lg mb-1 block">
        {props.label}
      </label>
      <div className="flex items-center bg-background border border-gray-400 rounded-md pr-3 focus-within:outline overflow-hidden">
        <input
          type={isVisible ? "text" : "password"}
          {...props}
          className="w-full p-3 outline-none bg-background"
        />

        {isVisible ? (
          <EyeIcon
            className="size-5 cursor-pointer"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          />
        ) : (
          <EyeSlashIcon
            className="size-5 cursor-pointer"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordTextInput;
