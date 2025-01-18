"use client";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const FileInput = ({
  htmlFor,
  label,
  name,
  value,
  onFileChange,
  required = true,
  error,
}) => {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const {t} = useTranslation();

  const handleFileOpen = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
    onFileChange(event.target.files[0]);
  };

  const handleRemove = (event) => {
    event.preventDefault();
    setPreview(null);
    onFileChange(null)
  };

  return (
    <div>
      <label htmlFor={htmlFor} className="font-semibold text-lg mb-1 block">
        {t(label) || "Upload File"}
        {required && <span className={"text-red-500 ml-1"}>*</span>}
      </label>
      {preview ? (
        <div className="mt-2 rounded-md  flex justify-center items-center w-full relative bg-gray-100 py-4">
          <Image
            alt="logo"
            src={preview}
            width={400}
            height={400}
            className="rounded-xl w-40"
          />
          <button
            type="button"
            className="absolute top-2 right-2 p-1 rounded-full bg-red-600"
            onClick={handleRemove}
          >
            <XMarkIcon className="size-4 font-bold text-white " />
          </button>
        </div>
      ) : (
        <div className="mt-1 cursor-pointer">
          <input
            type="file"
            name={name}
            ref={fileRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".png,.jpg,.jpeg,.webp"
          />

          <div
            onClick={handleFileOpen}
            className="flex flex-col justify-center items-center w-full h-28 gap-y-2 p-6 border border-dashed border-gray-400 rounded-md"
          >
            <ArrowUpTrayIcon className="size-5 " />
            <span className="text-center text-sm">Choose File</span>
          </div>

          {error && (
            <small className="block w-full mt-1 px-2 py-1 bg-red-50 rounded text-red-600">
              {error}
            </small>
          )}
        </div>
      )}
    </div>
  );
};

export default FileInput;
