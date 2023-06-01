import api from "../api";
import { CHECKLIST_API_PATH } from "../api/apiPath";

export default class {
  static async getChecklist() {
    return api.get(`/${CHECKLIST_API_PATH}`);
  }

  static async getChecklistItems(id) {
    return api.get(`/${CHECKLIST_API_PATH}/${id}/checks`);
  }

  static async getChecklistId(id) {
    return api.get(`/${CHECKLIST_API_PATH}/${id}`);
  }

  static async generateTestCase() {
    return api.post(`/${CHECKLIST_API_PATH}/generate/testcaselist`);
  }

  static async deleteChecklist(id) {
    return api.delete(`/${CHECKLIST_API_PATH}/${id}`);
  }

  static async toggleStatusAll(updatedItems) {
    return api.put(`/${CHECKLIST_API_PATH}/update/checks`, updatedItems);
  }
}
