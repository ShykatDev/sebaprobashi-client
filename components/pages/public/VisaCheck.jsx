"use client";

import CheckLogin from "@/components/common/CheckLogin";
import useAuth from "@/hooks/useLogin";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import VisaResult from "./VisaResult";

const validationSchema = Yup.object().shape({
  passport_num: Yup.string()
    .length(9, "Passport number must be valid")
    .required("Passport number is required"),
});

const VisaCheck = ({ isHomePage = false }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const searchParams = useSearchParams();
  const { isLogin } = useAuth()

  const param = searchParams.get("passport_number");

  const formik = useFormik({
    initialValues: {
      passport_num: param || "",
    },
    validationSchema,
    onSubmit: (values) => {
      router.push(`/visa-check?passport_number=${values.passport_num}`);
    },
  });

  return (
    <>
      {isLogin ? (
        <div className={`bg-background ${isHomePage ? "" : "px-6 py-10"} w-full`}>
          <h2 className="text-primary font-medium text-2xl capitalize">
            {t("VISA.TITLE")}
          </h2>
          <p className="text-lg text-gray-500">{t("VISA.SUBTITLE")}</p>

          <div className="bg-background w-full">
            <form className="mt-6" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col w-full">
                <label htmlFor="passport_num" className="text-lg font-medium mb-1">
                  Passport Number <span className="text-red-600">*</span>
                </label>
                <input
                  name="passport_num"
                  value={formik.values.passport_num}
                  onChange={formik.handleChange}
                  placeholder="e.g. EK0098318"
                  maxLength={9}
                  className="px-4 py-3 rounded-md border border-primary/[0.3] uppercase placeholder:normal-case"
                />

                {formik.errors.passport_num && (
                  <p className="w-full text-red-700 py-0.5">
                    {formik.errors.passport_num}
                  </p>
                )}
              </div>
              <button className="w-full p-3 mt-3 bg-primary text-background rounded-md font-semibold hover:bg-primary/[0.9] disabled:opacity-40">
                Check
              </button>
            </form>

            {param ? <VisaResult param={param} /> : null}
          </div>
        </div>
      ) : (<CheckLogin className={"min-h-96"} title={t("VISA.TITLE")}/>)}
    </>
  );
};

export default VisaCheck;
