import APIKit from "@/common/helpers/APIKit";
import { countryOptions } from "@/utils/options";
import customStyles from "@/utils/styles";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import Select from 'react-select';
import * as yup from "yup";
import FileInput from "../common/FileInput";
import RichTextEditor from "../common/RichEditor";
import TextInput from "../common/TextInput";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  country: yup.string().required("Country is required"),
  description: yup.string().required("Description is required"),
});

const AddVisa = ({ setOpen, refetchAvailVisa }) => {
  const [content, setContent] = useState("");

  const formik = useFormik({
    initialValues: {
      iconFile: null,
      title: "",
      country: "",
      description: ""
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      
  
      // Append values to FormData
      formData.append("title", values.title);
      formData.append("country", values.country);
      formData.append("description", values.description);
      formData.append("icon", values.iconFile);
  
      const handleSuccess = () => {
          refetchAvailVisa();
          resetForm();
          setOpen(false);
        
      };
      const handleFailure = (err) => {
        throw err;
      };
  
      const promise = APIKit.admin
        .createAvailableVisa(formData)
        .then(handleSuccess)
        .catch(handleFailure);
  
      return toast.promise(promise, {
        loading: "Creating Visa...",
        success: "Visa created successfully",
        error: "Something went wrong",
      });
    },
  });
  

  // Handle Image change
  const handleFIleChange = (e) => {
    formik.setFieldValue("iconFile", e);
  };

  // Rich text handler
  const handleRichTextChange = (data) => {
    setContent(data);
    formik.setFieldValue("description", data);
  };

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>

      <FileInput
        label={"Select Icon"}
        htmlFor={"iconFile"}
        name="iconFile"
        required={false}
        value={formik.values.iconFile}
        onFileChange={handleFIleChange}
      />
      <div>
        <label className="font-semibold text-lg mb-1 block">
          <span>Country</span>
          <span className={"text-red-500 ml-1"}>*</span>
        </label>
        <Select
          options={countryOptions}
          styles={customStyles}
          placeholder="Select Country..."
          isClearable
          onChange={e => formik.setFieldValue("country", e.value)}

        />
        {formik.errors.country && formik.touched.country && <small className="block w-full mt-1 px-2 py-1 bg-red-50 rounded text-red-600 font-regular">
          {formik.errors.country}
        </small>}
      </div>

      <TextInput
        label={"Visa Title"}
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        placeholder={"e.g. Student Visa for USA"}
        error={formik.touched.title && formik.errors.title}
      />

      <div className="grid w-full items-center gap-2">
        <label>Description</label>
        <RichTextEditor
          name="job_description"
          content={content}
          onChange={(newContent) => handleRichTextChange(newContent)}
        />

        {formik.touched.description &&
          formik.errors.description && (
            <small className="block w-full mt-1 px-2 py-1 bg-red-50 rounded text-red-600 font-regular">
              {formik.errors.description}
            </small>
          )}
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => setOpen(false)}
          className="text-sm font-semibold px-6 py-2 border rounded hover:bg-gray-100 transition"
          type="button"
        >
          Cancel
        </button>
        <button
          disabled={!formik.dirty}
          className="text-sm font-semibold px-6 py-2 border rounded bg-primary text-white hover:bg-primary/[0.9] transition disabled:opacity-40"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddVisa;
