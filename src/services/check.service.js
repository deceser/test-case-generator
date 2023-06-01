import api from "../api";
import { CHECK_API_PATH } from "../api/apiPath";

export default class {
  static async getAllItems() {
    return api.get(`/${CHECK_API_PATH}`);
  }

  static async getOneItem(id) {
    return api.get(`/${CHECK_API_PATH}/${id}`);
  }

  static async createItem(name, isActive, checkListId) {
    return api.post(`/${CHECK_API_PATH}`, { name, isActive: true, checkListId });
  }

  static async deleteItem(id) {
    return api.delete(`/${CHECK_API_PATH}/${id}`);
  }

  static async toggleStatus(id, completed) {
    return api.patch(`/${CHECK_API_PATH}/${id}`, { completed });
  }

  static async updateItem(id, item) {
    return api.patch(`/${CHECK_API_PATH}/${id}`, [
      {
        op: "replace",
        path: item.key,
        value: item.value,
      },
    ]);
  }
}
