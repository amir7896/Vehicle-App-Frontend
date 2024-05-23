import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  // Handle login navigate
  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="grid items-start justify-center pt-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 uppercase">
          Welcome to Our Website
        </h1>
        <p className="text-gray-700 mb-6">
          Your account created successfully. <br />
          Please check the email you provided during registration for login
          instructions.
        </p>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 uppercase"
          onClick={handleNavigate}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Welcome;
