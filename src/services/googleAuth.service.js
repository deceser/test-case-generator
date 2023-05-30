import api from "../api";

export default class {
  static async getGoogleUser() {
    return api.get(`/google`);
  }

  static async getMeAuth() {
    return api.get(`/refresh-token`);
  }
}
