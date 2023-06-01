import api from "../api";
import { REQUIREMENT_API_PATH, CHECKLIST_API_PATH } from "../api/apiPath";

export default class {
  static async generateChecklist(data, userId) {
    return api.post(`/${REQUIREMENT_API_PATH}/generate/${CHECKLIST_API_PATH}`, { data, userId });
  }

  static async getRequirement() {
    return api.get(`/${REQUIREMENT_API_PATH}`);
  }

  static async getRequirementId(id) {
    return api.get(`/${REQUIREMENT_API_PATH}/${id}`);
  }

  static async deleteRequirement(id) {
    return api.delete(`/${REQUIREMENT_API_PATH}/${id}`);
  }

  static async requirementIdChecklists(id) {
    return api.get(`/${REQUIREMENT_API_PATH}/${id}/${CHECKLIST_API_PATH}`);
  }

  static async requirementPut() {
    return api.put(`/${REQUIREMENT_API_PATH}`);
  }
}
