import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave, FaTimes, FaTrash } from "react-icons/fa";

import { vehicleValidationSchema } from "../../utils/validations";
import { vehicleInitialValues } from "../../constants/appConstants";
import CategoryApi from "../../services/apis/Category.Api";
import VehicleApi from "../../services/apis/Vehicle.Api";

const Create = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for image file and preview
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Get categories
  const { data: categories } = useQuery("GET_CATEGORIES", () =>
    CategoryApi.getCategories()
  );

  // Get single vehicle
  const { data: singleVehicle } = useQuery(
    ["GET_SINGLE_VEHICLE", id],
    () => VehicleApi.getSingleVehicle(id),
    {
      enabled: !!id,
      keepPreviousData: true,
    }
  );

  // Set formik values on update vehicle
  useEffect(() => {
    if (singleVehicle !== undefined && singleVehicle !== null) {
      formik.setFieldValue("color", singleVehicle?.color);
      formik.setFieldValue("make", singleVehicle?.make);
      formik.setFieldValue("model", singleVehicle?.model);
      formik.setFieldValue("category", singleVehicle?.category);
      formik.setFieldValue("registrationNo", singleVehicle?.registrationNo);
      // Load image if available
      if (singleVehicle.image) {
        setImagePreview(singleVehicle.image);
      }
    }
  }, [singleVehicle]);

  const formik = useFormik({
    initialValues: vehicleInitialValues,
    validationSchema: vehicleValidationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // Create and update vehicle mutation
  const { mutate: vehicle } = useMutation(
    (body) => {
      const formData = new FormData();

      formData.append("category", formik.values.category);
      formData.append("color", formik.values.color);
      formData.append("model", formik.values.model);
      formData.append("make", formik.values.make);
      formData.append("registrationNo", formik.values.registrationNo);
      formData.append("image", imageFile);

      if (id !== null && id !== undefined) {
        return VehicleApi.updateVehicle(body, id);
      } else {
        console.log("formData:", formData);
        return VehicleApi.createVehicle(formData);
      }
    },
    {
      onSuccess: (res) => {
        if (res.success) {
          toast.success(res.message);
          navigate("/vehicles");
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
    // Append image file to form data if present
    if (imageFile) {
      values.image = imageFile;
    }
    vehicle(values);
  };

  // Handle cancel
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/vehicles");
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-20 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4 uppercase">
        {id ? "Update Vehicle" : "Create vehicle"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Category select */}
        <div className="mb-4">
          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
          </select>
        </div>
        {formik.values.category && (
          <>
            {/* Image input */}

            <div className="mb-4">
              {!imageFile && (
                <>
                  <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </>
              )}

              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
            {/* Color input */}
            <div className="mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Color
              </label>
              <input
                type="text"
                name="color"
                className="w-full px-3 py-2 border rounded"
                value={formik.values.color}
                onChange={formik.handleChange}
              />
              {formik.touched.color && formik.errors.color ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.color}
                </div>
              ) : null}
            </div>
            {/* Make input */}
            <div className="mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Make
              </label>
              <input
                type="text"
                name="make"
                className="w-full px-3 py-2 border rounded"
                value={formik.values.make}
                onChange={formik.handleChange}
              />
              {formik.touched.make && formik.errors.make ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.make}
                </div>
              ) : null}
            </div>
            {/* Model input */}
            <div className="mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Model
              </label>
              <input
                type="text"
                name="model"
                className="w-full px-3 py-2 border rounded"
                value={formik.values.model}
                onChange={formik.handleChange}
              />
              {formik.touched.model && formik.errors.model ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.model}
                </div>
              ) : null}
            </div>
            {/* Registration no input */}
            <div className="mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Registration No
              </label>
              <input
                type="text"
                name="registrationNo"
                className="w-full px-3 py-2 border rounded"
                value={formik.values.registrationNo}
                onChange={formik.handleChange}
              />
              {formik.touched.registrationNo && formik.errors.registrationNo ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.registrationNo}
                </div>
              ) : null}
            </div>
            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
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
          </>
        )}
      </form>
    </div>
  );
};

export default Create;
