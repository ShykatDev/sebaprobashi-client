import React from "react";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";
import {useFormik} from "formik";
import APIKit from "@/common/helpers/APIKit";
import toast from "react-hot-toast";
import * as Yup from "yup";

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    hiring_position: Yup.string().required("Hiring position is required"),
    vacancy: Yup.string().required("Vacancy is required"),
    description: Yup.string().required("Description is required"),
    area: Yup.string().required("Area is required"),
})

const AddJob = ({setOpen, refetchJob}) => {
    const formik = useFormik({
        initialValues: {
            title: "",
            hiring_position: "",
            vacancy: "",
            description: "",
            area: "",
        },
        validationSchema,
        onSubmit: (values, {resetForm}) => {
            const handleSuccess = () => {
                refetchJob();
                resetForm();
                setOpen(false);
            };
            const handleFailure = (err) => {
                throw err;
            };

            const promise = APIKit.admin
                .createJob(values)
                .then(handleSuccess)
                .catch(handleFailure);

            return toast.promise(promise, {
                loading: "Creating job...",
                success: "Job created successfully",
                error: "Something went wrong",
            });
        },
    });
    return (
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <TextInput
                label={"Job Title"}
                placeholder={"e.g. Student Visa for USA"}
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
            />
            <TextInput
                label={"Hiring Postion"}
                placeholder={"e.g. Student Visa for USA"}
                name="hiring_position"
                value={formik.values.hiring_position}
                onChange={formik.handleChange}
            />
            <TextInput
                label={"Vacancy"}
                placeholder={"e.g. 5"}
                name="vacancy"
                value={formik.values.vacancy}
                onChange={formik.handleChange}
            />
            <TextAreaInput
                label={"Description"}
                placeholder={"e.g. Some descrtiption"}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
            />
            <TextInput
                label={"Location"}
                placeholder={"e.g. Dhaka, Bangladesh"}
                name="area"
                value={formik.values.area}
                onChange={formik.handleChange}
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
                    Save
                </button>
            </div>
        </form>
    );
};

export default AddJob;
