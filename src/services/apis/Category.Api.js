import { api } from "../../utils";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_SINGLE_CATEGORY,
  UPDATE_CATEGORY,
} from "../apiConstants";

class CategoryApi {
  static sharedIstance = new CategoryApi();

  constructor() {
    if (CategoryApi.sharedIstance != null) {
      return CategoryApi.sharedIstance;
    }
  }

  //   Get categories list
  async getCategories(body) {
    try {
      const response = await api.get(GET_CATEGORIES);
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

  //   Create category  ...
  async createCategory(body) {
    try {
      const response = await api.post(CREATE_CATEGORY, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  // Get single category
  async getSingleCategory(id) {
    try {
      const response = await api.get(`${GET_SINGLE_CATEGORY}/${id}`);
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

  //   Update category
  async updateCategory(body, id) {
    try {
      const response = await api.put(`${UPDATE_CATEGORY}/${id}`, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  //   Delete category
  async deleteCategory(id) {
    try {
      const response = await api.delete(`${DELETE_CATEGORY}/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default CategoryApi.sharedIstance;
