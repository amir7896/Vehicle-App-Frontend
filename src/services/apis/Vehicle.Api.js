import { api } from "../../utils";
import {
  CREATE_VEHICLE,
  DELETE_VEHICLE,
  GET_SINGLE_VEHICLE,
  GET_VEHICLES,
  UPDATE_VEHICLE,
} from "../apiConstants";

class VehicleApi {
  static sharedIstance = new VehicleApi();

  constructor() {
    if (VehicleApi.sharedIstance != null) {
      return VehicleApi.sharedIstance;
    }
  }
  //   Get vehicles list  ...
  async getVehicles() {
    try {
      const response = await api.get(GET_VEHICLES);
      const { success, data } = response.data;
      if (success) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return error.response.data;
    }
  }

  //   Create vehicle
  async createVehicle(body) {
    try {
      const response = await api.post(CREATE_VEHICLE, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  //   Get single vehicle
  async getSingleVehicle(id) {
    try {
      const response = await api.get(`${GET_SINGLE_VEHICLE}/${id}`);
      const { success, data } = response.data;
      if (success) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return error.response.data;
    }
  }

  //   Update vehicle
  async updateVehicle(body, id) {
    try {
      const response = await api.put(`${UPDATE_VEHICLE}/${id}`, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  //   Delete vehicle
  async deleteVehicle(id) {
    try {
      const response = await api.delete(`${DELETE_VEHICLE}/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default VehicleApi.sharedIstance;
