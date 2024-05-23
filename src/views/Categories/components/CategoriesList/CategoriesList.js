import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import DataTable from "react-data-table-component";

import CreateModal from "../CreateModal/CreateModal";
import { DeleteModal } from "../../../../components";
import CategoryApi from "../../../../services/apis/Category.Api";
import { toast } from "react-toastify";

const CategoriesList = ({ data, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryID, setCategoryID] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Handle Open Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Handle Update Click
  const handleUpdate = (id) => {
    setCategoryID(id);
    setIsModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsDeleteModalOpen(true);
  };

  //  Close delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategoryId(null);
  };

  //  Handle delete api call
  const handleConfirmDelete = async () => {
    const response = await CategoryApi.deleteCategory(selectedCategoryId);
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
      name: "Category",
      selector: (row) => row.categoryName,
      sortable: true,
      sortField: "categoryName",
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
    <div className="min-h-screen p-4 flex flex-col">
      {/* Add Category Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded uppercase flex items-center space-x-2"
          onClick={openModal}
        >
          <FaPlus />
          <span>Add Category</span>
        </button>
      </div>
      {/* Categories list table */}
      {data && data.length > 0 && (
        <div className="flex-grow">
          <DataTable
            title="Categories"
            columns={columns}
            data={data}
            pagination
          />
        </div>
      )}
      {/* Create and update category modal */}
      <CreateModal
        setIsOpen={setIsModalOpen}
        isOpen={isModalOpen}
        categoryID={categoryID}
        setCategoryID={setCategoryID}
        refetch={refetch}
      />
      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete this category?"
        heading="Delete Category"
      />
    </div>
  );
};

export default CategoriesList;
