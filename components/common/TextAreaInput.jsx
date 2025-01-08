'use client'

import { useTranslation } from "react-i18next";

const TextAreaInput = (props) => {
  const {t} = useTranslation();
  return (
    <div>
      <label htmlFor={props.label} className="font-semibold text-lg mb-1 block">
        {t(props.label)}
      </label>
      <div className="flex items-center border border-gray-400 overflow-hidden rounded-md focus-within:outline">
        <textarea
          {...props}
          rows={5}
          className="w-full p-3 outline-none bg-white/[0.5]"
        />
      </div>
    </div>
  );
};

export default TextAreaInput;
