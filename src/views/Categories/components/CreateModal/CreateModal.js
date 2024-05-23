import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
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

  const handleSubmit = (values) => {
    categories(values);
  };

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
            <div className="p-4">
              <input
                type="text"
                name="categoryName"
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
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={handelClose}
                className="mr-2 px-4 py-2 rounded text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
