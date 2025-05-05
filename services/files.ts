import { ImportFileFormData } from "@/schemas/import-file-schema";
import api from "./axios-config";
import { MappedColumn } from "@/app/(modals)/import-file-modal";

export async function importFile(
  data: ImportFileFormData,
  mapping: MappedColumn[],
  content: string
) {
  console.log({
    name: data.file.name,
    content: Array.from(content),
  });
  try {
    const response = await api.post(`file`, {
      name: data.file.name,
      content: content,
      mapping: mapping.map((m) => {
        return { index: m.fileIndex, prop: m.value.prop };
      }),
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error("Error fetching transactions:", error);
    throw error;
  }
}
