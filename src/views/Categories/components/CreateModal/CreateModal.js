import React, { useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

import { categoryInitialValues } from "../../../../constants/appConstants";
import { categoryValidationSchema } from "../../../../utils/validations";
import CategoryApi from "../../../../services/apis/Category.Api";

const Modal = (props) => {
  const { setIsOpen, isOpen, categoryID, setCategoryID, refetch } = props;

  // Get single category api call
  const { data: singleCategory } = useQuery(
    ["GET_SINGLE_CATEGORY", categoryID],
    () => CategoryApi.getSingleCategory(categoryID),
    {
      enabled: !!categoryID,
      keepPreviousData: true,
    }
  );

  // Set form fields if update category ..
  useEffect(() => {
    if (singleCategory !== undefined && categoryID !== null) {
      formik.setFieldValue("categoryName", singleCategory?.categoryName);
    }
  }, [singleCategory]);

  // Formik
  const formik = useFormik({
    initialValues: categoryInitialValues,
    validationSchema: categoryValidationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  //  Create and update  category mutation
  const { mutate: categories } = useMutation(
    (body) => {
      if (categoryID !== null && singleCategory !== undefined) {
        return CategoryApi.updateCategory(body, categoryID);
      } else {
        return CategoryApi.createCategory(body);
      }
    },
    {
      onSuccess: (res) => {
        if (res.success) {
          toast.success(res.message);
          refetch();
          setIsOpen(false);
          setCategoryID(null);
          formik.resetForm();
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => toast.error(error.message),
    }
  );

  // Handle submit
  const handleSubmit = (values) => {
    categories(values);
  };

  // Handle close dialog
  const handelClose = (e) => {
    e.preventDefault();
    setCategoryID(null);
    setIsOpen(false);
    formik.resetForm();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="flex justify-between p-4 border-b">
            <h3 className="text-lg font-semibold uppercase">
              {categoryID ? "Update Category" : "Add Category"}
            </h3>
            <button
              onClick={handelClose}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* Category input */}
            <div className="p-4">
              <label
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                htmlFor="categoryName"
              >
                Category name
              </label>
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                placeholder="Enter category name"
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.categoryName && formik.errors.categoryName ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.categoryName}
                </div>
              ) : null}
            </div>
            {/* Buttons  */}
            <div className="flex justify-end space-x-4 m-4 ">
              <button
                type="button"
                onClick={handelClose}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center space-x-2 uppercase"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center space-x-2 uppercase"
              >
                <FaSave />
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
