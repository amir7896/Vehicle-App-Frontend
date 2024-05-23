import React from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { signUpValidationSchema } from "../../utils/validations";
import { singUpInitialValues } from "../../constants/appConstants";
import AuthApi from "../../services/apis/Auth.Api";

const SignUp = () => {
  const navigate = useNavigate();

  //  SignIn user mutation
  const { mutate: signinUser } = useMutation((body) => AuthApi.signUp(body), {
    onSuccess: (res) => {
      console.log("Signup response :", res);
      if (res.success) {
        toast.success(res.message);
        navigate("/welcome");
        formik.resetForm();
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => toast.error(error.message),
  });

  const formik = useFormik({
    initialValues: singUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    signinUser(values);
  };
  return (
    <div className="min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500 uppercase">
          Create New Account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={formik.handleSubmit}>
          {/* Username */}
          <div>
            <div className="flex items-center justify-between">
              <label
                for="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
            </div>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
          </div>
          {/* Email addresss */}
          <div className="mt-2">
            <label
              for="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          </div>
          {/* Submit button */}

          <div className="mt-3">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
