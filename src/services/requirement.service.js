import api from "../api";

export default class {
  static async generateChecklist(data, userId) {
    return api.post(
      `/${import.meta.env.VITE_REACT_REQUIREMENT_API_PATH}/generate/${import.meta.env.VITE_REACT_CHECKLIST_API_PATH}`,
      { data, userId }
    );
  }

  static async getRequirement() {
    return api.get(`/${import.meta.env.VITE_REACT_REQUIREMENT_API_PATH}`);
  }

  static async getRequirementId(id) {
    return api.get(`/${import.meta.env.VITE_REACT_REQUIREMENT_API_PATH}/${id}`);
  }

  static async deleteRequirement(id) {
    return api.delete(`/${import.meta.env.VITE_REACT_REQUIREMENT_API_PATH}/${id}`);
  }

  static async requirementIdChecklists(id) {
    return api.get(`/${import.meta.env.VITE_REACT_REQUIREMENT_API_PATH}/${id}/${import.meta.env.VITE_REACT_CHECKLIST_API_PATH}`);
  }

  static async requirementPut() {
    return api.put(`/${import.meta.env.VITE_REACT_REQUIREMENT_API_PATH}`);
  }
}
