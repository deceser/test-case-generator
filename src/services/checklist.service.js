import api from "../api";

export default class {
  static async getChecklist() {
    return api.get(`/${import.meta.env.VITE_REACT_CHECKLIST_API_PATH}`);
  }

  static async getChecklistItems(id) {
    return api.get(`/${import.meta.env.VITE_REACT_CHECKLIST_API_PATH}/${id}/checks`);
  }

  static async getChecklistId(id) {
    return api.get(`/${import.meta.env.VITE_REACT_CHECKLIST_API_PATH}/${id}`);
  }

  static async generateTestCase() {
    return api.post(`/${import.meta.env.VITE_REACT_CHECKLIST_API_PATH}/generate/testcaselist`);
  }

  static async deleteChecklist(id) {
    return api.delete(`/${import.meta.env.VITE_REACT_CHECKLIST_API_PATH}/${id}`);
  }

  static async toggleStatusAll(updatedItems) {
    return api.put(`/${import.meta.env.VITE_REACT_CHECKLIST_API_PATH}/update/checks`, updatedItems);
  }
}
