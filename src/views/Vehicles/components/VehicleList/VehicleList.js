import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../../../../components";
import VehicleApi from "../../../../services/apis/Vehicle.Api";
import { toast } from "react-toastify";

const VehicleList = ({ data, refetch }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vehicleID, setVehicleID] = useState(null);

  const navigate = useNavigate();

  // Handle craete vehicle
  const handleCreate = () => {
    navigate("/vehicles/create");
  };

  // Handle Update navigate
  const handleUpdate = (id) => {
    navigate(`/vehicles/update/${id}`);
  };

  // Handle Open delete Modal
  const openDeleteModal = (id) => {
    setVehicleID(id);
    setIsDeleteModalOpen(true);
  };
  //  Close delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setVehicleID(null);
  };

  //  Handle delete api call
  const handleConfirmDelete = async () => {
    console.log("Vehicle ID", vehicleID);
    const response = await VehicleApi.deleteVehicle(vehicleID);
    if (response.success) {
      toast.success(response.message);
      closeDeleteModal();
      refetch();
    }
  };
  // Data table columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
      sortField: "_id",
    },
    {
      name: "Image",
      cell: (row) => (
        <div className="flex items-center space-x-4">
          <img className="w-13 h-14 rounded-lg" alt="Image" src={row.image} />
        </div>
      ),
    },
    {
      name: "Category",
      selector: (row) => row.category.categoryName,
      sortable: true,
      sortField: "category",
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
      sortField: "color",
    },
    {
      name: "Model",
      selector: (row) => row.model,
      sortable: true,
      sortField: "model",
    },
    {
      name: "Make",
      selector: (row) => row.make,
      sortable: true,
      sortField: "make",
    },

    {
      name: "Registration No",
      selector: (row) => row.registrationNo,
      sortable: true,
      sortField: "registrationNo",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-4">
          <button
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={() => handleUpdate(row._id)}
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700 focus:outline-none"
            onClick={() => openDeleteModal(row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen p-4">
      {/* Add Vehicle Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded uppercase flex items-center space-x-2"
          onClick={handleCreate}
        >
          <FaPlus />
          <span>Add Vehicle</span>
        </button>
      </div>
      <div>
        {data && data.length > 0 ? (
          <div className="mt-4">
            <DataTable
              title="Vehicles"
              columns={columns}
              data={data}
              pagination
              className="w-full"
            />
          </div>
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>
      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete this vehicle?"
        heading="Delete Vehicle"
      />
    </div>
  );
};

export default VehicleList;
