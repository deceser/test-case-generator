import api from "../../api";

export const downloadCVS = (filteredItems, checklistId) => {
  api
    .post(`/checklist/${checklistId}/export/csv`, filteredItems, {
      responseType: "blob",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Test-Checklist.csv");
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.log(error);
      // Handle the error
    });
};
