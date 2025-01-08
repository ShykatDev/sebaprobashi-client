"use client";

import APIKit from "@/common/helpers/APIKit";
import TextInput from "@/components/common/TextInput";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import LargeModal from "../LargeModal";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string().required("Phone number is required"),
  passport_number: Yup.string().required("Passport Number is required"),
  country: Yup.string().required("Country is required"),
  present_address: Yup.string().required("Present address is required"),
});

const LifeInsurance = () => {
  const [isNotice, setIsNotice] = useState(false)
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(()=> {
    setIsNotice(true);

    return ()=> {
      setIsNotice(false)
    }
  }, [])

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
        router.push("/application-confirmation");
      };
      const handleFailure = (err) => {
        throw err;
      };

      const promise = APIKit.common
        .lifeSecurity(values)
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
    <div className="py-10 px-6 bg-background">
      <div className="lg:w-1/2 mx-auto bg-white/[0.5] p-6 rounded-lg">
        <div>
          <h2 className="text-primary font-medium text-2xl capitalize">
            {t("SECURITY.TITLE")}
          </h2>
          <p className="text-lg text-gray-500">{t("SECURITY.SUBTITLE")}</p>
        </div>
        <form className="mt-6 space-y-4 w-full" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
            <TextInput
              label={"First Name"}
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              placeholder={"e.g. John"}
              error={formik.errors.first_name}
            />
            <TextInput
              label={"Last Name"}
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              placeholder={"e.g. Doe"}
              error={formik.errors.last_name}
            />
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
            <TextInput
              label={"Country"}
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              placeholder={"e.g. Bangladesh"}
              error={formik.errors.country}
            />
            <TextInput
              label={"Present Address"}
              name="present_address"
              value={formik.values.present_address}
              onChange={formik.handleChange}
              placeholder={"e.g. Dhaka"}
              error={formik.errors.present_address}
            />
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-4">
            <TextInput
              label={"Phone Number"}
              type="number"
              name="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              placeholder={"e.g. +880 12345673"}
              error={formik.errors.phone_number}
            />
            <TextInput
              label={"Passport Number"}
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

      <LargeModal title={t("SECURITY.NOTICE_TITLE")} open={isNotice} setOpen={setIsNotice}>
          <div dangerouslySetInnerHTML={{__html: t("SECURITY.NOTICE")}}></div>
      </LargeModal>
    </div>
  );
};

export default LifeInsurance;
