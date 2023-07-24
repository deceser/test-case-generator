import api from "../api";

export default class {
  static async getAllItems() {
    return api.get(`/${import.meta.env.VITE_REACT_CHECK_API_PATH}`);
  }

  static async getOneItem(id) {
    return api.get(`/${import.meta.env.VITE_REACT_CHECK_API_PATH}/${id}`);
  }

  static async createItem(name, isActive, checkListId) {
    return api.post(`/${import.meta.env.VITE_REACT_CHECK_API_PATH}`, { name, isActive: true, checkListId });
  }

  static async deleteItem(id) {
    return api.delete(`/${import.meta.env.VITE_REACT_CHECK_API_PATH}/${id}`);
  }

  static async toggleStatus(id, completed) {
    return api.patch(`/${import.meta.env.VITE_REACT_CHECK_API_PATH}/${id}`, { completed });
  }

  static async updateItem(id, item) {
    return api.patch(`/${import.meta.env.VITE_REACT_CHECK_API_PATH}/${id}`, [
      {
        op: "replace",
        path: item.key,
        value: item.value,
      },
    ]);
  }
}
