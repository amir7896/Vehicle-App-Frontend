import React from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { signInValidationSchema } from "../../utils/validations";
import { useAuth } from "../../hooks/useAuth";
import { loginInitialValues } from "../../constants/appConstants";

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  //  SignIn user mutation
  const { mutate: signinUser } = useMutation((body) => signin(body), {
    onSuccess: (res) => {
      if (res.response.success) {
        toast.success(res.response.message);
        navigate("/");
        formik.resetForm();
      } else {
        toast.error(res.response.message);
      }
    },
    onError: (error) => toast.error(error.message),
  });

  // Formik
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: signInValidationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  // Handle submit method
  const handleSubmit = (values) => {
    signinUser(values);
  };

  return (
    <div className="min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500 uppercase">
          Sign in to your account for testing app
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={formik.handleSubmit}>
          {/* Email addresss input */}
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="name"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
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
          {/* Password  input*/}
          <div>
            <div className="flex items-center justify-between mt-2">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.password}
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
