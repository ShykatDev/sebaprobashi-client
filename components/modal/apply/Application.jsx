"use client";

import APIKit from "@/common/helpers/APIKit";
import FileInput from "@/components/common/FileInput";
import TextInput from "@/components/common/TextInput";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    phone_number: Yup.number().required("Phone number is required"),
    passport_number: Yup.string().required("Passport number is required"),
    age: Yup.number().min(18, "Age must 18 years old").required("Age is required"),
    district: Yup.string().required("District number is required"),
    profile_pic: Yup.mixed().required("Profile picture is required"),
})

const Application = ({setOpen}) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const jobId = searchParams.get("job_id" || null);
    const visaId = searchParams.get("visa_id" || null);


    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            phone_number: "",
            passport_number: "",
            age: "",
            district: "",
            profile_pic: null,
        },
        validationSchema,
        onSubmit: (values, {resetForm}) => {
            const formData = new FormData();

            formData.append("first_name", values.first_name);
            formData.append("last_name", values.last_name);
            formData.append("phone_number", values.phone_number);
            formData.append("passport_number", values.passport_number);
            formData.append("age", values.age);
            formData.append("district", values.district);
            formData.append("profile_pic", values.profile_pic);

            const handleSuccess = () => {
                resetForm();
                setOpen(false);
                router.push("/application-confirmation");
            };
            const handleFailure = (err) => {
                throw err;
            };

            const promise = APIKit.common
                .apply(formData, {visa_id: visaId, job_id: jobId})
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
        formik.setFieldValue("profile_pic", e);
    };

    return (
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col lg:flex-row start gap-4">
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
                    label={"FORM.AGE"}
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    placeholder={"e.g. 18"}
                    error={formik.errors.age}
                />
                <TextInput
                    label={"FORM.DISTRICT"}
                    name="district"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    placeholder={"e.g. Dhaka"}
                    error={formik.errors.district}
                />
            </div>
            <TextInput
                label={"FORM.PHONE"}
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

            <FileInput
                label={"FORM.IMAGE"}
                htmlFor={"profile_pic"}
                name="profile_pic"
                value={formik.values.profile_pic}
                onFileChange={handleFIleChange}
                error={formik.errors.profile_pic}
            />

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
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Application;
