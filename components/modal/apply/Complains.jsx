"use client";

import APIKit from "@/common/helpers/APIKit";
import FileInput from "@/components/common/FileInput";
import TextAreaInput from "@/components/common/TextAreaInput";
import TextInput from "@/components/common/TextInput";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string().required("Phone number is required"),
  passport_number: Yup.string().required("Passport Number is required"),
  present_address: Yup.string().required("Present address is required"),
  subject: Yup.string().required("Subject is required"),
  body: Yup.string().required("Body is required"),
  country: Yup.string().required("Country is required"),
});

const Complains = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      passport_number: "",
      present_address: "",
      subject: "",
      body: "",
      country: "",
      complain_img: null,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();

      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("phone_number", values.phone_number);
      formData.append("passport_number", values.passport_number);
      formData.append("present_address", values.present_address);
      formData.append("subject", values.subject);
      formData.append("body", values.body);
      formData.append("country", values.country);
      formData.append("complain_img", values.complain_img);

      const handleSuccess = () => {
        resetForm();
        router.push("/application-confirmation");
      };
      const handleFailure = (err) => {
        throw err;
      };

      const promise = APIKit.common
        .createCompain(formData)
        .then(handleSuccess)
        .catch(handleFailure);

      return toast.promise(promise, {
        loading: "Saving Application...",
        success: "Application saved successfully",
        error: "Something went wrong",
      });
    },
  });

  const handleFIleChange = (e) => {
    formik.setFieldValue("complain_img", e);
  };

  return (
    <div className="py-10 px-6 bg-background">
      <div>
        <h2 className="text-primary font-medium text-2xl capitalize">
          {t("COMPLAIN.TITLE")}
        </h2>
        <p className="text-lg text-gray-500">{t("COMPLAIN.SUBTITLE")}</p>
      </div>
      <form
        className=" mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-6 bg-white/[0.5] rounded-lg"
        onSubmit={formik.handleSubmit}
      >
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-start gap-4">
            <TextInput
              label={"FORM.FIRST_NAME"}
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              placeholder={"e.g. John"}
              error={formik.errors.first_name}
            />
            <TextInput
              label={"FORM.LAST_NAME"}
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              placeholder={"e.g. Doe"}
              error={formik.errors.last_name}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-4">
            <TextInput
              label={"FORM.PHONE"}
              type="number"
              name="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              placeholder={"e.g. +880 12345673"}
              error={formik.errors.phone_number}
            />
            <TextInput
              label={"FORM.PASSPORT_NUMBER"}
              name="passport_number"
              value={formik.values.passport_number}
              onChange={formik.handleChange}
              placeholder={"e.g. VA0098125"}
              error={formik.errors.phone_number}
            />
          </div>

          <TextInput
            label={"FORM.COMPLAIN_SUBJECT"}
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            placeholder={"e.g. Compain Subject"}
            error={formik.errors.subject}
          />

          <TextAreaInput
            label={"FORM.COMPLAIN_BODY"}
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            placeholder={"e.g. Compain body"}
            error={formik.errors.body}
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
            <TextInput
              label={"FORM.COUNTRY"}
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              placeholder={"e.g. Bangladesh"}
              error={formik.errors.country}
            />
            <TextInput
              label={"FORM.ADDRESS"}
              name="present_address"
              value={formik.values.present_address}
              onChange={formik.handleChange}
              placeholder={"e.g. Dhaka"}
              error={formik.errors.present_address}
            />
          </div>

          <FileInput
            label={"FORM.COMPLAIN_IMAGE"}
            htmlFor={"complain_img"}
            name="complain_img"
            value={formik.values.complain_img}
            onFileChange={handleFIleChange}
            required={false}
          />
        </div>

        <div className="flex items-start gap-3 lg:col-span-2">
          <button
            disabled={!formik.dirty}
            className="text-sm font-semibold px-6 py-2 border rounded bg-primary text-white hover:bg-primary/[0.9] transition disabled:opacity-40"
            type="submit"
          >
            Submit
          </button>

          <button
            onClick={() => formik.resetForm()}
            className="text-sm font-semibold px-6 py-2 border rounded hover:bg-gray-100 transition"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Complains;
