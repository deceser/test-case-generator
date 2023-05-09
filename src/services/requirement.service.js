import api from "../api";

export default class {
  static async generateChecklist(data, userId) {
    return api.post("/requirement/generate/checklist", { data, userId });
  }

  static async getRequirement() {
    return api.get(`/requirement`);
  }

  static async getRequirementId(id) {
    return api.get(`/requirement${id}`);
  }

  static async deleteRequirement(id) {
    return api.delete(`/requirement${id}`);
  }

  static async requirementIdChecklists(id) {
    return api.get(`/requirement/${id}/checklists`);
  }

  static async requirementPut() {
    return api.put(`/requirement`);
  }
}
