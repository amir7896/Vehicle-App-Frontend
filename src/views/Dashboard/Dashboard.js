import React from "react";
import { useQuery } from "react-query";
import VehicleApi from "../../services/apis/Vehicle.Api";

const Dashboard = () => {
  const { data } = useQuery("TOTAL_VEHICLES", () =>
    VehicleApi.getTotalVehicles()
  );
  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-64">
          <div className="text-xl font-semibold text-gray-700 uppercase">
            Vehicles
          </div>
          <div className="mt-4 text-3xl text-blue-500">{data}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
