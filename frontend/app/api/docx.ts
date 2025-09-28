import api from "./api";

export async function fetchDocxHtml(docxId: string): Promise<string> {
  const response = await api.get(`/docx?id=${docxId}`, {
    responseType: "text",
  });
  return response.data;
}