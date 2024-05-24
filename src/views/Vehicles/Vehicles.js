import React from "react";
import { VehicleList } from "./components";
import { useQuery } from "react-query";
import VehicleApi from "../../services/apis/Vehicle.Api";

const Vehicles = () => {
  // Get vehicles api
  const { data, refetch: refetchVehicles } = useQuery("GET_VEHICLES", () =>
    VehicleApi.getVehicles()
  );
  return <VehicleList data={data} refetch={refetchVehicles} />;
};

export default Vehicles;
