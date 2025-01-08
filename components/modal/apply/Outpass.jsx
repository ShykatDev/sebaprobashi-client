"use client";

import APIKit from "@/common/helpers/APIKit";
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
  country: Yup.string().required("Country is required"),
  present_address: Yup.string().required("Present address is required"),
});

const OutpassModal = ({setOpen,setFormModal, setOutpassConfirm}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      passport_number: "",
      country: "",
      present_address: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const handleSuccess = () => {
        resetForm();
        setOpen(false);
        setFormModal(false);
        setOutpassConfirm(true);
      };
      const handleFailure = (err) => {
        throw err;
      };

      const promise = APIKit.common
        .outPass(values)
        .then(handleSuccess)
        .catch(handleFailure);

      return toast.promise(promise, {
        loading: "Saving Application...",
        success: "Application saved successfully",
        error: "Something went wrong",
      });
    },
  });

  return (
    <div className=" bg-background space-y-3">
      <div className=" bg-white/[0.5] p-6 rounded-lg">
        <form className="space-y-4 w-full" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
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
              error={formik.errors.passport_number}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => formik.resetForm()}
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
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white/[0.5] p-6 rounded-lg border border-primary">
        <p>
          {t("OUTPASS.NOTE")}
        </p>
      </div>
    </div>
  );
};

export default OutpassModal;
