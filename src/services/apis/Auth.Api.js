import { api } from "../../utils";
import { SIGN_IN, SIGN_UP } from "../apiConstants";

class AuthApi {
  static sharedIstance = new AuthApi();

  constructor() {
    if (AuthApi.sharedIstance != null) {
      return AuthApi.sharedIstance;
    }
  }

  //   Signin User  ...
  async singIn(body) {
    try {
      const response = await api.post(SIGN_IN, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  async signUp(body) {
    try {
      const response = await api.post(SIGN_UP, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default AuthApi.sharedIstance;
