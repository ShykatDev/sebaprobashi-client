import APIKit from "@/common/helpers/APIKit";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import FileInput from "../common/FileInput";
import TextInput from "../common/TextInput";

const AddReport = ({ setOpen, refetchReport }) => {
  const formik = useFormik({
    initialValues: {
      passport_number: "",
      medical_image: "",
    },
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();

      formData.append("passport_number", values.passport_number);
      formData.append("medical_image", values.medical_image);

      const handleSuccess = () => {
        refetchReport();
        resetForm();
        setOpen(false);
      };
      const handleFailure = (err) => {
        throw err;
      };

      const promise = APIKit.admin
        .createMedicalReport(formData)
        .then(handleSuccess)
        .catch(handleFailure);

      return toast.promise(promise, {
        loading: "Creating report...",
        success: "Report created successfully",
        error: "Something went wrong",
      });
    },
  });

  const handleFIleChange = (e) => {
    formik.setFieldValue("medical_image", e);
  };

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <TextInput
        label={"Passport Number"}
        placeholder={"e.g. VA12901923"}
        name="passport_number"
        value={formik.values.passport_number}
        onChange={formik.handleChange}
      />
      <FileInput
        label={"Select Report"}
        htmlFor={"medical_image"}
        name="medical_image"
        value={formik.values.medical_image}
        onFileChange={handleFIleChange}
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

export default AddReport;
