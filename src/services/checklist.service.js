import api from "../api";

export default class {
  static async getChecklist() {
    return api.get(`/checklist`);
  }

  static async getChecklistItems(id) {
    return api.get(`/checklist/${id}/checks`);
  }

  static async getChecklistId(id) {
    return api.get(`/checklist/${id}`);
  }

  static async generateTestCase() {
    return api.post(`/checklist/generate/testcaselist`);
  }

  static async deleteChecklist(id) {
    return api.delete(`/checklist/${id}`);
  }

  static async toggleStatusAll(updatedItems) {
    return api.put(`/checklist/update/checks`, updatedItems);
  }
}
