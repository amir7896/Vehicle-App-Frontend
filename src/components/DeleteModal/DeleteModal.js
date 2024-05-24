import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const DeleteModal = ({ isOpen, onClose, onConfirm, heading, title }) => {
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
          {/* Heading */}
          <div className="flex justify-between p-4 border-b">
            <h3 className="text-lg font-semibold uppercase">{heading}</h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          {/* Title */}
          <div className="p-4">
            <p>{title}</p>
          </div>
          {/* Buttons */}
          <div className="flex justify-end p-4 border-t space-x-2">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 focus:outline-none uppercase"
            >
              <FaTimes />
              <span>No</span>
            </button>
            <button
              onClick={onConfirm}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none uppercase"
            >
              <FaCheck />
              <span>Yes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
