"use client";

import APIKit from "@/common/helpers/APIKit";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Button from "../common/Button";
import Logo from "../common/Logo";
import PasswordTextInput from "../common/PasswordTextInput";
import TextInput from "../common/TextInput";
import { setJWTokenAndRedirect } from "./AuthGuard";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevURL = searchParams.get("next");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const handleSuccess = ({ data }) => {
        setJWTokenAndRedirect(data.access_token, () => {
          if (prevURL) {
            router.push(prevURL);
          } else {
            router.push("/dashboard/applications");
          }
        });
      };
      const handleFailure = (err) => {
        throw err;
      };

      const promise = APIKit.auth
        .login(values)
        .then(handleSuccess)
        .catch(handleFailure);

      return toast.promise(promise, {
        loading: "Signin in...",
        success: "Login Success",
        error: "Something went wrong",
      });
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[40rem] p-6 border border-gray-400 drop-shadow-xl rounded-lg bg-background flex flex-col justify-center items-center gap-y-4">
        <Logo />
        <h2 className="text-center font-semibold text-2xl text-primary">
          Admin Login
        </h2>

        <form className="w-full space-y-4 mt-6" onSubmit={formik.handleSubmit}>
          <TextInput
            label={"Enter Email"}
            type="email"
            name="email"
            placeholder="e.g. johndoe@gmail.com"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <PasswordTextInput
            label={"Enter Password"}
            name="password"
            placeholder="**********"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
