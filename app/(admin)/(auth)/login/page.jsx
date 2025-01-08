'use client';

import Logo from "@/components/common/Logo";
import useAuth from "@/hooks/useLogin";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  passport_num: Yup.string()
    .length(9, "Passport number must be valid")
    .required("Passport number is required"),
});

const LoginPage = () => {
    const {onLogin} = useAuth()
    const router = useRouter();

    const { t } = useTranslation(); 

    const formik = useFormik({
        initialValues: {
          passport_num: "",
        },
        validationSchema,
        onSubmit: (values) => {
          onLogin()
          router.back();
        },
      });

  return (
    <div className="flex justify-center flex-col w-full h-screen items-center p-6 bg-background">
      <Logo />
      <div className="p-6 w-full lg:w-1/3 bg-white/50 rounded-md">
        <p className="text-center text-sm sm:text-base"><i>ভিসা চেক</i>, <i>মেডিকেল রিপোর্ট চেক</i>, <i>চাকরির আবেদন</i>, <i>ভিসা আবেদন</i> এবং আরও অনেক কিছু সহ সমস্ত বৈশিষ্ট্য অ্যাক্সেস করতে, আপনার <b>পাসপোর্ট নম্বর</b> ব্যবহার করে আপনার অ্যাকাউন্টে লগ ইন করুন।</p>
      </div>
        <form className="mt-6 w-full lg:w-1/3" onSubmit={formik.handleSubmit}>
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
            {t("BUTTONS.LOGIN")}
          </button>
        </form>
    </div>
  )
}

export default LoginPage