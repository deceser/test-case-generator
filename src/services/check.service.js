import api from "../api";

export default class {
  static async getAllItems() {
    return api.get(`/check`);
  }

  static async getOneItem(id) {
    return api.get(`/check/${id}`);
  }

  static async createItem(name, isActive, checkListId) {
    return api.post("/check", { name, isActive: true, checkListId });
  }

  static async deleteItem(id) {
    return api.delete(`/check/${id}`);
  }

  static async toggleStatus(id, completed) {
    return api.patch(`/check/${id}`, { completed });
  }

  static async updateItem(id, item) {
    return api.patch(`/check/${id}`, [
      {
        op: "replace",
        path: item.key,
        value: item.value,
      },
    ]);
  }
}
