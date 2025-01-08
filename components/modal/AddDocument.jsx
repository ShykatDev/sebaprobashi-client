import APIKit from "@/common/helpers/APIKit";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import FileInput from "../common/FileInput";
import TextInput from "../common/TextInput";

const validationSchema = Yup.object({
    passport_number: Yup.string().required("Passport number is required"),
    visa_image: Yup.mixed().required("Visa image is required"),
})

const AddDocument = ({setOpen, refetchDoc}) => {
    const formik = useFormik({
        initialValues: {
            passport_number: "",
            visa_image: "",
        },
        validationSchema,
        onSubmit: (values, {resetForm}) => {
            const formData = new FormData();

            formData.append("passport_number", values.passport_number);
            formData.append("visa_image", values.visa_image);

            const handleSuccess = () => {
                refetchDoc();
                resetForm();
                setOpen(false);
            };
            const handleFailure = (err) => {
                throw err;
            };

            const promise = APIKit.admin
                .createVisa(formData)
                .then(handleSuccess)
                .catch(handleFailure);

            return toast.promise(promise, {
                loading: "Creating visa...",
                success: "Visa created successfully",
                error: "Something went wrong",
            });
        },
    });

    const handleFIleChange = (e) => {
        formik.setFieldValue("visa_image", e);
    };

    return (
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <TextInput
                label={"Passport Number"}
                placeholder={"e.g. VA12901923"}
                name="passport_number"
                value={formik.values.passport_number}
                onChange={formik.handleChange}
                error={formik.errors.passport_number}
            />
            <FileInput
                label={"Select Visa Image"}
                htmlFor={"visa_image"}
                name="visa_image"
                value={formik.values.visa_image}
                onFileChange={handleFIleChange}
                error={formik.errors.visa_image}
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

export default AddDocument;
